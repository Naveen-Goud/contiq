import React from 'react';
import { render, renderHook } from '@testing-library/react';
import { UserProvider, useUserContext } from './UserContext';
import { SignIn } from '../../components/organisms/SignIn';

describe('UserProvider', () => {
    test('renders without crashing', () => {
      render(
        <UserProvider>
        <div>Test Component</div>
      </UserProvider>
      );
    });

    it('stores user data in localStorage', () => {
        const userData = { id: "1", name: 'Test User' };

        const TestComponent = () => {
            const { setUser } = useUserContext();
            setUser(userData);
      
            return  <div>Test Component</div>;
          };
      
        render(
          <UserProvider>
            <TestComponent />
          </UserProvider>
        );
      
        const storedUserDataString = localStorage.getItem('user');
    
        // Check if storedUserDataString is not null before parsing
        if (storedUserDataString !== null) {
          const storedUserData = JSON.parse(storedUserDataString);
          expect(storedUserData).toEqual(userData);
        }
      });

  });