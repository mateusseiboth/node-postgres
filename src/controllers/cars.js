const Car = require('../models/cars');

const createCar = async (req, res, next) => {
  try {
    const car = req.body;
    const novoCar = await Car.insertCar(car);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listCar = async (req, res) => {
  try {
    const cars = await Car.listCar();
    res.send(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = req.body;
    await Car.updateCar(car);
    res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar Car' });
  }
};

const deleteCar = async (req, res) => {
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