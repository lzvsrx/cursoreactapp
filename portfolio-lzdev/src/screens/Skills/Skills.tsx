import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfileHeader from '../../components/ProfileHeader';
import { skills, skillBranches } from '../../services/portfolio';
import styles from '../Home/Style';

export default function Skills() {
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
    <StatusBar style="light" />
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader />
      <Text style={styles.heading} accessibilityRole="header">Árvore de habilidades</Text>
      <Text style={styles.text}>Tecnologias que fazem parte da minha trajetória.</Text>
      <Text style={styles.muted}>Autoavaliação do portfólio original: básico abaixo de 70%, intermediário de 70 a 84% e avançado a partir de 85%. Os percentuais não representam uma certificação.</Text>
      <View style={tree.root}><Text style={styles.cardTitle}>LZ Dev · Desenvolvimento e tecnologia</Text>
        {skillBranches.map(branch => <View key={branch.title} style={tree.branch}>
          <Text accessibilityRole="header" style={tree.title}>{branch.title}</Text>
          {branch.names.map(name => {
            const skill = skills.find(item => item.name === name)!;
            const level = skill.percentage >= 85 ? 'Avançado' : skill.percentage >= 70 ? 'Intermediário' : 'Básico';
            return <View key={name} style={styles.card}>
              <Text style={styles.cardTitle}>{name}</Text>
              <Text style={styles.text}>{level} · {skill.percentage}%</Text>
              <View accessibilityRole="progressbar" accessibilityLabel={name} accessibilityValue={{ min: 0, max: 100, now: skill.percentage, text: level }} style={styles.track}>
                <View style={[styles.fill, { width: `${skill.percentage}%` }]} />
              </View>
            </View>;
          })}
        </View>)}
      </View>
      <Text style={styles.footer}>Aprendizado contínuo · LZ Dev</Text>
    </ScrollView>
  </SafeAreaView>;
}
const tree = StyleSheet.create({
  root: { marginTop: 28 },
  branch: { borderLeftWidth: 2, borderColor: '#4ade80', paddingLeft: 16, marginTop: 20 },
  title: { color: '#4ade80', fontSize: 20, fontWeight: '700', marginBottom: 16 },
});
