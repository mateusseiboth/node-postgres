const pool = require('../database/db');

const insertUser = async (user) => {
  const { username, password } = user;
  const query = {
    text: 'INSERT INTO usuario(username, password) VALUES($1, $2) RETURNING *',
    values: [username, password]
  };
  const result = await pool.query(query);
  return result;
};

const findUserByUsername = async (username) => {
  const query = {
    text: 'SELECT * FROM usuario WHERE username = $1',
    values: [username]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

module.exports = {
  insertUser,
  findUserByUsername
};