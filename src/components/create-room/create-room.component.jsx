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
    goalPoint: ''
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { username, id } = this.props.currentUser 
    const { boardName, password, goalPoint } = this.state
    const timeToId = new Date()
    const boardData = {
      creatorUsername: username,
      creatorId: id,
      boardName,
      password,
      goalPoint,
    }

    createLiveGame(boardData, {live: true, creator: id})

    this.setState({
      boardName: '',
      password: '',
      goalPoint: ''
    })
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
            label="Jelszó"
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
          />
          <CreateRoomButton type="submit">Létrehozás</CreateRoomButton>
        </form>
      </CreateRoomContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, null)(CreateRoom)