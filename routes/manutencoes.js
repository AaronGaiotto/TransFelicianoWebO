const express = require('express');
const router = express.Router();
const manutencoesController = require('../controllers/manutencoesController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/manutencoes', isAuthenticated, manutencoesController.index);
router.get('/manutencoes/nova', isAuthenticated, manutencoesController.create);
router.post('/manutencoes', isAuthenticated, manutencoesController.store);
router.get('/manutencoes/:id', isAuthenticated, manutencoesController.show);
router.get('/manutencoes/:id/editar', isAuthenticated, manutencoesController.edit);
router.put('/manutencoes/:id', isAuthenticated, manutencoesController.update);
router.delete('/manutencoes/:id', isAuthenticated, manutencoesController.destroy);

module.exports = router;
