import React from 'react'

import {
  HeaderContainer, LogoContainer, LogoCard, LogoText, LogoHumanContainer,
  LogoHumanHead, LogoHumanBodyContainer, LogoHumanBody, LogoTitleContainer, LogoTitleText
} from './header.styles'

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoCard left />
        <LogoCard right />
        <LogoText>vs</LogoText>
        <LogoHumanContainer left>
          <LogoHumanHead />
          <LogoHumanBodyContainer>
            <svg>
            <LogoHumanBody border></LogoHumanBody> 
            <LogoHumanBody line></LogoHumanBody>  
            </svg>
          </LogoHumanBodyContainer>
        </LogoHumanContainer>
        <LogoHumanContainer right>
          <LogoHumanHead />
          <LogoHumanBodyContainer>
            <svg>
            <LogoHumanBody border></LogoHumanBody> 
            <LogoHumanBody line></LogoHumanBody>  
            </svg>
          </LogoHumanBodyContainer>
        </LogoHumanContainer>
        <LogoHumanContainer>
          <LogoHumanHead inverted />
          <LogoHumanBodyContainer>
            <svg>
            <LogoHumanBody border inverted></LogoHumanBody> 
            <LogoHumanBody line inverted></LogoHumanBody>  
            </svg>
          </LogoHumanBodyContainer>
        </LogoHumanContainer>
      </LogoContainer>
      <LogoTitleContainer>
        <LogoTitleText>Cards</LogoTitleText>
        <LogoTitleText inverted>Against</LogoTitleText>
        <LogoTitleText>Humanity</LogoTitleText>
      </LogoTitleContainer>
    </HeaderContainer>
  )
}

export default Header