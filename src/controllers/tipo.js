//to-do Modificar pattern para Factory

const Tipo = require('../models/tipo');

const createTipo = async(req, res, next) => {
    try {
        const tipo = req.body;
        const novoTipo = await Tipo.insertTipo(tipo);
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTipo = async(req, res) => {
    try {
        const tipo = req.body;
        await Tipo.updateTipo(tipo);
        res.status(200).json({ message: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar tipo' });
    }
};

const listarTipos = async(req, res) => {
    try {
        const tipos = await Tipo.listarTipos();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao listar tipo' });
    }
};

const deleteTipo = async(req, res) => {
    try {
        const { id } = req.params;
        await Tipo.deleteTipo(id);
        res.status(200).json({ message: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar tipo' });
    }
};

module.exports = { createTipo, deleteTipo, updateTipo, listarTipos };