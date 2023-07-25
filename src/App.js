import React, { useState, useEffect, useRef } from 'react';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import Card from './components/Card/Card';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import PlayerForm from './components/PlayerForm/PlayerForm';
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

function useTimer(initialState = 5) {
  const [timer, setTimer] = useState(initialState);
  const countRef = useRef(null);

  const stopTimer = () => {
    clearInterval(countRef.current);
  };

  const startTimer = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(initialState);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      stopTimer();
    }
  }, [timer]);

  return { timer, startTimer, stopTimer, resetTimer };
}

function App() {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [message, setMessage] = useState('Bienvenue au jeu de memory!');
  const [turns, setTurns] = useState(0);
  const [scoreBoard, setScoreBoard] = useState(JSON.parse(localStorage.getItem('scoreBoard')) || []);
  const { timer, resetTimer } = useTimer();
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || '');

  const handleNewPlayerName = (newPlayerName) => {
    setPlayerName(newPlayerName);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTurns(turns => turns + 1); // Increase turns count
      resetTimer();

      const firstCard = cards[selectedCards[0]];
      const secondCard = cards[selectedCards[1]];

      if (firstCard.value === secondCard.value) {
        setMessage('C\'est une paire !');

        setCards(cards => 
          cards.map((card, index) => 
            index === selectedCards[0] || index === selectedCards[1] ? { ...card, canFlip: false } : card
          )
        );

        if (cards.every(card => card.canFlip === false)) {
          setMessage('Félicitations ! Vous avez gagné !');
          const newScoreBoard = [...scoreBoard, turns + 1];
          setScoreBoard(newScoreBoard);
          localStorage.setItem('scoreBoard', JSON.stringify(newScoreBoard));
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
  }, [selectedCards, cards, scoreBoard, turns, resetTimer]);

  const handleNewGame = () => {
    setMessage('Bienvenue au jeu de memory!');
    setCards(generateCards());
    setSelectedCards([]);
    setTurns(0);
    resetTimer();
  };

  const handleCardClick = (index) => {
    if (!cards[index].canFlip || selectedCards.length === 2) {
      return;
    }

    // Start timer on the first card click
    // if (selectedCards.length === 0) {
    //   startTimer();
    // }

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
      {!playerName ? (
        <PlayerForm onPlayerNameSubmit={handleNewPlayerName} />
      ) : (
        <>
          <h2>Bienvenue, {playerName}!</h2>
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
            <p>Nombre de tours: {turns}</p>
            <p>Temps restant: {timer}</p>
          </div>
          <ScoreBoard scoreBoard={scoreBoard} />
        </>
      )}
    </div>
  );
}

export default App;
