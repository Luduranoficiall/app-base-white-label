import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { cores, espacamento, tipografia } from '../theme';

type Passo = { titulo: string; texto: string };

const passos: Passo[] = [
  {
    titulo: '1. Editar src/config/marca.ts',
    texto:
      'Nome do app, cor primária, número de WhatsApp e mensagem padrão, e o nome do que o app gerencia (ex.: trocar "Recurso" por "Pedido", "Agendamento", "Solicitação"). É o único arquivo de marca do projeto.',
  },
  {
    titulo: '2. Ajustar os campos do domínio',
    texto:
      'Se o cliente precisa de campos diferentes (ex.: data marcada, valor, endereço), edita src/types/index.ts e src/store/recursoReducer.ts. A máquina de status (pendente → em andamento → concluído/cancelado) já vem pronta e testada.',
  },
  {
    titulo: '3. Trocar nome e ícone do app',
    texto: 'app.json: expo.name, expo.slug, e os ícones em assets/.',
  },
  {
    titulo: '4. Rodar os testes antes de entregar',
    texto: 'npm test e npm run typecheck. Se mexeu no reducer, atualiza os testes junto.',
  },
  {
    titulo: '5. Publicar demo e registrar no portfólio',
    texto:
      'npx expo export -p web, subir em produção, e cadastrar o projeto em content/projects/ no site principal, com a categoria certa.',
  },
];

export default function GuiaScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: espacamento.md }}>
      <Text style={styles.titulo}>Como usar este template</Text>
      <Text style={tipografia.subtitulo}>
        Esqueleto reutilizável de app sob medida. Segue os passos abaixo pra sair um app novo pra
        um cliente sem começar do zero.
      </Text>

      {passos.map((passo) => (
        <View key={passo.titulo} style={styles.card}>
          <Text style={styles.cardTitulo}>{passo.titulo}</Text>
          <Text style={styles.cardTexto}>{passo.texto}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  titulo: { ...tipografia.titulo, marginBottom: espacamento.xs },
  card: {
    marginTop: espacamento.md,
    backgroundColor: cores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamento.md,
  },
  cardTitulo: { fontSize: 16, fontWeight: '700', color: cores.texto },
  cardTexto: { color: cores.textoSecundario, marginTop: espacamento.xs },
});
