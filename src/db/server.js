const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'todolist_db'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define API routes
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { text, priority } = req.body;
  db.query('INSERT INTO tasks (text, priority) VALUES (?, ?)', [text, priority], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: results.insertId, text, priority });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { text, priority } = req.body;
  const { id } = req.params;
  db.query('UPDATE tasks SET text = ?, priority = ? WHERE id = ?', [text, priority, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ id, text, priority });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).end();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
