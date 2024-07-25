const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


const createTables = () => {
    
    const userSql = `
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
    `;
    db.prepare(userSql).run();

    
    const taskSql = `
    CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        work TEXT,
        priority TEXT CHECK(priority IN ('high', 'medium', 'low')),
        due_date DATE
    )
    `;
    db.prepare(taskSql).run();
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


app.get('/users', (req, res) => {
    const sql = `
    SELECT * FROM user
    `;
    try {
        const rows = db.prepare(sql).all();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});


app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
    SELECT * FROM user
    WHERE id = ?
    `;
    try {
        const row = db.prepare(sql).get(id);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});


app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const sql = `
    UPDATE user
    SET username = ?, email = ?, password = ?
    WHERE id = ?
    `;
    try {
        const info = db.prepare(sql).run(username, email, password, id);
        if (info.changes > 0) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Invalid data format' });
    }
});


app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
    DELETE FROM user
    WHERE id = ?
    `;
    try {
        const info = db.prepare(sql).run(id);
        if (info.changes > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});



// Create a task
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
        res.status(400).json({ error: 'Invalid data format' });
    }
});


app.get('/tasks', (req, res) => {
    const sql = `
    SELECT * FROM task
    `;
    try {
        const rows = db.prepare(sql).all();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});


app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
    SELECT * FROM task
    WHERE id = ?
    `;
    try {
        const row = db.prepare(sql).get(id);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
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
        if (info.changes > 0) {
            res.json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Invalid data format' });
    }
});


app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
    DELETE FROM task
    WHERE id = ?
    `;
    try {
        const info = db.prepare(sql).run(id);
        if (info.changes > 0) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
