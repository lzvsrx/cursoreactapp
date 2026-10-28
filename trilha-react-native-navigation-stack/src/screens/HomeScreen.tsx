import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArtworkPreview, Button, Page, styles } from '../components/ui';
import { artworks } from '../data/artworks';
import type { RootStackParamList } from '../routes/types';

export default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'home'>) {
  return <Page>
    <Text style={styles.eyebrow}>DIO / NAVEGAÇÃO EM PILHA</Text>
    <Text style={styles.title}>Explore novas{ '\n' }perspectivas.</Text>
    <Text style={styles.body}>Uma pequena galeria para descobrir como cada tela abre um novo caminho.</Text>
    <ArtworkPreview artwork={artworks[0]} />
    <Button title="Conhecer a galeria →" onPress={() => navigation.navigate('gallery')} />
    <View style={styles.card}>
      <Text style={styles.eyebrow}>COMO FUNCIONA</Text>
      <Text style={styles.heading}>Avance. Explore. Volte.</Text>
      <Text style={styles.body}>Abra a galeria e escolha uma composição. Cada etapa entra na pilha; ao voltar, você encontra a tela anterior.</Text>
      <Text style={styles.eyebrow}>INÍCIO → GALERIA → DETALHES</Text>
    </View>
  </Page>;
}
