const express = require('express');
const router = express.Router();
const createController = require('../controllers/cars');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

const createRoute = () => {
    function start() {
        const controller = createController();

        router.post('/new', rateLimit, verifyToken, controller.start().create);
        router.delete('/:id', rateLimit, verifyToken, controller.start().deleta);
        router.put('/update', rateLimit, verifyToken, controller.start().update);
        router.get('/list', rateLimit, verifyToken, controller.start().list);

        return router;
    }

    return { start: start };
}

module.exports = createRoute;