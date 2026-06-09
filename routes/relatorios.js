const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/relatorios', isAuthenticated, (req, res) => {
  res.render('pages/relatorios', {
    title: 'Relatórios — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'relatorios'
  });
});

module.exports = router;
