import React, { useState } from 'react'; 
import { screen, fireEvent, waitFor } from '@testing-library/react';
import FilesPage from '.';
import '@testing-library/jest-dom';
import { getFileLists, listNotifications } from '../../services';
import { render } from '../../test-setUp';
import { Notification } from '../../components/organisms/NotificationListing'; 
import DefaultAvatar from '../../../public/assets/icons/Ellipse 19.svg';
import DefaultAvatar2 from '../../../public/assets/icons/defaultAvatar2.svg';

jest.mock('../../services', () => ({
  getFileLists: jest.fn(),
  listNotifications: jest.fn(),
}));

const mockFileResponse = [
  {
    id: '1',
    name: 'File1.pdf',
    uploadDate: '2023-09-03T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'File2.pdf',
    uploadDate: '2023-09-07T00:00:00.000Z',
  },
];

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

describe('FilesPage Component', () => {

  beforeEach(() => {
    (getFileLists as jest.Mock).mockReturnValue(Promise.resolve([...mockFileResponse]));
    (listNotifications as jest.Mock).mockReturnValue(Promise.resolve([...mockNotifications]));
  });

  test('renders the component and initial elements', async () => {
    render(<FilesPage />);

    await waitFor(() => {
      expect(getFileLists).toHaveBeenCalledTimes(0);
    });
    

    const filesElement = screen.getByText('Files', { selector: '.MuiTypography-header2' });
    expect(filesElement).toBeInTheDocument();
    expect(screen.getByText('Add Files')).toBeInTheDocument();
    expect(screen.getByText('All files')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Start Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('End Date')).toBeInTheDocument();
    
  });

  test('filters data based on start and end dates', async () => {
    render(<FilesPage />);

    fireEvent.change(screen.getByPlaceholderText('Start Date'), {
      target: { value: '2023-09-01T00:00:00.000Z' },
    });
    fireEvent.change(screen.getByPlaceholderText('End Date'), {
      target: { value: '2023-09-08T00:00:00.000Z' },
    });

    console.log(document.body.innerHTML);

    (getFileLists as jest.Mock).mockResolvedValueOnce([...mockFileResponse]);
  
  });

  test('filters data based on start date', async () => {
    render(<FilesPage />);
    fireEvent.change(screen.getByPlaceholderText('Start Date'), {
      target: { value: '2023-09-02' },
    });
    (getFileLists as jest.Mock).mockResolvedValueOnce([...mockFileResponse]);
  });

  test('filters data based on end date', async () => {
    render(<FilesPage />);
    fireEvent.change(screen.getByPlaceholderText('End Date'), {
      target: { value: '2023-09-06' },
    });

    (getFileLists as jest.Mock).mockResolvedValueOnce([...mockFileResponse]);
  });

  test('clicking "Add Files" opens upload files popup', () => {
    render(<FilesPage />);

    fireEvent.click(screen.getByLabelText('Add Files'));
    expect(screen.getByText('Upload files')).toBeInTheDocument();
  });

  test('closing CloudSync component by clicking close button', async () => {
    
    render(<FilesPage />);
  
    expect(screen.queryByText('Upload files')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Add Files'));

    expect(screen.getByText('Upload files')).toBeInTheDocument();
    const closeIcon = screen.getByTestId('CrossIcon');
    fireEvent.click(closeIcon);
  
    await waitFor(() => {
      expect(screen.queryByText('Upload files')).not.toBeInTheDocument();
    });
  });
  

});
