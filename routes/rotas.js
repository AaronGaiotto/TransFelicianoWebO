const express = require('express');
const router = express.Router();
const rotasController = require('../controllers/rotasController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/rotas', isAuthenticated, rotasController.index);
router.get('/rotas/nova', isAuthenticated, rotasController.create);
router.post('/rotas', isAuthenticated, rotasController.store);
router.get('/rotas/:id', isAuthenticated, rotasController.show);
router.get('/rotas/:id/editar', isAuthenticated, rotasController.edit);
router.put('/rotas/:id', isAuthenticated, rotasController.update);
router.delete('/rotas/:id', isAuthenticated, rotasController.destroy);

module.exports = router;
