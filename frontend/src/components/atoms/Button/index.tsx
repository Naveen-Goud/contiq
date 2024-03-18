import React from "react";
import { Button, ButtonProps, SxProps } from '@mui/material';
import styled from "@emotion/styled";

interface CustomProps extends ButtonProps {
  onClick?: () => void;
  variant: 'outlined' | 'contained';
  disabled?: boolean;
  children?: React.ReactNode;
  sx?: SxProps;
  icon?: string;  

}

const StyledImg = styled.img`
  margin-right: 8px;
    
`;

const CustomButton = (props: CustomProps) => {
  const { icon, children, ...restProps } = props;

  return (
    <Button {...restProps} style={{boxShadow:'none'}}>
      {icon && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledImg src={icon} alt="Icon" />
          {children}
        </div>
      )}
      {!icon && children}
    </Button>
  );
}

export default CustomButton;
