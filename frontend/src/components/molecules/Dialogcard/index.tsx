import { Box, Modal } from '@mui/material';
import React from 'react';
import Typography from '../../atoms/Typography';
import CustomButton from '../../atoms/Button';
import styled from '@emotion/styled';
import theme from '../../../theme';
import { TEXT } from '../../../utils/constants';

export interface DialogcardProps {
    open: boolean;
    onClose?: () => void;
    onUploadClick?: () => void;
    onCancelClick?: () => void;
    pdfName?:string;
}
const ModalBox = styled(Box)({
    backgroundColor: theme.palette.grey[400],
    height: '26vh',
    width: '28.43vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '28px',
    padding: '24px',
    '& .mainText': {
        color: theme.palette.structural.white
    },
    '& .pdfName': {
        color: theme.palette.structural.white,
        display: 'inline'
    },
    '& .description': {
        color: theme.palette.textColor.highEmphasis,
        display: 'inline'
    },
    '& .buttons': {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px'
    },
    '& .cancelButton':{
        color:theme.palette.structural.white,
       border:`1px solid ${theme.palette.structural.border}`,
       textTransform: 'none',
       ':hover':{
        color:theme.palette.structural.white,
       border:`1px solid ${theme.palette.structural.border}`,
       }
    },
    '& .uploadButton':{
        color:theme.palette.structural.white,
      backgroundColor:theme.palette.primary[500],
      textTransform: 'none',
       ':hover':{
        color:theme.palette.structural.white,
        backgroundColor:theme.palette.primary[500],
       }
    }
});
const CenteredModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dialogcard = ({
    open,
    onClose,
    onUploadClick,
    onCancelClick,
    pdfName
}: DialogcardProps) => {
 
    return (
        <CenteredModal open={open} onClose={onClose}>
            <ModalBox>
                <Typography className="mainText" variant={'header3'}>
                    Upload options
                </Typography>

                <Box>
                    <Typography className="pdfName" variant={'subtitle2'}>
                        {pdfName}
                    </Typography>
                    <Typography className="description" variant={'subtitle2'}>
                       {TEXT}
                    </Typography>
                </Box>

                <Box className="buttons">
                    <CustomButton variant="outlined" onClick={onCancelClick} className='cancelButton'>Cancel</CustomButton>
                    <CustomButton variant="contained" onClick={ onUploadClick } className='uploadButton'>Upload</CustomButton>
                </Box>
            </ModalBox>
        </CenteredModal>
    );
};
