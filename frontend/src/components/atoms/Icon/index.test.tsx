import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CustomIcon from '.';
import HomeIcon from '../../../../public/assets/icons/home2.svg';

describe('Icon Component', () => {
    it('render icon', () => {
        render(<CustomIcon dataTestId='HomeIcon' icon={HomeIcon} />);

        const iconElement = screen.getByTestId('HomeIcon');
        expect(iconElement).toBeInTheDocument();
    })
})
