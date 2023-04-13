const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const { verifyToken } = require('../middlewares/auth');

router.post('/new', verifyToken, clientController.createClient, (req, res) => {
  res.status(201).json({message: "Client criado"})
});

router.delete('/:id', verifyToken, clientController.deleteClient, (req, res) => {
  res.status(200).json({ message: 'Client excluído com sucesso' });
});

router.put('/update', verifyToken, clientController.updateClient, (req, res) => {
    res.status(200).json({message: 'Client atualizado com sucesso'})
});

router.get('/list', verifyToken, clientController.listarCliente, (req, res)=>{});

module.exports = router;