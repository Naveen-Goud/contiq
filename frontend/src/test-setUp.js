import React from 'react'; // Add this line

import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './contexts/User/UserContext';

const wrapper = ({ children }) => {
  return <BrowserRouter><UserProvider>{children}</UserProvider></BrowserRouter>;
};

const customRender = (ui, options) => render(ui, { wrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
