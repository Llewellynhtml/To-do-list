import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import TodoList from './components/ToDoList';
import Logo from './Checkmate.Logo.svg.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <img src={Logo} alt='Checkmate Logo' className='app-logo' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/todolist" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




