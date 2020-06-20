import React from 'react'

import PlayedCard from '../played-card/played-card.component'
import {PlayedCardsContainer} from './player-played-cards.styles'

class PlayerPlayedCards extends React.Component {
  render() {
    const { cards, playerId, revealAndUpdateAndConfirmWinner, deleteSelectedWinner, winner, highlight } = this.props
    return (
      <PlayedCardsContainer>
        {cards.map((card, index) => (
          <PlayedCard
            key={index}
            highlight={highlight}
            text={card.text}
            revealed={card.revealed}
            deleteSelectedWinner={deleteSelectedWinner}
            revealAndUpdateAndConfirmWinner={revealAndUpdateAndConfirmWinner}
            winner={winner}
            playerId={playerId}
          />
        ))}
      </PlayedCardsContainer>
    )
  }
}

export default PlayerPlayedCards