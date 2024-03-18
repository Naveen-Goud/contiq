import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomCheckbox from '.';
import '@testing-library/jest-dom';

test('checkbox is present and unchecked by default', () => {
    render(<CustomCheckbox />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).not.toBeChecked();
  });
  
  test('checkbox is checked and disabled', () => {
    render(<CustomCheckbox checked disabled/>);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeChecked();
    expect(checkboxElement).toBeDisabled();
  });

test('calls the onChange function when checkbox is clicked', () => {
  const handleChange = jest.fn();
  render(<CustomCheckbox onChange={handleChange} />);
  const checkboxElement = screen.getByRole('checkbox');
  fireEvent.click(checkboxElement);
  expect(handleChange).toHaveBeenCalledTimes(1);
});