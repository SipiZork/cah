import React from 'react'

import { Card } from './player-card.styles'

const PlayerCard = ({ updateAndConfirmSelectedWhiteCard, cardText, selectedCard, deleteSelectedWhiteCard }) => (
  <Card
    onClick={() => updateAndConfirmSelectedWhiteCard(cardText)}
    className={selectedCard === cardText ? 'selected' : ''}
    onMouseLeave={deleteSelectedWhiteCard}
  >
    {cardText}
  </Card>
)

export default PlayerCard