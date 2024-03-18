import { Box } from '@mui/material';
import React from 'react';
import CustomCheckbox from '../../atoms/Checkbox';
import CustomImage from '../../atoms/Image';
import styled from '@emotion/styled';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
export interface CheckBoxImageTypographyProps {
    content: string;
    onClick?:()=>void;
    checked?:boolean;
    src?:string;
}

const Wrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    width: '43.43vw',
    height: '74px',
    padding: '12px 24px 12px 40px',
    alignItems: 'center',
    borderRadius: '4px',
    marginBottom:'16px',
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[400],
    '.contentBox': {
        color: theme.palette.structural.white,
    },
    '& .MuiFormControlLabel-root':{
        marginRight:0
    },
    '.checkBox': {
       marginRight:0,
        border: `3px solid ${theme.palette.structural.white}`,
        '&.MuiCheckbox-root': {
            margin: 0,
            padding: 0,
            height: '24px',
            width: '24px',
            color: theme.palette.grey[400],
            borderRadius: 1,
            '&.Mui-checked': {
                color: theme.palette.grey[400],
                height: '24px',
                width: '24px',
                backgroundColor: theme.palette.structural.white
            },
         
        }
    }
});
export const CheckBoxImageTypography = ({
    content,
    onClick,
    checked,
    src
}: CheckBoxImageTypographyProps) => {
    return (
        <Wrapper>
            <CustomCheckbox className="checkBox" onClick={onClick} checked={checked}/>
            <Box>
                <CustomImage src={src} alt="files" />
            </Box>
            <Typography className="contentBox" variant={"body1"}>{content}</Typography>
        </Wrapper>
    );
};
