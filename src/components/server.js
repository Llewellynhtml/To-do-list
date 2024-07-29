const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const createTables = () => {
  const userTableSql = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `;

  const taskTableSql = `
    CREATE TABLE IF NOT EXISTS task (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      work TEXT,
      priority TEXT,
      due_date TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES user(id)
    )
  `;

  db.prepare(userTableSql).run();
  db.prepare(taskTableSql).run();
};

createTables();

app.post('/users', (req, res) => {
  const { username, email, password } = req.body;
  const sql = `
    INSERT INTO user (username, email, password)
    VALUES (?, ?, ?)
  `;
  try {
    const info = db.prepare(sql).run(username, email, password);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data or user already exists' });
  }
});

// Authentication Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `
    SELECT * FROM user
    WHERE email = ? AND password = ?
  `;
  try {
    const user = db.prepare(sql).get(email, password);
    if (user) {
      // Generate and send a token or session info here if needed
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Task management endpoints
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM task';
  try {
    const tasks = db.prepare(sql).all();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.post('/tasks', (req, res) => {
  const { name, age, work, priority, due_date } = req.body;
  const sql = `
    INSERT INTO task (name, age, work, priority, due_date)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const info = db.prepare(sql).run(name, age, work, priority, due_date);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Error adding task' });
  }
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, work, priority, due_date } = req.body;
  const sql = `
    UPDATE task
    SET name = ?, age = ?, work = ?, priority = ?, due_date = ?
    WHERE id = ?
  `;
  try {
    const info = db.prepare(sql).run(name, age, work, priority, due_date, id);
    if (info.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM task WHERE id = ?';
  try {
    const info = db.prepare(sql).run(id);
    if (info.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
