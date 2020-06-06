import React from 'react'

import randomImage from '../../assets/images/random-profile-image.png'

import { PlayerContainer, UserProfileImage, UserPoints, UserDetails, UserDetail } from './player.styles'

class Player extends React.Component {
  state = {
    class: ''
  }

  toggleClass = () => {
    if (this.state.class === 'hover') {
      this.setState({ class: '' })
    } else {
      this.setState({ class: 'hover' })
    }
  }
  render() {
    const { id, points, username } = this.props.player
    return (
      <PlayerContainer
        key={id}
        className={this.state.class}
        onMouseEnter={this.toggleClass}
        onMouseLeave={this.toggleClass}
      >
        <UserProfileImage src={randomImage} alt="user profil" />
        <UserDetails className={this.state.class}>
          <UserDetail>{username}</UserDetail>
          <UserDetail>pontok: {points}</UserDetail>
        </UserDetails>
        <UserPoints>
          <span>{points}</span>
        </UserPoints>
      </PlayerContainer>
    )
  }
}

export default Player