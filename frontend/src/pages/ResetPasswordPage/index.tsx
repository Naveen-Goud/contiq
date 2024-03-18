import React, { useState } from "react";
import ResetPassword from "../../components/organisms/ResetPassword";
import LoginTemplate from "../../components/templates/LoginTemplate";
import CreatePassword from "../../components/organisms/CreatePassword";
import PasswordResetSuccess from "../../components/molecules/PasswordResetSuccess";
import { useNavigate } from "react-router-dom";
import profile from '../../../public/assets/icons/profile1.png';

const ResetPasswordPage = () => {
    const [submittedEmail, setSubmittedEmail] = useState<string>('');
    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [isPasswordChanged, setPasswordChanged] = useState(false);

    const handleResetRequest = (email: string) => {
      setSubmittedEmail(email);
      setShowCreatePassword(true);
    };

    const handlePasswordChange = (isPasswordChanged: boolean) => {
      setPasswordChanged(isPasswordChanged);
      setShowCreatePassword(false);
    }
    const navigate=useNavigate()

  return (
    <LoginTemplate image={profile}>
        {isPasswordChanged ? (
          <PasswordResetSuccess onClick={()=>navigate("/signIn")} />
        ) : showCreatePassword ? (
          <CreatePassword emailId={submittedEmail} onPasswordChange={handlePasswordChange} />
        ) : (
          <ResetPassword onSubmitRequest={handleResetRequest} />
        )}
    </LoginTemplate>    
  )
}

export default ResetPasswordPage;
