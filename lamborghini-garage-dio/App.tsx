import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CarCard } from './src/components/CarCard';
import { getCars } from './src/services/lamborghiniApi';
import { colors } from './src/theme/colors';
import type { Car } from './src/types/car';

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    getCars(controller.signal)
      .then((data) => { setCars(data); setIndex(0); })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Erro ao carregar os veículos.');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [reloadKey]);

  const previous = useCallback(() => setIndex((current) => (current - 1 + cars.length) % cars.length), [cars.length]);
  const next = useCallback(() => setIndex((current) => (current + 1) % cars.length), [cars.length]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons name="car-sport" size={29} color={colors.gold} />
          <Text style={styles.logo}>LAMBORGHINI <Text style={styles.logoGold}>GARAGE</Text></Text>
        </View>
        <Text style={styles.eyebrow}>DIO • REACT NATIVE + EXPO</Text>
        <Text style={styles.title}>Explore a excelência italiana.</Text>
        <Text style={styles.subtitle}>Conheça modelos icônicos da Lamborghini em um catálogo interativo.</Text>

        {loading ? (
          <View style={styles.center}><ActivityIndicator size="large" color={colors.gold} /><Text style={styles.message}>Carregando garagem...</Text></View>
        ) : error ? (
          <View style={styles.center}>
            <Ionicons name="cloud-offline-outline" size={42} color={colors.error} />
            <Text style={styles.message}>{error}</Text>
            <Pressable style={styles.retry} onPress={() => setReloadKey((n) => n + 1)} accessibilityRole="button"><Text style={styles.retryText}>Tentar novamente</Text></Pressable>
          </View>
        ) : cars.length > 0 ? (
          <>
            <CarCard car={cars[index]} position={index + 1} total={cars.length} />
            <View style={styles.navigation}>
              <Pressable style={styles.navButton} onPress={previous} accessibilityRole="button" accessibilityLabel="Carro anterior"><Ionicons name="arrow-back" size={24} color={colors.text} /><Text style={styles.navText}>Anterior</Text></Pressable>
              <Text style={styles.page}>{String(index + 1).padStart(2, '0')} <Text style={styles.pageMuted}>/ {String(cars.length).padStart(2, '0')}</Text></Text>
              <Pressable style={[styles.navButton, styles.nextButton]} onPress={next} accessibilityRole="button" accessibilityLabel="Próximo carro"><Text style={[styles.navText, styles.nextText]}>Próximo</Text><Ionicons name="arrow-forward" size={24} color={colors.background} /></Pressable>
            </View>
          </>
        ) : null}
        <Text style={styles.footer}>Projeto educacional DIO • Dados: Fake Data API Lamborghini</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 26, paddingBottom: 30, maxWidth: 680, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 35 },
  logo: { color: colors.text, fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  logoGold: { color: colors.gold },
  eyebrow: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 12 },
  title: { color: colors.text, fontSize: 33, lineHeight: 39, fontWeight: '900', marginBottom: 10 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 23, marginBottom: 28 },
  center: { minHeight: 330, alignItems: 'center', justifyContent: 'center', gap: 18 },
  message: { color: colors.muted, fontSize: 15, textAlign: 'center' },
  retry: { paddingHorizontal: 22, paddingVertical: 13, backgroundColor: colors.gold, borderRadius: 10 },
  retryText: { color: colors.background, fontWeight: '800' },
  navigation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, gap: 6 },
  navButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderColor: colors.border, borderWidth: 1, backgroundColor: colors.surface2, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 12 },
  navText: { color: colors.text, fontSize: 13, fontWeight: '800' },
  nextButton: { backgroundColor: colors.gold, borderColor: colors.gold },
  nextText: { color: colors.background },
  page: { color: colors.gold, fontWeight: '800', fontSize: 16 },
  pageMuted: { color: colors.muted },
  footer: { color: colors.muted, textAlign: 'center', marginTop: 38, fontSize: 11 },
});
