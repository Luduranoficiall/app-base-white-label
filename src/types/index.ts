export type StatusRecurso = 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';

export type Recurso = {
  id: string;
  titulo: string;
  descricao: string;
  clienteNome: string;
  clienteTelefone: string;
  status: StatusRecurso;
  criadoEm: string;
};
