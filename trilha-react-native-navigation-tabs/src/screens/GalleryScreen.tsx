import { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ArtPreview, colors, Page, styles } from '../components/ui';
import { artworks, categories, type Category } from '../data/gallery';
import { useGallery } from '../context/GalleryContext';

export default function GalleryScreen() {
  const [category, setCategory] = useState<Category>('Todas');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { favorites, toggleFavorite } = useGallery();
  const visible = artworks.filter(artwork => (category === 'Todas' || artwork.category === category) && (!onlyFavorites || favorites.includes(artwork.id)));
  return <Page>
    <Text style={styles.eyebrow}>COLEÇÃO / FORMAS & CORES</Text>
    <Text style={styles.title}>Encontre sua inspiração.</Text>
    <View style={styles.chips}>{categories.map(item => <Pressable key={item} accessibilityRole="button" accessibilityState={{ selected: category === item }} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={{ color: category === item ? colors.background : colors.text }}>{item}</Text></Pressable>)}</View>
    <View style={styles.row}><Text style={styles.body}>Somente favoritos</Text><Switch accessibilityLabel="Mostrar somente favoritos" value={onlyFavorites} onValueChange={setOnlyFavorites} trackColor={{ false: colors.border, true: colors.accent }} thumbColor="#ffffff" /></View>
    <Text style={styles.eyebrow}>{visible.length} {visible.length === 1 ? 'COMPOSIÇÃO' : 'COMPOSIÇÕES'}</Text>
    {visible.map(artwork => {
      const selected = favorites.includes(artwork.id);
      return <View key={artwork.id} style={styles.card}>
        <ArtPreview artwork={artwork} />
        <View style={styles.row}><View style={{ flex: 1, gap: 6 }}><Text style={styles.eyebrow}>{artwork.category.toUpperCase()}</Text><Text style={styles.heading}>{artwork.title}</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel={`${selected ? 'Remover' : 'Adicionar'} ${artwork.title} ${selected ? 'dos' : 'aos'} favoritos`} accessibilityState={{ selected }} onPress={() => toggleFavorite(artwork.id)} style={({ pressed }) => ({ padding: 14, opacity: pressed ? 0.6 : 1 })}><MaterialCommunityIcons name={selected ? 'heart' : 'heart-outline'} size={26} color={colors.accent} /></Pressable>
        </View>
        <Text style={styles.body}>{artwork.description}</Text>
      </View>;
    })}
    {visible.length === 0 && <View style={styles.card}><Text style={styles.heading}>Um espaço para suas escolhas.</Text><Text style={styles.body}>Nenhuma composição corresponde aos filtros. Escolha outra categoria ou desative Somente favoritos.</Text><Pressable accessibilityRole="button" onPress={() => { setCategory('Todas'); setOnlyFavorites(false); }} style={styles.button}><Text style={styles.buttonText}>Mostrar toda a coleção</Text></Pressable></View>}
  </Page>;
}
