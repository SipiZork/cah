import styled from 'styled-components'

import * as basic from '../../css/variables' 

export const LobbyContainer = styled.div`
  width: 100%;
  /* flex: 1; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background: ${basic.mainColor};
  overflow-y: scroll;
  align-items: flex-start;
  border: 1px solid red;
  min-height: 100%;
  max-height: 100%;
  
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${basic.inputColor};
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150,150,150,1);

    &:hover {
      background: rgba(50,50,50,1);
    }
  }
`