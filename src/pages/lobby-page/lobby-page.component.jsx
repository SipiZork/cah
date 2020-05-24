import React from 'react'

import Header from '../../components/header/header.components'
import CreateRoomAndLobby from '../../components/create-room-and-lobby/create-room-and-lobby.component'

import './lobby-page.styles'

const LobbyPage = () => (
  <div className="wrapper">
    <Header />
    <CreateRoomAndLobby />
  </div>
)
export default LobbyPage