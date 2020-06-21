import React from 'react'

import {BoardAdminMenuContainer, StartButton} from './board-admin-menu.styles'

const BoardAdminMenu = ({ menuClass, startGame, newRound, boardStatus, closeBoard }) => (
  <BoardAdminMenuContainer className={menuClass}>
    {boardStatus === "waiting" && <StartButton onClick={startGame} inverted>Játék indítása</StartButton>}
    {boardStatus !== "finished" && boardStatus !== "waiting" && <StartButton onClick={newRound} inverted>Új kör indítása</StartButton>}
    <StartButton onClick={closeBoard} inverted>Asztal bezárása</StartButton>
  </BoardAdminMenuContainer>
)

export default BoardAdminMenu