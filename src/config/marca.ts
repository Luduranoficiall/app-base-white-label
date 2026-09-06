/**
 * Arquivo único de marca. Pra sair um app novo pra um cliente, é isso aqui que você edita
 * primeiro — o resto do código lê essas configurações, não tem cor nem texto de marca espalhado
 * pelos componentes.
 */
export const marca = {
  nomeApp: 'App Base',

  cores: {
    primaria: '#2563EB',
    fundo: '#F5F7FA',
  },

  whatsapp: {
    // TODO: trocar pelo número real do cliente antes de entregar.
    numero: '5512996182268',
    mensagemPadrao: 'Olá! Vim pelo app e quero continuar por aqui.',
  },

  /** Nome do que o app gerencia (pedido, agendamento, solicitação, tarefa...). */
  entidade: {
    singular: 'Recurso',
    plural: 'Recursos',
  },
} as const;

export function montarLinkWhatsApp(mensagem: string = marca.whatsapp.mensagemPadrao): string {
  return `https://wa.me/${marca.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}
