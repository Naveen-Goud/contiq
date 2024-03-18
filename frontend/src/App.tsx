import React from 'react'

import { ThemeProvider } from '@mui/material'
import theme from './theme'
import { SignUpPage } from './pages/SignUp'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import FilesPage from './pages/FilePage';
 
import ResetPasswordPage from './pages/ResetPasswordPage';
import "./App.css"
import { UserProvider } from './contexts/User/UserContext';

const App = () => {
  return (
   <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<SignUpPage/>}/>
            <Route path="/signIn" element={<SignInPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/filesPage" element={<FilesPage/>}/>
            <Route path="resetPasswordPage" element={<ResetPasswordPage/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
   </ThemeProvider>
  )
}

export default App