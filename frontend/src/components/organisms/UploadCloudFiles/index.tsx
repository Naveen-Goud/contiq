import styled from '@emotion/styled';
import { Box, Modal } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import theme from '../../../theme';
import CustomIcon from '../../atoms/Icon';
import Arrow from '../../../../public/assets/icons/backComponent.svg';
import Cross from '../../../../public/assets/icons/cross.svg';
import Typography from '../../atoms/Typography';
import RadioTypo from '../../molecules/RadioTypograpy';
import FolderCard from '../../molecules/Foldercard';
import CustomButton from '../../atoms/Button';

import Files from '../../../../public/assets/icons/files.svg';
import { CheckBoxImageTypography } from '../../molecules/CheckBoxImageTypography';
import { FOLDERHEAD } from '../../../utils/constants';
import { InputFileData, PostNotification } from '../../../modal/Interfaces';
import { useUserContext } from '../../../contexts/User/UserContext'; 
import {
    deleteFile, 
    getFileLists,
    postFileData,
    updateFileOnServer,
    postNotification,
    postGoogleDriveFile
 
} from '../../../services';
import axios from 'axios'; 

interface Folder {
    trashed: boolean;
    name: string;
    id: string;
    files: Files[];
}

interface Files {
    id?: string;
    name: string;
    trashed: boolean;
    parents: string;
}
export interface UploadCloudFilesProps {
    open: boolean;
    data: Folder[] | undefined;
    onClick: () => void;
    onClose: () => void;
}
const Wrapper = styled(Box)({
    height: '78vh',
    width: '51vw',
    backgroundColor: theme.palette.grey[400],
    paddingTop: '26px',
    '& .header': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '25px',
        paddingBottom: '28px',
        paddingRight: '24px'
    },
    '& .backArrow': {
        display: 'flex',
        flexDirection: 'row',
        gap: '12px'
    },
    '& .title': {
        color: theme.palette.structural.white
    },
    '& .arrow': {
        height: '24px',
        width: '24px',
        cursor: 'pointer'
    },
    '& .cross': {
        height: '24px',
        width: '24px',
        cursor: 'pointer'
    },
    '& .selectionType': {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        paddingBottom: '16px',
        paddingLeft: '20px'
    },
    '& .chooseFolder': {
        color: theme.palette.structural.white,
        paddingLeft: '11px'
    },
    '& .MuiContainer-root': {
        paddingLeft: '0px'
    },
    '& .buttons': {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px',
        paddingTop: '84px',
        paddingRight: '45px'
    },
    '& .backButton': {
        color: theme.palette.grey[200],
        border: `1px solid ${theme.palette.grey[200]}`,
        textTransform: 'none',
        width: '75px',
        ':hover': {
            color: theme.palette.grey[200],
            border: `1px solid ${theme.palette.grey[200]}`
        }
    },
    '& .syncButton': {
        color: theme.palette.structural.white,
        backgroundColor: theme.palette.primary[100],
        textTransform: 'none',
        width: '75px',
        ':hover': {
            color: theme.palette.structural.white,
            backgroundColor: theme.palette.primary[100]
        }
    },
    '& .buttonsBox': {
        paddingTop: '40px',
        paddingRight: '45px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px'
    },
    '& .syncButtonBox': {
        color: theme.palette.structural.white,
        backgroundColor: theme.palette.primary[500],
        textTransform: 'none',
        width: '75px',
        ':hover': {
            color: theme.palette.structural.white,
            backgroundColor: theme.palette.primary[500]
        },
        ':disabled': {
            background: theme.palette.primary[100],
            color: theme.palette.structural.white
        }
    },
    '& .line': {
        height: '0px',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        marginLeft: '0px',
        marginBottom: '30px'
    },
    '& .files': {
        paddingLeft: '24px',
        paddingBottom: '20px'
    }
});

