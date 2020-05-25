import React from 'react'
import { firestore } from '../../firebase/firebase.utils'

import Board from '../board/board.component'
import { LobbyContainer } from './lobby.styles'

class Lobby extends React.Component {
  state = {
    liveBoards: []
  }
  componentDidMount() {    
    /*let loadedBoards = []
    firestore
    .collection('boards')
    .where('live', '==', true)
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedBoards.push({ ...doc.data(), id: doc.id })
        this.setState({ liveBoards: loadedBoards })
      })
    }) */

    this.boardListener()

  }

  boardListener = () => {
    let loadedBoards = []
    console.log(loadedBoards)
    firestore.collection('boards')
    .where('live', '==', true)
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      loadedBoards = []
      querySnapshot.forEach(doc => {
        loadedBoards.push({ ...doc.data(), id: doc.id })
        this.setState({ liveBoards: loadedBoards })
      })
    })
  }

  displayBoards = boards => (
    boards.length > 0 &&
    boards.map(board => (
      <Board key={board.id} boardData={board} />
    ))
  )

  render() {
    const { liveBoards } = this.state
    return (
      <LobbyContainer>
        {this.displayBoards(liveBoards)}
      </LobbyContainer>
    )
  }
}

export default Lobby