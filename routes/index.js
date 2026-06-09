const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session && req.session.usuario) {
    return res.redirect('/dashboard');
  }
  return res.redirect('/login');
});

module.exports = router;
