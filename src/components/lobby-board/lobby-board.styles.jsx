import styled from 'styled-components'

import CustomButton from '../custom-button/custom-button.components'
import * as basic from '../../css/variables' 

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  min-width: 300px;
  height: 200px;
  margin: 10px 15px 5px 0;
  padding: .5rem;
  align-items: center;
  position: relative;
  background: ${basic.inputColor};
`

export const BoardTitle = styled.h3`
  font-size: 1.3rem;
`

export const BoardStatus = styled.p`
  font-size: 1rem;
`

export const BoardDatasContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const BoardData = styled.p`
  font-size: 1.1rem;
`

export const BoardPasswordContainer = styled.div`
  display: block;
  position: absolute;
  top: 5px;
  right: 0;
  width: 30px;
  height: 30px;

  & img {
    width: 100%;
    height: 100%;
  }
`

export const BoardButton = styled(CustomButton)`
  align-self: center;
  margin: 30px 0 0 0;
`