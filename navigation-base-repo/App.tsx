import { Text } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { colors } from './src/components/ui';
import type { RootStackParamList, TabParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, primary: colors.accent, background: colors.background, card: colors.surface, text: colors.text, border: colors.border } };
function MainTabs() {
  return <Tabs.Navigator screenOptions={({ route }) => ({
    headerTitle: 'Navigation Lab', headerShadowVisible: false,
    tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted,
    tabBarStyle: { backgroundColor: colors.surface },
    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }} accessibilityElementsHidden>{route.name === 'Home' ? '⌂' : '▦'}</Text>,
  })}>
    <Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
    <Tabs.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Galeria' }} />
  </Tabs.Navigator>;
}
export default function App() {
  return <SafeAreaProvider><StatusBar style="light" /><NavigationContainer theme={theme}>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes', headerBackButtonDisplayMode: 'minimal' }} />
    </Stack.Navigator>
  </NavigationContainer></SafeAreaProvider>;
}
