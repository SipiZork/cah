import React from 'react'

import {BoardAdminMenuContainer, StartButton} from './board-admin-menu.styles'

const BoardAdminMenu = ({ menuClass, startGame, newRound, boardStatus, closeBoard, newBlackCard }) => (
  <BoardAdminMenuContainer className={menuClass}>
    {boardStatus === "waiting" && <StartButton onClick={startGame} inverted>Játék indítása</StartButton>}
    <StartButton onClick={newBlackCard} inverted>Új fekete lap</StartButton>
    {boardStatus !== "finished" && boardStatus !== "waiting" && <StartButton onClick={newRound} inverted>Új kör indítása</StartButton>}
    <StartButton onClick={closeBoard} inverted>Asztal bezárása</StartButton>
  </BoardAdminMenuContainer>
)

export default BoardAdminMenu