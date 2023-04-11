const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function generateToken(payload) {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = { generateToken };