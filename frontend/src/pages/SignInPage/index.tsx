import React from 'react'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { SignIn } from '../../components/organisms/SignIn'
import profile from '../../../public/assets/icons/profile.png';

const SignInPage = () => {
  return (
    <LoginTemplate image={profile}>
      <SignIn/>
    </LoginTemplate>
  )
}

export default SignInPage