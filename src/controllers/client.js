const createModel = require('../models/model');
const model = createModel();

const createController = () => {
    function validar(nome, cpf, telefone, id, method) {
        try {
            let message = []
            if (method === 'deleta') {
                if (id == null || id == '') {
                    message.push('Id não informado');
                } else {
                    return true;
                }
            }
            if (method === "update") {
                if (id == null || id == '') {
                    message.push('Id não informado');
                }
            }
            if (!nome || nome === '' || nome === null || nome === undefined) {
                message.push('Nome não informado');
            }
            if (!cpf || cpf === '' || cpf === null || cpf === undefined) {
                message.push('cpf não informado');
            }
            if (!telefone || telefone === '' || telefone === null || telefone === undefined) {
                message.push('telefone não informado');
            }
            if (message.length > 0) {
                throw new Error(message)
            }
            return true;
        } catch (err) {
            throw new Error([err])
        }
    }

    function start() {
        const create = async(req, res, next) => {
            try {
                const client = req.body;
                validar(client.nome, client.cpf, client.telefone, null, 'create');
                const newClient = await model.start('cliente', 'create', client);
                res.status(201).json({
                    "result": true,
                    "content": "Sucesso ao criar cliente",
                    "tipo": "success"
                })
            } catch (err) {
                res.status(400).send({
                    "result": true,
                    "content": "Erro ao criar cliente",
                    "tipo": "error",
                    "message": err.message
                });
            }
        };
        const list = async(req, res) => {
            try {
                const clientes = await model.start('cliente', 'find');
                res.status(200).json({ clientes: clientes });
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "result": true,
                    "content": "Erro ao atualizar cliente",
                    "tipo": "error",
                    "message": error.message
                });
            }
        };
        const update = async(req, res) => {
            try {
                const client = req.body;
                validar(client.nome, client.cpf, client.telefone, client.id, 'update');
                const clientes = await model.start('cliente', 'update', client);
                res.status(200).send({
                    "result": true,
                    "content": "Sucesso ao atualizar cliente",
                    "tipo": "success"
                });
            } catch (error) {
                console.error(error);
                res.status(400).send({
                    "result": true,
                    "content": "Erro ao atualizar cliente",
                    "tipo": "error",
                    "message": error.message
                });
            }
        };
        const deleta = async(req, res) => {
            try {
                const { id } = req.params;
                validar(null, null, null, id, 'deleta');
                const clientes = await model.start('cliente', 'deleta', { id: id });
                res.status(202).send({
                    "result": true,
                    "content": "Sucesso ao deletar cliente",
                    "tipo": "success"
                });
            } catch (error) {
                console.error(error);
                res.status(400).send({
                    "result": true,
                    "content": "Erro ao deletar cliente",
                    "tipo": "error",
                    "message": error.message
                });
            }
        }
        return {
            create: create,
            deleta: deleta,
            list: list,
            update: update
        }
    }
    return { start: start }
}


module.exports = createController;