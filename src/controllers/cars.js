const createModel = require('../models/cars');


const createController = () => {
    const model = createModel();

    function start() {
        const create = async(req, res, next) => {
            try {
                let message = [];
                const car = req.body;
                if (car) {
                    if (car.placa == null || car.placa == '') {
                        message.push('Placa não informada');
                    }
                    if (car.cliente_id == null || car.cliente_id == '') {
                        message.push('Cliente não informado');
                    }
                }
                if (message.length > 0) {
                    res.status(400).json({ error: message });
                } else {
                    await model.start().insert(car);
                    next();
                }

            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        };

        const list = async(req, res) => {
            try {
                const cars = await model.start().list();
                res.status(200).send(cars);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        };

        const update = async(req, res, next) => {
            let message = [];

            try {
                const car = req.body;
                if (req.body.id == null || req.body.id == '') {
                    message.push('Id não informado');
                }
                if (req.body.placa == null || req.body.placa == '') {
                    message.push('Placa não informada');
                }
                if (req.body.cliente_id == null || req.body.cliente_id == '') {
                    message.push('Cliente não informado');
                }
                if (message.length > 0) {
                    res.status(400).json({ error: message });
                } else {
                    await model.start().update(car);
                    next();
                }

            } catch (error) {
                console.error(error);
                res.status(400).send({
                    "result": true,
                    "content": "Erro ao atualizar carro",
                    "tipo": "error"
                });
            }
        };

        const deleta = async(req, res) => {
            try {
                const { id } = req.params;
                await model.start().deleta(id);
                res.status(200).json({ message: 'ok' });
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: 'Erro ao deletar Car' });
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