export const UploadCloudFiles = ({
    open,
    data,
    onClick,
    onClose
}: UploadCloudFilesProps) => {
    const handleClick = (folder: string) => {
        setSelectedFolder(folder);
        setShowFiles(false);
    };
    const [uploadedFile, setUploadFile] = useState<File >();
    const [uploadedFiles, setUploadedFiles] = useState<InputFileData[]>([]);
    const [trashedFiles, setTrashedFiles] = useState<Files[]>([]);
    const [showFiles, setShowFiles] = useState<boolean>(true);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [checkedFiles, setCheckedFiles] = useState<{
        [key: string]: boolean;
    }>({});
    const { user } = useUserContext();

    const handleFileUncheck = (fileName: string) => {
        setCheckedFiles((prevCheckedFiles) => {
            const updatedCheckedFiles = { ...prevCheckedFiles };
            delete updatedCheckedFiles[fileName];
            return updatedCheckedFiles;
        });
    };

    const handleFileCheckToggle = (fileName: string, file: any) => {
        setCheckedFiles((prevCheckedFiles) => ({
            ...prevCheckedFiles,
            [fileName]: !prevCheckedFiles[fileName]
        }));
        if(user == null) return;
        const fileUpload: InputFileData = {
            id: file.id,
            name: file.name,
            type: 'PDF',
            content: '',
            downloadSrc: file.webContentLink,
            path: 'https://digiandme.com/wp-content/uploads/2021/03/Assignment-Front-Page-Format-Word-File.png',
            isDeleted: file.trashed,
            userId:user.id,
            isSync: false,
            uploadDate: new Date(),
            updateDate: new Date()
        };
        setUploadedFiles((prevUploadedFiles) => [
            ...prevUploadedFiles,
            fileUpload
        ]);
    };

    const handlePrevScreen = () => {
        setShowFiles(true);
    };

    const postNotificationData = async (fileId: string, message: string) => {
        if(user == null){
            return;
        }
        const notificationData: PostNotification = {
            message: message,
            updateDate: new Date(),
            fileId: fileId,
            userId: user.id,
        }
        await postNotification(notificationData);
    }

    const handleSyncFiles = async () => {
        if (uploadedFiles.length === 0) {
            console.log('No files selected.');
            onClose();
            return;
        }
        if(user == null) return;
        try {
 
            const response = await getFileLists(user.id);
            if(response==null || response.data==null){
                return
            }
 
            const responseArray = response.data;

            for (const upload of uploadedFiles) {
                const isDuplicated = responseArray.some(
                    (item: { name: string | undefined }) =>
                        upload.name === item.name,
                        console.log("inside the upload fikes method"+upload.name),
                        setUploadFile(uploadedFile)
                );

                if (!isDuplicated) { 
                    console.log("google drive file id" + uploadedFile)
                    if(upload.id==null) return  
                    await postGoogleDriveFile(upload.userId,upload.id) 
                    window.location.reload();
                    if(upload.id){
                        postNotificationData(upload.id, `has uploaded ${upload.name}`)
                    }
 
                    console.log(
                        `Uploaded file "${upload.name}" to server.`
                    );
                } else {
                    console.log(
                        `File "${upload.name}" is already present, updating...`
                    );
                    const existingFile = responseArray.find(
                        (item: { name: string | undefined }) =>
                            upload.name === item.name
                    );

                    if (existingFile) {
                       if( uploadedFile==null) return
                        await updateFileOnServer(uploadedFile,user.id);
                        const notificationMsg = `has updated ${uploadedFile.name}`;
                        postNotificationData(existingFile.id, notificationMsg);
                        
                    } else {
                        console.error(
                            `File "${upload.name}" not found on server.`
                        );
                    }
                }
            }

            onClose();
        } catch (error) {
            console.error('Error syncing files:', error);
        }
       window.location.reload();
    };

    useEffect(() => {
        const deleteTrashedFiles = async () => {
            try {
                let notificationMsg;
                for (const file of trashedFiles) {
                    if (file.id) {
                        await deleteFile(`${file.id}`);
                        notificationMsg = `deleted ${file.name}`;
                        postNotificationData(file.id, notificationMsg);
                    } else {
                        console.error('File ID is undefined.');
                    }
                }
            } catch (error) {
                console.error('Error deleting trashed files:', error);
            }
        };
        deleteTrashedFiles();
    }, [trashedFiles]);

    const filterTrashedFiles = (data: Folder[] | undefined) => {
        const trashedFiles: Files[] = [];
        if (data) {
            data.forEach((folder) => {
                folder.files.forEach((file) => {
                    if (file.trashed) {
                        trashedFiles.push(file);
                    }
                });
            });
        }
        return trashedFiles;
    };

    useEffect(() => {
        const trashedFilesList = filterTrashedFiles(data);
        setTrashedFiles(trashedFilesList);
    }, [data]);

    return (
        <Modal
            open={open}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClose={handleSyncFiles}
        >
            <Wrapper>
                {showFiles ? (
                    <Box>
                        <Box className="header">
                            <Box className="backArrow">
                                <CustomIcon
                                    className="arrow"
                                    src={Arrow}
                                    alt="arrow"
                                    onClick={onClick}
                                />
                                <Typography
                                    className="title"
                                    variant={'header3'}
                                >
                                    Add files
                                </Typography>
                            </Box>
                            <CustomIcon
                                className="cross"
                                src={Cross}
                                alt="cross"
                            />
                        </Box>
                        <Box className="line" />
                        <Box className="selectionType">
                            <Typography
                                className="chooseFolder"
                                variant={'body2'}
                            >
                                {FOLDERHEAD}
                            </Typography>
                            <RadioTypo />
                        </Box>

                        {data?.slice(0, 3).map((folder) => (
                            <Box className="folders" key={folder.id}>
                                <FolderCard
                                    folderName={folder.name}
                                    onClick={() => handleClick(folder.name)}
                                />
                            </Box>
                        ))}
                        <Box className="buttons">
                            <CustomButton
                                variant="outlined"
                                className="backButton"
                            >
                                Back
                            </CustomButton>
                            <CustomButton
                                variant="contained"
                                className="syncButton"
                                onClick={onClose}
                            >
                                Sync
                            </CustomButton>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Box className="header">
                            <Box className="backArrow">
                                <CustomIcon
                                    className="arrow"
                                    src={Arrow}
                                    alt="arrow"
                                    onClick={handlePrevScreen}
                                    dataTestId="back"
                                />
                                <Typography
                                    className="title"
                                    variant={'header3'}
                                >
                                    {selectedFolder}
                                </Typography>
                            </Box>
                            <CustomIcon
                                className="cross"
                                src={Cross}
                                alt="cross"
                            />
                        </Box>
                        <Box className="line" />
                        {data?.map(
                            (folder) =>
                                folder.name === selectedFolder && (
                                    <Box className="files" key={folder.id}>
                                        {folder.files
                                            .filter((file) => !file.trashed)
                                            .map((file) => (
                                                <CheckBoxImageTypography
                                                    key={file.name}
                                                    src={Files}
                                                    content={file.name}
                                                    checked={
                                                        checkedFiles[
                                                            file.name
                                                        ] || false
                                                    }
                                                    onClick={() => {
                                                        checkedFiles[file.name]
                                                            ? handleFileUncheck(
                                                                  file.name
                                                              )
                                                            : handleFileCheckToggle(
                                                                  file.name,
                                                                  file
                                                              );
                                                    }}
                                                />
                                            ))}
                                    </Box>
                                )
                        )}

                        <Box className="buttonsBox">
                            <CustomButton
                                variant="outlined"
                                className="backButton"
                                onClick={handlePrevScreen}
                            >
                                Back
                            </CustomButton>
                            <CustomButton
                                variant="contained"
                                className="syncButtonBox"
                                onClick={handleSyncFiles}
                                disabled={
                                    Object.keys(checkedFiles).length === 0
                                }
                            >
                                Sync
                            </CustomButton>
                        </Box>
                    </Box>
                )}
            </Wrapper>
        </Modal>
    );
};
