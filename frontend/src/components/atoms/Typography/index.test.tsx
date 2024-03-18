import React from 'react';
import Typography from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Typography tests', () => {
    test('renders the typography component', () => {
        render(<Typography>contiq</Typography>);
        const text = screen.getByText(/contiq/i);
        expect(text).toBeInTheDocument();
    });
});