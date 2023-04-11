const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket');
const { verifyToken } = require('../middlewares/auth');

router.post('/new', verifyToken, ticketController.createTicket, (req, res) => {
  res.status(201).json({message: "Ticket criado"})
});

router.put('/:id', verifyToken, ticketController.encerrarTicket, (req, res) => {
  res.status(200).json({ message: 'Ticket encerrado com sucesso' });
});


module.exports = router;