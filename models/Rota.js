const JsonDB = require('../lib/JsonDB');
const Caminhao = require('./Caminhao');
const Motorista = require('./Motorista');

const db = new JsonDB('rotas.json');

class Rota {
  static _joinRelations(rota) {
    if (!rota) return null;
    const motorista = rota.motorista_id ? Motorista.findById(parseInt(rota.motorista_id)) : null;
    const caminhao = rota.caminhao_id ? Caminhao.findById(parseInt(rota.caminhao_id)) : null;
    return {
      ...rota,
      motorista_nome: motorista ? motorista.nome : '—',
      placa: caminhao ? caminhao.placa : '—'
    };
  }

  static getAll() {
    const rotas = db.findAll('data_saida', 'desc');
    return rotas.map(r => this._joinRelations(r));
  }

  static findById(id) {
    return this._joinRelations(db.findById(id));
  }

  static count(status = null) {
    if (status) return db.count(r => (r.status || '').toLowerCase() === status.toLowerCase());
    return db.count();
  }

  static create(data) {
    return db.create(data);
  }

  static update(id, data) {
    return db.update(id, data);
  }

  static delete(id) {
    return db.delete(id);
  }

  static latest(n = 5) {
    const rotas = db.latest(n);
    return rotas.map(r => this._joinRelations(r));
  }
}

module.exports = Rota;
