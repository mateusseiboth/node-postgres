//to-do Modificar pattern para Factory

const createModel = require('../models/model');
const model = createModel();
const create = async(req, res) => {

    try {
        console.log(req.body)
        const tipo = req.body;
        const newInsert = await model.start('tipo', 'create', tipo);
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err });
    }
};

const update = async(req, res) => {
    try {
        const tipo = req.body;
        const result = await model.start('tipo', 'update', tipo);
        res.status(200).json({ message: 'ok', data: result });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao atualizar tipo' });
    }
};

const list = async(req, res) => {
    try {
        const tipos = await model.start('tipo', 'find');
        console.log(tipos)
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao listar tipo' });
    }
};

const findBy = async(req, res) => {
    try {
        const tipo = req.body;
        const tipos = await model.start('tipo', 'findBy', tipo);
        console.log(tipos)
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao listar tipo' });
    }
};

const deleta = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await model.start('tipo', 'deleta', { id: id });
        res.status(200).json({ message: 'ok', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar tipo' });
    }
};

module.exports = { create, deleta, update, list, findBy };