import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Car } from '../types/car';
import { colors } from '../theme/colors';

type Props = { car: Car; position: number; total: number };

export function CarCard({ car, position, total }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.badge}>MODELO {String(position).padStart(2, '0')}</Text>
        <Text style={styles.counter}>{position} / {total}</Text>
      </View>
      <Image source={{ uri: car.image }} style={styles.image} resizeMode="contain" accessibilityLabel={`Imagem do Lamborghini ${car.carName}`} />
      <Text style={styles.brand}>LAMBORGHINI</Text>
      <Text style={styles.name}>{car.carName}</Text>
      <View style={styles.divider} />
      <View style={styles.details}>
        <View><Text style={styles.label}>ANO</Text><Text style={styles.value}>{car.releaseYear}</Text></View>
        <View style={styles.priceBlock}><Text style={styles.label}>PREÇO</Text><Text style={styles.value}>{car.price}</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 22, padding: 20, width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  counter: { color: colors.muted, fontSize: 13 },
  image: { width: '100%', height: 220, marginVertical: 12 },
  brand: { color: colors.gold, letterSpacing: 4, fontSize: 11, fontWeight: '700', marginTop: 6 },
  name: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 7 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 20 },
  details: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  label: { color: colors.muted, fontSize: 11, letterSpacing: 2, marginBottom: 6 },
  value: { color: colors.text, fontWeight: '700', fontSize: 17 },
  priceBlock: { alignItems: 'flex-end', flexShrink: 1 },
});
