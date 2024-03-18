import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextFieldLabel from '.'; 

describe('TextFieldLabel', () => {
  it('renders the label and placeholder', () => {
    const label = 'Test Label';
    const placeholder = 'Test Placeholder';
    render(<TextFieldLabel labelText={label} placeholder={placeholder} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    const label = 'Test Label';
    const placeholder = 'Test Placeholder';
    const handleChange = jest.fn();
    render(<TextFieldLabel labelText={label} placeholder={placeholder} onChange={handleChange} />);
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
