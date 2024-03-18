import React from 'react';
import Spinner from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Spinner tests', () => {
    test('renders the Spinner component', () => {
        const { container } = render(
            <Spinner color={'primary'} variant={'determinate'} />
        );
        const circle = container.querySelector('circle');
        expect(circle).toBeInTheDocument();
    });
});
