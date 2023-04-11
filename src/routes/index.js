const { Router } = require('express');
//const carRouter = require('./Cars/cars');
const userRouter = require('./user');
//const ticketRouter = require('./Ticket/ticket');
const vagaRouter = require('./vaga');
const tipoRouter = require('./tipo');

const router = Router();

//router.use('/car', carRouter);
router.use('/user', userRouter);
//router.use('/ticket', ticketRouter);
router.use('/tipo', tipoRouter);
router.use('/vaga', vagaRouter);


module.exports = router;