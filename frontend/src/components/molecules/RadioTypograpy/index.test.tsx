import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'; 
import RadioTypo from './'; 
import '@testing-library/jest-dom'
test(' should render with default text and styles', () => {
  render(<RadioTypo  />); 
  const radioElement = screen.getByTestId('disabled-radio');
  expect(radioElement).toBeInTheDocument(); 
    const textElement = screen.getAllByText( "Sync entire drive");
    textElement.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  expect(radioElement).toHaveStyle(`backgroundColor:theme.palette.structural.white}`);
});   

test('should render with checked radio button and white background', () => {
  render(<RadioTypo   />); 
  const checkedRadioElement = screen.getByTestId('disabled-radio');
  expect(checkedRadioElement).toBeInTheDocument(); 
 
});
test('should render unchecked radio button correctly', () => {
  const { getByTestId } = render(<RadioTypo />);
  const uncheckedRadio = getByTestId('unchecked-radio'); 
  expect(uncheckedRadio).toBeInTheDocument(); 
});
it('renders the component with default unchecked radio and text', () => {
  const { getByTestId, getByText } = render(<RadioTypo />); 
  const containerElement = getByTestId('container');
  expect(containerElement).toBeInTheDocument(); 
  const uncheckedRadioElement = getByTestId('unchecked-radio');
  expect(uncheckedRadioElement).toBeInTheDocument();
  expect(uncheckedRadioElement).not.toBeChecked(); 
  const defaultTextElement = getByText('Sync entire drive');
  expect(defaultTextElement).toBeInTheDocument();
});
 
it('invokes a custom function when radio button is clicked', () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(<RadioTypo  />);
  const uncheckedRadioElement = getByTestId('unchecked-radio'); 
  fireEvent.click(uncheckedRadioElement); 
  expect(handleClick).toHaveBeenCalledTimes(0);
});