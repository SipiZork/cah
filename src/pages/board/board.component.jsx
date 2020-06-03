import React from 'react'
import { firestore, addCardsToGame } from '../../firebase/firebase.utils'
import { withRouter } from 'react-router-dom'
import randomImage from '../../assets/images/random-profile-image.png'


import {BoardContainer, Table, PlayerContainer, UserProfileImage, UserPoints} from './board.styles'

class Board extends React.Component {
  state = {
    players: []
  }

  componentDidMount() {
    const {boardId} = this.props.match.params
    this.playerListener()

    // SHUFFLE AND ADD CARDS TO GAME
    // addCardsToGame(boardId)
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

  render() {
    return(
      <BoardContainer>
        <Table>
          {this.state.players.map(player => (
            <PlayerContainer key={player.id}>
              <UserProfileImage src={randomImage} alt="user profil" />
              <UserPoints>
                <span>{player.points}</span>
              </UserPoints>
            </PlayerContainer>   
          ))}
        </Table>
      </BoardContainer>
    )}
}

export default withRouter(Board)