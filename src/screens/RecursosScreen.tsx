import React, { useState } from 'react';
import { Alert, FlatList, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRecursos } from '../store/RecursoContext';
import { proximoStatusDe } from '../store/recursoReducer';
import { formatarData, rotuloStatus } from '../lib/format';
import { marca, montarLinkWhatsApp } from '../config/marca';
import { cores, espacamento, tipografia } from '../theme';

export default function RecursosScreen() {
  const { recursos, criar, avancarStatus, cancelar } = useRecursos();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [clienteNome, setClienteNome] = useState('');
  const [clienteTelefone, setClienteTelefone] = useState('');

  function criarRecurso() {
    if (titulo.trim().length === 0 || clienteNome.trim().length === 0 || clienteTelefone.trim().length === 0) {
      Alert.alert('Falta pouco', 'Preenche título, nome e telefone do cliente.');
      return;
    }
    criar({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      clienteNome: clienteNome.trim(),
      clienteTelefone: clienteTelefone.trim(),
    });
    setTitulo('');
    setDescricao('');
    setClienteNome('');
    setClienteTelefone('');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: espacamento.md }}>
      <Text style={styles.titulo}>{marca.entidade.plural}</Text>

      <Text style={styles.secao}>Novo {marca.entidade.singular.toLowerCase()}</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Título" />
      <TextInput
        style={[styles.input, { marginTop: espacamento.xs }]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição (opcional)"
      />
      <TextInput
        style={[styles.input, { marginTop: espacamento.xs }]}
        value={clienteNome}
        onChangeText={setClienteNome}
        placeholder="Nome do cliente"
      />
      <TextInput
        style={[styles.input, { marginTop: espacamento.xs }]}
        value={clienteTelefone}
        onChangeText={setClienteTelefone}
        placeholder="WhatsApp do cliente"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.botaoCriar} onPress={criarRecurso}>
        <Text style={styles.botaoCriarTexto}>Criar</Text>
      </TouchableOpacity>

      <Text style={styles.secao}>{marca.entidade.plural} ({recursos.length})</Text>
      <FlatList
        data={[...recursos].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum {marca.entidade.singular.toLowerCase()} ainda.</Text>}
        renderItem={({ item }) => {
          const proximo = proximoStatusDe(item.status);
          const terminal = item.status === 'concluido' || item.status === 'cancelado';

          return (
            <View style={styles.card}>
              <View style={styles.cardTopo}>
                <Text style={styles.cardTituloItem}>{item.titulo}</Text>
                <Text style={styles.cardData}>{formatarData(item.criadoEm)}</Text>
              </View>
              {item.descricao ? <Text style={styles.cardDescricao}>{item.descricao}</Text> : null}
              <Text style={styles.cardStatus}>{rotuloStatus(item.status)}</Text>
              <Text style={styles.cardCliente}>
                {item.clienteNome} · {item.clienteTelefone}
              </Text>

              <View style={styles.acoes}>
                {!terminal && proximo ? (
                  <TouchableOpacity style={styles.botaoAvancar} onPress={() => avancarStatus(item.id)}>
                    <Text style={styles.botaoAvancarTexto}>Marcar como {rotuloStatus(proximo)}</Text>
                  </TouchableOpacity>
                ) : null}
                {!terminal ? (
                  <TouchableOpacity style={styles.botaoCancelar} onPress={() => cancelar(item.id)}>
                    <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={styles.botaoWhatsapp}
                  onPress={() =>
                    Linking.openURL(
                      montarLinkWhatsApp(`Oi ${item.clienteNome}, sobre o ${marca.entidade.singular.toLowerCase()} "${item.titulo}"...`),
                    )
                  }
                >
                  <Text style={styles.botaoWhatsappTexto}>Falar no WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  titulo: { ...tipografia.titulo, marginBottom: espacamento.md },
  secao: { ...tipografia.rotulo, marginTop: espacamento.lg, marginBottom: espacamento.xs },
  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingHorizontal: espacamento.sm,
    paddingVertical: espacamento.sm,
    fontSize: 16,
    backgroundColor: cores.superficie,
  },
  botaoCriar: {
    marginTop: espacamento.sm,
    backgroundColor: cores.destaque,
    borderRadius: 10,
    paddingVertical: espacamento.sm,
    alignItems: 'center',
  },
  botaoCriarTexto: { color: '#FFF', fontWeight: '700' },
  vazio: { color: cores.textoSecundario },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamento.md,
    marginBottom: espacamento.sm,
  },
  cardTopo: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTituloItem: { fontSize: 16, fontWeight: '700', color: cores.texto, flexShrink: 1 },
  cardData: { color: cores.textoSecundario },
  cardDescricao: { color: cores.textoSecundario, marginTop: 4 },
  cardStatus: { color: cores.destaque, fontWeight: '700', marginTop: espacamento.xs },
  cardCliente: { color: cores.textoSecundario, marginTop: 2, fontSize: 13 },
  acoes: { flexDirection: 'row', flexWrap: 'wrap', gap: espacamento.xs, marginTop: espacamento.sm },
  botaoAvancar: {
    backgroundColor: cores.destaque,
    borderRadius: 8,
    paddingVertical: espacamento.xs,
    paddingHorizontal: espacamento.sm,
  },
  botaoAvancarTexto: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  botaoCancelar: {
    borderRadius: 8,
    paddingVertical: espacamento.xs,
    paddingHorizontal: espacamento.sm,
    borderWidth: 1,
    borderColor: cores.perigo,
  },
  botaoCancelarTexto: { color: cores.perigo, fontWeight: '700', fontSize: 13 },
  botaoWhatsapp: {
    borderRadius: 8,
    paddingVertical: espacamento.xs,
    paddingHorizontal: espacamento.sm,
    borderWidth: 1,
    borderColor: cores.sucesso,
  },
  botaoWhatsappTexto: { color: cores.sucesso, fontWeight: '700', fontSize: 13 },
});
