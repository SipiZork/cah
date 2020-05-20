import styled, {css} from 'styled-components'

const leftCard = css`
  background-color: black;
  transform: rotate(-30deg);
  left: 30px;
  border: 1px solid white;
`

const rightCard = css`
  background-color: white;
  transform: rotate(30deg);
  left: 80px;
  border: 1px solid black;
`

const bodyStroke = css`
  d: path("M7 49 Q 60 -29 110 49 ");
  stroke: #fff;
  stroke-width: 6;
`

const bodyBorder = css`
  d: path("M5 50 Q 60 -30 112 50 ");
  stroke: #000;
  stroke-width: 10;
`

const titleColor = css`
  color: white;
  text-shadow: -1px 1px 0 #000, 
                1px 1px 0 #000, 
                1px -1px 0 #000,
                -1px -1px 0 #000;
`

const titleInvertedColor = css`
  color: black;
  text-shadow: -1px 1px 0 #fff, 
              1px 1px 0 #fff, 
              1px -1px 0 #fff,
            -1px -1px 0 #fff;
`

const getCard = props => {
  if (props.left) {
    return leftCard
  } else if (props.right) {
    return rightCard
  }
}

const getBody = props => {
  if (props.border) {
    return bodyBorder
  } else if (props.line) {
    return bodyStroke
  }
}

const getTitleColor = props => {
  if (props.inverted) {
    return titleInvertedColor
  }
  return titleColor
}

export const HeaderContainer = styled.div`
  width: 100vw;
  min-width: 1100px;
  max-width: 100%;
  height: 120px;
  background-color: rgb(100, 100, 100);
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`

export const LogoContainer = styled.div`
  width: 550px;
  height: 120px;
  position: relative;
  margin-right: 20px;
`

export const LogoCard = styled.div`
  width: 70px;
  height: 110px;
  position: absolute;
  top: 20px;
  ${getCard}
`

export const LogoText = styled.p`
  display: block;
  position: absolute;
  bottom: 5px;
  font-size: 50px;
  left: 200px; 
  color: rgb(255, 255, 255);
  text-shadow: -1px 1px 0 #000, 
                1px 1px 0 #000, 
                1px -1px 0 #000,
                -1px -1px 0 #000;
`

export const LogoHumanContainer = styled.div`
  position: relative;
  width: 120px;
  height: 100%;
  left: 280px;
`

export const LogoHumanHead = styled.div`
  border-radius: 50%;
  background-color: black;
  border: white;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 10px;
  border: 1px solid white;
`

export const LogoHumanBodyContainer = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0px;

  svg {
    width: 100%;
    height: 100%;
    fill: none;
  }
`

export const LogoHumanBody = styled.path`
  ${getBody}
`

export const LogoTitleContainer = styled.div`
  width: 100%;
`

export const LogoTitleText = styled.h1`
  font-size: 3.8rem;
  font-weight: 400;
  font-family: Raleway, sans-serif;
  letter-spacing: 1px;
  display: inline-block;
  margin-right: 15px;
  ${getTitleColor}
`