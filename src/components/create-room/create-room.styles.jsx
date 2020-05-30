import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button.components'

import * as basic from '../../css/variables' 

export const CreateRoomContainer = styled.div`
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${basic.mainColor};
  flex: 0 0 330px;
`

export const CreateRoomTitle = styled.h2`
  font-size: 2rem;
  font-family: Raleway, sans-serif;
  font-weight: 400;
  margin-top: 10px;
`

export const CreateRoomButton = styled(CustomButton)`
  margin: 0 auto;
`