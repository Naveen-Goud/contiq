import { render, screen } from '@testing-library/react';
import React from 'react';
import { AvatarTypography } from '.';
import '@testing-library/jest-dom';

describe('AvatarTypography', () => {
    test('render the component', () => {
        render(<AvatarTypography name={'Amit'} />);
        const text = screen.getByText('Amit');
        expect(text).toBeInTheDocument();
    });
});
