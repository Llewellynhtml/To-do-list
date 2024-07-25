import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
  // User management states
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  return (
    <div className="app-container">
      <h2>Get User by ID</h2>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={() => fetchUser(userId)}>Fetch User</button>
      {user && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
