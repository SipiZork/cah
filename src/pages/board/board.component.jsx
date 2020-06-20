import React from 'react'
import {
  firestore, addCardsToGame, addFullHandToEveryone, removeAllSelectedCards,
  updateBoardData, revealBlackCard, selectNextPlayer, resetBoardDatas
} from '../../firebase/firebase.utils'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'

import Player from '../../components/player/player.component'
import PlayerCard from '../../components/player-card/player-card.component'
import BoardHeader from '../../components/board-header/board-header.component'
import BoardAdminMenu from '../../components/board-admin-menu/board-admin-menu.component'
import PlayerPlayedCards from '../../components/player-played-cards/player-played-cards.component'

import {
  BoardContainer, Table, CardsContainer, BlackCardsContainer, HiddenBlackCards,
  PlayerCardsContainer, RevealedBlackCard, WhiteCardsContainer
} from './board.styles'

class Board extends React.Component {
  state = {
    players: [],
    board: '',
    menuClass: 'hidden',
    playerCards: [],
    selectedWhiteCard: '',
    randomPlayerOrder: [],
    winner: '',
    short: false
  }

  unsunscribeFromBord = null
  unsunscribeFromPlayer = null
  unsunscribeFromHand = null

  componentDidMount() {
    const {boardId} = this.props.match.params
    this.playerListener()
    this.handListener()
    this.boardListener()
    const playerRef = firestore.collection('boards').doc(boardId).collection('players').doc(this.props.currentUser.id)
      playerRef.update({
      inGame: true
      })
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      const playerRef = firestore.collection('boards').doc(boardId).collection('players').doc(this.props.currentUser.id)
      return playerRef.update({
      inGame: false
      })
    })
    this.checkShort()
    window.addEventListener('resize', this.checkShort)
  }

  componentWillUnmount() {
    this.unsunscribeFromBord()
    this.unsunscribeFromPlayer()
    this.unsunscribeFromHand()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.board.playedWhiteCards !== this.state.board.playedWhiteCards) {
      if (this.state.board.playedWhiteCards === this.state.board.whiteCardsNeed && 
        this.state.board.whiteCardsNeed !== 0 && this.state.board.playedWhiteCards !== 0) {
        const { boardId } = this.props.match.params
        updateBoardData(boardId, {status: 'revealCards'})
      }
    }
    if (prevState.board.revealedWhiteCards !== this.state.board.revealedWhiteCards) {
      if (this.state.board.revealedWhiteCards === this.state.board.whiteCardsNeed &&
        this.state.board.whiteCardsNeed !== 0 && this.state.board.revealedWhiteCards !== 0) {
        const { boardId } = this.props.match.params
        this.generateRandomPlayerORder()
        updateBoardData(boardId, { status: 'pickWinner' })
      }
    }
  }

  handListener = () => {
    const { boardId } = this.props.match.params
    const cardsRef = firestore.collection('boards').doc(boardId).collection('players').doc(this.props.currentUser.id)
    this.unsunscribeFromHand = cardsRef.onSnapshot(snapshot => {
      this.setState({ playerCards: snapshot.data().cards })
    })
  }

  playerListener = () => {
    const {boardId} = this.props.match.params
    const boardsRef = firestore.collection('boards').doc(boardId)
    const playersRef = firestore
      .collection('boards')
      .doc(boardId)
      .collection('players')
      .orderBy('numberInRow', 'asc')
    this.unsunscribeFromPlayer = playersRef.onSnapshot(async querySnapshot => {
      let loadedPlayers = []
      let playedCards = 0
      querySnapshot.forEach(player => {
        playedCards += player.data().selectedCards.length
        firestore.collection('users').doc(player.id).get().then(user => {
          console.log(user.data())
          loadedPlayers.push({ id: player.id, username: user.data().username, points: player.data().points, playedCards: player.data().selectedCards })
          this.setState({ players: loadedPlayers })
        })
      })
      await boardsRef.update({
        playedWhiteCards: playedCards
      })
    })
  }

  boardListener = () => {
    const {boardId} = this.props.match.params
    const boardsRef = firestore.collection('boards').doc(boardId)
    this.unsunscribeFromBord = boardsRef.onSnapshot(async querySnapshot => {
      console.log('Változás')
      const { actualPlayer, actualBlackCard, status, playedWhiteCards, revealedWhiteCards, goalPoint, whiteCardsNeed, randomOrder, winner } = querySnapshot.data()
      this.setState({ board: { actualPlayer, actualBlackCard, status, playedWhiteCards, revealedWhiteCards, goalPoint, whiteCardsNeed, randomOrder, winner } })
    })
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
    firestore.collection('boards').doc(boardId).get().then(async snapshot => {
      firestore.collection('boards').doc(boardId).collection('players').get().then(playersSnapshot => {
        if (this.props.currentUser.id === snapshot.data().creator) {
          const playersWOCzar = playersSnapshot.docs.length - 1
          addFullHandToEveryone(boardId)
          this.generateRandomPlayerORder()
          updateBoardData(boardId, { status: 'inTurn', actualPlayer: snapshot.data().creator })
          revealBlackCard(boardId, playersWOCzar)
        }
      })
    })
  }

  generateRandomPlayerORder = () => {
    const { boardId } = this.props.match.params
    firestore.collection('boards').doc(boardId).collection('players').get().then(querySnapshot => {
      const players = querySnapshot.docs.map(player => player.id)
      players.sort(() => Math.random() - 0.5)
      updateBoardData(boardId, { randomOrder: players })
    })
  }

  newRound = () => {
    const { boardId } = this.props.match.params
    firestore.collection('boards').doc(boardId).get().then(snapshot => {
      firestore.collection('boards').doc(boardId).collection('players').get().then(playersSnapshot => {
        const { actualPlayer } = snapshot.data()
        const playersWOCzar = playersSnapshot.docs.length - 1
        addFullHandToEveryone(boardId)
        selectNextPlayer(boardId, actualPlayer)
        removeAllSelectedCards(boardId)
        resetBoardDatas(boardId)
        revealBlackCard(boardId, playersWOCzar)
        this.generateRandomPlayerORder()
      })
    })
  }

  updateAndConfirmSelectedWhiteCard = (cardText) => {
    const { boardId } = this.props.match.params
    const { id } = this.props.currentUser
    if (id !== this.state.board.actualPlayer) {
      if (cardText !== null && this.state.selectedWhiteCard !== null && cardText === this.state.selectedWhiteCard) {
        const boardRef = firestore.collection('boards').doc(boardId)
        const playerRef = firestore.collection('boards').doc(boardId).collection('players').doc(id)
        playerRef.get().then(snapshot => {
          const { selectedCards, cards } = snapshot.data()
          if (selectedCards.length < this.state.board.actualBlackCard.cards) {
            cards.map((card, index) => {
              if (card.text === cardText) {
                selectedCards.push(card)
                cards.splice(index, 1)
                this.setState({ selectedWhiteCard: '' })
              }
              return null
            })
            playerRef.update({
              cards,
              selectedCards
            })
          }
        })
      } else {
        this.setState({ selectedWhiteCard: cardText })
      }
    }
  }

  deleteSelectedWinner = () => {
    this.setState({ winner: '' })
  }

  deleteSelectedWhiteCard = () => {
    this.setState({ selectedWhiteCard: '' })
  }

  randomPlayerOrder = () => {
    const { boardId } = this.props.match.params
    firestore.collection('boards').doc(boardId).collection('players').onSnapshot(querySnapshot => {
    let playersInRandomOrder = []
      querySnapshot.forEach(player => {
        if (player.id !== this.state.board.actualPlayer) {
          playersInRandomOrder.push({ id: player.id, playedCards: player.data().selectedCards.length, playedCards: player.data().selectedCards })
          this.setState({ randomPlayerOrder: playersInRandomOrder.sort(() => Math.random() - 0.5) })
        }
      })
    })
  }

  getCardText = (card) => {
    if (!card.revealed) {
      return card.text
    }
  }

  revealWhiteCard = (playerId) => {
    if (this.state.board.actualPlayer === this.props.currentUser.id) {
      const { boardId } = this.props.match.params
      const boardRef = firestore.collection('boards').doc(boardId)
      const playerRef = firestore.collection('boards').doc(boardId).collection('players').doc(playerId)
      playerRef.get().then(player => {
        const { selectedCards } = player.data()
        let revealOne = false
        selectedCards.map(card => {
          if (!card.revealed && !revealOne) {
            card.revealed = true
            revealOne = true
            boardRef.get().then(boardSnapshot => {
              boardRef.update({
                revealedWhiteCards: boardSnapshot.data().revealedWhiteCards + 1 
              })
            })
          }
        })
        playerRef.update({
          selectedCards
        })
      })
    }
  }

  revealAndUpdateAndConfirmWinner = (playerId) => {
    if (this.state.board.status === 'revealCards') {
      this.revealWhiteCard(playerId)
    } else if (this.state.board.status === 'pickWinner') {
      console.log('Vagyok')
      const { boardId } = this.props.match.params
      if (this.state.board.whiteCardsNeed === this.state.board.playedWhiteCards && this.state.board.status === 'pickWinner') {
        if (this.state.winner === playerId) {
          if (this.state.board.actualPlayer === this.props.currentUser.id) {
            const boardRef = firestore.collection('boards').doc(boardId)
            const playersRef = firestore.collection('boards').doc(boardId).collection('players')
            const winnerRef = firestore.collection('boards').doc(boardId).collection('players').doc(playerId)
            winnerRef.get().then(snapshot => {
              if (snapshot.data().points + 1 >= this.state.board.goalPoint) {
                updateBoardData(boardId, { status: 'finished', winner: snapshot.id })
                setTimeout(() => {
                  playersRef.get().then(querySnapshot => {
                    querySnapshot.forEach(player => {
                      firestore.collection('users').doc(player.id).update({
                        gameSession: '',
                        status: 'inLobby'
                      })
                      playersRef.doc(player.id).update({
                        inGame: false
                      })
                      updateBoardData(boardId, { live: false })
                    })
                  })
                }, 3000);
              } else {
                updateBoardData(boardId, { status: 'waitingForNextRound', winner: snapshot.id })
                setTimeout(() => {
                  this.newRound()
                }, 4000);
              }
              winnerRef.update({
                points: snapshot.data().points + 1
              })
            })
          }
          this.setState({ winner: '' })
        } else {
          this.setState({ winner: playerId })
        }
      }
    }
  }

  checkShort = () => {
    if (window.innerHeight < 851 && this.state.short === false) {
      this.setState({ short: true })
    } else if (window.innerHeight > 850 && this.state.short === true) {
      this.setState({ short: false })
    }
  }

  render() {
    const { boardId } = this.props.match.params
    return (
      <React.Fragment>
        <BoardHeader toggleMenu={this.toggleMenu} />
        <BoardAdminMenu
          menuClass={this.state.menuClass}
          startGame={this.startGame}
          boardStatus={this.state.board.status} />
        <BoardContainer>
          <Table>
            {this.state.players.map(player => {
              const czar = player.id === this.state.board.actualPlayer
              return (<Player player={player} key={player.id} czar={czar} short={this.state.short} />)
            })}
            <CardsContainer>
              <BlackCardsContainer>
                <HiddenBlackCards>
                  <p>Cards Against Humanity</p>
                </HiddenBlackCards>
                {this.state.board.actualBlackCard &&
                  <RevealedBlackCard>
                    <p>{this.state.board.actualBlackCard.text}</p>
                  </RevealedBlackCard>
                }
              </BlackCardsContainer>
              <WhiteCardsContainer>
                {this.state.board.randomOrder && this.state.board.randomOrder.map(playerId => {
                  const player = this.state.players.find(actPlayer => actPlayer.id === playerId)
                  if (player !== undefined) {
                    return (
                      player.id !== this.state.board.actualPlayer && player.playedCards.length > 0 && <PlayerPlayedCards
                        key={player.id}
                        cards={player.playedCards}
                        playerId={player.id}
                        highlight={this.state.board.status === 'waitingForNextRound' && this.state.board.winner === player.id}
                        revealAndUpdateAndConfirmWinner={this.revealAndUpdateAndConfirmWinner}
                        deleteSelectedWinner={this.deleteSelectedWinner}
                        winner={this.state.winner}
                      />
                    )
                  }
                })}
              </WhiteCardsContainer>
            </CardsContainer>
            </Table>
            </BoardContainer>
            <PlayerCardsContainer>
          {this.state.playerCards.map((card, index) => (
            <PlayerCard
              key={index}
              cardText={card.text}
              selectedCard={this.state.selectedWhiteCard}
              updateAndConfirmSelectedWhiteCard={this.updateAndConfirmSelectedWhiteCard}
              deleteSelectedWhiteCard={this.deleteSelectedWhiteCard}
            />
          ))}
            </PlayerCardsContainer>
      </React.Fragment>
    )}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps, null)(Board))