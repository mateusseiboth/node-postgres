const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

router.post('/new', rateLimit, verifyToken, carController.createCar, (req, res) => {
  res.status(201).json({message: "Car criado"})
});

router.delete('/:id', rateLimit, verifyToken, carController.deleteCar, (req, res) => {
  res.status(200).json({ message: 'car excluído com sucesso' });
});

router.put('/update', rateLimit, verifyToken, carController.updateCar, (req, res) => {
    res.status(200).json({message: 'car atualizado com sucesso'})
});

router.get('/list', rateLimit, verifyToken, carController.listCar, (req, res) => {
  
});

module.exports = router;