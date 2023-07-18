import React, { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import Card from './components/Card/Card';
import './App.css';

function generateCards() {
  const values = ['A', 'B', 'C', 'D', 'E', 'F'];
  let cards = values.concat(values).map(value => ({ value, isFlipped: false, canFlip: true }));
  
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

function App() {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [message, setMessage] = useState('Bienvenue au jeu de memory!');

  useEffect(() => {
    if (selectedCards.length === 2) {
      const firstCard = cards[selectedCards[0]];
      const secondCard = cards[selectedCards[1]];

      if (firstCard.value === secondCard.value) {
        setMessage('C\'est une paire !');

        setCards(cards => 
          cards.map((card, index) => 
            index === selectedCards[0] || index === selectedCards[1] ? { ...card, canFlip: false } : card
          )
        );

        // Check if all pairs have been found
        if (cards.every(card => card.canFlip === false)) {
          setMessage('Félicitations ! Vous avez gagné !');
        }
      } else {
        setMessage('Oops! Essayez à nouveau.');

        setTimeout(() => {
          setCards(cards => 
            cards.map((card, index) => 
              index === selectedCards[0] || index === selectedCards[1] ? { ...card, isFlipped: false, canFlip: true } : card
            )
          );
        }, 1000);
      }

      setSelectedCards([]);
    }
  }, [selectedCards, cards]);

  const handleNewGame = () => {
    setMessage('Bienvenue au jeu de memory!');
    setCards(generateCards());
    setSelectedCards([]);
  };

  const handleCardClick = (index) => {
    if (!cards[index].canFlip || selectedCards.length === 2) {
      return;
    }

    setCards(cards =>
      cards.map((card, cardIndex) => 
        cardIndex === index ? { ...card, isFlipped: true } : card
      )
    );
    setSelectedCards(prev => [...prev, index]);
  };

  return (
    <div className="memory-game">
      <Title>Mon jeu Memory</Title>
      <div className="button-container">
        <Button onClick={handleNewGame}>Nouvelle partie</Button>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div className="card-container" key={index}>
            <Card card={card} onCardClicked={() => handleCardClick(index)} />
          </div>
        ))}
      </div>
      <div className="message-container">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
