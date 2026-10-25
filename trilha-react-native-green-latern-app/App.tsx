import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import symbolOn from './assets/pictures/symbol-on.png';
import symbolOff from './assets/pictures/symbol-off.png';

export default function App() {
  const [isActive, setisActive] = useState(false)

  function handleSymbol(){
    
    setisActive((oldValue:boolean) =>{
      return !oldValue
    })

  }

  return (
    <View style={isActive ? styles.containerOn : styles.containerOff}>
      <StatusBar style={isActive ? 'light' : 'dark'} />
      <TouchableOpacity accessibilityRole="switch" accessibilityLabel="Alternar símbolo do Lanterna Verde" accessibilityState={{ checked: isActive }} onPress={handleSymbol} style={styles.button} >
          <Image 
            source={isActive ? symbolOn : symbolOff}
            style={styles.symbol}
            resizeMode="contain"
          />
      </TouchableOpacity>
      <Text accessibilityLiveRegion="polite" style={{ color: isActive ? '#ffffff' : '#111111' }}>{isActive ? 'Símbolo ativado' : 'Toque no símbolo para ativar'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { width: '85%', maxWidth: 360, aspectRatio: 1, marginBottom: 24 },
  symbol: { width: '100%', height: '100%' },
  containerOn: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOff:{
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
