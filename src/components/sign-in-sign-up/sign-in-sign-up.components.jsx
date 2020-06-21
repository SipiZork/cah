import React from 'react'

import { SignInSignUpContainer } from './sign-in-sign-up.styles'
import SignIn from '../sign-in/sign-in.component'
import SignUp from '../sign-up/sign-up.component'

const SignInSignUp = ({ setError }) => (
  <SignInSignUpContainer>
    <SignIn setError={setError} />
    <SignUp setError={setError} />
  </SignInSignUpContainer>
)

export default SignInSignUp