import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Dialogcard } from '.';
import '@testing-library/jest-dom';
describe('Dialog card', () => {
    test('render the component', () => {
        render(<Dialogcard open={true} pdfName='Contract agreement.pdf'/>);
        const text = screen.getByText('Contract agreement.pdf');
        expect(text).toBeInTheDocument();

        const cancelButton = screen.getByRole('button', {
            name: /Cancel/i
        });
        fireEvent.click(cancelButton);
        
        const uploadButton = screen.getByRole('button', {
            name: /Upload/i
        });
        fireEvent.click(uploadButton);
    });

 
});
