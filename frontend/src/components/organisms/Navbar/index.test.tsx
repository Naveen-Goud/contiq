import { screen, fireEvent } from "@testing-library/react";
import NavBar from ".";
import "@testing-library/jest-dom"
import React from "react";
import { render } from "../../../test-setUp";

describe("NavBar component", () => {
  it(" should render the component correctly", () => {
    render(<NavBar  />); 
    const homeIcon = screen.getByText("Home");
    expect(homeIcon).toBeInTheDocument();
  });

  it("should toggle  isSelected state on Home icon click", () => {
    render(<NavBar   />);
    const homeIcon = screen.getByText("Home"); 
    fireEvent.click(homeIcon);
    expect(homeIcon).toHaveStyle("background-color: ${`theme.palette.grey[300]`}"); 
    fireEvent.click(homeIcon);
    expect(homeIcon).toHaveStyle("background-color: ${`theme.palette.grey[300]`}");
  });

  it("should toggle fileSelected state on Files icon click", () => {
    render(<NavBar   />);
    const filesIcon = screen.getByText("Files");  
    fireEvent.click(filesIcon);
    expect(filesIcon).toHaveStyle("background-color:${`theme.palette.grey[300]`}"); 
    fireEvent.click(filesIcon);
    expect(filesIcon).toHaveStyle("background-color:${`theme.palette.grey[300]`}");
  });
  
   
});
