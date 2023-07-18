import React from 'react';
import './Card.css';

const Card = ({ card, onCardClicked }) => {
  const { value, isFlipped } = card;

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onCardClicked(card)}>
      <div className="card-face card-front">?</div>
      <div className="card-face card-back">{value}</div>
    </div>
  );
};

export default Card;
