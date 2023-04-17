const express = require('express');
const router = express.Router();
const vagaController = require('../controllers/vaga');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

router.get('/new', rateLimit, verifyToken, vagaController.createVaga, (req, res) => {
  res.status(201).json({message: "Vaga criada", result: "true"})
});

router.delete('/:id', rateLimit, verifyToken, vagaController.deleteVaga, (req, res) => {
  res.status(200).json({ message: 'Vaga excluída com sucesso' });
});

router.get('/list', rateLimit, verifyToken, vagaController.listarVagas, (req, res) => {})

module.exports = router;