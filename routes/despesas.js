const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/despesas', isAuthenticated, (req, res) => {
  res.render('pages/despesas', {
    title: 'Despesas — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'despesas'
  });
});

module.exports = router;
