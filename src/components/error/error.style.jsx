import styled from 'styled-components'

import * as basics from '../../css/variables'
import CustomButton from '../custom-button/custom-button.components'

export const ErrorContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
`

export const ErrorMessageContainer = styled.div`
  width: 50%;
  background-color: ${basics.mainColor};
  color: white;
`

export const ErrorTitle = styled.h1`
  width: 100%;
  font-size: 1.6rem;
  line-height: 1.6rem;
  background-color: rgba(255,0,0,.6);
  padding: 10px;
`

export const ErrorMessageText = styled.p`
  width: 100%;
  padding: 20px;
  font-size: 1rem;
  line-height: 1rem;
  color: black;
`

export const ErrorOutButton = styled(CustomButton)`
  margin: 0 auto;
  margin-bottom: 10px;
`