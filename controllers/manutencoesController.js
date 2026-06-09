const Manutencao = require('../models/Manutencao');
const Caminhao = require('../models/Caminhao');

exports.index = (req, res) => {
  const manutencoes = Manutencao.getAll();
  res.render('pages/manutencoes/index', {
    title: 'Manutenções — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'manutencoes',
    manutencoes,
    success: req.flash('success'),
    error: req.flash('error')
  });
};

exports.create = (req, res) => {
  const caminhoes = Caminhao.getAll('Ativo'); // Carrega caminhões ativos

  res.render('pages/manutencoes/form', {
    title: 'Nova Manutenção — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'manutencoes',
    manutencao: null,
    caminhoes,
    error: req.flash('error')
  });
};

exports.store = (req, res) => {
  const { caminhao_id, tipo, descricao, data_manutencao, quilometragem, valor, status } = req.body;

  // Validações
  if (!caminhao_id) {
    req.flash('error', 'O Caminhão é obrigatório.');
    return res.redirect('/manutencoes/nova');
  }
  if (!tipo) {
    req.flash('error', 'O Tipo de manutenção é obrigatório.');
    return res.redirect('/manutencoes/nova');
  }
  if (!data_manutencao) {
    req.flash('error', 'A Data é obrigatória.');
    return res.redirect('/manutencoes/nova');
  }
  if (!quilometragem || isNaN(quilometragem) || parseFloat(quilometragem) < 0) {
    req.flash('error', 'A Quilometragem é obrigatória e não pode ser negativa.');
    return res.redirect('/manutencoes/nova');
  }
  if (valor && (isNaN(valor) || parseFloat(valor) <= 0)) {
    req.flash('error', 'O Valor deve ser maior que zero.');
    return res.redirect('/manutencoes/nova');
  }

  try {
    Manutencao.create({
      caminhao_id: parseInt(caminhao_id),
      tipo: tipo.trim(),
      descricao: descricao ? descricao.trim() : '',
      data_manutencao: data_manutencao,
      quilometragem: parseFloat(quilometragem),
      valor: valor ? parseFloat(valor) : 0,
      status: status || 'Agendada'
    });
    
    req.flash('success', 'Manutenção registrada com sucesso!');
    res.redirect('/manutencoes');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao registrar manutenção.');
    res.redirect('/manutencoes/nova');
  }
};

exports.show = (req, res) => {
  const manutencao = Manutencao.findById(req.params.id);
  if (!manutencao) {
    req.flash('error', 'Manutenção não encontrada.');
    return res.redirect('/manutencoes');
  }

  res.render('pages/manutencoes/show', {
    title: `Detalhes da Manutenção — TransFelicianoWeb`,
    usuario: req.session.usuario,
    activePage: 'manutencoes',
    manutencao
  });
};

exports.edit = (req, res) => {
  const manutencao = Manutencao.findById(req.params.id);
  if (!manutencao) {
    req.flash('error', 'Manutenção não encontrada.');
    return res.redirect('/manutencoes');
  }

  const caminhoes = Caminhao.getAll(); // Carrega todos (pode ser um caminhão inativo)

  res.render('pages/manutencoes/form', {
    title: 'Editar Manutenção — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'manutencoes',
    manutencao,
    caminhoes,
    error: req.flash('error')
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { caminhao_id, tipo, descricao, data_manutencao, quilometragem, valor, status } = req.body;

  const manutencao = Manutencao.findById(id);
  if (!manutencao) {
    req.flash('error', 'Manutenção não encontrada.');
    return res.redirect('/manutencoes');
  }

  // Validações
  if (!caminhao_id) {
    req.flash('error', 'O Caminhão é obrigatório.');
    return res.redirect(`/manutencoes/${id}/editar`);
  }
  if (!tipo) {
    req.flash('error', 'O Tipo de manutenção é obrigatório.');
    return res.redirect(`/manutencoes/${id}/editar`);
  }
  if (!data_manutencao) {
    req.flash('error', 'A Data é obrigatória.');
    return res.redirect(`/manutencoes/${id}/editar`);
  }
  if (!quilometragem || isNaN(quilometragem) || parseFloat(quilometragem) < 0) {
    req.flash('error', 'A Quilometragem é obrigatória e não pode ser negativa.');
    return res.redirect(`/manutencoes/${id}/editar`);
  }
  if (valor && (isNaN(valor) || parseFloat(valor) <= 0)) {
    req.flash('error', 'O Valor deve ser maior que zero.');
    return res.redirect(`/manutencoes/${id}/editar`);
  }

  try {
    Manutencao.update(id, {
      caminhao_id: parseInt(caminhao_id),
      tipo: tipo.trim(),
      descricao: descricao ? descricao.trim() : '',
      data_manutencao: data_manutencao,
      quilometragem: parseFloat(quilometragem),
      valor: valor ? parseFloat(valor) : 0,
      status: status || 'Agendada'
    });
    
    req.flash('success', 'Manutenção atualizada com sucesso!');
    res.redirect('/manutencoes');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao atualizar manutenção.');
    res.redirect(`/manutencoes/${id}/editar`);
  }
};

exports.destroy = (req, res) => {
  try {
    const success = Manutencao.delete(req.params.id);
    if (success) {
      req.flash('success', 'Manutenção excluída com sucesso!');
    } else {
      req.flash('error', 'Manutenção não encontrada.');
    }
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao excluir manutenção.');
  }
  res.redirect('/manutencoes');
};
