/**
 * seed.js — Inicialização dos arquivos JSON de dados
 * Executado automaticamente na primeira inicialização do servidor.
 * Cria a pasta data/ e os arquivos JSON com dados iniciais se não existirem.
 */

const fs      = require('fs');
const path    = require('path');
const bcrypt  = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');

/** Garante que o arquivo existe; se não existir, cria com o conteúdo padrão */
function ensureFile(filename, defaultContent) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(defaultContent, null, 2), 'utf8');
    console.log(`  ✔ Criado: data/${filename}`);
    return true;
  }
  return false;
}

async function seed() {
  // Garante que a pasta data/ existe
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('  ✔ Pasta data/ criada');
  }

  const now = new Date().toISOString();

  /* ── Usuários ─────────────────────────────────────────────── */
  const usuariosPath = path.join(DATA_DIR, 'usuarios.json');
  if (!fs.existsSync(usuariosPath) || JSON.parse(fs.readFileSync(usuariosPath, 'utf8')).length === 0) {
    const senhaHash = await bcrypt.hash('Admin@2026', 10);
    const usuarios = [
      {
        id:           1,
        nome:         'Administrador',
        email:        'admin@transfeliciano.com.br',
        senha:        senhaHash,
        perfil:       'admin',
        ativo:        true,
        ultimo_acesso: null,
        criado_em:    now,
        atualizado_em: now
      }
    ];
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2), 'utf8');
    console.log('  ✔ Criado: data/usuarios.json (admin@transfeliciano.com.br / Admin@2026)');
  }

  /* ── Caminhões ────────────────────────────────────────────── */
  ensureFile('caminhoes.json', [
    {
      id:            1,
      placa:         'ABC-1234',
      modelo:        'FH 540',
      marca:         'Volvo',
      ano:           2022,
      tipo:          'carreta',
      capacidade_ton: 33.00,
      renavam:       '12345678901',
      chassi:        '9BW000000PS123456',
      km_atual:      87500,
      status:        'ativo',
      cor:           'Branco',
      observacoes:   '',
      criado_em:     now,
      atualizado_em: now
    },
    {
      id:            2,
      placa:         'DEF-5678',
      modelo:        '2429',
      marca:         'Mercedes-Benz',
      ano:           2021,
      tipo:          'truck',
      capacidade_ton: 16.00,
      renavam:       '98765432109',
      chassi:        '9BW000000PS654321',
      km_atual:      112300,
      status:        'ativo',
      cor:           'Vermelho',
      observacoes:   '',
      criado_em:     now,
      atualizado_em: now
    },
    {
      id:            3,
      placa:         'GHI-9012',
      modelo:        'Constellation 24.280',
      marca:         'Volkswagen',
      ano:           2020,
      tipo:          'bitruck',
      capacidade_ton: 23.00,
      renavam:       '45678912304',
      chassi:        '9BW000000PS789012',
      km_atual:      95800,
      status:        'manutencao',
      cor:           'Prata',
      observacoes:   'Em manutenção corretiva — motor',
      criado_em:     now,
      atualizado_em: now
    }
  ]);

  /* ── Motoristas ───────────────────────────────────────────── */
  ensureFile('motoristas.json', [
    {
      id:              1,
      nome:            'João Carlos Silva',
      cpf:             '123.456.789-00',
      rg:              '1234567',
      data_nascimento: '1985-03-10',
      telefone:        '(51) 3333-0001',
      celular:         '(51) 99999-0001',
      email:           'joao.silva@transfeliciano.com.br',
      endereco:        'Rua das Flores, 100',
      cidade:          'Porto Alegre',
      estado:          'RS',
      cep:             '90000-000',
      cnh:             '12345678901',
      cnh_categoria:   'E',
      cnh_validade:    '2027-06-15',
      status:          'ativo',
      data_admissao:   '2018-01-15',
      observacoes:     '',
      criado_em:       now,
      atualizado_em:   now
    },
    {
      id:              2,
      nome:            'Pedro Henrique Santos',
      cpf:             '987.654.321-00',
      rg:              '9876543',
      data_nascimento: '1990-07-22',
      telefone:        '(51) 3333-0002',
      celular:         '(51) 99999-0002',
      email:           'pedro.santos@transfeliciano.com.br',
      endereco:        'Av. Brasil, 500',
      cidade:          'Canoas',
      estado:          'RS',
      cep:             '92000-000',
      cnh:             '98765432109',
      cnh_categoria:   'E',
      cnh_validade:    '2026-11-30',
      status:          'ativo',
      data_admissao:   '2020-03-01',
      observacoes:     '',
      criado_em:       now,
      atualizado_em:   now
    },
    {
      id:              3,
      nome:            'Marcos Antônio Lima',
      cpf:             '456.789.123-00',
      rg:              '4567891',
      data_nascimento: '1978-11-05',
      telefone:        '(51) 3333-0003',
      celular:         '(51) 99999-0003',
      email:           'marcos.lima@transfeliciano.com.br',
      endereco:        'Rua 7 de Setembro, 200',
      cidade:          'São Leopoldo',
      estado:          'RS',
      cep:             '93000-000',
      cnh:             '45678912304',
      cnh_categoria:   'E',
      cnh_validade:    '2025-08-20',
      status:          'ferias',
      data_admissao:   '2015-06-10',
      observacoes:     'Em férias até 20/06/2026',
      criado_em:       now,
      atualizado_em:   now
    }
  ]);

  /* ── Rotas ────────────────────────────────────────────────── */
  ensureFile('rotas.json', [
    {
      id:                    1,
      codigo:                'RT-001',
      origem:                'Porto Alegre - RS',
      destino:               'São Paulo - SP',
      distancia_km:          1110,
      tempo_estimado_h:      14,
      tipo:                  'interestadual',
      status:                'concluida',
      motorista_id:          1,
      caminhao_id:           1,
      data_saida:            '2026-05-10T06:00:00.000Z',
      data_chegada_prevista: '2026-05-11T20:00:00.000Z',
      data_chegada_real:     '2026-05-11T21:30:00.000Z',
      carga_descricao:       'Produtos eletrodomésticos',
      carga_peso_ton:        18.5,
      valor_frete:           8500.00,
      observacoes:           '',
      criado_em:             now,
      atualizado_em:         now
    },
    {
      id:                    2,
      codigo:                'RT-002',
      origem:                'Porto Alegre - RS',
      destino:               'Curitiba - PR',
      distancia_km:          725,
      tempo_estimado_h:      9,
      tipo:                  'interestadual',
      status:                'em_andamento',
      motorista_id:          2,
      caminhao_id:           2,
      data_saida:            '2026-06-06T07:00:00.000Z',
      data_chegada_prevista: '2026-06-06T16:00:00.000Z',
      data_chegada_real:     null,
      carga_descricao:       'Alimentos industrializados',
      carga_peso_ton:        12.0,
      valor_frete:           5200.00,
      observacoes:           '',
      criado_em:             now,
      atualizado_em:         now
    }
  ]);

  /* ── Manutenções ──────────────────────────────────────────── */
  ensureFile('manutencoes.json', [
    {
      id:                1,
      caminhao_id:       3,
      tipo:              'corretiva',
      descricao:         'Troca de correia dentada e bomba d\'água',
      km_realizacao:     95800,
      km_proxima:        115800,
      data_realizacao:   '2026-06-01',
      data_proxima:      '2026-12-01',
      oficina:           'Auto Mecânica Central',
      responsavel:       'José Mecânico',
      custo:             1850.00,
      status:            'concluida',
      pecas_substituidas: 'Correia dentada, bomba d\'água, kit tensor',
      observacoes:       '',
      criado_em:         now,
      atualizado_em:     now
    },
    {
      id:                2,
      caminhao_id:       1,
      tipo:              'preventiva',
      descricao:         'Troca de óleo e filtros — revisão 90.000 km',
      km_realizacao:     87500,
      km_proxima:        97500,
      data_realizacao:   '2026-05-20',
      data_proxima:      '2026-09-20',
      oficina:           'Volvo Concessionária RS',
      responsavel:       'Técnico Volvo',
      custo:             620.00,
      status:            'concluida',
      pecas_substituidas: 'Filtro de óleo, filtro de ar, filtro de combustível',
      observacoes:       '',
      criado_em:         now,
      atualizado_em:     now
    }
  ]);

  /* ── Despesas ─────────────────────────────────────────────── */
  ensureFile('despesas.json', [
    {
      id:              1,
      categoria:       'combustivel',
      descricao:       'Abastecimento — Posto Shell km 120 BR-116',
      valor:           780.00,
      data_despesa:    '2026-06-06',
      caminhao_id:     2,
      motorista_id:    2,
      rota_id:         2,
      forma_pagamento: 'cartao_credito',
      status:          'pago',
      comprovante:     null,
      observacoes:     '',
      criado_em:       now,
      atualizado_em:   now
    },
    {
      id:              2,
      categoria:       'pedagio',
      descricao:       'Pedágios — rota RT-001 Porto Alegre → SP',
      valor:           312.50,
      data_despesa:    '2026-05-10',
      caminhao_id:     1,
      motorista_id:    1,
      rota_id:         1,
      forma_pagamento: 'dinheiro',
      status:          'pago',
      comprovante:     null,
      observacoes:     '',
      criado_em:       now,
      atualizado_em:   now
    },
    {
      id:              3,
      categoria:       'manutencao',
      descricao:       'Pagamento oficina — troca correia GHI-9012',
      valor:           1850.00,
      data_despesa:    '2026-06-01',
      caminhao_id:     3,
      motorista_id:    null,
      rota_id:         null,
      forma_pagamento: 'pix',
      status:          'pago',
      comprovante:     null,
      observacoes:     '',
      criado_em:       now,
      atualizado_em:   now
    }
  ]);

  console.log('✅ Base de dados JSON inicializada com sucesso!\n');
}

module.exports = seed;
