import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './components/Checkmate.Logo.svg.png';
import Registration from './components/Registration';
import Login from './components/Login';
import ToDoList from './components/ToDoList';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/logout');
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="app-container">
      <img src={Logo} alt="Checkmate Logo" className="logo" />
      <nav>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/tasks">
          <button>ToDoList</button>
        </Link>
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </nav>
      <div className="component-container">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<ToDoList />} />
        </Routes>
      </div>
    </div>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
