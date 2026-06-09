/**
 * TransFelicianoWeb — app.js
 * Servidor principal Express
 */

require('dotenv').config();
const express        = require('express');
const session        = require('express-session');
const flash          = require('connect-flash');
const methodOverride = require('method-override');
const path           = require('path');

// Inicializa banco de dados JSON
require('./lib/seed')();

// Rotas
const indexRoute      = require('./routes/index');
const authRoute       = require('./routes/auth');
const dashboardRoute  = require('./routes/dashboard');
const caminhoesRoute  = require('./routes/caminhoes');
const motoristasRoute = require('./routes/motoristas');
const rotasRoute      = require('./routes/rotas');
const manutencoesRoute= require('./routes/manutencoes');
const despesasRoute   = require('./routes/despesas');
const relatoriosRoute = require('./routes/relatorios');
const usuariosRoute   = require('./routes/usuarios');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── View Engine ───────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Middlewares ───────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Sessão
app.use(session({
  secret:            process.env.SESSION_SECRET || 'transfeliciano_secret',
  resave:            false,
  saveUninitialized: false,
  cookie: {
    maxAge:   1000 * 60 * 60 * 8, // 8 horas
    httpOnly: true,
    secure:   false  // true em produção com HTTPS
  }
}));

// Flash messages
app.use(flash());

// Variáveis globais para todas as views
app.use((req, res, next) => {
  res.locals.usuario   = req.session.usuario || null;
  res.locals.activePage = '';
  next();
});

// ── Rotas ─────────────────────────────────────────────────────────
app.use('/', indexRoute);
app.use('/', authRoute);
app.use('/', dashboardRoute);
app.use('/', caminhoesRoute);
app.use('/', motoristasRoute);
app.use('/', rotasRoute);
app.use('/', manutencoesRoute);
app.use('/', despesasRoute);
app.use('/', relatoriosRoute);
app.use('/', usuariosRoute);

// ── 404 ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>404 — TransFelicianoWeb</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter',sans-serif; background:#0F172A; color:#fff;
               display:flex; align-items:center; justify-content:center;
               min-height:100vh; flex-direction:column; text-align:center; gap:16px; }
        h1 { font-size:96px; font-weight:800; color:#1A56DB; margin:0; }
        h2 { font-size:24px; font-weight:700; margin:0; }
        p  { color:rgba(255,255,255,.5); font-size:15px; }
        a  { display:inline-flex; align-items:center; gap:8px; margin-top:16px;
             padding:12px 24px; background:#1A56DB; color:#fff; border-radius:10px;
             font-weight:600; font-size:15px; text-decoration:none;
             transition:background .2s; }
        a:hover { background:#1e40af; }
      </style>
    </head>
    <body>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>A rota que você acessou não existe no sistema.</p>
      <a href="/dashboard">&#8592; Voltar ao Dashboard</a>
    </body>
    </html>
  `);
});

// ── 500 ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Erro interno:', err.stack);
  res.status(500).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>500 — Erro Interno</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet">
      <style>
        body { font-family:'Inter',sans-serif; background:#0F172A; color:#fff;
               display:flex; align-items:center; justify-content:center;
               min-height:100vh; flex-direction:column; text-align:center; gap:16px; }
        h1 { font-size:96px; font-weight:800; color:#DC2626; margin:0; }
        pre { background:rgba(255,255,255,.05); padding:16px; border-radius:8px;
              font-size:12px; color:rgba(255,255,255,.5); max-width:600px;
              overflow-x:auto; text-align:left; }
        a  { display:inline-flex; padding:12px 24px; background:#1A56DB; color:#fff;
             border-radius:10px; font-weight:600; text-decoration:none; margin-top:8px; }
      </style>
    </head>
    <body>
      <h1>500</h1>
      <h2>Erro Interno do Servidor</h2>
      <pre>${err.message}</pre>
      <a href="/dashboard">Voltar ao Dashboard</a>
    </body>
    </html>
  `);
});

// ── Iniciar Servidor ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║      TransFelicianoWeb  v1.0.0         ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║  Servidor:  http://localhost:${PORT}       ║`);
  console.log('║  Ambiente:  desenvolvimento            ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
});
