import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import FileSync from './';  
import { FileSyncConstant } from '../../../utils/constants';
import '@testing-library/jest-dom'
describe('FileSync component', () => {
  it('renders without errors', () => {
    render(<FileSync open={true} onClose={() => {}} />);
  });

  it('displays the Google Drive image', () => {
    render(<FileSync open={true} onClose={() => {}} />);
    const image = screen.getByTestId('Google Drive Image');
    expect(image).toBeInTheDocument();
  });
  
  it('displays the main header text', () => {
    render(<FileSync open={true} onClose={() => {}} />);
    const header = screen.getByText(FileSyncConstant[0]);
    expect(header).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<FileSync open={true} onClose={() => {}} />);
    const description = screen.getByText(FileSyncConstant[1]);
    expect(description).toBeInTheDocument();
  });

  it('displays the first bottom text', () => {
    render(<FileSync open={true} onClose={() => {}} />);
    const bottomText1 = screen.getByText("Estimated time - 10 mins");
    expect(bottomText1).toBeInTheDocument();
  });

  it('displays the second bottom text', () => {
    render(<FileSync open={true} onClose={() => {}} />);
    const bottomText2 = screen.getByText("Completed 4/5");
    expect(bottomText2).toBeInTheDocument();
  });

  it('calls the onClose function when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<FileSync open={true} onClose={handleClose} />);
    
    const closeButton = screen.getByTestId('Close Button');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
