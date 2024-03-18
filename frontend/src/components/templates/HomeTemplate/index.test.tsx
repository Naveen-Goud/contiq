import React from 'react';
import { render } from '@testing-library/react';
import HomeTemplate from '.';
import '@testing-library/jest-dom'

describe('HomeTemplate', () => {
  it('renders the sidebar, header, content', () => {
    const { getByText } = render(
      <HomeTemplate
        sidebar={<div>My Sidebar</div>}
        header={<div>My Header</div>}
        content={<div>My Content</div>} 
      />
    );

    expect(getByText('My Sidebar')).toBeInTheDocument();
    expect(getByText('My Header')).toBeInTheDocument();
    expect(getByText('My Content')).toBeInTheDocument(); 
  });
  it('renders default content when sidebar, header, and content are not provided', () => {
    const { getByTestId } = render(<HomeTemplate sidebar={null} header={null} content={null} />);

    const defaultSidebar = getByTestId('default-sidebar');
    const defaultHeader = getByTestId('default-header');
    const defaultContent = getByTestId('default-content');

    expect(defaultSidebar).toBeInTheDocument();
    expect(defaultHeader).toBeInTheDocument();
    expect(defaultContent).toBeInTheDocument();
  });
});
