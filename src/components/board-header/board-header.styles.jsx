import styled, {css} from 'styled-components'

const body = css`
  d: path("M5 50 Q 29 10 53 50");
  stroke: #000;
  stroke-width: 3;
`

const bodyBorder = css`
  d: path("M5 50 Q 29 10 53 50");
  stroke: #fff;
  stroke-width: 5;
`

const getBody = props => {
  if (props.border) {
    return bodyBorder
  }
  return body
}


export const LogoContainer = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  left: 0;
  top: 10px;
  cursor: pointer;
  z-index: 5;
`

export const LogoHumanContainer = styled.div`
  position: absolute;
  width: 60px;
  height: 100%;
`

export const LogoHumanHead = styled.div`
  border-radius: 50%;
  background: #fff;
  border: 1px solid #000;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
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