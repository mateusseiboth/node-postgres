const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = process.env.DATABASE_URL;

const ssl = isProduction ? { rejectUnauthorized: false } : false;

const pool = new Pool({
  connectionString,
  ssl,
});

module.exports = pool;