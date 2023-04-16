const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

router.post('/new', rateLimit, verifyToken, ticketController.createTicket, (req, res) => {
  res.status(201).send(
    {
      "result": true,
      "content": "Sucesso ao criar ticket",
      "tipo": "success"
    });
});

router.put('/:id', rateLimit, verifyToken, ticketController.encerrarTicket, (req, res) => {
  res.status(200).json({ message: 'Ticket encerrado com sucesso' });
});

router.get('/listAtivo', rateLimit, verifyToken, ticketController.listarTickets, (req, res)=>{});

router.get('/listAll', rateLimit, verifyToken, ticketController.listarTicketsAll, (req, res)=>{});


module.exports = router;