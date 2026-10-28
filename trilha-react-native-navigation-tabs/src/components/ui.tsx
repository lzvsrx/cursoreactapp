import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Artwork } from '../data/gallery';

export const colors = { background: '#12171a', surface: '#1c2427', text: '#f5f5ec', muted: '#acb8b6', accent: '#d2ef9f', border: '#35413f' };
export function Page({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return <ScrollView style={styles.page} contentContainerStyle={{ padding: 24, paddingLeft: Math.max(insets.left, 24), paddingRight: Math.max(insets.right, 24), paddingBottom: 40 }}><View style={styles.column}>{children}</View></ScrollView>;
}
export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}><Text style={styles.buttonText}>{title}</Text></Pressable>;
}
export function ArtPreview({ artwork }: { artwork: Artwork }) {
  return <View accessible={false} style={[styles.art, { backgroundColor: artwork.color }]}>
    <View style={[styles.circle, { backgroundColor: artwork.accent }]} />
    <View style={[styles.curve, { borderColor: artwork.accent }]} />
    <View style={styles.line} />
  </View>;
}
export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  column: { width: '100%', maxWidth: 800, alignSelf: 'center', gap: 24 },
  eyebrow: { color: colors.accent, fontWeight: '700', fontSize: 12, letterSpacing: 2 },
  title: { color: colors.text, fontWeight: '800', fontSize: 40, letterSpacing: -1.3 },
  heading: { color: colors.text, fontWeight: '700', fontSize: 23 },
  body: { color: colors.muted, fontSize: 16, lineHeight: 26 },
  card: { padding: 22, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: 16 },
  button: { paddingVertical: 18, paddingHorizontal: 24, borderRadius: 14, backgroundColor: colors.accent, alignItems: 'center' },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' },
  art: { height: 210, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  circle: { position: 'absolute', width: 142, height: 142, borderRadius: 71, top: 26, right: '15%' },
  curve: { position: 'absolute', width: '130%', height: 200, borderWidth: 2, borderRadius: 100, bottom: -120, left: '-15%', transform: [{ rotate: '-12deg' }] },
  line: { position: 'absolute', width: 40, height: 2, top: 36, left: 28, backgroundColor: '#ffffff' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 12 },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
});
