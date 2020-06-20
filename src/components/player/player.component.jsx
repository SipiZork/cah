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
    const { czar, short } = this.props
    return (
      <PlayerContainer
        key={id}
        className={`${this.state.class} ${czar && 'czar'} ${short && 'short'}`}
        onMouseEnter={this.toggleClass}
        onMouseLeave={this.toggleClass}
      >
        <p className={'word'}>{username[0]}{username[1]}<span>{czar ? '✧' : ''}</span></p>
        <UserProfileImage src={randomImage} alt="user profil" />
        <UserDetails className={this.state.class}>
          <UserDetail>{username}</UserDetail>
          <UserDetail>pontok: {points}</UserDetail>
        </UserDetails>
        <UserPoints className={this.state.class}>
          <span>{points}</span>
        </UserPoints>
      </PlayerContainer>
    )
  }
}

export default Player