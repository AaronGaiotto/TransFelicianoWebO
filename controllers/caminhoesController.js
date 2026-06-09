const Caminhao = require('../models/Caminhao');

exports.index = (req, res) => {
  const caminhoes = Caminhao.getAll();
  res.render('pages/caminhoes/index', {
    title: 'Caminhões — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'caminhoes',
    caminhoes,
    success: req.flash('success'),
    error: req.flash('error')
  });
};

exports.create = (req, res) => {
  res.render('pages/caminhoes/form', {
    title: 'Novo Caminhão — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'caminhoes',
    caminhao: null,
    error: req.flash('error')
  });
};

exports.store = (req, res) => {
  const { placa, marca, modelo, ano, renavam, quilometragem, status } = req.body;

  // Validações
  if (!placa || !placa.trim()) {
    req.flash('error', 'A Placa é obrigatória.');
    return res.redirect('/caminhoes/novo');
  }
  if (!renavam || !renavam.trim()) {
    req.flash('error', 'O Renavam é obrigatório.');
    return res.redirect('/caminhoes/novo');
  }
  if (isNaN(ano) || parseInt(ano) < 1900) {
    req.flash('error', 'O Ano deve ser numérico e válido.');
    return res.redirect('/caminhoes/novo');
  }
  if (isNaN(quilometragem) || parseFloat(quilometragem) < 0) {
    req.flash('error', 'A Quilometragem não pode ser negativa.');
    return res.redirect('/caminhoes/novo');
  }

  // Verifica placa duplicada
  const existe = Caminhao.findByPlaca(placa.trim().toUpperCase());
  if (existe) {
    req.flash('error', 'Já existe um caminhão com esta placa.');
    return res.redirect('/caminhoes/novo');
  }

  try {
    Caminhao.create({
      placa: placa.trim().toUpperCase(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      ano: parseInt(ano),
      renavam: renavam.trim(),
      quilometragem: parseFloat(quilometragem),
      status: status || 'Ativo'
    });
    
    req.flash('success', 'Caminhão cadastrado com sucesso!');
    res.redirect('/caminhoes');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao cadastrar caminhão.');
    res.redirect('/caminhoes/novo');
  }
};

exports.show = (req, res) => {
  const caminhao = Caminhao.findById(req.params.id);
  if (!caminhao) {
    req.flash('error', 'Caminhão não encontrado.');
    return res.redirect('/caminhoes');
  }

  res.render('pages/caminhoes/show', {
    title: `Caminhão ${caminhao.placa} — TransFelicianoWeb`,
    usuario: req.session.usuario,
    activePage: 'caminhoes',
    caminhao
  });
};

exports.edit = (req, res) => {
  const caminhao = Caminhao.findById(req.params.id);
  if (!caminhao) {
    req.flash('error', 'Caminhão não encontrado.');
    return res.redirect('/caminhoes');
  }

  res.render('pages/caminhoes/form', {
    title: 'Editar Caminhão — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'caminhoes',
    caminhao,
    error: req.flash('error')
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { placa, marca, modelo, ano, renavam, quilometragem, status } = req.body;

  const caminhao = Caminhao.findById(id);
  if (!caminhao) {
    req.flash('error', 'Caminhão não encontrado.');
    return res.redirect('/caminhoes');
  }

  // Validações
  if (!placa || !placa.trim()) {
    req.flash('error', 'A Placa é obrigatória.');
    return res.redirect(`/caminhoes/${id}/editar`);
  }
  if (!renavam || !renavam.trim()) {
    req.flash('error', 'O Renavam é obrigatório.');
    return res.redirect(`/caminhoes/${id}/editar`);
  }
  if (isNaN(ano) || parseInt(ano) < 1900) {
    req.flash('error', 'O Ano deve ser numérico e válido.');
    return res.redirect(`/caminhoes/${id}/editar`);
  }
  if (isNaN(quilometragem) || parseFloat(quilometragem) < 0) {
    req.flash('error', 'A Quilometragem não pode ser negativa.');
    return res.redirect(`/caminhoes/${id}/editar`);
  }

  // Verifica placa duplicada em outro id
  const existe = Caminhao.findByPlaca(placa.trim().toUpperCase());
  if (existe && existe.id !== parseInt(id)) {
    req.flash('error', 'Já existe outro caminhão com esta placa.');
    return res.redirect(`/caminhoes/${id}/editar`);
  }

  try {
    Caminhao.update(id, {
      placa: placa.trim().toUpperCase(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      ano: parseInt(ano),
      renavam: renavam.trim(),
      quilometragem: parseFloat(quilometragem),
      status: status || 'Ativo'
    });
    
    req.flash('success', 'Caminhão atualizado com sucesso!');
    res.redirect('/caminhoes');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao atualizar caminhão.');
    res.redirect(`/caminhoes/${id}/editar`);
  }
};

exports.destroy = (req, res) => {
  try {
    const success = Caminhao.delete(req.params.id);
    if (success) {
      req.flash('success', 'Caminhão excluído com sucesso!');
    } else {
      req.flash('error', 'Caminhão não encontrado.');
    }
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao excluir caminhão.');
  }
  res.redirect('/caminhoes');
};
