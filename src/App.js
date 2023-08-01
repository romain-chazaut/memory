import React, { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import Card from './components/Card/Card';
import Register from './components/Register/Register';
import Leaderboard from './components/Leaderboard/Leaderboard';
import './App.css';

function generateCards() {
  const values = ['A', 'B', 'C', 'D', 'E', 'F'];
  let cards = values.concat(values).map(value => ({ 
    value, 
    isFlipped: false, 
    canFlip: true, 
    backImage: process.env.PUBLIC_URL + '/images/Fnac.jpg', 
    frontImage: process.env.PUBLIC_URL + `/images/${value}.jpg` 
  }));

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
  const [gameOver, setGameOver] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const firstCard = cards[selectedCards[0]];
      const secondCard = cards[selectedCards[1]];

      if (firstCard.value === secondCard.value) {
        setMessage('C\'est une paire !');

        const newCards = cards.map((card, index) => 
          index === selectedCards[0] || index === selectedCards[1] ? { ...card, canFlip: false } : card
        );
        setCards(newCards);

        if (newCards.every(card => card.canFlip === false)) {
          setMessage(`Félicitations ${currentUser}! Vous avez gagné avec ${moveCount} mouvements!`);
          setGameOver(true);

          let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || "[]");
          leaderboard.push({ user: currentUser, score: moveCount });
          localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
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
  }, [selectedCards, cards, currentUser, moveCount]);

  const handleNewGame = () => {
    console.log('New game button clicked');
    const newCards = generateCards();
    setCards(newCards.map(card => ({ ...card, isFlipped: false, canFlip: true })));
    setSelectedCards([]);
    setGameOver(false);
    setMoveCount(0);
    setMessage('Bienvenue au jeu de memory!');
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

    if (selectedCards.length === 1) {
      setMoveCount(moveCount + 1);
    }
  };

  if (!currentUser) {
    return <Register onRegister={setCurrentUser} />;
  }

  return (
    <div className="memory-game">
      <div className="game-container">
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
      </div>
      <div className="scoreboard-container">
        <div className="message-container">
          <p>{message}</p>
          {gameOver && <h2 className="victory-message">VICTOIRE!</h2>}
          {gameOver && <Leaderboard currentUser={currentUser} moveCount={moveCount} />}
        </div>
      </div>
    </div>
  );
}

export default App;
