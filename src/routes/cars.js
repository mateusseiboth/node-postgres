const express = require('express');
const router = express.Router();
const createController = require('../controllers/cars');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

const createRoute = () => {
    function start() {
        const controller = createController();
        router.post('/new', rateLimit, verifyToken, controller.start().create, (req, res) => {
            res.status(201).send({
                "result": true,
                "content": "Carro inserido com sucesso",
                "tipo": "success"
            });
        });

        router.delete('/:id', rateLimit, verifyToken, controller.start().deleta, (req, res) => {
            res.status(200).json({ message: 'car excluído com sucesso' });
        });

        router.put('/update', rateLimit, verifyToken, controller.start().update, (req, res) => {
            res.status(200).send({
                "result": true,
                "content": "Carro atualizado com sucesso",
                "tipo": "success"
            });
        });

        router.get('/list', rateLimit, verifyToken, controller.start().list, (req, res) => {

        });
        return router;
    }

    return { start: start };
}

module.exports = createRoute;