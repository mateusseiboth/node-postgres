const { Router } = require('express');
const createCarRouter = require('./cars');
const userRouter = require('./user');
const ticketRouter = require('./ticket');
const vagaRouter = require('./vaga');
const tipoRouter = require('./tipo');
const clientRouter = require('./client');

const createRoute = () => {
    function start() {
        console.log('[ROUTES] Starting...');
        const router = Router();
        const car = createCarRouter();

        router.use('/car', car.start());
        router.use('/user', userRouter);
        router.use('/ticket', ticketRouter);
        router.use('/tipo', tipoRouter);
        router.use('/vaga', vagaRouter);
        router.use('/client', clientRouter);
        console.log('[ROUTES] Done.');
        return router;
    }
    return { start: start };
}



module.exports = createRoute;