import { screen } from '@testing-library/react';
import React from 'react';
import { SignUpPage } from '.';
import '@testing-library/jest-dom';
import { render } from '../../test-setUp';
describe('signUp page', () => {
    test('render the signUp page', () => {
        render(<SignUpPage />);
        const imageElement = screen.getByAltText('template image');
        expect(imageElement).toBeInTheDocument();
    });
});
