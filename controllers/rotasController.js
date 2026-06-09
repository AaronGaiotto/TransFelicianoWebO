const Rota = require('../models/Rota');
const Caminhao = require('../models/Caminhao');
const Motorista = require('../models/Motorista');

exports.index = (req, res) => {
  const rotas = Rota.getAll();
  res.render('pages/rotas/index', {
    title: 'Rotas — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'rotas',
    rotas,
    success: req.flash('success'),
    error: req.flash('error')
  });
};

exports.create = (req, res) => {
  const caminhoes = Caminhao.getAll('Ativo'); // Carrega caminhões ativos
  const motoristas = Motorista.getAll('Ativo'); // Carrega motoristas ativos

  res.render('pages/rotas/form', {
    title: 'Nova Rota — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'rotas',
    rota: null,
    caminhoes,
    motoristas,
    error: req.flash('error')
  });
};

exports.store = (req, res) => {
  const { origem, destino, data_saida, data_chegada, valor_frete, observacoes, caminhao_id, motorista_id, status } = req.body;

  // Validações
  if (!origem || !origem.trim()) {
    req.flash('error', 'A Origem é obrigatória.');
    return res.redirect('/rotas/nova');
  }
  if (!destino || !destino.trim()) {
    req.flash('error', 'O Destino é obrigatório.');
    return res.redirect('/rotas/nova');
  }
  if (!caminhao_id) {
    req.flash('error', 'O Caminhão é obrigatório.');
    return res.redirect('/rotas/nova');
  }
  if (!motorista_id) {
    req.flash('error', 'O Motorista é obrigatório.');
    return res.redirect('/rotas/nova');
  }
  if (!data_saida) {
    req.flash('error', 'A Data de Saída é obrigatória.');
    return res.redirect('/rotas/nova');
  }
  if (isNaN(valor_frete) || parseFloat(valor_frete) <= 0) {
    req.flash('error', 'O Valor do frete deve ser maior que zero.');
    return res.redirect('/rotas/nova');
  }

  try {
    Rota.create({
      origem: origem.trim(),
      destino: destino.trim(),
      data_saida: data_saida,
      data_chegada: data_chegada || null,
      valor_frete: parseFloat(valor_frete),
      observacoes: observacoes ? observacoes.trim() : '',
      caminhao_id: parseInt(caminhao_id),
      motorista_id: parseInt(motorista_id),
      status: status || 'Planejada'
    });
    
    req.flash('success', 'Rota cadastrada com sucesso!');
    res.redirect('/rotas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao cadastrar rota.');
    res.redirect('/rotas/nova');
  }
};

exports.show = (req, res) => {
  const rota = Rota.findById(req.params.id);
  if (!rota) {
    req.flash('error', 'Rota não encontrada.');
    return res.redirect('/rotas');
  }

  res.render('pages/rotas/show', {
    title: `Detalhes da Rota — TransFelicianoWeb`,
    usuario: req.session.usuario,
    activePage: 'rotas',
    rota
  });
};

exports.edit = (req, res) => {
  const rota = Rota.findById(req.params.id);
  if (!rota) {
    req.flash('error', 'Rota não encontrada.');
    return res.redirect('/rotas');
  }

  const caminhoes = Caminhao.getAll(); // Carrega todos (pois pode estar editando uma rota antiga)
  const motoristas = Motorista.getAll(); // Carrega todos

  res.render('pages/rotas/form', {
    title: 'Editar Rota — TransFelicianoWeb',
    usuario: req.session.usuario,
    activePage: 'rotas',
    rota,
    caminhoes,
    motoristas,
    error: req.flash('error')
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { origem, destino, data_saida, data_chegada, valor_frete, observacoes, caminhao_id, motorista_id, status } = req.body;

  const rota = Rota.findById(id);
  if (!rota) {
    req.flash('error', 'Rota não encontrada.');
    return res.redirect('/rotas');
  }

  // Validações
  if (!origem || !origem.trim()) {
    req.flash('error', 'A Origem é obrigatória.');
    return res.redirect(`/rotas/${id}/editar`);
  }
  if (!destino || !destino.trim()) {
    req.flash('error', 'O Destino é obrigatório.');
    return res.redirect(`/rotas/${id}/editar`);
  }
  if (!caminhao_id) {
    req.flash('error', 'O Caminhão é obrigatório.');
    return res.redirect(`/rotas/${id}/editar`);
  }
  if (!motorista_id) {
    req.flash('error', 'O Motorista é obrigatório.');
    return res.redirect(`/rotas/${id}/editar`);
  }
  if (!data_saida) {
    req.flash('error', 'A Data de Saída é obrigatória.');
    return res.redirect(`/rotas/${id}/editar`);
  }
  if (isNaN(valor_frete) || parseFloat(valor_frete) <= 0) {
    req.flash('error', 'O Valor do frete deve ser maior que zero.');
    return res.redirect(`/rotas/${id}/editar`);
  }

  try {
    Rota.update(id, {
      origem: origem.trim(),
      destino: destino.trim(),
      data_saida: data_saida,
      data_chegada: data_chegada || null,
      valor_frete: parseFloat(valor_frete),
      observacoes: observacoes ? observacoes.trim() : '',
      caminhao_id: parseInt(caminhao_id),
      motorista_id: parseInt(motorista_id),
      status: status || 'Planejada'
    });
    
    req.flash('success', 'Rota atualizada com sucesso!');
    res.redirect('/rotas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao atualizar rota.');
    res.redirect(`/rotas/${id}/editar`);
  }
};

exports.destroy = (req, res) => {
  try {
    const success = Rota.delete(req.params.id);
    if (success) {
      req.flash('success', 'Rota excluída com sucesso!');
    } else {
      req.flash('error', 'Rota não encontrada.');
    }
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao excluir rota.');
  }
  res.redirect('/rotas');
};
