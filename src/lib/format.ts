export function formatarData(iso: string): string {
  const data = new Date(iso);
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

const rotulosStatus: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
};

export function rotuloStatus(status: string): string {
  return rotulosStatus[status] ?? status;
}
