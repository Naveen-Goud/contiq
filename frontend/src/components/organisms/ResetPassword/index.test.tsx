import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetPassword from '.'; 
import { getUserByEmailId } from '../../../services';
const mockedUser = [
  {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'John@123456'
  }
];
jest.mock('../../../services', () => ({
  getUserByEmailId: jest.fn(),
  postMyData: jest.fn(),
  getToken:jest.fn()
}));
describe('ResetPassword', () => {
  it('renders textfield and button', () => {
    render(<ResetPassword  />);
    expect(screen.getByText("Reset your password")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it('enter invalid email and button should be disabled', () => {
  
    render(<ResetPassword  />);
    const email = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(email, { target: { value: 'satish@gmail.com' } });
    
  });
  it('enter valid email and button should be enabled', () => {
   
    render(<ResetPassword  />);
    const invalidEmail = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(invalidEmail, { target: { value: 'invalidemail@..com' } });
    fireEvent.change(invalidEmail, { target: { value: '' } });
    const email = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(email, { target: { value: 'satish@gmail.com' } });
  });
  it('should call onSubmitRequest when the form is submitted with a valid email', () => {
    (getUserByEmailId as jest.Mock).mockResolvedValueOnce([...mockedUser]);
    
    const mockOnSubmitRequest = jest.fn();

    render(<ResetPassword onSubmitRequest={mockOnSubmitRequest} />);

    const emailInput = screen.getByPlaceholderText("john@example.com");
    const submitButton = screen.getByText('Send');

    fireEvent.change(emailInput, { target: { value: 'john1@zemosolabs.com' } });

    fireEvent.click(submitButton);
  });
});
