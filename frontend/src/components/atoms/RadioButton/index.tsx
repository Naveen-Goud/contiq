import React from "react";
import { Radio, RadioProps } from "@mui/material";

interface RadioButtonProps extends RadioProps { 
  customColor?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const RadioButton = (props: RadioButtonProps) => {
  const {  customColor, onChange, checked, ...otherProps } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event); 
    }
  };

  return (
    <Radio 
      checked={checked}
      onChange={handleChange}
      style={{ color: customColor }}
      {...otherProps}
    />
  );
};

export default RadioButton;
