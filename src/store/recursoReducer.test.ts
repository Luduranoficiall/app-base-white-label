import assert from 'node:assert/strict';
import { test } from 'node:test';
import { proximoStatusDe, recursoReducer, type EstadoRecursos } from './recursoReducer.ts';

function estadoVazio(): EstadoRecursos {
  return { recursos: [] };
}

function criarUm(estado: EstadoRecursos): EstadoRecursos {
  return recursoReducer(estado, {
    tipo: 'CRIAR',
    titulo: 'Primeiro recurso',
    descricao: 'Descrição de teste',
    clienteNome: 'Maria',
    clienteTelefone: '12999990000',
  });
}

test('CRIAR adiciona um recurso novo com status pendente', () => {
  const estado = criarUm(estadoVazio());

  assert.equal(estado.recursos.length, 1);
  assert.equal(estado.recursos[0].status, 'pendente');
  assert.equal(estado.recursos[0].titulo, 'Primeiro recurso');
});

test('AVANCAR_STATUS segue pendente -> em_andamento -> concluido e para', () => {
  let estado = criarUm(estadoVazio());
  const id = estado.recursos[0].id;

  estado = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id });
  assert.equal(estado.recursos[0].status, 'em_andamento');

  estado = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id });
  assert.equal(estado.recursos[0].status, 'concluido');

  const semMudanca = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id });
  assert.equal(semMudanca.recursos[0].status, 'concluido', 'concluido é terminal, não avança mais');
});

test('AVANCAR_STATUS em recurso cancelado não reabre o fluxo', () => {
  let estado = criarUm(estadoVazio());
  const id = estado.recursos[0].id;

  estado = recursoReducer(estado, { tipo: 'CANCELAR', id });
  assert.equal(estado.recursos[0].status, 'cancelado');

  estado = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id });
  assert.equal(estado.recursos[0].status, 'cancelado', 'cancelado também é terminal');
});

test('AVANCAR_STATUS em id inexistente não faz nada', () => {
  const estado = criarUm(estadoVazio());
  const depois = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id: 'nao-existe' });

  assert.equal(depois, estado, 'estado deve ser o mesmo objeto quando a ação não muda nada');
});

test('proximoStatusDe é null nos dois estados terminais', () => {
  assert.equal(proximoStatusDe('concluido'), null);
  assert.equal(proximoStatusDe('cancelado'), null);
  assert.equal(proximoStatusDe('pendente'), 'em_andamento');
  assert.equal(proximoStatusDe('em_andamento'), 'concluido');
});
