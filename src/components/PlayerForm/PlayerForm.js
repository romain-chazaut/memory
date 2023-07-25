import React, { useState } from 'react';

const PlayerForm = ({ onPlayerNameSubmit }) => {
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || '');

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handlePlayerNameSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('playerName', playerName);
    onPlayerNameSubmit(playerName);
  };

  return (
    <form onSubmit={handlePlayerNameSubmit}>
      <input type="text" value={playerName} onChange={handlePlayerNameChange} placeholder="Entrez votre nom" />
      <input type="submit" value="Commencer à jouer" />
    </form>
  );
};

export default PlayerForm;
