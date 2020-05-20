import React from 'react'

import { SignInSignUpContainer } from './sign-in-sign-up.styles'
import SignIn from '../sign-in/sign-in.component'
import SignUp from '../sign-up/sign-up.component'

const SignInSignUp = () => (
  <SignInSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInSignUpContainer>
)

export default SignInSignUp