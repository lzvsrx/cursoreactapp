import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArtworkPreview, Button, Page, styles } from '../components/ui';
import { getArtwork } from '../data/artworks';
import type { RootStackParamList } from '../routes/types';

export default function DetailsScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'details'>) {
  const artwork = getArtwork(route.params.artworkId);
  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.replace('gallery');
  if (!artwork) return <Page><Text style={styles.title}>Composição não encontrada.</Text><Text style={styles.body}>Escolha uma composição disponível na galeria.</Text><Button title="Abrir galeria" onPress={() => navigation.replace('gallery')} /></Page>;
  return <Page>
    <Text style={styles.eyebrow}>{artwork.category}</Text>
    <Text style={styles.title}>{artwork.title}</Text>
    <ArtworkPreview artwork={artwork} />
    <View style={styles.card}><Text style={styles.heading}>Sobre a composição</Text><Text style={styles.body}>{artwork.description}</Text></View>
    <Button title="← Voltar à tela anterior" onPress={goBack} />
    <Button secondary title="Voltar ao início" onPress={() => navigation.popToTop()} />
  </Page>;
}
