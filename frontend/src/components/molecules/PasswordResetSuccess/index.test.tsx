import React from 'react';
import {screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordResetSuccess from '.';
import { render } from '../../../test-setUp';

describe('PasswordResetSuccess', () => {
  test('renders default content', () => {
    render(<PasswordResetSuccess />);

    expect(screen.getByText('Password reset')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  test('renders with custom content', () => {
    const customTitle = 'Custom Title';
    const customSubText = 'Custom subText content.';
    const customButtonLabel = 'Custom Button';

    render(
      <PasswordResetSuccess
        title={customTitle}
        subText={customSubText}
        buttonLabel={customButtonLabel}
      />
    );

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubText)).toBeInTheDocument();
    expect(screen.getByText(customButtonLabel)).toBeInTheDocument();
  });

  test('calls onClick when the button is clicked', () => {
    const mockOnClick = jest.fn();
    render(<PasswordResetSuccess onClick={mockOnClick} />);
    
    const continueButton = screen.getByText('Continue');
    continueButton.click();

    expect(mockOnClick).toHaveBeenCalled();
  });
});
