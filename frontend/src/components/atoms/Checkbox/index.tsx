import React from 'react';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

interface CustomCheckboxProps extends CheckboxProps {
  label?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, ...props }) => {
  return (
    <FormControlLabel
      control={<Checkbox {...props} />}
      label={label}
    />
  );
};

export default CustomCheckbox;