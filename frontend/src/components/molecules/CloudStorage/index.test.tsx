import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CloudStorage from '.';

describe('CloudStorage Component', () => {
  test('renders title correctly', () => {
    render(<CloudStorage title="Custom Title" />);
    const titleElement = screen.getByText('Custom Title');
    expect(titleElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const icons = [
      { dataTestId: 'google-drive-icon', iconSrc: 'google-drive.svg', onClick: onClickMock }
    ];

    render(<CloudStorage icons={icons} />);
    const iconWrapper = screen.getByTestId('google-drive-icon'); 
    fireEvent.click(iconWrapper);
    expect(onClickMock).toHaveBeenCalled();
  });

});
