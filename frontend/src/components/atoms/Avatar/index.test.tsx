import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Avatar from '.'; 
import ElipseAvatar from '../../../../public/assets/icons/Ellipse 19.svg';


describe('Avatar Component', () => {
  it('renders with an image', () => {
    render(<Avatar src={ElipseAvatar} alt="User" />);
    
    const avatarImage = screen.getByTestId('PersonIcon');
    expect(avatarImage).toBeInTheDocument();
  });

  it('renders without an image', () => {
    render(<Avatar alt="User" />);
    
    const avatarImage = screen.queryByAltText('User');
    expect(avatarImage).not.toBeInTheDocument();
  });

  it('renders with onClick event', () => {
    const handleClick = jest.fn();
    render(<Avatar src={ElipseAvatar}  alt="User" onClick={handleClick} />);
    
    const avatar = screen.getByTestId('PersonIcon');
    fireEvent.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
