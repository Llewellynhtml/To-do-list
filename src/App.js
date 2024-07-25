import React, { useState } from 'react';
import Registration from './components/Registration';
import Login from './components/Login';
import ToDoList from './components/ToDoList';
import './App.css';


const App = () => {
  const [currentView, setCurrentView] = useState('register');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app-container">
      <nav>
        <button onClick={() => handleViewChange('register')}>Register</button>
        <button onClick={() => handleViewChange('login')}>Login</button>
        <button onClick={() => handleViewChange('tasks')}>Tasks</button>
      </nav>
      {currentView === 'register' && <Registration />}
      {currentView === 'login' && <Login />}
      {currentView === 'tasks' && <ToDoList />}
    </div>
  );
};

export default App;
