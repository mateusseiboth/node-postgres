const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipo');
const { verifyToken } = require('../middlewares/auth');

router.post('/new', verifyToken, tipoController.createTipo, (req, res) => {
  res.status(201).json({message: "Tipo criado"})
});

router.delete('/:id', verifyToken, tipoController.deleteTipo, (req, res) => {
  res.status(200).json({ message: 'Tipo excluído com sucesso' });
});

router.put('/update', verifyToken, tipoController.updateTipo, (req, res) => {
    res.status(200).json({message: 'Tipo atualizado com sucesso'})
});

module.exports = router;