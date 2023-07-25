import React from 'react';
import './Card.css';

const Card = ({ card, onCardClicked }) => (
  <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={onCardClicked}>
    <div className="front">?</div>
    <div className="back">{card.value}</div>
  </div>
);

export default Card;
