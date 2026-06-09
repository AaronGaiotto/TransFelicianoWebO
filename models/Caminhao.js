const JsonDB = require('../lib/JsonDB');

const db = new JsonDB('caminhoes.json');

class Caminhao {
  static getAll(status = null) {
    if (status) return db.filterBy('status', status);
    return db.findAll('placa');
  }

  static findById(id) {
    return db.findById(id);
  }

  static findByPlaca(placa) {
    return db.findBy('placa', placa);
  }

  static count(status = null) {
    if (status) return db.count(c => c.status === status);
    return db.count(c => c.status !== 'vendido');
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
    return db.latest(n);
  }
}

module.exports = Caminhao;
