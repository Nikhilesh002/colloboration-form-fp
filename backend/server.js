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

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});