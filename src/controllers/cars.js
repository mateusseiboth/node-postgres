const Car = require('../models/cars');

const createCar = async(req, res, next) => {
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
            await Car.insertCar(car);
            next();
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const listCar = async(req, res) => {
    try {
        const cars = await Car.listCar();
        res.send(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCar = async(req, res, next) => {
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
            await Car.updateCar(car);
            next();
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({
            "result": true,
            "content": "Erro ao atualizar carro",
            "tipo": "error"
        });
    }
};

const deleteCar = async(req, res) => {
    try {
        const { id } = req.params;
        await Car.deleteCar(id);
        res.status(200).json({ message: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar Car' });
    }
};

module.exports = { createCar, deleteCar, updateCar, listCar };