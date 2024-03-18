import styled from '@emotion/styled';
import { Box, Link } from '@mui/material';
import React, { useState } from 'react';
import Typography from '../../atoms/Typography';
import CustomButton from '../../atoms/Button';
import Google from '../../../../public/assets/icons/google.svg';
import TextFieldLabel from '../../molecules/TextFieldLabel';
import theme from '../../../theme';
import { useNavigate } from "react-router-dom";
import {
    EMAIL_REGEX,
    EMAIL_REQ_ERROR,
    EMAIL_VALID,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    NAME_REQ_ERROR,
    PASSWORD_LOWER_LETTER,
    PASSWORD_LOWER_REGEX,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REQ_ERROR,
    PASSWORD_SPECIAL_CHARACTER,
    PASSWORD_SPECIAL_REGEX,
    PASSWORD_UPPER_LETTE,
    PASSWORD_UPPER_REGEX,
    password
} from '../../../utils/constants';
import { getMyData, getUserByEmailId, postMyData } from '../../../services';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../../contexts/User/UserContext';
import { User } from '../../../modal/Interfaces';

const Wrapper = styled(Box)({
    '& .title': {
        marginBottom: '32px',
        color: theme.palette.textColor.black
    },
    '& .fields': {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '32px'
    },

    '& .button': {
        width: '26.06vw',
        height: '6.25vh',
        backgroundColor: theme.palette.primary[500],
        textTransform: 'none',
        ...theme.typography.body1,
        boxShadow: 'none',
        ':disabled': {
            backgroundColor: theme.palette.primary[100],
            color: theme.palette.structural.white
        },
        ':hover': {
            backgroundColor: theme.palette.primary[500]
        }
    },
    '& .orDiv': {
        display: 'flex',
        width: '26.06vw',
        alignItems: 'center',
        paddingTop: '28px',
        paddingBottom: '28px',
        '& :nth-child(1)': {
            flexGrow: 1
        },
        '& hr': {},
        '& :nth-child(3)': {
            flexGrow: 1
        }
    },
    '& .line1': {
        height: '0px',
        borderBottom: `1px solid ${theme.palette.structural.border}`,
        marginRight: '19px'
    },
    '& .line2': {
        height: '0px',
        borderBottom: `1px solid ${theme.palette.structural.border}`,
        marginLeft: '19px'
    },
    '& .orText': {
        color: theme.palette.textColor.mediumEmphasis
    },
    '& .googleButton': {
        width: '26.06vw',
        height: '6.25vh',
        backgroundColor: theme.palette.structural.structural,
        color: theme.palette.grey[500],
        textTransform: 'none',
        ...theme.typography.body1,
        boxShadow: 'none',
        marginBottom: '28px',
        ':hover': {
            backgroundColor: theme.palette.structural.structural
        }
    },
    '& .bottomText': {
        display: 'flex',
        flexDirection: 'row',
        color: theme.palette.textColor.mediumEmphasis,
        gap: '4px',
        marginLeft: '7.5vw'
    },
    '& .link': {
        cursor: 'pointer',
        color: theme.palette.primary[500],
        ...theme.typography.caption1
    },
    '& .message': {
        color: 'red'
    }
});
export const SignUp = () => {
    const [inputValues, setInputValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errorValues, setErrorValues] = useState({
        nameError: '',
        emailError: '',
        passwordError: ''
    });

    const navigate=useNavigate();
 
    const { loginWithRedirect } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    const { setUser } = useUserContext();
 
    const validateName = (value: string) => {
        if (value.trim() === '') {
            return NAME_REQ_ERROR;
        }
        if (value.length < 4) {
            return NAME_MIN_LENGTH;
        }
        if (value.length > 50) {
            return NAME_MAX_LENGTH;
        }
        return '';
    };
    const validateEmail = (email: string) => {
        if (email.trim() === '') {
            return EMAIL_REQ_ERROR;
        }
        const emailRegex = EMAIL_REGEX;
        if (!emailRegex.test(email)) {
            return EMAIL_VALID;
        }
        return '';
    };

    const validatePassword = (value: string) => {
        if (value.trim() === '') {
            return PASSWORD_REQ_ERROR;
        }
        if (value.length < 8) {
            return PASSWORD_MIN_LENGTH;
        }
        if (!PASSWORD_UPPER_REGEX.test(value)) {
            return PASSWORD_UPPER_LETTE;
        }
        if (!PASSWORD_LOWER_REGEX.test(value)) {
            return PASSWORD_LOWER_LETTER;
        }
        if (!PASSWORD_SPECIAL_REGEX.test(value)) {
            return PASSWORD_SPECIAL_CHARACTER;
        }
        return '';
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValues((prev) => ({
            ...prev,
            name: value
        }));
        setErrorValues((prev) => ({
            ...prev,
            nameError: validateName(value)
        }));
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValues((prev) => ({
            ...prev,
            email: value
        }));
        setErrorValues((prev) => ({
            ...prev,
            emailError: validateEmail(value)
        }));
    };
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setInputValues((prev) => ({
            ...prev,
            password: value
        }));
        setErrorValues((prev) => ({
            ...prev,
            passwordError: validatePassword(value)
        }));
    };

    const handleSignUp = () => {
        const { email } = inputValues;
    
        getMyData(`${email}`)
            .then((res) => {
                    setErrorValues((prev) => ({
                        ...prev,
                        emailError: 'This email already exists'
                    }));
                
            })
            .catch(()=>{
                postMyData({ ...inputValues })
                .then((res) => {
                    setInputValues({
                        name: '',
                        email: '',
                        password: ''
                    });
                    setErrorValues({
                        nameError: '',
                        emailError: '',
                        passwordError: ''
                    });
                })
                navigate("/signIn");
            })
    };

    const handleUserContext = (userData: User) => {
        setUser(userData);
    }
    
    const handleGoogleLogin=async ()=>{
        loginWithRedirect({
            appState: {
              returnTo: "/home"
            },
            authorizationParams: {
              connection: "google-oauth2"
            }
          });

          if(isAuthenticated){
            const userData={name:user?.name,email:user?.email,password:password}
            if(userData.email == null) return;
            await getUserByEmailId(userData.email)
                ?.then((res) => {
                    console.log("user not found: ", userData.email);
                })
                .catch(async () => {
                    await postMyData(userData);
                });
            
                // To store user details in user context
                await getUserByEmailId(userData.email)
                ?.then((res) => {
                    const userDetails={...res?.data}
                    handleUserContext(userDetails);          
                })
                .catch((error) => {
                    if (error.message !== 'Network Error') {
                        console.log('Error in user get:', error);
                    }
                });
        }
    }

    const handleDisable = () => {
        return !(
            inputValues.name !== '' &&
            inputValues.email !== '' &&
            inputValues.password !== '' &&
            errorValues.nameError == '' &&
            errorValues.emailError == '' &&
            errorValues.passwordError == ''
        );
    };
    return (
        <Wrapper>
            <Box className="title">
                <Typography variant={'header2'}>Sign Up</Typography>
            </Box>

            <Box className="fields">
                <TextFieldLabel
                    labelText="Name"
                    placeholder="John Sena"
                    name="name"
                    value={inputValues.name}
                    onChange={handleNameChange}
                    type="text"
                    error={Boolean(errorValues.nameError)}
                    helperText={errorValues.nameError}
                />
                <TextFieldLabel
                    labelText="Email Id"
                    placeholder="john@example.com"
                    name="email"
                    value={inputValues.email}
                    onChange={handleEmailChange}
                    type="email"
                    error={Boolean(errorValues.emailError)}
                    helperText={errorValues.emailError}
                />
                <TextFieldLabel
                    labelText="Password"
                    placeholder="Create a password"
                    name="password"
                    value={inputValues.password}
                    onChange={handlePasswordChange}
                    type="password"
                    error={Boolean(errorValues.passwordError)}
                    helperText={errorValues.passwordError}
                />
            </Box>
            <Box>
                <CustomButton
                    className="button"
                    variant="contained"
                    onClick={handleSignUp}
                    disabled={handleDisable()}
                >
                    Create account
                </CustomButton>
            </Box>

            <Box className="orDiv">
                <Box className="line1" />

                <Typography className="orText" variant={'caption1'}>
                    OR
                </Typography>

                <Box className="line2" />
            </Box>

            <CustomButton
                className="googleButton"
                variant="contained"
                icon={Google}
                onClick={handleGoogleLogin}
            >
                Continue with google
            </CustomButton>

            <Box className="bottomText">
                <Typography variant={'caption1'}>
                    Already have an account?
                </Typography>
                <Link className="link" underline="none" onClick={()=>{navigate("/signIn")}}>
                    Sign in
                </Link>
            </Box>
        </Wrapper>
    );
};
