const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

router.post('/new', rateLimit, verifyToken, clientController.createClient, (req, res) => {
  res.status(201).send(
    {
      "result": true,
      "content": "Sucesso ao criar cliente",
      "tipo": "success"
    });
});

router.delete('/:id', rateLimit, verifyToken, clientController.deleteClient, (req, res) => {
  res.status(200).json({ message: 'Client excluído com sucesso' });
});

router.put('/update', rateLimit, verifyToken, clientController.updateClient, (req, res) => {
  res.status(200).send(
    {
      "result": true,
      "content": "Sucesso ao atualizar cliente",
      "tipo": "success"
    });
});

router.get('/list', rateLimit, verifyToken, clientController.listarCliente, (req, res)=>{});

module.exports = router;