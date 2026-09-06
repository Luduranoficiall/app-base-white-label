import type { Recurso, StatusRecurso } from '../types';

function gerarId(prefixo: string): string {
  return `${prefixo}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const sequenciaStatus: StatusRecurso[] = ['pendente', 'em_andamento', 'concluido'];

export type EstadoRecursos = {
  recursos: Recurso[];
};

export type AcaoRecursos =
  | { tipo: 'CRIAR'; titulo: string; descricao: string; clienteNome: string; clienteTelefone: string }
  | { tipo: 'AVANCAR_STATUS'; id: string }
  | { tipo: 'CANCELAR'; id: string };

/**
 * Reducer genérico de "recurso" (o nome de domínio real vem de `marca.entidade`, aqui é só a
 * forma: criar, avançar status numa sequência fixa, cancelar). Sem React, sem I/O — é o padrão
 * já testado nos três apps anteriores (agendamento, pedido direto, fidelidade), extraído pra
 * servir de ponto de partida em vez de reescrever do zero em cada projeto novo.
 */
export function recursoReducer(estado: EstadoRecursos, acao: AcaoRecursos): EstadoRecursos {
  switch (acao.tipo) {
    case 'CRIAR': {
      const novoRecurso: Recurso = {
        id: gerarId('recurso'),
        titulo: acao.titulo,
        descricao: acao.descricao,
        clienteNome: acao.clienteNome,
        clienteTelefone: acao.clienteTelefone,
        status: 'pendente',
        criadoEm: new Date().toISOString(),
      };

      return { ...estado, recursos: [...estado.recursos, novoRecurso] };
    }

    case 'AVANCAR_STATUS': {
      const recurso = estado.recursos.find((r) => r.id === acao.id);
      if (!recurso) return estado;

      const proximo = proximoStatusDe(recurso.status);
      if (!proximo) return estado;

      const recursos = estado.recursos.map((r) => (r.id === acao.id ? { ...r, status: proximo } : r));
      return { ...estado, recursos };
    }

    case 'CANCELAR': {
      const recursos = estado.recursos.map((r) =>
        r.id === acao.id ? { ...r, status: 'cancelado' as StatusRecurso } : r,
      );
      return { ...estado, recursos };
    }

    default:
      return estado;
  }
}

/** `concluido` e `cancelado` são terminais: não tem "próximo" depois deles. */
export function proximoStatusDe(status: StatusRecurso): StatusRecurso | null {
  const indice = sequenciaStatus.indexOf(status);
  if (indice === -1 || indice === sequenciaStatus.length - 1) return null;
  return sequenciaStatus[indice + 1];
}
