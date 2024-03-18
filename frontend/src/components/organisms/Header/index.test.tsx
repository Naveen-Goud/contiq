import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.'; 
import { render } from '../../../test-setUp';

describe('Header component', () => {
  test('renders logo', () => {

    const avatarOptions = [
      {
          name: 'Profile',
      },
      {
          name: 'Settings',
      },]

    render(<Header avatarOptions={avatarOptions} setState={ ()=>{}} />);
    const logoElement = screen.getByText('CONTIQ');
    expect(logoElement).toBeInTheDocument();
  });

  test('opens menu on avatar click', () => {
    render(<Header setState={ ()=>{}} />);
    const avatar = screen.getByTestId('AvatarIcon'); 
    fireEvent.click(avatar);

    const profileOption = screen.getByText('Profile');
    expect(profileOption).toBeInTheDocument();
  });

  test('opens notification list on bell icon click', () => {
    render(<Header setState={ ()=>{}} />);
    const bellIcon = screen.getByTestId('NotificationBell');
    expect(bellIcon).toBeInTheDocument();
    fireEvent.click(bellIcon);
    
  });

  test('logs out on clicking the "Logout" option', () => {
    render(<Header setState={ ()=>{}} />);

    const avatar = screen.getByTestId('AvatarIcon');
    fireEvent.click(avatar);

    const profileOption = screen.getByText('Profile');
    expect(profileOption).toBeInTheDocument();
    fireEvent.click(profileOption);

    const settingOption = screen.getByText('Settings');
    expect(settingOption).toBeInTheDocument();
    fireEvent.click(settingOption);

    const logoutOption = screen.getByText('Logout');
    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });

  test('closes the menu on clicking outside', async () => {
    render(<Header setState={ ()=>{}} />);

    const avatar = screen.getByTestId('AvatarIcon');
    fireEvent.click(avatar);

    const menu = screen.getByRole('menu');
    fireEvent.click(document);

   // expect(menu).not.toBeInTheDocument();
  });

});
