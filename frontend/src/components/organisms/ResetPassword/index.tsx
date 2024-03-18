import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
import TextFieldLabel from '../../molecules/TextFieldLabel';
import CustomButton from '../../atoms/Button';
import {
    email_error,
    EMAIL_REGEX,
    reset_password,
    verification,
    records_not_found_error
} from '../../../utils/constants';
import { getUserByEmailId } from '../../../services';

interface ResetPasswordProps {
    onSubmitRequest?: (email: string) => void;
  }

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),
    width: '26.06vw'
});

export const Header = styled(Box)({
    width: '18vw',
    display: 'flex',
    gap: theme.spacing(1),
    flexDirection: 'column'
});

export const Body = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    width: '26.06vw'
});

export const SendButton = styled(CustomButton)({
    textTransform: 'none',
    width: '26.06vw',
    height: '6.25vh',
    ':disabled': {
        backgroundColor: theme.palette.primary[100],
        color: theme.palette.textColor.white
    },
    ':hover': {
        backgroundColor: theme.palette.primary[500]
    }
});
const ResetPassword:React.FC<ResetPasswordProps> = ({
    onSubmitRequest
}) => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        if (!EMAIL_REGEX.test(value)) {
            setEmailError(email_error);
        } else {
            setEmailError(null);
        }

        if (value == '') {
            setEmailError(null);
        }
    };
    const isFormValid = () => {
        return !emailError && email.trim() !== '';
    };

    const handleResetSubmit = () => {
        
        if (!isFormValid()) {
          return;
        }
        getUserByEmailId(`${email}`)
        ?.then((response)=>{
            const userData = response.data?.email;
            if (userData) {
                if(onSubmitRequest){
                    onSubmitRequest(userData);
                }
            } else {
                setEmailError(records_not_found_error);
            }
          })
          .catch((error) => {
            setEmailError(records_not_found_error);
          });
      };
      

    return (
        <Container>
            <Header>
                <Typography
                    variant="header2"
                    color={theme.palette.textColor.black}
                >
                    {reset_password}
                </Typography>
                <Typography
                    variant="overline2"
                    color={theme.palette.textColor.mediumEmphasis}
                    sx={{ textTransform: 'none' }}
                >
                    {verification}
                </Typography>
            </Header>
            <Body>
                <TextFieldLabel
                    name="email"
                    labelText={'Email'}
                    placeholder={'john@example.com'}
                    onChange={handleChange}
                    value={email}
                />
                {emailError && (
                    <Typography
                        variant="caption"
                        color={theme.palette.error.main}
                    >
                        {emailError}
                    </Typography>
                )}
            </Body>
            <SendButton variant={'contained'} disabled={!isFormValid()} onClick={handleResetSubmit} >
                <Typography
                    variant="body1"
                    color={theme.palette.structural.white}
                >
                    Send
                </Typography>
            </SendButton>
        </Container>
    );
};

export default ResetPassword;
