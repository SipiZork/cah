import React from 'react'

import { createLiveGame } from '../../firebase/firebase.utils'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import FormInput from '../form-input/form-input.component'
import { CreateRoomContainer, CreateRoomTitle, CreateRoomButton } from './create-room.styles'

class CreateRoom extends React.Component {
  state = {
    boardName: '',
    password: '',
    goalPoint: '',
    errors: '',
    cardPacks: ''
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.dataIsValid()) {
      const { boardName, password, goalPoint, cardPacks } = this.state
      const { username, id } = this.props.currentUser 
      const boardData = {
        creatorUsername: username,
        creatorId: id,
        boardName,
        password,
        goalPoint,
      }
    
      createLiveGame(boardData, cardPacks, { live: true, creator: id, status: 'waiting' })
    
      this.setState({
        boardName: '',
        password: '',
        goalPoint: '',
        errors: '',
        cardPacks: ''
      })
    }
  }

  dataIsValid = () => {
    const { boardName, goalPoint, cardPacks } = this.state
    const { setError } = this.props
    if (boardName.length > 25) {
      setError('Sikertelen szoba létrehozás', 'Túl hosszú a szoba neve (maximum 25 karakter)')
      return false
    } else if (!Number.isInteger(parseInt(goalPoint))) {
      setError('Sikertelen szoba létrehozás', 'Nem számot adtál meg nyerési pontszámnak')
      return false
    } else if (goalPoint > 20 || goalPoint < 2) {
      setError('Sikertelen szoba létrehozás', 'Nem megfelelő nyeréshez szükséges pontszámot adtál meg (minimum 2, max 20)')
      return false
    }
    return true
  }

  render() {
    return (
      <CreateRoomContainer>
        <CreateRoomTitle>Szoba létrehozása</CreateRoomTitle>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label="Szoba neve"
            name="boardName"
            value={this.state.boardName}
          handleChange={this.handleChange}
            autoComplete="off"
            required
          />
          <FormInput
            type="text"
            label="Jelszó (opcionális)"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            autoComplete="off"
          />
          <FormInput
            type="text"
            label="Nyeréshez szükséges pontszám"
            name="goalPoint"
            value={this.state.goalPoint}
            handleChange={this.handleChange}
            autoComplete="off"
            required
          />
          <FormInput
            type="text"
            label="Kártyapaklik vesszővel elválasztva"
            name="cardPacks"
            value={this.state.cardPacks}
            handleChange={this.handleChange}
            autoComplete="off"
            labelFontSize="14"
            required
          />
          <CreateRoomButton inverted type="submit">Létrehozás</CreateRoomButton>
        </form>
      </CreateRoomContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, null)(CreateRoom)