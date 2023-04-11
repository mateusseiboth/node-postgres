const Vaga = require('../models/vaga');

const createVaga = async (req, res, next) => {
  try {
    const novaVaga = await Vaga.insertVaga();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
};

const deleteVaga = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    await Vaga.deleteVaga(id);
    res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar vaga' });
  }
};

module.exports = { createVaga, deleteVaga };