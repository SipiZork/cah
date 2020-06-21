import React from 'react'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import { SignUpContainer, SingUpTitle, SignUpButton, SignUpForm } from './sign-up.styles'


class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    const { setError } = this.props
    event.preventDefault()
    console.log("Hello");

    const { username, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      setError('Regisztrációs hiba', 'A két jelszó nem egyezik meg')
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)

      await createUserProfileDocument(user, { username })
      window.location.reload(false)

      this.setState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      setError('Regisztrációs hiba', error.message)
    }
  }

  render() {
    return (
      <SignUpContainer>
        <SingUpTitle>Új vagyok</SingUpTitle>
        <SignUpForm onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label="Felhasználónév"
            name="username"
            value={this.state.username}
            handleChange={this.handleChange}
            required
          />
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
          <FormInput
            type="password"
            label="Jelszó ismét"
            name="confirmPassword"
            value={this.state.confirmPassword}
            handleChange={this.handleChange}
            required
          />
          <SignUpButton type="submit" inverted>Regisztráció</SignUpButton>
        </SignUpForm>
      </SignUpContainer>
    )
  }
}

export default SignUp