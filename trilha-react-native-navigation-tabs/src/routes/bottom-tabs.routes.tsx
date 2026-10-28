import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import { colors } from '../components/ui';
import type { TabParamList } from './types';

const Tabs = createBottomTabNavigator<TabParamList>();
export function BottomTabsRoutes() {
  return <Tabs.Navigator initialRouteName="home" backBehavior="history" screenOptions={({ route }) => ({
    headerShadowVisible: false,
    tabBarActiveTintColor: colors.accent,
    tabBarInactiveTintColor: colors.muted,
    tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
    tabBarLabelStyle: { fontWeight: '600' },
    tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons name={route.name === 'home' ? (focused ? 'home' : 'home-outline') : (focused ? 'view-gallery' : 'view-gallery-outline')} color={color} size={size} />,
  })}>
    <Tabs.Screen name="home" component={HomeScreen} options={{ title: 'Início', headerTitle: 'Tabs Atelier', tabBarAccessibilityLabel: 'Aba Início' }} />
    <Tabs.Screen name="gallery" component={GalleryScreen} options={{ title: 'Galeria', tabBarAccessibilityLabel: 'Aba Galeria' }} />
  </Tabs.Navigator>;
}
