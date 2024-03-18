import { CircularProgress, styled } from '@mui/material';
import React from 'react';
import theme from '../../../theme';
interface SpinnerProps {
    color: 'primary' | 'secondary' | 'error' | 'success';
    size?: number;
    thickness?: number;
    variant: 'determinate' | 'indeterminate';
}
const StyledCircularProgress = styled(CircularProgress)`
  color: ${theme.palette.primary[400]} !important; 
`;
const Spinner = (props: SpinnerProps) => {
    return <StyledCircularProgress {...props} />;
};

export default Spinner;
