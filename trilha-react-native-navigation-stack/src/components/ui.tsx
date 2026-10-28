import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Artwork } from '../data/artworks';

export const palette = { background: '#f6f5f0', ink: '#182139', muted: '#5e6677', blue: '#234de6', border: '#dcdedc' };
export function Page({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return <ScrollView style={styles.page} contentContainerStyle={{ padding: 24, paddingBottom: Math.max(insets.bottom, 24) + 16 }}><View style={styles.column}>{children}</View></ScrollView>;
}
export function Button({ title, onPress, secondary = false }: { title: string; onPress: () => void; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.secondary, pressed && { opacity: 0.7 }]}><Text style={[styles.buttonText, secondary && { color: palette.blue }]}>{title}</Text></Pressable>;
}
export function ArtworkPreview({ artwork }: { artwork: Artwork }) {
  return <View accessible={false} style={[styles.art, { backgroundColor: artwork.color }]}>
    <View style={[styles.orbit, { backgroundColor: artwork.accent }]} />
    <View style={[styles.plane, { borderColor: artwork.accent }]} />
    <View style={styles.dot} />
  </View>;
}
export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.background },
  column: { width: '100%', maxWidth: 780, alignSelf: 'center', gap: 24 },
  eyebrow: { color: palette.blue, fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: palette.ink, fontSize: 42, fontWeight: '800', letterSpacing: -1.5 },
  heading: { color: palette.ink, fontSize: 24, fontWeight: '700' },
  body: { color: palette.muted, fontSize: 17, lineHeight: 27 },
  card: { padding: 22, gap: 14, backgroundColor: '#ffffff', borderRadius: 24, borderWidth: 1, borderColor: palette.border },
  button: { backgroundColor: palette.blue, borderRadius: 14, paddingHorizontal: 22, paddingVertical: 18, alignItems: 'center' },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: palette.blue },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
  art: { height: 220, overflow: 'hidden', borderRadius: 18, position: 'relative' },
  orbit: { width: 160, height: 160, borderRadius: 80, position: 'absolute', top: 24, right: '14%' },
  plane: { width: '120%', height: 170, borderWidth: 2, borderRadius: 90, position: 'absolute', left: '-10%', bottom: -75, transform: [{ rotate: '-15deg' }] },
  dot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#ffffff', position: 'absolute', top: 32, left: 32 },
});
