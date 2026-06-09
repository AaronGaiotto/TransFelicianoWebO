const JsonDB = require('../lib/JsonDB');

const db = new JsonDB('despesas.json');

class Despesa {
  static getAll() {
    return db.findAll('data_despesa', 'desc');
  }

  static findById(id) {
    return db.findById(id);
  }

  static sum(status = 'pago') {
    return db.sum('valor', d => d.status === status);
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
}

module.exports = Despesa;
