import React from 'react';
import Home from './src/screens/Home/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() { return <SafeAreaProvider><Home /></SafeAreaProvider>; }
