const JsonDB = require('../lib/JsonDB');
const Caminhao = require('./Caminhao');

const db = new JsonDB('manutencoes.json');

class Manutencao {
  static _joinRelations(m) {
    if (!m) return null;
    const caminhao = m.caminhao_id ? Caminhao.findById(parseInt(m.caminhao_id)) : null;
    return {
      ...m,
      placa: caminhao ? caminhao.placa : '—',
      modelo: caminhao ? caminhao.modelo : ''
    };
  }

  static getAll() {
    const manutencoes = db.findAll('data_manutencao', 'desc');
    return manutencoes.map(m => this._joinRelations(m));
  }

  static findById(id) {
    return this._joinRelations(db.findById(id));
  }

  static count() {
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
    const manutencoes = db.latest(n);
    // Faz o join manual (relacionamentos lógicos)
    return manutencoes.map(m => this._joinRelations(m));
  }
}

module.exports = Manutencao;
