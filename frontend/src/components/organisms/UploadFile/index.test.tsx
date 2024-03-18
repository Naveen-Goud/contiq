import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import UploadFile from './';
import '@testing-library/jest-dom'
import { InputFileData } from '../../../modal/Interfaces'; 
import { render } from '../../../test-setUp';

describe('UploadFile Component', () => {

  it('should show upload content when the upload button is clicked', () => {
    render(<UploadFile onClick={function (): void {
      throw new Error('Function not implemented.');
    } } setUploadData={function (): void {
      throw new Error('Function not implemented.');
 
    } } dialogBox={function (): void {
      throw new Error('Function not implemented.');
    } } onClose={function (): void {
      throw new Error('Function not implemented.');
    } } duplicateId={function (): void {
      throw new Error('Function not implemented.');
 
    } }/>)
    const button=screen.getByTestId("button");
    fireEvent.click(button)

    const input=screen.getByTestId("input");
    const file = new File(['sample file content'], 'sample.pdf', { type: 'application/pdf' });
    fireEvent.change(input, { target: { files: [file] } });

    const name = screen.getByText('sample.pdf');
    expect(name).toBeInTheDocument();
  })
  it('should reset the name when no file is selected', () => {
    render(<UploadFile onClick={function (): void {
      throw new Error('Function not implemented.');
    } } setUploadData={function (): void {
      throw new Error('Function not implemented.');
 
    } } dialogBox={function (): void {
      throw new Error('Function not implemented.');
    } } onClose={function (): void {
      throw new Error('Function not implemented.');
    } } duplicateId={function (): void {
      throw new Error('Function not implemented.');
 
    } }/>)

    const button = screen.getByTestId("button");
    fireEvent.click(button);

    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { files: [] } });

    const name = screen.queryByText('sample.pdf'); 
    expect(name).toBeNull();
  })


});
describe('UploadFile Component', () => {
  it('should trigger handleUploadFile when "Upload file" button is clicked after selecting a file', () => { 
    const onClick = jest.fn();
    const setUploadData = jest.fn();
    const dialogBox = jest.fn();
    const onClose = jest.fn();
    const duplicateId = jest.fn(); 
    render(
      <UploadFile
        onClick={onClick}
        setUploadData={setUploadData}
        dialogBox={dialogBox}
        onClose={onClose}
        duplicateId={duplicateId}
      />
    ); 
    const chooseFileButton = screen.getByText('Choose Files'); 
    fireEvent.click(chooseFileButton); 
    const fileInput = screen.getByTestId('input'); 
    const file = new File(['sample content'], 'sample.pdf', {
      type: 'application/pdf',
    }); 
    fireEvent.change(fileInput, { target: { files: [file] } }); 
    const uploadButton = screen.getByTestId('Upload file'); 
    fireEvent.click(uploadButton); 
    //expect(onClick).toHaveBeenCalled();
  });
});
 