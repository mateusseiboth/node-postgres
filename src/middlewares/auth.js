const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = {
  verifyToken
};

module.exports = {
  authenticateToken, verifyToken
};