const { promisify } = require('util');
const dotenv = require('dotenv');

dotenv.config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const expiresIn = "1h"
function generateToken(payload) {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
}


module.exports = { generateToken };