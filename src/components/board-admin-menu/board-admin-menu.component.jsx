import React from 'react'

import {BoardAdminMenuContainer, StartButton} from './board-admin-menu.styles'

class BoardAdminMenu extends React.Component {
  render() {
    return (
      <BoardAdminMenuContainer className={this.props.class}>
        
        <StartButton onClick={this.props.startGame} inverted>Játék indítása</StartButton>
      </BoardAdminMenuContainer>
    )
  }
}

export default BoardAdminMenu