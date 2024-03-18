import React from "react";

import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import LoginSignupTemplate from ".";

describe('testing the template file',()=>{
    test("testing the left and right sides",()=>{
        render(<LoginSignupTemplate image={""}/>);
        const leftchild= screen.getByTestId('loginSignupTemplate');
    
        expect(leftchild).toBeInTheDocument();
    })
     
})
