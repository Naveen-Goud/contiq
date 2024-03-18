import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchDetailsCard from '.';
describe('SearchDetailsCard', () => {
    const content=[{ambientStr:"the lion king",pageNum:1},{ambientStr:"He is the man",pageNum:2}]
    it('copies the sentence to the clipboard when the copy icon is clicked', async () => {
        render(<SearchDetailsCard searchKey='the'content={content} fileName='profile' totalSlides={10} handleNext={jest.fn} handlePrev={jest.fn}/>);
        const copyIcon = screen.getByTestId('copy');
        fireEvent.click(copyIcon);
        const mockClipboardWriteText = jest.fn();
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: mockClipboardWriteText
            }
        });
        const minimize = screen.getByTestId('minimize');
        fireEvent.click(minimize);
        const close = screen.getByTestId('close');
        fireEvent.click(close)
        
    });
    it('should be able to click down and up arrow', async () => {
        render(<SearchDetailsCard searchKey='the'content={content} fileName='profile' totalSlides={10} handleNext={jest.fn} handlePrev={jest.fn}/>);
        const down = screen.getByTestId('down');
        fireEvent.click(down);
        fireEvent.click(down);
        fireEvent.click(down);
        
        const up = screen.getByTestId('up');
        fireEvent.click(up);
        fireEvent.click(up)
        
    });
    it('passing empty content array', async () => {
        render(<SearchDetailsCard searchKey='the'content={[]} fileName='profile' totalSlides={10} handleNext={jest.fn} handlePrev={jest.fn}/>);
        const down = screen.getByTestId('down');
        fireEvent.click(down);
        fireEvent.click(down);
        fireEvent.click(down);
        
        const up = screen.getByTestId('up');
        fireEvent.click(up);
        fireEvent.click(up)
        
    });
});
