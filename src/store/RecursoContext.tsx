import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { estadoInicialDemo } from '../data/seed';
import { proximoStatusDe, recursoReducer } from './recursoReducer';

type ContextoRecursos = ReturnType<typeof estadoInicialDemo> & {
  criar: (params: { titulo: string; descricao: string; clienteNome: string; clienteTelefone: string }) => void;
  avancarStatus: (id: string) => void;
  cancelar: (id: string) => void;
};

const RecursoContext = createContext<ContextoRecursos | null>(null);

export function RecursoProvider({ children }: { children: React.ReactNode }) {
  const [estado, dispatch] = useReducer(recursoReducer, undefined, estadoInicialDemo);

  const valor = useMemo<ContextoRecursos>(
    () => ({
      ...estado,
      criar: (params) => dispatch({ tipo: 'CRIAR', ...params }),
      avancarStatus: (id) => dispatch({ tipo: 'AVANCAR_STATUS', id }),
      cancelar: (id) => dispatch({ tipo: 'CANCELAR', id }),
    }),
    [estado],
  );

  return <RecursoContext.Provider value={valor}>{children}</RecursoContext.Provider>;
}

export function useRecursos() {
  const contexto = useContext(RecursoContext);
  if (!contexto) throw new Error('useRecursos precisa estar dentro de um RecursoProvider');
  return contexto;
}

export { proximoStatusDe };
