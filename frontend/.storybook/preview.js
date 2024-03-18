import { ThemeProvider } from '@emotion/react';  
import React from 'react';
import "../src/App.css"
import theme from '../src/theme/index'
export const parameters = {
 
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};
export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    )
];
 
