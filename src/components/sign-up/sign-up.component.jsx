import React from 'react'

import FormInput from '../form-input/form-input.component'
import { SignUpContainer, SingUpTitle, SignUpButton, SignUpForm } from './sign-up.styles'

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    passwordAgain: ''
  }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {
    return (
      <SignUpContainer>
        <SingUpTitle>Új vagyok</SingUpTitle>
        <SignUpForm>
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
          <FormInput
            type="password"
            label="Jelszó"
            name="passwordAgain"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <SignUpButton inverted>Regisztráció</SignUpButton>
        </SignUpForm>
      </SignUpContainer>
    )
  }
}

export default SignUp