import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    navigate('/login');
  }

  return (
    <div className="registration-container">
      <h3 className="registration-title">Register</h3>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="registration-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="registration-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="registration-input"
        />
        <button type="submit" className="registration-button">Register</button>
      </form>
    </div>
  );
}

export default Registration;

