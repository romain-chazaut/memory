import React from 'react';

const ScoreBoard = ({ scoreBoard }) => (
  <div>
    <h2>Tableau des scores:</h2>
    {scoreBoard.map((score, index) => (
      <p key={index}>Jeu {index + 1}: {score} tours</p>
    ))}
  </div>
);

export default ScoreBoard;
