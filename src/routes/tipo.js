//to-do Modificar pattern para Factory


const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipo');
const { verifyToken } = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

router.post('/new', rateLimit, verifyToken, tipoController.createTipo, (req, res) => {
    res.status(201).json({ message: "Tipo criado" })
});

router.delete('/:id', rateLimit, verifyToken, tipoController.deleteTipo, (req, res) => {
    res.status(200).json({ message: 'Tipo excluído com sucesso' });
});

router.put('/update', rateLimit, verifyToken, tipoController.updateTipo, (req, res) => {
    res.status(200).json({ message: 'Tipo atualizado com sucesso' })
});

router.get('/list', rateLimit, verifyToken, tipoController.listarTipos, (req, res) => {

});

module.exports = router;