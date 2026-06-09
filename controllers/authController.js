const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  if (req.session && req.session.usuario) {
    return res.redirect('/dashboard');
  }
  res.render('auth/login', {
    title: 'Login — TransFelicianoWeb',
    error: req.flash('error'),
    success: req.flash('success')
  });
};

exports.postLogin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    req.flash('error', 'Preencha e-mail e senha.');
    return res.redirect('/login');
  }

  try {
    const usuario = await User.findByEmail(email.trim().toLowerCase());

    if (!usuario) {
      req.flash('error', 'E-mail ou senha inválidos.');
      return res.redirect('/login');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      req.flash('error', 'E-mail ou senha inválidos.');
      return res.redirect('/login');
    }

    await User.updateUltimoAcesso(usuario.id);

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    };

    req.flash('success', `Bem-vindo, ${usuario.nome}!`);
    return res.redirect('/dashboard');
  } catch (err) {
    console.error('Erro no login:', err);
    req.flash('error', 'Erro interno. Tente novamente.');
    return res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error('Erro ao destruir sessão:', err);
    res.redirect('/login');
  });
};
