const Client = require('../models/client');

const createClient = async (req, res, next) => {
  try {
    const client = req.body;
    const newClient = await Client.insertClient(client);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateClient = async (req, res) => {
    try {
      const client = req.body;
      await Client.updateClient(client);
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar client' });
    }
  };
  
  const deleteClient = async (req, res) => {
    try {
      const { id } = req.params;
      await Client.deleteClient(id);
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  };



module.exports = { createClient, updateClient, deleteClient };