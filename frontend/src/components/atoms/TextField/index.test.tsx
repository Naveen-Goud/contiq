import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import TextFieldComponent from ".";

describe('textField atom', () => {
    test('render textField', () => {
        render(<TextFieldComponent />);
        const textField = screen.getAllByTestId("text-field");
        expect(textField).toBeTruthy();
    });

    test('render textField with border', () => {
        render(<TextFieldComponent border="10px" />);
        const textField = screen.getAllByTestId("text-field");
        expect(textField).toBeTruthy();
    });

    test('render textField with color', () => {
        render(<TextFieldComponent textColor="red" />);
        const textField = screen.getAllByTestId("text-field");
        expect(textField).toBeTruthy();
    });

    test('onChange event fires correctly', () => {
        const handleChange = jest.fn(); 
        render(<TextFieldComponent onChange={handleChange} />);
        
        const inputElement = screen.getByTestId("text-field")?.querySelector('input'); 
        if (inputElement) {
            fireEvent.change(inputElement, { target: { value: 'New Value' } }); 
            expect(handleChange).toHaveBeenCalledTimes(1);
        } else {
            throw new Error("Input element not found");
        }
    });
});
