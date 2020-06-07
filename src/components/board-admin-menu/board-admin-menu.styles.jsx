import styled from 'styled-components'

import CustomButton from '../custom-button/custom-button.components'
import * as basic from '../../css/variables'

export const BoardAdminMenuContainer = styled.div`
  position: fixed;
  width: 250px;
  height: 100vh;
  left: -400px;
  background-color: ${basic.mainColor};
  transition: all .25s ease-in-out;
  border-right: 1px solid black;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;

  &.visible {
    left: 0;
  }
`

export const StartButton = styled(CustomButton)`
`