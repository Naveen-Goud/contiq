import { render , screen } from "@testing-library/react";
import React from "react";
import { LoaderComponent } from ".";

describe("Loader atom",()=>{
    test("render the component",()=>{
        render(<LoaderComponent/>);
        const loader=screen.getAllByTestId("loader");
        expect(loader).toBeTruthy();
    })
})