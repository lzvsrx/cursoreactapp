import { useState } from 'react';
import { Text, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import generatePass from '../../services/passwordService';
import { BatTextInput } from '../BatTextInput/BatTextInput';
import { styles } from './BatButtonStyles';

export function BatButton() {
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  function generate() {
    try { setPass(generatePass()); setMessage('Senha gerada com 16 caracteres.'); }
    catch { setMessage('Não foi possível gerar a senha. Na web, utilize HTTPS ou localhost.'); }
  }
  async function copy() {
    try { await Clipboard.setStringAsync(pass); setMessage('Senha copiada.'); }
    catch { setMessage('Não foi possível copiar. Verifique a permissão da área de transferência.'); }
  }
  return <>
    <BatTextInput pass={pass} />
    <Pressable accessibilityRole="button" onPress={generate} style={styles.button}><Text style={styles.text}>GERAR SENHA</Text></Pressable>
    <Pressable accessibilityRole="button" accessibilityState={{ disabled: !pass }} disabled={!pass} onPress={copy} style={[styles.button, !pass && { opacity: 0.5 }]}><Text style={styles.text}>COPIAR</Text></Pressable>
    <Text accessibilityLiveRegion="polite" style={{ color: '#ffffff', marginTop: 12 }}>{message}</Text>
  </>;
}
