import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FolderCard from '.';

describe('FolderCard', () => {
  test('renders folder name correctly', () => {
    const folderName = 'Test Folder';
    render(<FolderCard folderName={folderName} />);

    const folderNameElement = screen.getByText(folderName);
    expect(folderNameElement).toBeInTheDocument();
  });

  test('triggers onClick when clicked', () => {
    const folderName = 'Test Folder';
    const handleClick = jest.fn();
    render(<FolderCard folderName={folderName} onClick={handleClick} />);

    const folderNameElement = screen.getByText(folderName)
    fireEvent.click(folderNameElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
