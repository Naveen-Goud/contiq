import React from 'react';
import { screen } from '@testing-library/react';
import HomePage from './';
import '@testing-library/jest-dom'
import { render } from '../../test-setUp';

test('renders Home component', () => {
    render(<HomePage />);
    const homeComponent = screen.getByTestId('home-component');
    expect(homeComponent).toBeInTheDocument();
  });
  
  test('should render  with text ', () => {
    render(<HomePage />);
    const headerText = screen.getByText('Files');
    expect(headerText).toBeInTheDocument();
  });
 
  
  test('renders the image', () => {
    render(<HomePage />);
    const image = screen.getByText('No files availabe');
    expect(image).toBeInTheDocument();
  });