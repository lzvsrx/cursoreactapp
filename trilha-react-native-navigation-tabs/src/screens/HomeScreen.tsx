import { Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ArtPreview, Button, Page, styles } from '../components/ui';
import { artworks } from '../data/gallery';
import { useGallery } from '../context/GalleryContext';
import type { TabParamList } from '../routes/types';

export default function HomeScreen({ navigation }: BottomTabScreenProps<TabParamList, 'home'>) {
  const { favorites } = useGallery();
  return <Page>
    <Text style={styles.eyebrow}>DIO / BOTTOM TABS</Text>
    <Text style={styles.title}>Seu olhar,{ '\n' }novos caminhos.</Text>
    <Text style={styles.body}>Um espaço para explorar formas, descobrir cores e guardar suas composições favoritas.</Text>
    <ArtPreview artwork={artworks[1]} />
    <Button title="Explorar galeria →" onPress={() => navigation.navigate('gallery')} />
    <View style={styles.card}>
      <Text style={styles.eyebrow}>SUA COLEÇÃO NESTA SESSÃO</Text>
      <Text style={styles.heading}>{favorites.length} {favorites.length === 1 ? 'composição favorita' : 'composições favoritas'}</Text>
      <Text style={styles.body}>Toque no coração de uma composição na Galeria. Seus favoritos e filtros continuam disponíveis ao alternar entre as abas.</Text>
    </View>
    <Text style={styles.body}>Use a barra inferior para mudar de área. As seleções ficam na memória e são reiniciadas ao fechar ou recarregar o aplicativo.</Text>
  </Page>;
}
