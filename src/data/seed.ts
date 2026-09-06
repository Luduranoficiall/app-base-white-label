import { recursoReducer, type EstadoRecursos } from '../store/recursoReducer';

/**
 * Estado inicial de demo, construído aplicando o próprio reducer (não um objeto cravado à mão),
 * pra garantir que os dados de exemplo respeitam as mesmas regras que o app usa de verdade.
 */
export function estadoInicialDemo(): EstadoRecursos {
  let estado: EstadoRecursos = { recursos: [] };

  estado = recursoReducer(estado, {
    tipo: 'CRIAR',
    titulo: 'Exemplo pendente',
    descricao: 'Ainda não foi iniciado.',
    clienteNome: 'Ana Paula',
    clienteTelefone: '12988880001',
  });

  estado = recursoReducer(estado, {
    tipo: 'CRIAR',
    titulo: 'Exemplo em andamento',
    descricao: 'Já foi iniciado, ainda não terminou.',
    clienteNome: 'Bruno Costa',
    clienteTelefone: '12988880002',
  });
  estado = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id: estado.recursos[1].id });

  estado = recursoReducer(estado, {
    tipo: 'CRIAR',
    titulo: 'Exemplo concluído',
    descricao: 'Já foi finalizado.',
    clienteNome: 'Carla Dias',
    clienteTelefone: '12988880003',
  });
  estado = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id: estado.recursos[2].id });
  estado = recursoReducer(estado, { tipo: 'AVANCAR_STATUS', id: estado.recursos[2].id });

  return estado;
}
