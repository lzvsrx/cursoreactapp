import { Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, type DrawerContentComponentProps } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import { colors, styles } from '../components/ui';
import type { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();
function MenuContent(props: DrawerContentComponentProps) {
  return <DrawerContentScrollView {...props}>
    <View style={{ padding: 20, gap: 12 }}><Text style={styles.eyebrow}>DRAWER EXPLORER</Text><Text style={styles.heading}>Escolha seu caminho.</Text><Text style={styles.body}>Navegue pela coleção.</Text></View>
    <DrawerItemList {...props} />
    <DrawerItem label="Fechar menu" onPress={() => props.navigation.closeDrawer()} icon={({ color, size }) => <MaterialCommunityIcons name="close" color={color} size={size} />} />
  </DrawerContentScrollView>;
}
export function DrawerRoutes() {
  return <Drawer.Navigator initialRouteName="home" backBehavior="history" drawerContent={props => <MenuContent {...props} />} screenOptions={({ route }) => ({
    drawerType: 'front',
    headerShadowVisible: false,
    drawerActiveTintColor: colors.accent,
    drawerActiveBackgroundColor: '#e2ebdb',
    drawerInactiveTintColor: colors.muted,
    drawerStyle: { backgroundColor: colors.background },
    drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name={route.name === 'home' ? (focused ? 'home' : 'home-outline') : (focused ? 'view-gallery' : 'view-gallery-outline')} color={color} size={size} />,
  })}>
    <Drawer.Screen name="home" component={HomeScreen} options={{ title: 'Início', headerTitle: 'Drawer Explorer' }} />
    <Drawer.Screen name="gallery" component={GalleryScreen} options={{ title: 'Galeria' }} />
  </Drawer.Navigator>;
}
