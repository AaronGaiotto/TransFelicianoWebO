const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.get('/usuarios', isAuthenticated, isAdmin, (req, res) => {
  res.render('pages/usuarios', {
    title: 'Usuários — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'usuarios'
  });
});

module.exports = router;
