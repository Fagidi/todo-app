const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

let tasks = []; 

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/api/tasks', (req, res) => res.json(tasks));

// POST a new task
app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body, done: false };
  tasks.push(task);
  res.json(task);
});

// PUT to update a task
app.put('/api/tasks/:id', (req, res) => {
  const id = +req.params.id;
  tasks = tasks.map(t => (t.id === id ? { ...t, ...req.body } : t));
  res.json({ success: true });
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = +req.params.id;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
