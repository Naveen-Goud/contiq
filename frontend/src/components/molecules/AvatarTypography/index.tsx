import { Box } from '@mui/material';
import React from 'react';
import Avatar from '../../atoms/Avatar';
import Typography from '../../atoms/Typography';
import styled from '@emotion/styled';
import theme from '../../../theme';

export interface AvatarTypographyProps {
    src?: string;
    onClick?: () => void;
    name?: string;
    text?: string;
    date?: React.ReactNode;
}

const Wrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    '& .details': {
        display: 'flex',
        flexDirection: 'column'
    },
    '& .userName': {
        display: 'flex',
        flexDirection: 'row',
        gap: '4px'
    },
    '& .name': {
        color: theme.palette.textColor.black
    },
    '& .text': {
        color: theme.palette.textColor.lowEmphasis
    },
    '& .date': {
        color: theme.palette.textColor.mediumEmphasis
    }
});

export const AvatarTypography = ({
    src,
    onClick,
    name,
    text,
    date
}: AvatarTypographyProps) => {
    return (
        <Wrapper>
            <Avatar src={src} onClick={onClick} />
            <Box className="details">
                <Box className="userName">
                    <Typography className="name" variant={'body1'}>
                        {name}
                    </Typography>
                    <Typography className="text" variant={'body2'}>
                        {text}
                    </Typography>
                </Box>
                <Typography className="date" variant={'caption1'}>
                    {date}
                </Typography>
            </Box>
        </Wrapper>
    );
};
