import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { getArtwork } from '../data/artworks';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
export function StackRoutes() {
  return <Stack.Navigator initialRouteName="home" screenOptions={{ headerShadowVisible: false, headerBackButtonDisplayMode: 'minimal' }}>
    <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Stack Studio' }} />
    <Stack.Screen name="gallery" component={GalleryScreen} options={{ title: 'Galeria' }} />
    <Stack.Screen name="details" component={DetailsScreen} options={({ route }) => ({ title: getArtwork(route.params.artworkId)?.title ?? 'Item não encontrado' })} />
  </Stack.Navigator>;
}
