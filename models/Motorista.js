const JsonDB = require('../lib/JsonDB');

const db = new JsonDB('motoristas.json');

class Motorista {
  static getAll(status = null) {
    if (status) return db.filterBy('status', status);
    return db.findAll('nome');
  }

  static findById(id) {
    return db.findById(id);
  }

  static findByCpf(cpf) {
    return db.findBy('cpf', cpf);
  }

  static count(status = 'Ativo') {
    if (status) return db.count(m => (m.status || '').toLowerCase() === status.toLowerCase());
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
}

module.exports = Motorista;
