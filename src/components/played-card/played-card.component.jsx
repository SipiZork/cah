import React from 'react'

import { Card } from './played-card.styles'

const PlayedCard = ({ text, winner, revealed, playerId,
  revealAndUpdateAndConfirmWinner, deleteSelectedWinner, highlight }) => (
    <Card
      revealed={revealed}
      className={`${winner === playerId ? 'selected' : ''} ${highlight ? 'winner' : ''}`}
    onClick={() => revealAndUpdateAndConfirmWinner(playerId)}
    onMouseLeave={deleteSelectedWinner}
  >
    {revealed ? <p>{text}</p> : <span>Cards Against Humanity</span>}
  </Card>
)

export default PlayedCard