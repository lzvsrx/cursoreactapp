import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export const colors = { background: '#0e1118', surface: '#191e29', text: '#f4f5fa', muted: '#a5aec0', accent: '#b9a2ff', border: '#2a3242' };

export function Page({ children }: { children: ReactNode }) {
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}><View style={styles.column}>{children}</View></ScrollView>;
}
export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, pressed && { opacity: 0.75 }]}><Text style={styles.buttonText}>{title}</Text></Pressable>;
}
export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingBottom: 44 },
  column: { width: '100%', maxWidth: 860, alignSelf: 'center', gap: 24 },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 38, fontWeight: '800', letterSpacing: -1.3 },
  body: { color: colors.muted, fontSize: 17, lineHeight: 27 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 22, padding: 24, gap: 16 },
  heading: { color: colors.text, fontSize: 22, fontWeight: '700' },
  button: { backgroundColor: colors.accent, borderRadius: 14, paddingVertical: 17, paddingHorizontal: 22, alignItems: 'center' },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: '700' },
});
