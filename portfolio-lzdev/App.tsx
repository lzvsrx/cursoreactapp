import React, { useEffect, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from './src/screens/Home/Home';
import Skills from './src/screens/Skills/Skills';

type Screen = 'Perfil' | 'Habilidades';
const screens: Screen[] = ['Perfil', 'Habilidades'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('Perfil');
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'Perfil') return false;
      setScreen('Perfil');
      return true;
    });
    return () => subscription.remove();
  }, [screen]);
  return <SafeAreaProvider>
    <View style={styles.app}>
      <View style={[styles.page, screen !== 'Perfil' && styles.hidden]} accessibilityElementsHidden={screen !== 'Perfil'} importantForAccessibility={screen === 'Perfil' ? 'auto' : 'no-hide-descendants'}><Home /></View>
      <View style={[styles.page, screen !== 'Habilidades' && styles.hidden]} accessibilityElementsHidden={screen !== 'Habilidades'} importantForAccessibility={screen === 'Habilidades' ? 'auto' : 'no-hide-descendants'}><Skills /></View>
      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.navigation}>
        <View style={styles.tabs} accessibilityRole="tablist">
          {screens.map(item => <Pressable key={item} accessibilityRole="tab" accessibilityState={{ selected: screen === item }} onPress={() => setScreen(item)} style={({ pressed }) => [styles.tab, screen === item && styles.selected, pressed && { opacity: 0.7 }]}>
            <Text style={[styles.label, screen === item && styles.active]}>{item === 'Perfil' ? '01 · Perfil' : '02 · Habilidades'}</Text>
          </Pressable>)}
        </View>
      </SafeAreaView>
    </View>
  </SafeAreaProvider>;
}
const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#0b1120' },
  page: { flex: 1 }, hidden: { display: 'none' },
  navigation: { backgroundColor: '#162033', borderTopWidth: 1, borderColor: '#263449' },
  tabs: { flexDirection: 'row', width: '100%', maxWidth: 1100, alignSelf: 'center', padding: 12, gap: 12 },
  tab: { flex: 1, minHeight: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: '#334155' },
  selected: { backgroundColor: '#14532d', borderColor: '#4ade80' },
  label: { color: '#cbd5e1', fontSize: 15, fontWeight: '600' }, active: { color: '#4ade80' },
});
