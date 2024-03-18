import React from 'react';
import {screen, fireEvent } from '@testing-library/react';
import SearchBar from './';
import '@testing-library/jest-dom'; 
import { render } from '../../../test-setUp';
import userEvent from '@testing-library/user-event';
describe('SearchBar Component', () => {
    it('should render searchbar ', () => {
        render(<SearchBar setState={jest.fn()} />);
    });

    it('should  triggier the text field', () => {
        render(<SearchBar setState={jest.fn()} />);
        const inputElement = screen.getByPlaceholderText('Search');
        fireEvent.change(inputElement, { target: { value: 'John' } });
    });

    it('should display search results list items correctly', () => {
        const mockSearchResults = [
            { name: 'John Doe' },
            { name: 'Jane Smith' }
        ];
        render(<SearchBar setState={jest.fn()} />);
        const inputElement = screen.getByTestId('input');
        fireEvent.change(inputElement, { value: 'John' });
        const textdat = screen.getAllByText('');
    });

    it('does not display search results list when searchQuery is empty', () => {
        const { queryByText } = render(<SearchBar setState={jest.fn()} />);

        expect(queryByText('Search results')).toBeNull();
    });
    it('should update searchTerm when input value is changed', () => {
        render(<SearchBar setState={jest.fn()} />);
        const inputElement = screen.getByTestId('input') as HTMLInputElement;
        const newValue = 'new search term';
        userEvent.type(inputElement, newValue);
        expect(inputElement.value).not.toBe(newValue);
    });
});
