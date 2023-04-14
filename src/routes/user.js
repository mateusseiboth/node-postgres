const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

router.post('/new',rateLimit, UserController.createUser);

router.post('/authenticate',rateLimit, UserController.authenticateUser);

router.get('/me', rateLimit,verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
});

module.exports = router;