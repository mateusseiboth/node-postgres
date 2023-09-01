const createModel = require('../models/model');
const model = createModel();


const createController = () => {
    function validar(placa, cliente_id, id, method) {
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
            if (placa == null || placa == '') {
                message.push('Placa não informada');
            }
            if (cliente_id == null || cliente_id == '') {
                message.push('Cliente não informado');
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
                const car = req.body;
                validar(car.placa, car.cliente_id, null, "create");
                const newInsert = await model.start('carro', 'create', car);
                res.status(200).json({
                    "result": true,
                    "content": "Carro inserido com sucesso",
                    "tipo": "success",
                    "message": "Carro inserido com sucesso"
                })
            } catch (err) {
                res.status(400).json({
                    "result": true,
                    "content": "Erro ao inserir carro",
                    "tipo": "error",
                    "message": err.message
                });
            }
        };
        const list = async(req, res) => {
            try {
                const cars = await model.start('carro', 'find');
                res.status(200).json({ carros: cars });
            } catch (err) {
                res.status(400).json({
                    "result": true,
                    "content": "Erro ao listar carro",
                    "tipo": "error",
                    "message": err.message
                });
            }
        };
        const update = async(req, res, next) => {
            let message = [];
            try {
                const car = req.body;
                validar(car.placa, car.cliente_id, car.id, "update");
                await model.start('carro', 'update', car);
                res.status(200).json({
                    "result": true,
                    "content": "Carro atualizado com sucesso",
                    "tipo": "success",
                    "message": "Carro atualizado com sucesso"
                })
            } catch (error) {
                console.error(error);
                res.status(400).send({
                    "result": true,
                    "content": "Erro ao atualizar carro",
                    "tipo": "error",
                    "message": [error.message]
                });
            }
        };

        const deleta = async(req, res) => {
            try {
                const { id } = req.params;
                validar(null, null, id, "deleta");
                const result = await model.start('carro', 'deleta', { id: id });
                res.status(202).json({
                    "result": true,
                    "content": "Carro deletado com sucesso",
                    "tipo": "success",
                    "message": "Carro deletado com sucesso"
                });
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: 'Erro ao deletar carro', message: error.message });
            }
        };

        return {
            create: create,
            deleta: deleta,
            update: update,
            list: list
        };

    }
    return { start: start };
}

module.exports = createController;