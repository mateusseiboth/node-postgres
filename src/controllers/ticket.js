const Ticket = require('../models/ticket');

const createTicket = async (req, res, next) => {
  try {
    const novoTicket = await Ticket.insertTicket();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar Ticket' });
  }
};



module.exports = { createTicket };