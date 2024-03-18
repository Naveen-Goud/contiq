import React, { useEffect, useState } from 'react';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
import TextFieldLabel from '../../molecules/TextFieldLabel';
import {
  create_password,
  enter_password,
  password_placeholder,
  password_regex,
  password_validation,
  passwords_mismatch_error,
  server_error,
} from '../../../utils/constants';
import { Body, Container, Header, SendButton } from '../ResetPassword';
import { getUserByEmailId, updatePassword } from '../../../services';
import { User } from '../../../modal/Interfaces';

interface CreatePasswordProps {
  onPasswordChange?: (isPasswordChanged: boolean) => void;
  emailId?: string;
}

const CreatePassword:React.FC<CreatePasswordProps> = ({
  emailId,
  onPasswordChange
}) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'newPwd') {
      setNewPassword(value);
      if (!password_regex.test(value)) {
        setPasswordError(password_validation);
      } else {
        setPasswordError(null);
      }
      
    } else if (name === 'confirmPwd') {
      setConfirmPassword(value);

      if (newPassword !== value) {
        setPasswordError(passwords_mismatch_error);
      } else {
        setPasswordError(null);
      }
    }
    if(value==""){
      setPasswordError(null)
    }
    
  };

  const handleResetPassword = () => {

    if(!isFormValid || !emailId){
      return;
    }

    getUserByEmailId(`${emailId}`)
    ?.then((response)=>{
        const userData: User = response?.data
        userData.password = newPassword;
        
        if (userData) {         
            updatePassword(userData)
            .then(() => {
              if(onPasswordChange){
                onPasswordChange(isFormValid);
              }
            })
            .catch((error) => {
              setPasswordError(server_error);
            });
        } 
      })
      .catch((error) => {
        setPasswordError(server_error);
      });
  }

  useEffect(()=>{
    setIsFormValid(!passwordError && newPassword !== '' && confirmPassword !== '' && newPassword===confirmPassword);
  },[newPassword,confirmPassword])
  
  return (
    <Container>
      <Header >
        <Typography variant="header2" color={theme.palette.textColor.black}>
          {create_password}
        </Typography>
        <Typography
          variant="overline"
          color={theme.palette.textColor.mediumEmphasis}
          sx={{ textTransform: 'none' }}
        >
          {enter_password}
        </Typography>
      </Header>
      <Body >
        <TextFieldLabel
          name="newPwd"
          labelText={'New password'}
          placeholder={password_placeholder}
          onChange={handleChange}
          value={newPassword}
          type="password"
        />
        <TextFieldLabel
          name="confirmPwd"
          labelText={'Confirm new password'}
          placeholder={password_placeholder}
          onChange={handleChange}
          value={confirmPassword}
          type="password"
        />
        {passwordError && (
          <Typography variant="caption" color={theme.palette.error.main}>
            {passwordError}
          </Typography>
        )}
      </Body>
      <SendButton
        variant={'contained'}
        disabled={!isFormValid}
        onClick={handleResetPassword}
      >
        <Typography variant="body1" color={theme.palette.structural.white}>
          Reset Password
        </Typography>
      </SendButton>
    </Container>
  );
};

export default CreatePassword;
