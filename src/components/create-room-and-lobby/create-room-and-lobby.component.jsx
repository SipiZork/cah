import React from 'react'

import CreateRoom from '../create-room/create-room.component'
import Lobby from '../lobby/lobby.component'

import { CreateRoomAndLobbyContainer } from './create-room-and-lobby.styles'

class CreateRoomAndLobby extends React.Component{ 
  render() {
    return (
      <CreateRoomAndLobbyContainer>
        <CreateRoom />
        <Lobby />
      </CreateRoomAndLobbyContainer>
    )
  }
}
export default CreateRoomAndLobby