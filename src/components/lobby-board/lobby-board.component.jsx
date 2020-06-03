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

  loginToBoard = async (boardId, userId) => {
    const boardSnapShot = firestore.doc(`boards/${boardId}`).get().then(snapShot => {
      const { password } = snapShot.data();
      console.log(snapShot.data().password)
      if (password === "") {
        firestore.doc(`boards/${boardId}/players/${userId}`).set({
          inGame: true,
          points: 0
        })
        firestore.doc(`users/${userId}`).update({
          gameSession: boardId,
          status: 'inGame'
        })
      } else {
        console.log('Ide jelszó kell, hogy belépj')
      }
    })
  }

  render() {
    const { boardName, creator, status, goalPoint, password, playersNum, turn, id } = this.props.boardData
    const userId  = this.props.currentUser.id
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
          <BoardButton inverted onClick={() => this.loginToBoard(id, userId)}>Belépés</BoardButton>
        </BoardDatasContainer>
      </BoardContainer>
    )
  }
}

export default LobbyBoard