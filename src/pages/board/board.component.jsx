import React from 'react'
import { firestore, addCardsToGame, addFullHandToEveryone } from '../../firebase/firebase.utils'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'

import Player from '../../components/player/player.component'
import BoardHeader from '../../components/board-header/board-header.component'

import {
  BoardContainer, Table, PlayerContainer,
  UserProfileImage, UserPoints, CardsContainer, BlackCardsContainer, HiddenBlackCards
} from './board.styles'

class Board extends React.Component {
  state = {
    players: [],
    board: ''
  }

  componentDidMount() {
    const {boardId} = this.props.match.params
    this.playerListener()
    this.boardListener()

    addFullHandToEveryone(boardId)
  }

  playerListener = () => {
    const {boardId} = this.props.match.params
    const playersRef = firestore.collection('boards').doc(boardId).collection('players')
      playersRef.onSnapshot(querySnapshot => {
        let loadedPlayers = []
        querySnapshot.forEach(player => {
          const username = firestore.collection('users').doc(player.id).get().then(user => {
            loadedPlayers.push({...player.data(), id: player.id, username: user.data().username })
            this.setState({ players: loadedPlayers })
          })
        })
      })
  }

  boardListener = () => {
    const {boardId} = this.props.match.params
    const boardsRef = firestore.collection('boards').doc(boardId)
    boardsRef.onSnapshot(querySnapshot => {
      const { actualPlayer, actualBlackCard, needBlackCard } = querySnapshot.data()
      this.setState({ board: { actualPlayer: actualPlayer, blackCard: actualBlackCard, needCard: needBlackCard } })
    })
  }

  revealBlackCard = () => {
    const  {boardId } = this.props.match.params
    const userId = this.props.currentUser.id
    const { actualPlayer, needCard } = this.state.board
    if (userId === actualPlayer && needCard) {
      firestore.collection('boards').doc(boardId).get().then(snapshot => {
        const { blackCards } = snapshot.data()
        const revealBlackCard = blackCards.shift()
        firestore.collection('boards').doc(boardId).update({
          blackCards: blackCards,
          actualBlackCard: revealBlackCard,
          needBlackCard: false
        })
      })
    }
  }

  render() {
    return(
      <BoardContainer>
        <BoardHeader />
        <Table>
          {this.state.players.map(player => (
            <Player player={player} />
          ))}
          <CardsContainer>
            <BlackCardsContainer>
              <HiddenBlackCards onClick={this.revealBlackCard}>
                <p>Cards Against Humanity</p>
              </HiddenBlackCards>
            </BlackCardsContainer>
          </CardsContainer>
        </Table>
      </BoardContainer>
    )}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps, null)(Board))