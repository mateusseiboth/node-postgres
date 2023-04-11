const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/index');
const pool = require('./database/db');

app.use(cors());
app.use(express.json());
const appBase = '/api/v1'

app.use(appBase, router);

// Connect to database
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err);
    process.exit(1);
  }
  console.log('Connected to database');
});

module.exports = app;