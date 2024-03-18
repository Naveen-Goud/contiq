import React from "react";
import { render,screen } from "@testing-library/react";
import CustomImage from "./";  
import '@testing-library/jest-dom' ;
import DisplayImage from "../../../../public/assets/icons/DisplayImage.svg";

describe("CustomImage", () => {
    it("should renders with src and alt attributes", () => {
      render(
          <CustomImage src={DisplayImage} alt="Test Image" />
        ); 
        const imageElement = screen.getByAltText("Test Image");
        expect(imageElement).toBeInTheDocument();  
      });
 
});
