import React from 'react';
import {screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from '.';
import { render } from '../../test-setUp';

describe('SignInPage', () => {
    it('renders SignInPage correctly', () => {
      render(<SignInPage />);
      expect(screen.getAllByText("Sign In")[0]).toBeInTheDocument();
    });
  });