import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../screens/Home/Style';

export default function ProfileHeader() {
  return <View>
    <Text style={styles.brand}>{'< LZ Dev />'}</Text>
    <Image source={require('../../assets/profile.jpg')} style={styles.photo} accessibilityLabel="Foto de Luiz Otavio Valenzi Sousa" />
    <Text accessibilityRole="header" style={styles.title}>Luiz Otavio Valenzi Sousa</Text>
    <Text style={styles.subtitle}>Desenvolvedor Full Stack</Text>
  </View>;
}
