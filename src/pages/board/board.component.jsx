import React from 'react'
import { firestore, addCardsToGame, addFullHandToEveryone, updateBoardData } from '../../firebase/firebase.utils'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'

import Player from '../../components/player/player.component'
import PlayerCard from '../../components/player-card/player-card.component'
import BoardHeader from '../../components/board-header/board-header.component'
import BoardAdminMenu from '../../components/board-admin-menu/board-admin-menu.component'

import {
  BoardContainer, Table, CardsContainer, BlackCardsContainer, HiddenBlackCards,
  PlayerCardsContainer
} from './board.styles'
import BoardTooltip from '../../components/board-tooltip/board-tooltip.component'

class Board extends React.Component {
  state = {
    players: [],
    board: '',
    menuClass: 'hidden',
    playerCards: []
  }

  componentDidMount() {
    const {boardId} = this.props.match.params
    this.playerListener()
    this.handListener()
    this.boardListener()
  }

  handListener = () => {
    const { boardId } = this.props.match.params
    const cardsRef = firestore.collection('boards').doc(boardId).collection('players').doc(this.props.currentUser.id)
    cardsRef.onSnapshot(snapshot => {
      this.setState({ playerCards: snapshot.data().cards })
    })
  }

  playerListener = () => {
    const {boardId} = this.props.match.params
    const playersRef = firestore.collection('boards').doc(boardId).collection('players')
      playersRef.onSnapshot(querySnapshot => {
        let loadedPlayers = []
        querySnapshot.forEach(player => {
          const username = firestore.collection('users').doc(player.id).get().then(user => {
            loadedPlayers.push({id: player.id, username: user.data().username, points: player.data().points })
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
    const {boardId} = this.props.match.params
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

  toggleMenu = () => {
    const {boardId} = this.props.match.params
    const userId = this.props.currentUser.id
    firestore.collection('boards').doc(boardId).get().then(snapshot => {
      if (snapshot.data().creator === userId) {
        if (this.state.menuClass === 'visible') {
          this.setState({ menuClass: 'hidden' })
        } else {
          this.setState({ menuClass: 'visible' })
        }
      }
    })
  }

  isCreator = () => {
    const {boardId} = this.props.match.params
    const userId = this.props.currentUser.id
    firestore.collection('boards').doc(boardId).get().then(snapshot => {
      if (snapshot.data().creator === userId) {
        return true
      }
    })
    return false
  }

  isActualPlayer = () => {
    return this.props.currentUser.id === this.state.board.actualPlayer
  }

  isNeedBlackCard = () => {
    return this.state.board.needCard === true
  }

  startGame = () => {
    const { boardId } = this.props.match.params
    firestore.collection('boards').doc(boardId).get().then(snapshot => {
      if (this.props.currentUser.id === snapshot.data().creator) {
        addFullHandToEveryone(boardId)
        updateBoardData(boardId, { status: 'started', actualPlayer: snapshot.data().creator })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <BoardHeader toggleMenu={this.toggleMenu} />
        <BoardAdminMenu class={this.state.menuClass} startGame={this.startGame} />
        <BoardContainer>
          <Table>
            {this.state.players.map(player => (
              <Player player={player} key={player.id} />
            ))}
            <CardsContainer>
              <BlackCardsContainer>
                {this.isActualPlayer() && this.isNeedBlackCard() ? (
                  <BoardTooltip>Kattins Ide egy fekete kártya felfordításához</BoardTooltip>
                ) : ''}
                <HiddenBlackCards onClick={this.revealBlackCard}>
                  <p>Cards Against Humanity</p>
                </HiddenBlackCards>
              </BlackCardsContainer>
            </CardsContainer>
            </Table>
            </BoardContainer>
            <PlayerCardsContainer className="szia">
              {this.state.playerCards.map(card => (
                <PlayerCard>{card}</PlayerCard>
              ))}
            </PlayerCardsContainer>
      </React.Fragment>
    )}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps, null)(Board))