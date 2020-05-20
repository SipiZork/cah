import React from 'react'

import FormInput from '../form-input/form-input.component'
import { SignInContainer, SingInTitle, SignInButton, SignInForm } from './sign-in.styles'

class SignIn extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {
    return (
      <SignInContainer>
        <SingInTitle>Van már fiókom</SingInTitle>
        <SignInForm>
          <FormInput
            type="text"
            label="Felhasználónév"
            name="username"
            value={this.state.username}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            label="Jelszó"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <SignInButton inverted>Belépés</SignInButton>
        </SignInForm>
      </SignInContainer>
    )
  }
}

export default SignIn