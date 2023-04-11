const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');

router.post('/new', UserController.createUser);

router.post('/authenticate', UserController.authenticateUser);

router.get('/me', verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
});

module.exports = router;