import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const colors = { background: '#f5f2ec', ink: '#233e3b', muted: '#576b65', accent: '#245d50', surface: '#ffffff', border: '#d8dfd8' };
export function Page({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 24, paddingLeft: Math.max(insets.left, 24), paddingRight: Math.max(insets.right, 24), paddingBottom: Math.max(insets.bottom, 24) + 16 }}><View style={styles.column}>{children}</View></ScrollView>;
}
export function Button({ title, onPress, secondary = false }: { title: string; onPress: () => void; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, secondary && { backgroundColor: 'transparent' }, pressed && { opacity: 0.7 }]}><Text style={[styles.buttonText, secondary && { color: colors.accent }]}>{title}</Text></Pressable>;
}
export function Landscape({ color = '#c1d2b5', sun = '#f5d38f' }: { color?: string; sun?: string }) {
  return <View accessible={false} style={[styles.landscape, { backgroundColor: color }]}><View style={[styles.sun, { backgroundColor: sun }]} /><View style={styles.hill} /><View style={styles.foreground} /></View>;
}
export const styles = StyleSheet.create({
  column: { width: '100%', maxWidth: 800, alignSelf: 'center', gap: 24 },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: colors.ink, fontSize: 42, fontWeight: '800', letterSpacing: -1.2 },
  heading: { color: colors.ink, fontSize: 23, fontWeight: '700' },
  body: { color: colors.muted, fontSize: 17, lineHeight: 27 },
  card: { padding: 22, borderRadius: 24, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: 16 },
  button: { backgroundColor: colors.accent, borderWidth: 1, borderColor: colors.accent, borderRadius: 14, paddingHorizontal: 20, paddingVertical: 18, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  landscape: { height: 220, borderRadius: 18, overflow: 'hidden', position: 'relative' },
  sun: { width: 95, height: 95, borderRadius: 48, position: 'absolute', top: 28, right: '18%' },
  hill: { width: '120%', height: 230, borderRadius: 120, position: 'absolute', backgroundColor: '#688777', bottom: -150, left: '-20%', transform: [{ rotate: '-16deg' }] },
  foreground: { width: '100%', height: 180, borderRadius: 90, position: 'absolute', backgroundColor: '#345e53', bottom: -135, right: '-20%', transform: [{ rotate: '15deg' }] },
});
