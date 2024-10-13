// server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Setup SQLite database
const db = new sqlite3.Database('./reviews.db', (err) => {
  if (err) console.error('Error opening database:', err);
});

// Create table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    rating INTEGER,
    review TEXT
  )`
);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Get all reviews
app.get('/reviews', (req, res) => {
  db.all('SELECT * FROM reviews', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Submit a new review
app.post('/reviews', (req, res) => {
  const { company, rating, review } = req.body;
  db.run(
    'INSERT INTO reviews (company, rating, review) VALUES (?, ?, ?)',
    [company, rating, review],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
