import React, { useMemo, useState } from 'react';
import { Image, Linking, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import styles from './Style';
import Button from '../../components/PortfolioButton/PortfolioButton';
import { socialLinks, skills, databases, services } from '../../services/portfolio';
import { githubRepositories } from '../../services/repositories';
import { certificates, Certificate } from '../../services/certificates';
import { certificateAssets } from '../../services/certificateAssets';
const sections = ['Sobre', 'Projetos', 'Certificados', 'Serviços', 'Contato'] as const;
type Section = typeof sections[number];
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export default function Home() {
  const [section, setSection] = useState<Section>('Sobre');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [opening, setOpening] = useState('');
  const projects = useMemo(() => githubRepositories.filter(p => normalize(`${p.name} ${p.summary || ''} ${p.description || ''} ${p.language || ''}`).includes(normalize(search))), [search]);
  const documents = useMemo(() => certificates.filter(c => normalize(`${c.title} ${c.originalName}`).includes(normalize(search))), [search]);
  async function openLink(url: string) { try { setError(''); await Linking.openURL(url); } catch { setError('Não foi possível abrir o link. Confira se há um aplicativo compatível instalado.'); } }
  async function openCertificate(c: Certificate) {
    setOpening(c.fileName); setError('');
    try {
      const asset = Asset.fromModule(certificateAssets[c.fileName]);
      if (Platform.OS === 'web') { await Linking.openURL(asset.uri); }
      else {
        await asset.downloadAsync();
        if (!await Sharing.isAvailableAsync()) throw Error('Compartilhamento indisponível');
        await Sharing.shareAsync(asset.localUri || asset.uri, { mimeType: c.type === 'PDF' ? 'application/pdf' : 'image/png', dialogTitle: c.title });
      }
    } catch { setError('Não foi possível abrir o certificado. O arquivo também está disponível na pasta assets/certificados.'); }
    finally { setOpening(''); }
  }
  return <SafeAreaView style={styles.safe}><StatusBar style="light" /><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <View style={styles.header}>
      <Text style={styles.brand}>{'< LZ Dev />'}</Text>
      <Image source={require('../../../assets/profile.jpg')} style={styles.photo} accessibilityLabel="Foto de Luiz Otavio Valenzi Sousa" />
      <Text accessibilityRole="header" style={styles.title}>Luiz Otavio Valenzi Sousa</Text>
      <Text style={styles.subtitle}>Desenvolvedor Full Stack</Text>
      <Text style={styles.text}>Desenvolvedor apaixonado por tecnologia, com experiência em criação de sites, aplicativos, programação e serviços de informática.</Text>
      <View style={styles.row}><Button label="Conversar no WhatsApp" active onPress={() => openLink('https://wa.me/5535999215995')} /><Button label="GitHub" onPress={() => openLink('https://github.com/lzvsrx')} /></View>
      <View style={styles.row}>{sections.map(s => <Button key={s} label={s} active={section === s} onPress={() => { setSection(s); setSearch(''); setError(''); }} />)}</View>
    </View>
    {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.heading}>{section}</Text>
      {section === 'Sobre' && <>
        <View style={styles.card}><Text style={styles.cardTitle}>Desenvolvimento web, apps e manutenção de computadores</Text><Text style={styles.text}>Especializado em desenvolvimento web e manutenção de computadores, com atuação em sites profissionais, sistemas personalizados, aplicativos mobile, automações e suporte técnico.</Text></View>
        <Text style={styles.muted}>{githubRepositories.length} projetos · {certificates.length} certificados e documentos</Text>
        <View style={styles.row}>{skills.map(s => <View key={s.name} style={[styles.card, { width: '100%' }]}><Text style={styles.cardTitle}>{s.name} · {s.percentage}%</Text><View style={styles.track}><View style={[styles.fill, { width: `${s.percentage}%` }]} /></View></View>)}</View>
        <Text style={styles.cardTitle}>Bancos de dados</Text><Text style={styles.text}>{databases.join(' · ')}</Text>
      </>}
      {(section === 'Projetos' || section === 'Certificados') && <TextInput accessibilityLabel={section === 'Projetos' ? 'Buscar projeto' : 'Buscar certificado'} placeholder={section === 'Projetos' ? 'Buscar por nome, tecnologia ou descrição' : 'Buscar curso ou arquivo'} placeholderTextColor="#94a3b8" value={search} onChangeText={setSearch} style={styles.input} />}
      {section === 'Projetos' && <><Text style={styles.muted}>{projects.length} de {githubRepositories.length} projetos</Text>{projects.map(p => <View style={styles.card} key={p.name}><Text style={styles.cardTitle}>{p.name}</Text><Text style={styles.text}>{p.summary || p.description || 'Repositório do portfólio'}</Text><Text style={styles.muted}>{p.language || 'Tecnologias diversas'}{p.archived ? ' · Arquivado' : ''}{p.private ? ' · Privado: acesso restrito' : ''}</Text><View style={styles.row}><Button label="Ver repositório" onPress={() => openLink(p.url)} />{!!p.homepage && <Button label="Visitar projeto" onPress={() => openLink(p.homepage!)} />}</View></View>)}{!projects.length && <Text style={styles.text}>Nenhum projeto encontrado.</Text>}</>}
      {section === 'Certificados' && <><Text style={styles.muted}>{documents.length} de {certificates.length} documentos</Text>{documents.map(c => <View style={styles.card} key={c.fileName}><Text style={styles.cardTitle}>{c.title}</Text><Text style={styles.muted}>{c.type} · {c.originalName}</Text><View style={styles.row}><Button label={opening === c.fileName ? 'Abrindo…' : 'Abrir certificado'} onPress={() => { if (!opening) openCertificate(c); }} /></View></View>)}{!documents.length && <Text style={styles.text}>Nenhum certificado encontrado.</Text>}</>}
      {section === 'Serviços' && services.map(s => <View style={styles.card} key={s.title}><Text style={styles.cardTitle}>{s.title}</Text><Text style={styles.text}>{s.text}</Text></View>)}
      {section === 'Contato' && <><Text style={styles.text}>Vamos conversar sobre o seu próximo projeto.</Text><View style={styles.row}>{socialLinks.map(l => <Button key={l.label} label={l.label} onPress={() => openLink(l.href)} />)}</View></>}
    </View>
    <Text style={styles.footer}>Luiz Otavio Valenzi Sousa · LZ Dev</Text>
  </ScrollView></SafeAreaView>;
}
