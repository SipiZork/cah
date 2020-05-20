import styled, { css } from 'styled-components'

const buttonStyles = css`
  background-color: #000;
  color: #fff;
  border: none;
  
  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }
`

const invertedButtonStyles = css`
  background-color: #fff;
  color: #000;
  border: 1px solid #000;

  &:hover {
    background-color: #000;
    color: #fff;
    border: none;
  }
`

const googleSignInStyles = css`
  background: #4285f4;
  color: white;
  border: none;

  &:hover {
    background: #357ae8;
    border: none;
  }
`

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles
  } else if (props.inverted) {
    return invertedButtonStyles
  } else {
    return buttonStyles
  }
}

export const CustomButtonContainer = styled.button`
  min-width: 145px;
  width: auto;
  height: 50px;
  letter-spacing: .5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`