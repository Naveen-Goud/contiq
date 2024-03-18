import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '.';

describe('Pagination Component', () => {
    it('should render and handle zoom properly', () => {
        render(<Pagination currentPage={1} totalPages={5} />);

        const minusButton = screen.getByTestId('minus');
        const plusButton = screen.getByTestId('plus');
        const zoomText = screen.getByTestId('zoom');
        expect(zoomText).toHaveTextContent('%');
        fireEvent.click(minusButton);
        fireEvent.click(plusButton);
    });
});
