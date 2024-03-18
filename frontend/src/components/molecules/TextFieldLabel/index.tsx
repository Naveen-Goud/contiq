import { Box, styled } from '@mui/material';
import React from 'react';
import Typography from '../../atoms/Typography';
import { TextField } from '../../atoms/TextField/index.stories';
import theme from '../../../theme';
import { TextFieldProps } from '../../atoms/TextField';

interface TextFieldLabelProps extends TextFieldProps{
    labelText: React.ReactNode;
    placeholder:string;
}
const Container = styled(Box)({
    display: 'flex',
    width: "26.06vw",
    height: '9.8vh',
    flexDirection: 'column',
    gap: theme.spacing(1)
});
const TextFieldLabel = (props: TextFieldLabelProps) => {
    return (
        <Container>
            <Typography variant={"body1"}  color={theme.palette.textColor.black}>{props.labelText}</Typography>
            <TextField {...props} placeholder={props.placeholder} onChange={props.onChange} />
        </Container>
    );
};

export default TextFieldLabel;

