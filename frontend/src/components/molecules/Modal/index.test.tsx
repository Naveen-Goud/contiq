import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomModal from '.';
import { Box } from '@mui/material';

describe('CustomModal Component', () => {
    it('should render  and handle modal open/close', () => {
        const onCloseMock = jest.fn();

        render(
            <CustomModal open={true} onClose={onCloseMock}>
                <Box data-testid="modal-content">Modal Content</Box>
            </CustomModal>
        );
        const modalContent = screen.getByTestId('modal-content');
        expect(modalContent).toBeInTheDocument();
    });
});
