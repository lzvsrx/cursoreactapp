import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GalleryProvider } from './src/context/GalleryContext';
import { Routes } from './src/routes';

export default function App() {
  return <SafeAreaProvider><StatusBar style="light" /><GalleryProvider><Routes /></GalleryProvider></SafeAreaProvider>;
}
