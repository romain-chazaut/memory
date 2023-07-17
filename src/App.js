import React, { useState } from 'react';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import Card from './components/Card/Card';

function generateCards() {
  const values = ['A', 'B', 'C', 'D', 'E', 'F'];
  let cards = values.concat(values).map(value => ({ value, isFlipped: false }));
  
  // Mélanger les cartes
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

function App() {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (clickedCard) => {
    const newCards = cards.map(card => 
      card === clickedCard ? { ...card, isFlipped: true } : card
    );

    if (selectedCards.length === 0) {
      setSelectedCards([clickedCard]);
      setCards(newCards);
    } else if (selectedCards.length === 1) {
      const [firstCard] = selectedCards;
      
      // Si les cartes correspondent, les laisser retournées
      if (firstCard.value === clickedCard.value) {
        setSelectedCards([]);
        setCards(newCards);
      } 
      // Si elles ne correspondent pas, les retourner à nouveau après un délai
      else {
        setTimeout(() => {
          setCards(cards.map(card => 
            card === clickedCard || card === firstCard ? { ...card, isFlipped: false } : card
          ));
        }, 1000);
        
        setSelectedCards([]);
      }
    }
  };

  return (
    <div>
      <Title>Mon jeu Memory</Title>
      <Button onClick={() => setCards(generateCards())}>Nouvelle partie</Button>
      {cards.map((card, index) => (
        <Card key={index} card={card} onCardClicked={handleCardClick} />
      ))}
    </div>
  );
}

export default App;
