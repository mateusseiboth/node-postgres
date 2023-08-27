const express = require('express');
const router = express.Router();
const createController = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

const createRoute = () => {
    function start() {
        const controller = createController();
        router.post('/new', rateLimit, controller.start().create);
        router.post('/authenticate', rateLimit, controller.start().authenticateUser);
        router.get('/me', rateLimit, verifyToken, (req, res) => {
            const user = req.user;
            res.status(200).json({ user });
        });
        router.post('/renewToken', rateLimit, verifyToken, (req, res) => {
            const user = req.user;
            controller.start().renewToken(user, res);
        });
        return router;
    }
    return {
        start: start
    }
}

module.exports = createRoute;