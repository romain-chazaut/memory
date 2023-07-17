import React from 'react';
import './Card.css';

const Card = ({ card, onCardClicked }) => {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={() => !card.isFlipped && onCardClicked(card)}>
      {card.isFlipped ? card.value : 'Card Back'}
    </div>
  );
};

export default Card;
