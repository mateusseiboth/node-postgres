const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars');
const { verifyToken } = require('../middlewares/auth');

router.post('/new', verifyToken, carController.createCar, (req, res) => {
  res.status(201).json({message: "Car criado"})
});

router.delete('/:id', verifyToken, carController.deleteCar, (req, res) => {
  res.status(200).json({ message: 'car excluído com sucesso' });
});

router.put('/update', verifyToken, carController.updateCar, (req, res) => {
    res.status(200).json({message: 'car atualizado com sucesso'})
});

module.exports = router;