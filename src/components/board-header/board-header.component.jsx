import React from 'react'
import { LogoContainer, LogoHumanContainer, LogoHumanHead, LogoHumanBody, LogoHumanBodyContainer } from './board-header.styles'

class BoardHeader extends React.Component {
  render() {
    return (
      <LogoContainer>
        <LogoHumanContainer onClick={this.props.toggleMenu}>
          <LogoHumanHead />
          <LogoHumanBodyContainer>
            <svg>
              <LogoHumanBody border></LogoHumanBody>
              <LogoHumanBody></LogoHumanBody>
            </svg>
          </LogoHumanBodyContainer>
        </LogoHumanContainer>
      </LogoContainer>
    )
  }
}

export default BoardHeader