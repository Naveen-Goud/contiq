import React from "react";
import CustomButton from "."; 
 
import { fireEvent, render, screen } from '@testing-library/react';
 
import "@testing-library/jest-dom"
describe("testing button",()=>{
    it("should render button with text",async ()=>{
        render(<CustomButton variant={"outlined"}>click me</CustomButton>)
        const buttonName=screen.findAllByText("click me");
        expect((await buttonName).length).toBeGreaterThan(0);
 
    });
    it("should render as disabled", () => {
        render( <CustomButton disabled variant={"outlined"}>Click Me</CustomButton> );
 
    
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeDisabled();
      }); 
      it("should call onClick when clicked", () => {
        const handleClick = jest.fn();
        render( <CustomButton onClick={handleClick} variant={"outlined"}>Click Me</CustomButton> );
    
        const buttonElement = screen.getByText("Click Me");
 
        fireEvent.click(buttonElement);
    
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

})