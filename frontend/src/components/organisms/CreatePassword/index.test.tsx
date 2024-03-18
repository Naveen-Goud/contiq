import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePassword from '.'; 
import { password_placeholder } from '../../../utils/constants';
import { getUserByEmailId } from '../../../services';

const mockedUser = 
  {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
  }


jest.mock('../../../services', () => ({
  getUserByEmailId: jest.fn(), 
}));
describe('CreatePassword', () => {
  it('renders textfield and button', () => {
    render(<CreatePassword  />);
    expect(screen.getByText("New password")).toBeInTheDocument();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
  });

  it('enter valid password , password and confirm password matches', () => {
    (getUserByEmailId as jest.Mock).mockResolvedValueOnce({...mockedUser});
   
    render(<CreatePassword  />);
    const newPassword = screen.getAllByPlaceholderText(password_placeholder)[0];
    fireEvent.change(newPassword, { target: { value: 'Satish@2000' } });
    const confirmPassword = screen.getAllByPlaceholderText(password_placeholder)[1];
    fireEvent.change(confirmPassword, { target: { value: 'Satish@2000' } });
    fireEvent.click(screen.getByText("Reset Password"))
  });
  it('enter invalid password , password and confirm password not matches', () => {
  
    (getUserByEmailId as jest.Mock).mockResolvedValueOnce({...mockedUser});
    render(<CreatePassword  />);
    const newPassword = screen.getAllByPlaceholderText(password_placeholder)[0];
    fireEvent.change(newPassword, { target: { value: 'Satish@2000' } });
    const confirmPassword = screen.getAllByPlaceholderText(password_placeholder)[1];
    fireEvent.change(confirmPassword, { target: { value: 'satish2000' } });
    fireEvent.click(screen.getByText("Reset Password"))
  });
  it('enter invalid password , password and confirm password  matches', () => {
    (getUserByEmailId as jest.Mock).mockResolvedValueOnce({...mockedUser});
    render(<CreatePassword  />);
    const newPassword = screen.getAllByPlaceholderText(password_placeholder)[0];
    fireEvent.change(newPassword, { target: { value: 'satish@2000' } });
    fireEvent.change(newPassword, { target: { value: '' } });
    const confirmPassword = screen.getAllByPlaceholderText(password_placeholder)[1];
    fireEvent.change(confirmPassword, { target: { value: 'satish@2000' } });
    fireEvent.click(screen.getByText("Reset Password"))
  });
});
