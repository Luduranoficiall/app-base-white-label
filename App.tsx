import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RecursoProvider } from './src/store/RecursoContext';
import RecursosScreen from './src/screens/RecursosScreen';
import GuiaScreen from './src/screens/GuiaScreen';
import { marca } from './src/config/marca';
import { cores } from './src/theme';

type Aba = 'recursos' | 'guia';

const abas: { chave: Aba; rotulo: string }[] = [
  { chave: 'recursos', rotulo: marca.entidade.plural },
  { chave: 'guia', rotulo: 'Guia' },
];

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('recursos');

  return (
    <RecursoProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.conteudo}>
          {abaAtiva === 'recursos' && <RecursosScreen />}
          {abaAtiva === 'guia' && <GuiaScreen />}
        </View>

        <View style={styles.tabBar}>
          {abas.map((aba) => (
            <TouchableOpacity
              key={aba.chave}
              style={styles.tabItem}
              onPress={() => setAbaAtiva(aba.chave)}
            >
              <Text style={[styles.tabTexto, abaAtiva === aba.chave && styles.tabTextoAtivo]}>
                {aba.rotulo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </RecursoProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    backgroundColor: cores.superficie,
  },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  tabTexto: { color: cores.textoSecundario, fontWeight: '600', fontSize: 12 },
  tabTextoAtivo: { color: cores.destaque },
});
