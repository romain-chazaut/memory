import React, { useState } from 'react';
import './Register.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (username.trim() !== '') {
      onRegister(username);
    }
  };

  return (
    <div className="register">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder="Entrez votre nom" required />
        <button type="submit">Inscription</button>
      </form>
    </div>
  );
};

export default Register;
