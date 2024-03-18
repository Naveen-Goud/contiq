import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioButton from "./";  
import '@testing-library/jest-dom' ;

describe("RadioButton", () => { 

  it("should call onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<RadioButton onChange={handleChange} />);

    const radioButton = screen.getByRole("radio");
    fireEvent.click(radioButton);

    expect(handleChange).toHaveBeenCalledTimes(1);
  }); 
  it("should handles selected value", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <RadioButton onChange={handleChange} />
    );

    const radioButton = container.querySelector(
      "input[type='radio']"
    ) as HTMLInputElement; 
    fireEvent.click(radioButton); 
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it("handles checked state", () => {
    render(<RadioButton checked />);
    const radioButton = screen.getByRole("radio");
    expect(radioButton).toBeChecked();
  });
});
