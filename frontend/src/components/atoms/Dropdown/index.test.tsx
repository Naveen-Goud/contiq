import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '.';

describe('Dropdown Component', () => {
    it('should render the Dropdown Atom', () => {
        render(
            <Dropdown
                listofItems={[
                    {
                        text: 'PPT'
                    },
                    {
                        text: 'PDF'
                    },
                    {
                        text: 'Image'
                    }
                ]}
                isFilterApplied={false}
                listTextColor="black"
                listTextVariant="body1"
                menuheaderText="File type"
                menuheaderVariant="caption1"
                menuBackgroundColor="white"
                menuWidth="150px"
                buttonContent="File type"
            />
        );
        const typo = screen.getAllByText('File type');
        expect(typo[0]).toBeInTheDocument();
        expect(typo[0]).toHaveTextContent('File type');
        fireEvent.click(typo[0]);
        const menuItem = screen.getAllByText('PDF');
        expect(menuItem[0]).toBeInTheDocument();
        fireEvent.click(menuItem[0]);
        expect(menuItem[0]).toHaveTextContent('PDF');
    });
    it('should render the Dropdown Atom when selected', () => {
        render(
            <Dropdown
                listofItems={[
                    {
                        text: 'PPT'
                    },
                    {
                        text: 'PDF'
                    },
                    {
                        text: 'Image'
                    }
                ]}
                isFilterApplied={false}
                listTextColor="black"
                listTextVariant="body1"
                menuheaderText="File type"
                menuheaderVariant="caption1"
                menuBackgroundColor="white"
                menuWidth="150px"
                buttonContent="File type"
            />
        );
        const typo = screen.getAllByText('File type');
        fireEvent.click(typo[0]);
        const menuItem = screen.getAllByText('PDF');
        expect(menuItem[0]).toBeInTheDocument();
        fireEvent.click(menuItem[0]);
        expect(menuItem[0]).toHaveTextContent('PDF');
        fireEvent.click(screen.getAllByText('PDF')[0]);
    });
});
