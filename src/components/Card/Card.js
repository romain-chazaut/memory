import React from 'react';
import './Card.css';

function Card({ card, onCardClicked }) {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={onCardClicked}>
      <img src={card.isFlipped ? card.frontImage : card.backImage} alt="" className="card-image" />
    </div>
  );
}

export default Card;
