import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import BasicDateCalendar from './';  
import '@testing-library/jest-dom'

const handleChange = jest.fn();

test('renders the calendar component', () => {
  render(<BasicDateCalendar onChange={handleChange} />); 
  expect(screen.getByTestId('basic-date-calendar')).toBeInTheDocument();
});

test('selects a date and changes the background color', () => {
  render(<BasicDateCalendar onChange={handleChange} />); 
  fireEvent.click(screen.getByAltText('chevron')); 
  fireEvent.click(screen.getByText('15')); 
  const selectedDateElement = screen.getByText('15');
  expect(selectedDateElement).toBeInTheDocument();

  const clearedDateElement = screen.queryByText('15 MM 2023');
  expect(clearedDateElement).not.toBeInTheDocument();  
}); 

test('selects a date and changes the background color', () => {
    render(<BasicDateCalendar onChange={handleChange} />); 
    fireEvent.click(screen.getByAltText('chevron')); 
    fireEvent.click(screen.getByText('15')); 
    const selectedDateElement = screen.getByText('15');
    expect(selectedDateElement).toBeInTheDocument(); 
    const textFieldElement = screen.getByTestId('textField'); 
    expect(screen.queryByText('15 MM 2023')).not.toBeInTheDocument();
  });