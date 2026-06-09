const Caminhao = require('../models/Caminhao');
const Motorista = require('../models/Motorista');
const Rota = require('../models/Rota');
const Manutencao = require('../models/Manutencao');
const Despesa = require('../models/Despesa');

exports.getDashboard = (req, res) => {
  try {
    const total_caminhoes = Caminhao.count(); // conta todos que não são vendidos
    const total_motoristas = Motorista.count('ativo');
    const total_rotas = Rota.count();
    const total_manutencoes = Manutencao.count();
    const total_despesas = Despesa.sum('pago');

    // Últimas 5 manutenções
    const ultimas_manutencoes = Manutencao.latest(5);

    // Últimas 5 rotas
    const ultimas_rotas = Rota.latest(5);

    res.render('dashboard/index', {
      title: 'Dashboard — TransFelicianoWeb',
      usuario: req.session.usuario,
      stats: {
        caminhoes: total_caminhoes,
        motoristas: total_motoristas,
        rotas: total_rotas,
        manutencoes: total_manutencoes,
        despesas: total_despesas
      },
      ultimas_manutencoes,
      ultimas_rotas,
      activePage: 'dashboard',
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (err) {
    console.error('Erro no dashboard:', err);
    res.render('dashboard/index', {
      title: 'Dashboard — TransFelicianoWeb',
      usuario: req.session.usuario,
      stats: { caminhoes: 0, motoristas: 0, rotas: 0, manutencoes: 0, despesas: 0 },
      ultimas_manutencoes: [],
      ultimas_rotas: [],
      activePage: 'dashboard',
      success: req.flash('success'),
      error: req.flash('error')
    });
  }
};
