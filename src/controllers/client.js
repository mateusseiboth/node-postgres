const Client = require('../models/client');

const createClient = async (req, res, next) => {
  try {
    const client = req.body;
    const newClient = await Client.insertClient(client);
    next();
  } catch (err) {
    res.status(500).send(
      {
        "result": true,
        "content": "Erro ao criar cliente",
        "tipo": "error"
      });
  }
};


const listarCliente = async (req, res) => {
  try{
    const clientes = await Client.listarCliente();
    res.send(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: err.message});
  }
};

const updateClient = async (req, res) => {
    try {
      const client = req.body;
      await Client.updateClient(client);
      res.status(200).send(
        {
          "result": true,
          "content": "Sucesso ao atualizar cliente",
          "tipo": "success"
        });
    } catch (error) {
      console.error(error);
      res.status(500).send(
        {
          "result": true,
          "content": "Erro ao atualizar cliente",
          "tipo": "error"
        });
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



module.exports = { createClient, updateClient, deleteClient, listarCliente };