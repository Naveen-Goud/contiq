import { Box } from '@mui/material';
import React from 'react';
import Image from '../../../public/assets/icons/SignUp.png';
import { SignUp } from '../../components/organisms/SignUp';
import LoginSignupTemplate from '../../components/templates/LoginTemplate';

export const SignUpPage = () => {
    return (
        <Box>
            <LoginSignupTemplate image={Image}>
                {<SignUp />}
            </LoginSignupTemplate>
        </Box>
    );
};
