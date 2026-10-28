import { Pressable, Text } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Page, styles } from '../components/ui';
import { projects } from '../data/gallery';
import type { RootStackParamList, TabParamList } from '../navigation/types';

type Props = CompositeScreenProps<BottomTabScreenProps<TabParamList, 'Gallery'>, NativeStackScreenProps<RootStackParamList>>;
export default function GalleryScreen({ navigation }: Props) {
  return <Page>
    <Text style={styles.eyebrow}>EXPLORE / 03 CONCEITOS</Text>
    <Text style={styles.title}>Galeria de caminhos</Text>
    <Text style={styles.body}>Escolha um conceito para abrir uma nova tela e experimentar a navegação em pilha.</Text>
    {projects.map(project => <Pressable key={project.id} accessibilityRole="button" accessibilityLabel={`Abrir ${project.title}`} onPress={() => navigation.navigate('Details', { projectId: project.id })} style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}>
      <Text style={{ color: project.color, fontSize: 38 }}>{project.symbol}</Text>
      <Text style={[styles.eyebrow, { color: project.color }]}>{project.category}</Text>
      <Text style={styles.heading}>{project.title} ↗</Text>
      <Text style={styles.body}>Toque para explorar o conceito.</Text>
    </Pressable>)}
  </Page>;
}
