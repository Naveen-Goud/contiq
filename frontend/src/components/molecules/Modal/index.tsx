import { Box, SxProps, Modal } from '@mui/material';
import React from 'react';

export interface CustomModalProps {
    open: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    sx?: SxProps;
}

const CustomModal = ({ open, onClose, children, sx }: CustomModalProps) => {
    return (
        <Modal open={open} onClose={onClose} sx={sx}>
            <Box>{children}</Box>
        </Modal>
    );
};

export default CustomModal;
