require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  res.json({ message: `Hello, ${name}!` });
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} profile` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});