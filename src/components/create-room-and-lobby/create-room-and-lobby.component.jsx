import React from 'react'

import CreateRoom from '../create-room/create-room.component'
import Lobby from '../lobby/lobby.component'

import { CreateRoomAndLobbyContainer } from './create-room-and-lobby.styles'

class CreateRoomAndLobby extends React.Component{ 
  render() {
    const {setError} = this.props
    return (
      <CreateRoomAndLobbyContainer>
        <CreateRoom setError={setError}/>
        <Lobby />
      </CreateRoomAndLobbyContainer>
    )
  }
}
export default CreateRoomAndLobby