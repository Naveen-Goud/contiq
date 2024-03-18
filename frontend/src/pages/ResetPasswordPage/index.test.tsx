import React from "react";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import ResetPasswordPage from ".";
import '@testing-library/jest-dom'
import { render } from "../../test-setUp";
import { getUserByEmailId, updatePassword } from '../../services';

jest.mock('../../services', () => ({
  getUserByEmailId: jest.fn(),
  updatePassword: jest.fn()
}));

const mockedUser = [
  {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'NewPassword@123'
  }
];

describe("ResetPasswordPage", () => {

  it("renders ResetPassword when isPasswordChanged is false and showCreatePassword is false", () => {

      render(<ResetPasswordPage />);
      const resetPasswordComponent = screen.getByText("Reset your password");
      expect(resetPasswordComponent).toBeInTheDocument();
    });
  
    it("renders CreatePassword when showCreatePassword is true", async () => {

      (getUserByEmailId as jest.Mock).mockResolvedValue([...mockedUser]); // Mock the function to immediately resolve

      render(<ResetPasswordPage />);
    
      const emailInput = screen.getByPlaceholderText("john@example.com");
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    
      const sendButton = screen.getByText("Send");
      fireEvent.click(sendButton);
    
    });
    
});