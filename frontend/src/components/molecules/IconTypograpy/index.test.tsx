import React from 'react';
import { render, screen } from '@testing-library/react'; 
import IconTypo from './';  
import '@testing-library/jest-dom'
test('should render icon and text', () => {
  render(<IconTypo iconUrl="/path/to/icon.png" text="Example Text" />);
 
  const iconElement = screen.getByRole('img');
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveAttribute('src', '/path/to/icon.png');
 
  const textElement = screen.getByText('Example Text');
  expect(textElement).toBeInTheDocument();
});
 
  
test('should apply custom styles to Typography', () => {
    render(
      <IconTypo
        iconUrl="/path/to/icon.png"
        text="Example Text"
        sx={{ color: 'rgb(149, 149, 150)' }}  
      />
    );
   
    const textElement = screen.getByText('Example Text');
    expect(textElement).toHaveStyle('color: rgb(149, 149, 150)');
  });
  
  test('should render  with missing icon', () => {
    render(<IconTypo text="No Icon" iconUrl={''} />); 
    const textElement = screen.getByText('No Icon');
    expect(textElement).toBeInTheDocument();
  });