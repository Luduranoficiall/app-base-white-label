import { marca } from './config/marca';

/**
 * Paleta derivada da marca, não hardcoded. Trocar a cor de um app novo é editar
 * `src/config/marca.ts`, nunca este arquivo.
 */
export const cores = {
  fundo: marca.cores.fundo,
  superficie: '#FFFFFF',
  borda: '#E2E5EA',
  texto: '#181B23',
  textoSecundario: '#5C6472',
  destaque: marca.cores.primaria,
  sucesso: '#2E7D32',
  perigo: '#B3261E',
} as const;

export const espacamento = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 28,
  xl: 40,
} as const;

export const tipografia = {
  titulo: { fontSize: 26, fontWeight: '700' as const, color: cores.texto },
  subtitulo: { fontSize: 16, color: cores.textoSecundario },
  rotulo: { fontSize: 13, fontWeight: '600' as const, color: cores.textoSecundario, textTransform: 'uppercase' as const },
};
