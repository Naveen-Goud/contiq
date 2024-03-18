import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomTabs from '.'; 

describe('CustomTabs', () => {
  const tabs = [
    {
      label: 'Tab 1',
      content: 'Content for Tab 1',
      disabled: false,
    },
    {
      label: 'Tab 2',
      content: 'Content for Tab 2',
      disabled: false,
    },
  ];

  it('renders tabs with correct labels', () => {
    const { getByText } = render(<CustomTabs tabs={tabs} setActiveTab={()=>{"1"}} />);
    tabs.forEach((tab) => {
      const tabLabel = getByText(tab.label);
      expect(tabLabel).toBeInTheDocument();
    });
  });

  it('handles tab selection', () => {
    const { getByText } = render(<CustomTabs tabs={tabs} setActiveTab={()=>{"1"}} />);
    const tab1 = getByText('Tab 1');
    const tab2 = getByText('Tab 2');
    fireEvent.click(tab2);
  });
});
