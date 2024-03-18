import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 

import PresentationCard from '.';

describe('PresentationCard', () => {
  const mockProps = {
    imageUrl: 'mockImageUrl',
    pdfIcon: 'mockPdfIcon',
    pdfLabel: 'Mock PDF Label',
  };

  it('renders with default props', () => {
    render(<PresentationCard {...mockProps} primary={false} />);
    
    expect(screen.getByText('Mock PDF Label')).toBeInTheDocument();
    expect(screen.getByAltText('PDF Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Card Image')).toBeInTheDocument();
  });

  it('renders with primary props', () => {
    render(<PresentationCard {...mockProps} primary={true} />);
    
    expect(screen.getByText('Mock PDF Label')).toBeInTheDocument();
    expect(screen.getByAltText('PDF Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Card Image')).toBeInTheDocument();
  });

  it('renders without PDF label and icon when pdfLabel is not provided', () => {
    render(<PresentationCard imageUrl="mockImageUrl" />);
    
    expect(screen.queryByAltText('PDF Icon')).toBeNull();
    expect(screen.queryByText('Mock PDF Label')).toBeNull();
  });
  
});
