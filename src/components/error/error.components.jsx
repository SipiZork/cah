import React from 'react'

import CustomButton from '../custom-button/custom-button.components'

import { ErrorContainer, ErrorMessageContainer, ErrorTitle, ErrorMessageText, ErrorOutButton } from './error.style'

const ErrorMessage = ({ error, close }) => (
  <ErrorContainer>
    <ErrorMessageContainer>
      <ErrorTitle>{error.title}</ErrorTitle>
      <ErrorMessageText>{error.message}</ErrorMessageText>
      <ErrorOutButton onClick={close}>Kilépés</ErrorOutButton>
    </ErrorMessageContainer>
  </ErrorContainer>
)

export default ErrorMessage