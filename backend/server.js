// server.js
const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const path=require('path');

const app = express();
const port = 3001; // Choose a port for your backend server

app.use(cors()); // To allow requests from your frontend
app.use(express.json());

// app.use(__path.join())
app.use(express.static(path.join(__dirname, '../client/dist')));

// Create a pool connection
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kalki",  // Database name
    connectionLimit: 10
});

// Define a route to get collabs
app.get('/api/collab', (req, res) => {
    pool.query('SELECT * FROM collab', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Define a route to post new collab
app.post('/api/collabs', (req, res) => {
  const { collab_id,title, name_of_collab, participants, start_date, end_date, nature, link, branch, created_date } = req.body;
  console.log(req.body);
  const query = 'INSERT INTO collab (collab_id,title, name_of_collab, participants, start_date, end_date, nature, link, branch, created_date) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)';
  console.log(query);
  pool.query(query, [collab_id,title, name_of_collab, participants, start_date, end_date, nature, link, branch, created_date], (err, results) => {
    console.log(err);
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Collaboration added successfully!', collabId: results.insertId });
  });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});