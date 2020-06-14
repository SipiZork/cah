import React from 'react'

import {BoardAdminMenuContainer, StartButton} from './board-admin-menu.styles'

const BoardAdminMenu = ({ menuClass, startGame, boardStatus }) => (
  <BoardAdminMenuContainer className={menuClass}>
    {boardStatus === "waiting" && <StartButton onClick={startGame} inverted>Játék indítása</StartButton>}
  </BoardAdminMenuContainer>
)

export default BoardAdminMenu