import styled from '@emotion/styled';
import React, { useState } from 'react';
import TextFieldLabel from '../../molecules/TextFieldLabel';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import CustomButton from '../../atoms/Button';
import Google from '../../../../public/assets/icons/google.svg';
import { Box, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import {
    PASSWORD_LOWER_LETTER,
    PASSWORD_LOWER_REGEX,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REQ_ERROR,
    PASSWORD_SPECIAL_CHARACTER,
    PASSWORD_SPECIAL_REGEX,
    PASSWORD_UPPER_LETTE,
    PASSWORD_UPPER_REGEX,
    EMAIL_REGEX,
    EMAIL_REQ_ERROR,
    EMAIL_VALID,
    SIGN_IN,
    REMEMBER_ME,
    FORGOT_PASSWORD,
    OR,
    GOOGLE,
    NO_ACCOUNT,
    SIGN_UP,
    password
} from '../../../utils/constants';
import CustomCheckbox from '../../atoms/Checkbox';
import { getToken, getUserByEmailId, postMyData } from '../../../services';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../../contexts/User/UserContext';
import { User } from '../../../modal/Interfaces';

const Component = styled(Box)({
    '& .head': {
        color: theme.palette.textColor.black,
        marginBottom: theme.spacing(8)
    },
    '& .textFields': {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(5),
        marginBottom:theme.spacing(5),
    },

    '& .button': {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary[500],
        textTransform: 'none',
        width: '26.06vw',
        height: '6.25vh',
        ...theme.typography.body1,
        ':hover': {
            backgroundColor: theme.palette.primary[500]
        },
        ':disabled': {
            color: theme.palette.structural.white,
            backgroundColor: theme.palette.primary[100]
        }
    },
    '& .orDivs': {
        alignItems: 'center',
        display: 'flex',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7),
        width: '26.06vw',
        '& hr': {},
        '& :nth-child(3)': {
            flexGrow: 1
        },
        '& :nth-child(1)': {
            flexGrow: 1
        }
    },
    '& .lineSecond': {
        height: theme.spacing(0),
        borderBottom: `1px solid ${theme.palette.structural.border}`,
        marginLeft: theme.spacing(5)
    },
    '& .lineFirst': {
        height: theme.spacing(0),
        borderBottom: `1px solid ${theme.palette.structural.border}`,
        marginRight: theme.spacing(5)
    },

    '& .orMsg': {
        color: theme.palette.textColor.mediumEmphasis
    },
    '& .googleButton': {
        ...theme.typography.body1,
        boxShadow: 'none',
        backgroundColor: theme.palette.structural.structural,
        color: theme.palette.grey[500],
        textTransform: 'none',
        width: '26.06vw',
        height: '6.25vh',
        marginBottom: theme.spacing(7),
        ':hover': {
            backgroundColor: theme.palette.structural.structural
        }
    },
    '& .bottomText': {
        display: 'flex',
        flexDirection: 'row',
        color: theme.palette.textColor.mediumEmphasis,
        gap: theme.spacing(1),
        marginLeft: '7.5vw'
    },
    '& .link': {
        ...theme.typography.caption1,
        cursor: 'pointer',
        color: theme.palette.primary[500]
    },
    '& .links': {
        ...theme.typography.caption1,
        cursor: 'pointer',
        color: theme.palette.primary[500],
        paddingTop: theme.spacing(1)
    },
    '& .middleDiv': {
        display: 'flex',
        flexDirection: 'row',
        gap: '15vw',
        marginBottom: theme.spacing(5),
        marginLeft: theme.spacing(2.5)
    },
    '& .checkBox': {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(0)
    },
    '& .rememberText': {
        color: theme.palette.textColor.lowEmphasis,
        paddingTop: theme.spacing(1)
    },
    '& .MuiFormControlLabel-root': {
        marginRight: 0
    },
    '.checkBox': {
        marginRight: 0,
        '&.MuiCheckbox-root': {
            margin: 0,
            padding: 0,
            borderRadius: 1,
            color: theme.palette.grey[100],
            '&.Mui-checked': {
                color: theme.palette.primary[500]
            }
        }
    }
});
export const SignIn = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const [validationError,setValidationError]=useState<string>("");
    const [errorMsg, setErrorMsg] = useState({
        emailError: '',
        passwordError: ''
    });
 
   
    const navigate=useNavigate();
 
    const { loginWithRedirect } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    const { setUser } = useUserContext();

 
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

        if (!PASSWORD_SPECIAL_REGEX.test(value)) {
            return PASSWORD_SPECIAL_CHARACTER;
        }
        if (!PASSWORD_UPPER_REGEX.test(value)) {
            return PASSWORD_UPPER_LETTE;
        }
        if (!PASSWORD_LOWER_REGEX.test(value)) {
            return PASSWORD_LOWER_LETTER;
        }
        return '';
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputs((prev) => ({
            ...prev,
            email: value
        }));
        setErrorMsg((prev) => ({
            ...prev,
            emailError: validateEmail(value)
        }));
    };
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setInputs((prev) => ({
            ...prev,
            password: value
        }));
        setErrorMsg((prev) => ({
            ...prev,
            passwordError: validatePassword(value)
        }));
    };

    const handleUserContext = (userData: User) => {
        setUser(userData);
    }

    const handleSignUp = () => {

        getToken({ ... inputs })
        ?.then((res) => {
          localStorage.setItem("token", res.token);
          setValidationError("")
          getUserByEmailId(inputs.email)
                ?.then((userRes) => {
                    const userDetails = userRes.data;
                    handleUserContext(userDetails);
                    
                })
          navigate("/home");
        })
        .catch(() => {
            setValidationError("invalid user credentials")
        });
    };

    const loginWithGoogle=async ()=>{
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
            inputs.email !== '' &&
            inputs.password !== '' &&
            errorMsg.emailError == '' &&
            errorMsg.passwordError == ''
        );
    };
    return (
        <Component>
            <Box className="head">
                <Typography variant={'header2'}>{SIGN_IN}</Typography>
            </Box>

            <Box className="textFields">
                <TextFieldLabel
                    labelText="Email ID"
                    placeholder="john@example.com"
                    name="email"
                    value={inputs.email}
                    onChange={handleEmailChange}
                    type="email"
                    error={Boolean(errorMsg.emailError)} 
                    helperText={errorMsg.emailError} 
                />
                <TextFieldLabel
                    labelText="Password"
                    placeholder="Create a password"
                    name="password"
                    value={inputs.password}
                    onChange={handlePasswordChange}
                    type="password"
                    error={Boolean(errorMsg.passwordError)} 
                    helperText={errorMsg.passwordError} 
                    FormHelperTextProps={{ 
                        style: {
                         paddingLeft:'10px',
                        }
                    }}
                />
            </Box>

            <Box className="middleDiv">
                <Box className="checkBox">
                    <CustomCheckbox className="checkBox" />
                    <Typography className="rememberText" variant={'caption1'}>
                        {REMEMBER_ME}
                    </Typography>
                </Box>
                <Link className="links" underline="none" onClick={()=> navigate("/resetPasswordPage")}>
                   {FORGOT_PASSWORD}
                </Link>
            </Box>
            {validationError && <Typography color='red' variant='body1' sx={{padding:"5px"}}>{validationError}</Typography>}
            <Box>
                <CustomButton
                    className="button"
                    variant="contained"
                    onClick={handleSignUp}
                    disabled={handleDisable()}
                >
                   {SIGN_IN}
                </CustomButton>
            </Box>

            <Box className="orDivs">
                <Box className="lineFirst" />

                <Typography className="orMsg" variant={'caption1'}>
                    {OR}
                </Typography>

                <Box className="lineSecond" />
            </Box>

            <CustomButton
                className="googleButton"
                variant="contained"
                icon={Google}
                onClick={loginWithGoogle}
            >
                {GOOGLE}
            </CustomButton>

            <Box className="bottomText">
                <Typography variant={'caption1'}>
                    {NO_ACCOUNT}
                </Typography>
                <Link className="link" underline="none" onClick={()=> navigate("/")}>
                    {SIGN_UP}
                </Link>
            </Box>
        </Component>
    );
};
