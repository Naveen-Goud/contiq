import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { SignIn } from '.';
import '@testing-library/jest-dom';
import { getToken, getUserByEmailId, postMyData } from '../../../services';
import { render } from '../../../test-setUp';

const mockedUser = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'John@123456'
    }
];
const tokens={
    message: "'Successfully logged in'",
    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXRpc2hAZ21haWwuY29tIiwiaWF0IjoxNjk1MzYzNzI4LCJleHAiOjE2OTU0MDY5Mjh9.uxNgf9Zpl5bf-nIPe22qKVs5xOEcknwctBc5JUvoY2M"
}
jest.mock('../../../services', () => ({
    getUserByEmailId: jest.fn(),
    postMyData:jest.fn(),
    getToken:jest.fn()

   
}));
jest.mock('@auth0/auth0-react', () => ({
    useAuth0: jest.fn(() => ({
        isAuthenticated: true,
        loginWithRedirect: jest.fn(),
        user: {
            name: 'John',
            email: 'john.doe@example.com'
        }
    }))
}));
describe('signUp', () => {
    test('shows error messages for invalid name , email and password', () => {
        render(<SignIn />);

        const emailField = screen.getByPlaceholderText('john@example.com');
        fireEvent.change(emailField, { target: { value: 'invalidemail' } });
        fireEvent.change(emailField, { target: { value: '' } });

        const passwordField = screen.getByPlaceholderText('Create a password');
        fireEvent.change(passwordField, { target: { value: 'pass' } });
        fireEvent.change(passwordField, { target: { value: 'password&' } });
        fireEvent.change(passwordField, { target: { value: 'JGDDSARR$' } });
        fireEvent.change(passwordField, { target: { value: 'Jagadeesh' } });
        fireEvent.change(passwordField, { target: { value: '' } });
    });

    test('clears input values and error messages on successful sign up', async () => {
        // (getUserByEmailId as jest.Mock).mockResolvedValueOnce([...mockedUser]);
        (getUserByEmailId as jest.Mock).mockResolvedValueOnce([...mockedUser]);

        render(<SignIn />);

        const emailField = screen.getByPlaceholderText('john@example.com');
        fireEvent.change(emailField, { target: { value: 'john@example.com' } });

        const passwordField = screen.getByPlaceholderText('Create a password');
        fireEvent.change(passwordField, { target: { value: 'John@123456' } });

        const signUpButton = screen.getByRole('button', {
            name: /Sign In/i
        });
        fireEvent.click(signUpButton);
    });
    test('shows error on giving invalid user credentials', async () => {
        (getToken as jest.Mock).mockResolvedValueOnce({...tokens});

        render(<SignIn />);

        const emailField = screen.getByPlaceholderText('john@example.com');
        fireEvent.change(emailField, { target: { value: 'john@example.com' } });

        const passwordField = screen.getByPlaceholderText('Create a password');
        fireEvent.change(passwordField, { target: { value: 'John@124' } });

        const signUpButton = screen.getByRole('button', {
            name: /Sign In/i
        });
        fireEvent.click(signUpButton);
    });
    test('signin with google', async () => {
        (getUserByEmailId as jest.Mock).mockResolvedValueOnce([...mockedUser]);
        (postMyData as jest.Mock).mockResolvedValueOnce([]);

        render(<SignIn />);

        const signUpButton = screen.getByText('Continue with google');
        fireEvent.click(signUpButton);

        const forgot=screen.getByText("Forgot password?")
        fireEvent.click(forgot)

        const link=screen.getByText("Sign Up")
        fireEvent.click(link)

    });
});
