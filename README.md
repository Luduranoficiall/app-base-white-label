# App Base (Template white-label)

> **Demo ao vivo:** <https://luduran-app-base-demo.vercel.app>

Esqueleto reutilizável de app sob medida. Não é produto pra mostrar cliente, é ferramenta
interna: em vez de recomeçar a arquitetura do zero em cada projeto novo (agendamento, pedido,
fidelidade...), começa daqui, edita um arquivo de marca, e sai um app novo em muito menos tempo.

## Índice

- [Por que existe](#por-que-existe)
- [Como usar num cliente novo](#como-usar-num-cliente-novo)
- [Arquitetura](#arquitetura)
- [Testes](#testes)
- [Estrutura de pastas](#estrutura-de-pastas)
- [O que é MVP de propósito](#o-que-é-mvp-de-propósito)

## Por que existe

Depois de construir três apps separados (agendamento, pedido direto, cartão fidelidade), o
mesmo padrão se repetiu nos três: reducer puro testável, Context em cima do reducer, tema
derivado de configuração, e uma máquina de status com estados terminais. Este template extrai
esse padrão já validado, pra próximo projeto de app não reinventar a arquitetura, só o domínio
específico do cliente.

## Como usar num cliente novo

1. **Editar `src/config/marca.ts`**: nome do app, cor primária, número de WhatsApp e mensagem
   padrão, e o nome do que o app gerencia (troca "Recurso" por "Pedido", "Agendamento",
   "Solicitação", o que fizer sentido pro cliente). É o único arquivo de marca do projeto, nada
   de cor ou texto de marca espalhado pelos componentes.
2. **Ajustar os campos do domínio**, se precisar de mais que título/descrição/cliente: edita
   `src/types/index.ts` e `src/store/recursoReducer.ts`. A máquina de status (pendente → em
   andamento → concluído, ou cancelado a qualquer momento) já vem pronta e testada.
3. **Trocar nome e ícone** em `app.json` e `assets/`.
4. **Rodar `npm test` e `npm run typecheck`** antes de entregar. Se mexeu no reducer, atualiza
   os testes junto — é rápido, o padrão dos testes existentes já mostra o formato esperado.
5. **Publicar a demo web** (`npx expo export -p web`) e cadastrar o projeto novo em
   `content/projects/` do site principal, com a categoria certa (Aplicativo, na maioria dos
   casos).

Esses passos também aparecem dentro do próprio app, na aba "Guia" (`src/screens/GuiaScreen.tsx`)
— documentação viva, não só no README.

## Arquitetura

```
UI (telas em src/screens/)
  |
  v
useRecursos()  ---->  RecursoContext.tsx (Provider + useReducer, estado em memória)
  |
  v
recursoReducer.ts  (lógica pura: criar, avançar status, cancelar)
  |
  v
config/marca.ts  (única fonte de nome, cor e WhatsApp — theme.ts deriva daqui, não hardcoda)
```

A lógica de domínio não sabe que existe React: `recursoReducer.ts` exporta um reducer puro e uma
função auxiliar (`proximoStatusDe`), sem importar `react` nem `react-native`. Isso é o que torna
o reducer testável sem montar componente nenhum — mesma decisão de arquitetura dos três apps
irmãos (`agendamento-app`, `pedido-direto-app`, `fidelidade-digital-app`).

## Testes

```bash
npm test               # roda a suíte de testes do reducer
npm run typecheck       # typecheck do app (exclui arquivos de teste)
npm run typecheck:tests  # typecheck dos arquivos de teste (tsconfig separado)
```

`src/store/recursoReducer.test.ts` cobre:

- criar um recurso novo começa sempre com status "pendente";
- avançar status segue a sequência pendente → em andamento → concluído, e para em concluído
  (estado terminal, não avança mais);
- cancelar também é terminal: depois de cancelado, avançar status não reabre o fluxo;
- avançar status num id que não existe não faz nada (sem erro, sem mutação indevida);
- `proximoStatusDe` devolve `null` nos dois estados terminais e o próximo certo nos outros.

## Estrutura de pastas

```
App.tsx                        ponto de entrada, troca de aba (Recursos / Guia)
src/
  config/marca.ts              único arquivo de marca (nome, cor, WhatsApp, nome do domínio)
  types/index.ts                tipo de domínio (Recurso, StatusRecurso)
  data/seed.ts                  estado de demo (3 exemplos, um em cada status)
  store/
    recursoReducer.ts           lógica pura de criar/avançar/cancelar (testável sem React)
    recursoReducer.test.ts      suíte de testes do reducer
    RecursoContext.tsx          Provider React em cima do reducer
  screens/
    RecursosScreen.tsx          criar recurso, listar, avançar status, link direto de WhatsApp
    GuiaScreen.tsx               os mesmos passos de rebrand deste README, dentro do próprio app
  lib/format.ts                  formatação de data e rótulo de status em pt-BR
  theme.ts                       cores/espaçamento/tipografia, cor derivada de config/marca.ts
```

## O que é MVP de propósito

- **Estado em memória**: fechar a aba/app reseta pros 3 exemplos de demo. Cada projeto real que
  nascer daqui precisa decidir sua própria persistência (banco, API), isso não vem pronto de
  propósito — cada cliente tem exigência diferente aqui.
- **Sem autenticação**: template não assume login. Se o cliente precisar separar visão de
  cliente e visão de dono, isso entra no projeto derivado, não aqui.
- **Domínio genérico**: "Recurso" é propositalmente sem cara de negócio nenhum. É rebatizado no
  primeiro passo do guia acima, antes de qualquer entrega.
