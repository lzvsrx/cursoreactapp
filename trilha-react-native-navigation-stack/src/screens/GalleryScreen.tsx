import { Pressable, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArtworkPreview, Button, Page, styles } from '../components/ui';
import { artworks } from '../data/artworks';
import type { RootStackParamList } from '../routes/types';

export default function GalleryScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'gallery'>) {
  return <Page>
    <Text style={styles.eyebrow}>COLEÇÃO / 03 COMPOSIÇÕES</Text>
    <Text style={styles.title}>Um olhar mais perto.</Text>
    <Text style={styles.body}>Toque em uma composição para conhecer sua história.</Text>
    {artworks.map((artwork, index) => <Pressable key={artwork.id} accessibilityRole="button" accessibilityLabel={`Ver detalhes de ${artwork.title}`} style={({ pressed }) => [styles.card, pressed && { opacity: 0.75 }]} onPress={() => navigation.navigate('details', { artworkId: artwork.id })}>
      <ArtworkPreview artwork={artwork} />
      <Text style={styles.eyebrow}>0{index + 1} / {artwork.category}</Text>
      <Text style={styles.heading}>{artwork.title} ↗</Text>
    </Pressable>)}
    <Button secondary title="← Voltar ao início" onPress={() => navigation.popToTop()} />
  </Page>;
}
