import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { firestore, setUserStatus, uploadCards } from '../../firebase/firebase.utils'

import LobbyBoard from '../lobby-board/lobby-board.component'
import { LobbyContainer } from './lobby.styles'

class Lobby extends React.Component {
  state = {
    liveBoards: [],
    userCount: 0,
  }

  unsubscrubeFromBoards = null

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
    this.boardsListener()
    // uploadCards()
    console.log(this.props.currentUser.id)
    setUserStatus(this.props.currentUser.id, 'inLobby')
    // addCardsToGame('wo0ZiIjr6T5bYf5mOneB')
  }

  boardsListener = () => {
    const boardsRef = firestore.collection('boards')
    this.unsubscrubeFromBoards = boardsRef
      .where('live', '==', true)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        let loadedBoards = []
        querySnapshot.forEach(doc => {
          boardsRef.doc(doc.id).collection('players').onSnapshot(snapShot => {
            this.setState(state => {
              const boards = state.liveBoards.map(board => {
                if (board.id === doc.id && board.playersNum !== snapShot.size) {
                  board.playersNum = snapShot.size
                }
                return null
              })
              return {
                boards
              }
            })
          })
          boardsRef.doc(doc.id).collection('players').get().then(snapShot => {
            loadedBoards.push({ ...doc.data(), id: doc.id, playersNum: snapShot.size })
            this.setState({ liveBoards: loadedBoards })
          })
        })
      })      
  }

  componentWillUnmount() {
    this.unsubscrubeFromBoards()
  }

  /*reloadBoards = () => {
    firestore.collection('boards')
      .where('live', '==', true)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        let loadedBoards = []
        querySnapshot.forEach(doc => {
          firestore.collection('boards').doc(doc.id).collection('players').get().then(snapShot => {
            loadedBoards.push({ ...doc.data(), id: doc.id, playersNum: snapShot.size })
            this.setState({ liveBoards: loadedBoards })
          })
        })
    })
  } */

  displayBoards = boards => {
    return (boards.length > 0 &&
      boards.map(board => {
        return <LobbyBoard key={board.id} boardData={board} currentUser={this.props.currentUser} />
      })
    )
  }

  render() {
    const { liveBoards } = this.state
    return (
      <LobbyContainer>
        {this.displayBoards(liveBoards)}
      </LobbyContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, null)(Lobby)