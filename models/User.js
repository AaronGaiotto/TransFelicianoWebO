const JsonDB  = require('../lib/JsonDB');
const bcrypt  = require('bcryptjs');

const db = new JsonDB('usuarios.json');

class User {
  static findByEmail(email) {
    return db.findBy('email', email.trim().toLowerCase()) || null;
  }

  static findById(id) {
    const u = db.findById(id);
    if (!u) return null;
    // Retorna sem expor a senha
    const { senha, ...safe } = u;
    return safe;
  }

  static updateUltimoAcesso(id) {
    db.update(id, { ultimo_acesso: new Date().toISOString() });
  }

  static getAll() {
    return db.findAll('nome').map(({ senha, ...safe }) => safe);
  }

  static count() {
    return db.count(u => u.ativo === true);
  }

  static async create({ nome, email, senha, perfil = 'operador' }) {
    const hash = await bcrypt.hash(senha, 10);
    return db.create({
      nome,
      email: email.trim().toLowerCase(),
      senha: hash,
      perfil,
      ativo: true,
      ultimo_acesso: null
    });
  }

  static update(id, data) {
    return db.update(id, data);
  }

  static delete(id) {
    return db.delete(id);
  }
}

module.exports = User;
