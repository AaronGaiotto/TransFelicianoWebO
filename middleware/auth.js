function isAuthenticated(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  req.flash('error', 'Por favor, faça login para acessar o sistema.');
  return res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (req.session && req.session.usuario && req.session.usuario.perfil === 'admin') {
    return next();
  }
  req.flash('error', 'Acesso restrito a administradores.');
  return res.redirect('/dashboard');
}

function isGuest(req, res, next) {
  if (req.session && req.session.usuario) {
    return res.redirect('/dashboard');
  }
  return next();
}

module.exports = { isAuthenticated, isAdmin, isGuest };
