import React from 'react'

import FormInput from '../form-input/form-input.component'
import { SignInContainer, SingInTitle, SignInButton, SignInForm } from './sign-in.styles'
import { auth } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { email, password } = this.state
    const { setError } = this.props
    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '', password: '' })
    } catch (error) {
      setError('Bejelentkezési hiba', error.message)
    }
  }

  render() {
    return (
      <SignInContainer>
        <SingInTitle>Van már fiókom</SingInTitle>
        <SignInForm onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label="Email cím"
            name="email"
            value={this.state.email}
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
          <SignInButton type="submit" inverted>Belépés</SignInButton>
        </SignInForm>
      </SignInContainer>
    )
  }
}

export default SignIn