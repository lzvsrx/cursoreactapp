import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Image, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import superImage from './assets/super.png';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [ligado, setLigado] = useState(true);
  const [ultimoEvento, setUltimoEvento] = useState('Toque na area abaixo para experimentar.');

  function mostrarValor() {
    const mensagem = usuario.trim() || 'Digite seu nome primeiro.';
    if (Platform.OS === 'web') {
      window.alert(mensagem);
    } else {
      Alert.alert('Valor atual', mensagem);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.eyebrow}>TRILHA REACT NATIVE</Text>
          <Text style={styles.title}>Componentes na pratica</Text>
          <Text style={styles.description}>Explore texto, imagem, entrada de dados, botoes e eventos de toque.</Text>

          <View style={styles.card}>
            <Text style={styles.heading}>Imagem e Switch</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Mostrar super-heroi</Text>
              <Switch accessibilityLabel="Mostrar super-heroi" value={ligado} onValueChange={setLigado} />
            </View>
            {ligado && <Image source={superImage} style={styles.image} resizeMode="contain" accessibilityLabel="Ilustracao de super-heroi" />}
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>TextInput e Button</Text>
            <Text nativeID="nome-label" style={styles.label}>Seu nome</Text>
            <TextInput accessibilityLabel="Seu nome" style={styles.input} onChangeText={setUsuario} placeholder="Digite seu nome" placeholderTextColor="#64748b" value={usuario} autoCapitalize="words" returnKeyType="done" onSubmitEditing={mostrarValor} />
            <Button title="Mostrar valor atual" onPress={mostrarValor} color="#2563eb" />
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Pressable e eventos</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Experimentar eventos de toque" onPressIn={() => setUltimoEvento('Toque iniciado')} onPressOut={() => setUltimoEvento('Toque finalizado')} onPress={() => setUltimoEvento('Pressionamento simples')} onLongPress={() => setUltimoEvento('Pressionamento longo')} style={({ pressed }) => [styles.touchArea, pressed && styles.pressed]}>
              <Text style={styles.touchText}>Toque ou mantenha pressionado</Text>
            </Pressable>
            <Text accessibilityLiveRegion="polite" style={styles.description}>{ultimoEvento}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Text e View</Text>
            <Text style={styles.label}>Textos aninhados: <Text style={styles.bold}>ola, mundo!</Text></Text>
            <View style={styles.row}><Text style={styles.label}>ola</Text><Text style={styles.label}>mundo</Text></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { padding: 24, gap: 20, width: '100%', maxWidth: 720, alignSelf: 'center' },
  eyebrow: { color: '#93c5fd', fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  title: { color: '#f8fafc', fontSize: 32, fontWeight: '700' },
  description: { color: '#cbd5e1', fontSize: 16, lineHeight: 24 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, gap: 16 },
  heading: { color: '#f8fafc', fontSize: 20, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  label: { color: '#e2e8f0', fontSize: 16 },
  image: { width: '100%', height: 220 },
  input: { minHeight: 48, borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#f8fafc', color: '#0f172a', fontSize: 16 },
  touchArea: { minHeight: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2563eb', borderRadius: 8, padding: 16 },
  pressed: { backgroundColor: '#1d4ed8' },
  touchText: { color: '#ffffff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  bold: { fontWeight: '700' },
});
