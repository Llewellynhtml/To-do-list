import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Registration = () => {
  // User management states
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post('http://localhost:3001/users', { username, email, password });
      setUsername('');
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (id) => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, { username: editUsername, email: editEmail, password: editPassword });
      setEditUserId(null);
      setEditUsername('');
      setEditEmail('');
      setEditPassword('');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUserClick = (user) => {
    setEditUserId(user.id);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditPassword(user.password);
  };

  return (
    <div className="registration-container">
      <h1 className="title">User Management</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            {editUserId === user.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  placeholder="Username"
                  className="form-input"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="Email"
                  className="form-input"
                />
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Password"
                  className="form-input"
                />
                <div className="button-group">
                  <button onClick={() => updateUser(user.id)} className="update-button">Update</button>
                  <button onClick={() => setEditUserId(null)} className="cancel-button">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="user-details">
                <span className="user-info">{user.username} - {user.email}</span>
                <div className="button-group">
                  <button onClick={() => handleEditUserClick(user)} className="edit-button">Edit</button>
                  <button onClick={() => deleteUser(user.id)} className="delete-button">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add-user-form">
        <h2 className="subtitle">Add User</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button onClick={addUser} className="add-button">Add</button>
      </div>
    </div>
  );
};

export default Registration;
