import React from 'react'
import lockClose from '../../assets/images/close-lock.png'
import lockOpen from '../../assets/images/open-lock.png'
import { firestore } from '../../firebase/firebase.utils'

import {
  BoardContainer, BoardTitle, BoardStatus, BoardDatasContainer,
  BoardData, BoardPasswordContainer, BoardButton
} from './lobby-board.styles' 

class LobbyBoard extends React.Component {
  status = {
    nextPlayer: 0
  }

  getStatus = status => {
    if (status === 'started') {
      return 'Játék folyamatban'
    } else if (status === 'waiting') {
      return 'Indításra vár'
    }
  }

  loginToBoard = async (boardId, userId) => {
    const playerRef = firestore
      .collection('boards')
      .doc(boardId)
      .collection('players')
      .orderBy('numberInRow', 'desc')
      .limit(1)
    await playerRef.get().then(players => {
      players.forEach(player => {
        this.setState({ nextPlayer: player.data().numberInRow + 1 }) 
      })
    })
    firestore.doc(`boards/${boardId}`).get().then(snapShot => {
      const { password, status } = snapShot.data();
      if (password === "" && status === 'waiting') {
        firestore.doc(`boards/${boardId}/players/${userId}`).set({
          inGame: true,
          points: 0,
          cards: [],
          numberInRow: this.state.nextPlayer,
          selectedCards: []
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
    const { boardName, status, goalPoint, password, playersNum, turn, id } = this.props.boardData
    const userId  = this.props.currentUser.id
    return (
      <BoardContainer>
        <BoardPasswordContainer>
          <img className="img" src={password === '' ? lockOpen : lockClose} alt="lock" />
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