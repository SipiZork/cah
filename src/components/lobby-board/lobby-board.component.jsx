import React from 'react'
import lockClose from '../../assets/images/close-lock.png'
import lockOpen from '../../assets/images/open-lock.png'
import { firestore } from '../../firebase/firebase.utils'

import {
  BoardContainer, BoardTitle, BoardStatus, BoardDatasContainer,
  BoardData, BoardPasswordContainer, BoardPasswordImage, BoardButton
} from './lobby-board.styles' 

class LobbyBoard extends React.Component {

  getStatus = status => {
    if (status === 'ingame') {
      return 'Játék folyamatban'
    } else if (status === 'waiting') {
      return 'Indításra vár'
    }
  }

  render() {
    const { boardName, creator, status, goalPoint, password, playersNum, turn } = this.props.boardData
    return (
      <BoardContainer>
        <BoardPasswordContainer>
          <img className="img" src={password === '' ? lockOpen : lockClose}  />
        </BoardPasswordContainer>
        <BoardTitle>{boardName}</BoardTitle>
        <BoardStatus>{this.getStatus(status)}</BoardStatus>
        <BoardDatasContainer>
          <BoardData>{playersNum} játékos</BoardData>
          {status === 'ingame' ? <BoardData>{turn}. kör</BoardData> : '' }
          <BoardData>{goalPoint} pont szükséges a nyeréshez</BoardData>
          <BoardButton inverted type="submit">Belépés</BoardButton>
        </BoardDatasContainer>
      </BoardContainer>
    )
  }
}

export default LobbyBoard