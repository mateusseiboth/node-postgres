const express = require('express');
const router = express.Router();
const vagaController = require('../controllers/vaga');
const { verifyToken } = require('../middlewares/auth');

router.get('/new', verifyToken, vagaController.createVaga, (req, res) => {
  res.status(201).json({message: "Vaga criada"})
});

router.delete('/:id', verifyToken, vagaController.deleteVaga, (req, res) => {
  res.status(200).json({ message: 'Vaga excluída com sucesso' });
});

module.exports = router;