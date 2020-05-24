import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button.components'

export const CreateRoomContainer = styled.div`
  border: 1px solid red;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(100,100,100);
  flex: 0 0 330px;
`

export const CreateRoomTitle = styled.h2`
  font-size: 2rem;
  font-family: Raleway, sans-serif;
  font-weight: 400;
  margin-top: 10px;
  color: white;
`

export const CreateRoomButton = styled(CustomButton)`
  margin: 0 auto;
`