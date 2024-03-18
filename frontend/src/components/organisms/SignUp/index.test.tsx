import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SignUp } from '.';
import '@testing-library/jest-dom';
import { render } from '../../../test-setUp';
import { EMAIL_REQ_ERROR, NAME_REQ_ERROR, PASSWORD_REQ_ERROR } from '../../../utils/constants';
import API from '../../../services/API';
import { getUserByEmailId, postMyData } from '../../../services';

const mockedUser = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'John@123456'
    }
];
jest.mock('../../../services/API.tsx', () => ({
    get: jest.fn().mockImplementation((url) => {
        if (url.includes('email=john@example.com')) {
            return Promise.resolve({
                data: [
                    {
                        id: 1,
                        name: 'John Doe',
                        email: 'john@example.com',
                        password: 'John@123456'
                    }
                ]
            });
        } else {
            return Promise.resolve({ data: [] });
        }
    }),
    post: jest.fn().mockImplementation((url, data) => {
        if (url === 'users/') {
            return Promise.resolve({});
        }
        return Promise.reject(new Error('Unknown API endpoint'));
    }),
        getUserByEmailId: jest.fn(),
    postMyData: jest.fn()
   
}));
// jest.mock('../../../services', () => ({
//     getUserByEmailId: jest.fn(),
//     postMyData: jest.fn()
// }));
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
        render(<SignUp />);

        const nameField = screen.getByPlaceholderText('John Sena');
        fireEvent.change(nameField, { target: { value: 'nam' } });
        fireEvent.change(nameField, {
            target: {
                value: 'namjhjfdsmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmbvcbddddddddddddddddddddddddddddddddddddddddddddddddd'
            }
        });
        fireEvent.change(nameField, { target: { value: '' } });

        const emailField = screen.getByPlaceholderText('john@example.com');
        fireEvent.change(emailField, { target: { value: 'invalidemail' } });
        fireEvent.change(emailField, { target: { value: '' } });

        const passwordField = screen.getByPlaceholderText('Create a password');
        fireEvent.change(passwordField, { target: { value: 'pass' } });
        fireEvent.change(passwordField, { target: { value: 'password&' } });
        fireEvent.change(passwordField, { target: { value: 'JGDDSARR$' } });
        fireEvent.change(passwordField, { target: { value: 'Jagadeesh' } });
        fireEvent.change(passwordField, { target: { value: '' } });
        expect(screen.getByText(NAME_REQ_ERROR)).toBeInTheDocument();
        expect(screen.getByText(EMAIL_REQ_ERROR)).toBeInTheDocument();
        expect(screen.getByText(PASSWORD_REQ_ERROR)).toBeInTheDocument();
    });

    test('clears input values and error messages on successful sign up', async () => {
        render(<SignUp />);
        const nameField = screen.getByPlaceholderText('John Sena');
        fireEvent.change(nameField, { target: { value: 'John Sena' } });

        const emailField = screen.getByPlaceholderText('john@example.com');
        fireEvent.change(emailField, { target: { value: 'john@example.com' } });

        const passwordField = screen.getByPlaceholderText('Create a password');
        fireEvent.change(passwordField, { target: { value: 'Password@123' } });

        const signUpButton = screen.getByRole('button', {
            name: /Create account/i
        });

        const mockPost = jest.spyOn(API, 'post').mockResolvedValue({});

        
        fireEvent.click(signUpButton);

        mockPost.mockRestore();

        const link=screen.getByText("Sign in")
        fireEvent.click(link)

    });
    test('signin with google', async () => {
        // (getUserByEmailId as jest.Mock).mockResolvedValueOnce([...mockedUser]);
        // (postMyData as jest.Mock).mockResolvedValueOnce([]);

        render(<SignUp />);

        const signUpButton = screen.getByText('Continue with google');
        fireEvent.click(signUpButton);


    });
  
});
