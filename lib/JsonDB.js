/**
 * JsonDB.js — Motor de persistência em arquivos JSON
 * Substitui o MySQL para persistência local sem banco de dados externo.
 */

const fs   = require('fs');
const path = require('path');

class JsonDB {
  /**
   * @param {string} filename — nome do arquivo JSON (ex: 'usuarios.json')
   */
  constructor(filename) {
    this.filepath = path.join(__dirname, '..', 'data', filename);
  }

  /* ── Operações de arquivo ─────────────────────────── */

  /** Lê e retorna o array de registros do arquivo JSON */
  read() {
    try {
      if (!fs.existsSync(this.filepath)) return [];
      const raw = fs.readFileSync(this.filepath, 'utf8');
      return JSON.parse(raw) || [];
    } catch {
      return [];
    }
  }

  /** Grava o array de registros no arquivo JSON */
  write(data) {
    fs.writeFileSync(this.filepath, JSON.stringify(data, null, 2), 'utf8');
  }

  /* ── Consultas ────────────────────────────────────── */

  /** Retorna todos os registros */
  findAll(sortBy = null, sortDir = 'asc') {
    const data = this.read();
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDir === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDir === 'asc' ?  1 : -1;
      return 0;
    });
  }

  /** Retorna um registro pelo id */
  findById(id) {
    return this.read().find(item => item.id === parseInt(id, 10)) || null;
  }

  /** Retorna o primeiro registro que bate field === value */
  findBy(field, value) {
    return this.read().find(item => item[field] === value) || null;
  }

  /** Retorna todos os registros que batem field === value */
  filterBy(field, value) {
    return this.read().filter(item => item[field] === value);
  }

  /**
   * Filtragem genérica com função predicado.
   * @param {Function} predicate — fn(item) => boolean
   */
  filter(predicate) {
    return this.read().filter(predicate);
  }

  /* ── Escrita ──────────────────────────────────────── */

  /** Cria um novo registro e retorna o objeto criado */
  create(item) {
    const data  = this.read();
    const maxId = data.length > 0 ? Math.max(...data.map(i => i.id || 0)) : 0;
    const now   = new Date().toISOString();
    const newItem = {
      id:           maxId + 1,
      ...item,
      criado_em:    now,
      atualizado_em: now
    };
    data.push(newItem);
    this.write(data);
    return newItem;
  }

  /** Atualiza um registro pelo id; retorna o objeto atualizado ou null */
  update(id, updates) {
    const data  = this.read();
    const index = data.findIndex(item => item.id === parseInt(id, 10));
    if (index === -1) return null;
    data[index] = {
      ...data[index],
      ...updates,
      id:           data[index].id, // garante que o id não seja sobrescrito
      atualizado_em: new Date().toISOString()
    };
    this.write(data);
    return data[index];
  }

  /** Remove um registro pelo id; retorna true se removeu, false se não encontrou */
  delete(id) {
    const data     = this.read();
    const filtered = data.filter(item => item.id !== parseInt(id, 10));
    if (filtered.length === data.length) return false;
    this.write(filtered);
    return true;
  }

  /* ── Agregações ───────────────────────────────────── */

  /** Conta registros (com filtro opcional) */
  count(predicate = null) {
    const data = this.read();
    if (!predicate) return data.length;
    return data.filter(predicate).length;
  }

  /** Soma os valores de um campo (com filtro opcional) */
  sum(field, predicate = null) {
    const data     = this.read();
    const filtered = predicate ? data.filter(predicate) : data;
    return filtered.reduce((acc, item) => acc + (parseFloat(item[field]) || 0), 0);
  }

  /** Retorna os últimos N registros (por criado_em desc) */
  latest(n = 5) {
    return [...this.read()]
      .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
      .slice(0, n);
  }
}

module.exports = JsonDB;
