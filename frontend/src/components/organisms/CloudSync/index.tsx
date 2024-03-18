import { Box, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomIcon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import Arrow from '../../../../public/assets/icons/backComponent.svg';
import Cross from '../../../../public/assets/icons/cross.svg';
import styled from '@emotion/styled';
import theme from '../../../theme';
import CustomTabs from '../../molecules/Tabs';
import GoogleDrive from '../../../../public/assets/icons/Google drive.svg';
import DropBox from '../../../../public/assets/icons/DropBox.svg';
import TeraBox from '../../../../public/assets/icons/TeraBox.svg';
import ICloud from '../../../../public/assets/icons/iCloud.svg';
import CloudStorage, { CloudStorageIcon } from '../../molecules/CloudStorage';
import { UploadCloudFiles } from '../UploadCloudFiles';
import { gapi } from 'gapi-cjs';
import FileSync from '../../molecules/FileSync';
import { DISCORYDOCS, SCOPE } from '../../../utils/constants';
import UploadFile from '../UploadFile';
import { Dialogcard } from '../../molecules/Dialogcard';
import { InputFileData } from '../../../modal/Interfaces';
import {   updateFileOnServer, postNotification } from '../../../services'; 
import { useUserContext } from '../../../contexts/User/UserContext'; 
import { PostNotification } from '../../../modal/Interfaces';

export interface CloudSyncProps {
    open: boolean;
    onClose?: () => void;
    handleDialogUpload?: (FileData:any) => void;
}

interface Folder {
    trashed: boolean;
    name: string;
    id: string;
    files: Files[];
}

interface Files {
    name: string;
    trashed: boolean;
    parents: string;
}
interface Response<T> {
    result: T;
    body: string;
    headers?: { [headerName: string]: string };
    status?: number;
    statusText?: string;
}

interface DriveFile {
    mimeType: string;
}

interface DriveListResponse {
    files: DriveFile[];
}

const Wrapper = styled(Box)({
    height: '78vh',
    width: '51.5vw',
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
    '& .line': {
        height: '0px',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        marginLeft: '0px',
        marginBottom: '30px'
    },

    '& .storage': {
        marginLeft: '24px'
    }
});

 
export const CloudSync = ({ open, onClose,handleDialogUpload }: CloudSyncProps) => {
    const [showSync, setShowSync] = useState<boolean>(false);
    const [data, setData] = useState<Folder[]>();
    const [syncFinished, setSyncFinished] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const [activeTab,setActiveTab]=useState(0);
    const [UploadData,setUploadData]=useState<File>();
    const [renderDialogCard,setRenderDialogCard]=useState(false)
    const [showrenderDialogCard,setShowRenderDialogCard]=useState<boolean>(false)
    const [duplicateId,setDuplicateId]=useState('')
    const { user }=useUserContext();
    
    useEffect(() => {
        let syncTimeout: NodeJS.Timeout;
        if (showSync) {
            syncTimeout = setTimeout(() => {
                setShowSync(false);
                setSyncFinished(true);
            }, 3500);
        }

        return () => {
            clearTimeout(syncTimeout);
        };
    }, [showSync]);

    const handleClientLoad = () => {
        gapi.load('client:auth2', initClient);
        setShowContent(false);
        setShowSync(true);
    };

    function organizeData(folders: Folder[], files: Files[]): Folder[] {
        const folderMap: Record<string, Folder> = {};

        folders.forEach((folder) => {
            folderMap[folder.id] = {
                id: folder.id,
                name: folder.name,
                trashed: folder.trashed,

                files: []
            };
        });
        files.forEach((file) => {
            const parentFolderId = file.parents;
            if (folderMap[parentFolderId]) {
                folderMap[parentFolderId].files.push(file);
            }
        });

        return Object.values(folderMap);
    }
    const initClient = () => {
        gapi.client
            .init({
                apiKey: process.env.GOOGLE_API_KEY,
                clientId: process.env.GOOGLE_CLIENT_ID,
                discoveryDocs: [DISCORYDOCS],
                scope: SCOPE
            })
            .then(() => {
                gapi.auth2
                    .getAuthInstance()
                    .isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(
                    gapi.auth2.getAuthInstance().isSignedIn.get()
                );
            });
    };

    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const updateSigninStatus = (isSignedIn: boolean) => {
        if (isSignedIn) {
            listFiles();
        } else {
            handleAuthClick();
        }
    };
    const listFiles = (searchTerm = null) => {
        gapi.client.drive.files
            .list({
                fields: 'files'
            })
            .then((response: Response<DriveListResponse>) => {
                const res = JSON.parse(response.body);
                const folderData = res.files.filter(
                    (file: { mimeType: string }) =>
                        file?.mimeType.split('.').pop()?.toLowerCase() ===
                        'folder'
                );

                const files = res.files.filter((file: any) =>
                    file?.mimeType
                        .split('.')
                        .pop()
                        ?.toLowerCase()
                        .includes('pdf')
                );
                setData(organizeData(folderData, files));
            })
            .catch((error: Response<DriveListResponse>) => console.log(error));
    };
    const iconsLists: CloudStorageIcon[] = [
        {
            dataTestId: 'google-drive',
            iconSrc: GoogleDrive,
            onClick: handleClientLoad
        },
        {
            dataTestId: 'dropbox',
            iconSrc: DropBox
        },
        {
            dataTestId: 'ICloud',
            iconSrc: ICloud
        },
        {
            dataTestId: 'terabox',
            iconSrc: TeraBox
        }
    ];

    const handleCloseClick = () => {
        if(onClose){
            onClose(); 
           window.location.reload();
        }

      };
      const handleClose=()=>{
        setShowContent(!showContent)
        setSyncFinished(!syncFinished)
      }

    const handleParentModal=()=>{
        if(showrenderDialogCard){
            setRenderDialogCard(true);
        }else{
            setRenderDialogCard(false)
        } 
    }
    const handleDialogBox=()=>{
        console.log("inside cloud sync"+UploadData)
        if(onClose){
            onClose(); 
           window.location.reload();
        }
    }
    const postNotificationData = async (filename: string, fileId: string) => {
        if(user == null){
            return;
        }
        const notificationData: PostNotification = {
            message: `has updated ${filename}`,
            updateDate: new Date(),
            fileId: fileId,
            userId: user.id,
        }
        await postNotification(notificationData);
    }
    const handleUploadClick= async ()=>{
        if (UploadData) { // Check if UploadData is not null or undefined
            console.log("inside cloud sync" + UploadData.name);
     
            if(user==null) return
            await updateFileOnServer(UploadData,  user.id); 
            postNotificationData(UploadData.name, duplicateId);
            if (onClose) {
                onClose();
                window.location.reload();
            }
        } else { 
            console.error("UploadData is null or undefined. Cannot proceed with upload.");
        }
    }
     
    return (
        renderDialogCard ? <Dialogcard open={true} onCancelClick={handleDialogBox}  pdfName={UploadData?.name} onUploadClick={handleUploadClick}  />:
      
        (<Modal
            open={open}
            onClose={handleClientLoad}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <>
                {showContent && (
                    <Wrapper>
                        <Box className="header">
                            <Box className="backArrow">
                                <CustomIcon
                                    className="arrow"
                                    src={Arrow}
                                    alt="arrow"
                                    onClick={handleCloseClick}
                                />
                                <Typography
                                    className="title"
                                    variant={'header3'}
                                >
                                    Upload files
                                </Typography>
                            </Box>
                            <CustomIcon
                                className="cross"
                                src={Cross}
                                dataTestId='CrossIcon'
                                alt="cross"
                                onClick={handleCloseClick}
                            />
                        </Box>
                        <Box className="line" />
                        <CustomTabs
                            tabs={[
                                {
                                    label: 'Uploads',
                                    content: <Box>Content for Tab 1</Box>,
                                    disabled: false
                                },
                                {
                                    label: 'Cloud storage',
                                    content: <Box>Content for Tab 2</Box>,
                                    disabled: false
                                }
                            ]}
                            width="51.5vw"
                            activeTabColor={theme.palette.structural.white}
                            inactiveTabColor={theme.palette.grey[200]} 
                            setActiveTab={setActiveTab}
                          />

                          {activeTab ===0 ?
                          (
                            <Box sx={{marginTop:'290px'}}>
                            <UploadFile duplicateId={setDuplicateId} onClick={handleParentModal} setUploadData={setUploadData} dialogBox={setShowRenderDialogCard}  onClose={handleCloseClick}/>
                            </Box>
                          ):(
                            <>
                            <Box className="line" />
                            <Box className="storage">
                                <CloudStorage icons={iconsLists} />
                            </Box>
                            </>
                          )
                          } 
                    </Wrapper>
                )}
                {syncFinished ? (
                    <UploadCloudFiles open={true} data={data} onClick={handleClose} onClose={handleCloseClick}/>
                ) : (
                    <FileSync
                        open={showSync}
                        onClose={handleCloseClick}
                    />
                )}
            </>
        </Modal>)
    );
};
