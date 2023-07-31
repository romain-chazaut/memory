import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Lors du montage du composant, récupérez les scores du localStorage
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || "[]");
    leaderboard.sort((a, b) => b.score - a.score); // Trier par score décroissant
    setScores(leaderboard);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Tableau des scores</h2>
      <table>
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.user}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
