import styled from 'styled-components'

import CustomButton from '../custom-button/custom-button.components'

export const SignInContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(100,100,100);
  margin-right: 50px;
`

export const SingInTitle = styled.h2`
  font-family: Raleway, sans-serif;
  font-weight: 400;
  font-size: 2rem;
  margin-top: 10px;
  color: white;
`

export const SignInButton = styled(CustomButton)`
  margin: 0 auto;
  width: 50%;
  margin-bottom: 20px;
`

export const SignInForm = styled.form`
  width: 85%;
`