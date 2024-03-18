import React from 'react';
import { TextField, styled, TextFieldVariants } from '@mui/material';
import theme from '../../../theme/index';

export interface TextFieldProps {
    variant?: TextFieldVariants;
    placeholder?: string;
    placeholderColor?: string;
    backgroundColor?: string;
    textColor?: string;
    paddingLeftForText?: string;
    border?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number | (string | number)[];
    error?: boolean;
    helperText?: string;
    type?: string;
    name?: string;
    startAdornment?: React.ReactNode;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    FormHelperTextProps?:object;
}

export interface StyledTextFieldProps {
    backgroundColor?: string;
    placeholderColor?: string;
    paddingLeftForText?: string;
    textColor?: string;
    border?: string;
}

const CustomTextField = styled(TextField)((props: StyledTextFieldProps) => ({
    backgroundColor: props.backgroundColor,
    alignItems: 'center',
    borderRadius: '4px',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    gap: '0px',
    display: 'flex',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        padding: 0
    },
    '&& .MuiOutlinedInput-root  ': {
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        fieldset: {
            border: props.border
                ? props.border
                : `1px solid ${theme.palette.structural.border}`
        },
        '&:Mui-focused, &.fieldset': {
            border: `1px solid ${theme.palette.grey[500]}`
        }
    },
    '&& .MuiInputBase-root input': {
        padding: `9px 0px 9px ${props.paddingLeftForText} `,
        color: props.textColor
            ? props.textColor
            : theme.palette.textColor.black,
        '&::placeholder': {
            color: props.placeholderColor
        }
    },
    '&& .MuiFormHelperText-root': {
        display: 'flex',
        alignSelf: 'flex-start'
    }
}));

const TextFieldComponent = (props: TextFieldProps) => {
    return (
        <CustomTextField
            {...props}
            data-testid="text-field"
            InputProps={{ startAdornment: props.startAdornment }}
        />
    );
};

export default TextFieldComponent;
