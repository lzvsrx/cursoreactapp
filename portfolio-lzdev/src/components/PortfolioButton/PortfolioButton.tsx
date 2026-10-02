import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
type Props = { label: string; onPress: () => void; active?: boolean };
export default function PortfolioButton({ label, onPress, active = false }: Props) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, active && styles.active, pressed && { opacity: 0.7 }]}><Text style={styles.text}>{label}</Text></Pressable>;
}
const styles = StyleSheet.create({ button: { borderWidth: 1, borderColor: '#334155', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginRight: 8, marginBottom: 8 }, active: { backgroundColor: '#14532d', borderColor: '#4ade80' }, text: { color: '#f8fafc', fontWeight: '600' } });
