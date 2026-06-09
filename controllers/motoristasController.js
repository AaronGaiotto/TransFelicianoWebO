const Motorista = require('../models/Motorista');

exports.index = (req, res) => {
  const motoristas = Motorista.getAll();
  res.render('pages/motoristas/index', {
    title: 'Motoristas — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'motoristas',
    motoristas,
    success: req.flash('success'),
    error: req.flash('error')
  });
};

exports.create = (req, res) => {
  res.render('pages/motoristas/form', {
    title: 'Novo Motorista — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'motoristas',
    motorista: null,
    error: req.flash('error')
  });
};

exports.store = (req, res) => {
  const { nome, cpf, telefone, numero_cnh, validade_cnh, status } = req.body;

  // Validações
  if (!nome || !nome.trim()) {
    req.flash('error', 'O Nome é obrigatório.');
    return res.redirect('/motoristas/novo');
  }
  if (!cpf || !cpf.trim()) {
    req.flash('error', 'O CPF é obrigatório.');
    return res.redirect('/motoristas/novo');
  }
  if (!numero_cnh || !numero_cnh.trim()) {
    req.flash('error', 'O Número da CNH é obrigatório.');
    return res.redirect('/motoristas/novo');
  }
  if (!validade_cnh) {
    req.flash('error', 'A Validade da CNH é obrigatória.');
    return res.redirect('/motoristas/novo');
  }

  // Verifica CPF duplicado
  const existe = Motorista.findByCpf(cpf.trim());
  if (existe) {
    req.flash('error', 'Já existe um motorista cadastrado com este CPF.');
    return res.redirect('/motoristas/novo');
  }

  try {
    Motorista.create({
      nome: nome.trim(),
      cpf: cpf.trim(),
      telefone: telefone ? telefone.trim() : '',
      numero_cnh: numero_cnh.trim(),
      validade_cnh: validade_cnh,
      status: status || 'Ativo'
    });
    
    req.flash('success', 'Motorista cadastrado com sucesso!');
    res.redirect('/motoristas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao cadastrar motorista.');
    res.redirect('/motoristas/novo');
  }
};

exports.show = (req, res) => {
  const motorista = Motorista.findById(req.params.id);
  if (!motorista) {
    req.flash('error', 'Motorista não encontrado.');
    return res.redirect('/motoristas');
  }

  res.render('pages/motoristas/show', {
    title: `Motorista: ${motorista.nome} — TransFelicianoWeb`,
    usuario: req.session.usuario,
    activePage: 'motoristas',
    motorista
  });
};

exports.edit = (req, res) => {
  const motorista = Motorista.findById(req.params.id);
  if (!motorista) {
    req.flash('error', 'Motorista não encontrado.');
    return res.redirect('/motoristas');
  }

  res.render('pages/motoristas/form', {
    title: 'Editar Motorista — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'motoristas',
    motorista,
    error: req.flash('error')
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone, numero_cnh, validade_cnh, status } = req.body;

  const motorista = Motorista.findById(id);
  if (!motorista) {
    req.flash('error', 'Motorista não encontrado.');
    return res.redirect('/motoristas');
  }

  // Validações
  if (!nome || !nome.trim()) {
    req.flash('error', 'O Nome é obrigatório.');
    return res.redirect(`/motoristas/${id}/editar`);
  }
  if (!cpf || !cpf.trim()) {
    req.flash('error', 'O CPF é obrigatório.');
    return res.redirect(`/motoristas/${id}/editar`);
  }
  if (!numero_cnh || !numero_cnh.trim()) {
    req.flash('error', 'O Número da CNH é obrigatório.');
    return res.redirect(`/motoristas/${id}/editar`);
  }
  if (!validade_cnh) {
    req.flash('error', 'A Validade da CNH é obrigatória.');
    return res.redirect(`/motoristas/${id}/editar`);
  }

  // Verifica CPF duplicado em outro id
  const existe = Motorista.findByCpf(cpf.trim());
  if (existe && existe.id !== parseInt(id)) {
    req.flash('error', 'Já existe outro motorista com este CPF.');
    return res.redirect(`/motoristas/${id}/editar`);
  }

  try {
    Motorista.update(id, {
      nome: nome.trim(),
      cpf: cpf.trim(),
      telefone: telefone ? telefone.trim() : '',
      numero_cnh: numero_cnh.trim(),
      validade_cnh: validade_cnh,
      status: status || 'Ativo'
    });
    
    req.flash('success', 'Motorista atualizado com sucesso!');
    res.redirect('/motoristas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao atualizar motorista.');
    res.redirect(`/motoristas/${id}/editar`);
  }
};

exports.destroy = (req, res) => {
  try {
    const success = Motorista.delete(req.params.id);
    if (success) {
      req.flash('success', 'Motorista excluído com sucesso!');
    } else {
      req.flash('error', 'Motorista não encontrado.');
    }
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao excluir motorista.');
  }
  res.redirect('/motoristas');
};
