const express = require('express');
const router = express.Router();
const caminhoesController = require('../controllers/caminhoesController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/caminhoes', isAuthenticated, caminhoesController.index);
router.get('/caminhoes/novo', isAuthenticated, caminhoesController.create);
router.post('/caminhoes', isAuthenticated, caminhoesController.store);
router.get('/caminhoes/:id', isAuthenticated, caminhoesController.show);
router.get('/caminhoes/:id/editar', isAuthenticated, caminhoesController.edit);
router.put('/caminhoes/:id', isAuthenticated, caminhoesController.update);
router.delete('/caminhoes/:id', isAuthenticated, caminhoesController.destroy);

module.exports = router;
