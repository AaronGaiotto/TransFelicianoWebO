const express = require('express');
const router = express.Router();
const motoristasController = require('../controllers/motoristasController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/motoristas', isAuthenticated, motoristasController.index);
router.get('/motoristas/novo', isAuthenticated, motoristasController.create);
router.post('/motoristas', isAuthenticated, motoristasController.store);
router.get('/motoristas/:id', isAuthenticated, motoristasController.show);
router.get('/motoristas/:id/editar', isAuthenticated, motoristasController.edit);
router.put('/motoristas/:id', isAuthenticated, motoristasController.update);
router.delete('/motoristas/:id', isAuthenticated, motoristasController.destroy);

module.exports = router;
