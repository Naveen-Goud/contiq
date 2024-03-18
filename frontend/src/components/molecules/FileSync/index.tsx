import React from 'react';
import { Box, Button, Modal, Stack, styled } from '@mui/material';
import Vector from '../../../../public/assets/icons/Vector.svg';
import CustomImage from '../../atoms/Image';
import theme from '../../../theme';
import GoogleDrive from '../../../../public/assets/icons/GoogleDrive.svg';
import { FileSyncConstant, FileSyncConstants } from '../../../utils/constants';
import Typography from '../../atoms/Typography'; 
import FileSyncLoader from "../../../../public/assets/icons/FileSyncLoader.gif"
interface FileSyncProps {
    open: boolean;
    onClose: () => void;
}

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-content {
        position: relative;
        width: 51vw;
        height: 66vh;
        background-color:  ${theme.palette.grey[400]};
        // border: 2px solid  ${theme.palette.textColor.border};
        box-shadow: ${theme.spacing(10)};
        padding: ${theme.spacing(8)};
        flex-shrink: 0;

        .close-button {
            position: absolute;
            top:  ${theme.spacing(2)};
            right:  ${theme.spacing(2)};
        }
    }
`;

const CloseButton = styled(Button)`
    background-color:  ${theme.palette.grey[400]};
    position: absolute;
    top:  ${theme.spacing(4)};
    right: ${theme.spacing(4)};
    &:hover{
        background-color:  ${theme.palette.grey[400]};
    }
    
`;

const CustomBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;  
    width: 40%;
    height: 90%;
    flex-shrink: 0;
    paddintop:  ${theme.spacing(8)};
    background-color:  ${theme.palette.grey[400]};
`;
const FileSync = (props: FileSyncProps) => {
    const handleClose = () => {
        props.onClose();
    };

    return (
        <div>
            <StyledModal open={props.open} onClose={handleClose}>
                <div className="modal-content">
                    <CustomBox>
                        <Stack
                            alignItems="center"
                            direction="column"
                            spacing={8}
                            paddingTop={ theme.spacing(4) }
                        >
                            <CustomImage src={GoogleDrive} data-testid="Google Drive Image "/>
                            <Stack direction="row" spacing={4} alignItems="center"> 
                             <CustomImage src={FileSyncLoader} alt="File Sync Loader"  width={'30px'} height={'30px'} />
  
                                <Typography
                                    variant="header3"
                                    color={theme.palette.structural.white}
                                >
                                    {FileSyncConstant[0]}
                                </Typography>
                            </Stack>
                            <Stack alignItems="center" spacing={6} width={"190px"}>
                                <Typography
                                    variant="body2"
                                    color={theme.palette.textColor.highEmphasis}
                                >
                                    {FileSyncConstant[1]
                                        .split('\n')
                                        .map((line, index) => (
                                            <span key={line}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CustomBox>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" paddingY={2} color={theme.palette.structural.white}>
                        {FileSyncConstants.map((word:any)=>( 

                        <Typography variant="body2" key={word.word}>{word.name}</Typography>
                        ))} 
                    </Stack>

                    <CloseButton onClick={handleClose} data-testid="Close Button" color={"inherit"}>
                        <CustomImage src={Vector} />
                    </CloseButton>
                </div>
            </StyledModal>
        </div>
    );
};

export default FileSync;
