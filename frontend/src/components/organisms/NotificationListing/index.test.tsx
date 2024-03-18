import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../test-setUp';
import NotificationListing from '.';
import '@testing-library/jest-dom';

import { Notification } from '.';

import DefaultAvatar from '../../../../public/assets/icons/Ellipse 19.svg';
import DefaultAvatar2 from '../../../../public/assets/icons/defaultAvatar2.svg';
import { getUserByEmailId } from '../../../services';


jest.mock('../../../services', () => ({
  listNotifications: jest.fn(),
 

 
}));
const mockNotifications: Notification[] = [
  
    {
        id: '1',
        avatarUrl: DefaultAvatar,
        senderName: 'Amit',
        message: 'has uploaded company agreement.pdf',
        updateDate: new Date('2023-06-20T10:30:00'),
      },
      {
        id: '1',
        avatarUrl: DefaultAvatar,
        senderName: 'Amit',
        message: 'has uploaded company profile.pdf',
        updateDate: new Date('2023-06-10T10:50:00'),
      },
      {
        id: '1',
        avatarUrl: DefaultAvatar,
        senderName: 'Amit',
        message: 'has uploaded company agreement.pdf',
        updateDate: new Date('2023-06-20T10:30:00'),
      },
        {
          id: '2',
          avatarUrl: DefaultAvatar2,
          senderName: 'John',
          message: 'request access to User agreement.pdf',
        },
];

jest.useFakeTimers();

describe('NotificationListing Component', () => {

  test('displays the notification bell icon', () => {

    render(<NotificationListing />);
    const notificationBellIcon = screen.getByTestId('NotificationBell');
    
    expect(notificationBellIcon).toBeInTheDocument();
  });

  test('open menu with no notification.', () => {
    render(<NotificationListing notifications={[]} />);
    const notificationBellIcon = screen.getByTestId('NotificationBell');
    fireEvent.click(notificationBellIcon);
    
    const menuElement = screen.getByRole('menu');
    expect(menuElement).toBeInTheDocument();

  });

  test('opens the menu on clicking the notification bell icon', () => {
    (getUserByEmailId as jest.Mock)?.mockResolvedValueOnce([...mockNotifications]);

    render(<NotificationListing notifications={mockNotifications} menuSx={{left: '-300px'}}/>);
    const notificationBellIcon = screen.getByTestId('NotificationBell');
    fireEvent.click(notificationBellIcon);
    
    const menuElement = screen.getByRole('menu');
    expect(menuElement).toBeInTheDocument();
  });

  test('close the menu on clicking close icon', async () => {
    render(<NotificationListing notifications={mockNotifications} />);
    const notificationBellIcon = screen.getByTestId('NotificationBell');
    fireEvent.click(notificationBellIcon);
  
    const menuElement = screen.getByRole('menu');
    expect(menuElement).toBeInTheDocument();
  
    const menuCloseElement = screen.getByTestId('close-icon-button');
    fireEvent.click(menuCloseElement);
  
    await waitFor(() => {
      const closedMenu = screen.queryByRole('menu');
      expect(closedMenu).not.toBeInTheDocument();
    });

  });
  

});
