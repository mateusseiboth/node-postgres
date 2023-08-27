const { Router } = require('express');
const createCarRouter = require('./cars');
const createUserRouter = require('./user');
const createClientRouter = require('./client');
const ticketRouter = require('./ticket');
const vagaRouter = require('./vaga');
const tipoRouter = require('./tipo');


const createRoute = () => {
    function start() {
        console.log('[ROUTES] Starting...');
        const router = Router();
        const car = createCarRouter();
        const user = createUserRouter();
        const client = createClientRouter();

        router.use('/car', car.start());
        router.use('/user', user.start());
        router.use('/client', client.start());
        router.use('/ticket', ticketRouter);
        router.use('/tipo', tipoRouter);
        router.use('/vaga', vagaRouter);

        console.log('[ROUTES] Done.');
        return router;
    }
    return { start: start };
}



module.exports = createRoute;