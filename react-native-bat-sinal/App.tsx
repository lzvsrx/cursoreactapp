import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { emptyForm, SignalForm, FormErrors, validateForm } from './src/validation';

type Screen = 'home' | 'form' | 'success';
const fields: { key: keyof SignalForm; label: string; placeholder: string }[] = [
  { key: 'name', label: 'Seu nome', placeholder: 'Como podemos chamar você?' },
  { key: 'phone', label: 'Telefone para contato', placeholder: '(11) 99999-9999' },
  { key: 'location', label: 'Localização atual', placeholder: 'Endereço e ponto de referência' },
  { key: 'notes', label: 'Observações · opcional', placeholder: 'Conte o que está acontecendo…' },
];

function Button({ title, onPress, secondary = false }: { title: string; onPress: () => void; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [s.button, secondary && s.secondary, pressed && s.pressed]}>
    <Text style={[s.buttonText, secondary && s.secondaryText]}>{title}</Text>
  </Pressable>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [form, setForm] = useState<SignalForm>({ ...emptyForm });
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  function reset() { setForm({ ...emptyForm }); setErrors({}); setAttempted(false); setScreen('home'); }
  function submit() {
    const nextErrors = validateForm(form);
    setErrors(nextErrors); setAttempted(true);
    if (Object.keys(nextErrors).length === 0) setScreen('success');
  }
  return <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <StatusBar style="light" />
    <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
      <View style={s.container}>
        <View style={s.header}><Text style={s.brand}>GOTHAM<Text style={s.yellow}> / </Text>CITY</Text><Text style={s.online}>● CENTRAL ONLINE</Text></View>
        {screen === 'home' && <View style={s.content}>
          <Text style={s.eyebrow}>PROTEÇÃO NAS SOMBRAS</Text>
          <View style={s.signal}><Image source={require('./assets/bat-logo.png')} style={s.logo} resizeMode="contain" accessibilityLabel="Símbolo do Batman" /></View>
          <Text style={s.title}>A cidade precisa{ '\n' }de um herói.</Text>
          <Text style={s.description}>Quando a noite pedir ajuda, acenda a esperança. Ative o Bat-Sinal e registre seu chamado.</Text>
          <Button title="ATIVAR BAT-SINAL  ↗" onPress={() => setScreen('form')} />
          <View style={s.info}><Text style={s.eyebrow}>01 / COMO FUNCIONA</Text><Text style={s.infoText}>Ative o sinal. Informe sua localização. Confirme seu chamado.</Text></View>
        </View>}
        {screen === 'form' && <View style={s.content}>
          <Text style={s.eyebrow}>02 / REGISTRAR CHAMADO</Text>
          <Text style={s.title}>Onde precisam{ '\n' }de ajuda?</Text>
          <Text style={s.description}>Preencha os dados abaixo para preparar o sinal. Todos os campos são obrigatórios, exceto observações.</Text>
          {attempted && Object.keys(errors).length > 0 && <Text accessibilityRole="alert" style={s.error}>Revise os campos indicados antes de continuar.</Text>}
          {fields.map(({ key, label, placeholder }) => <View key={key} style={s.field}>
            <Text nativeID={`${key}-label`} style={s.label}>{label}</Text>
            <TextInput accessibilityLabel={label} accessibilityLabelledBy={`${key}-label`} value={form[key]} placeholder={placeholder} placeholderTextColor="#7f8797"
              onChangeText={value => { const next = { ...form, [key]: value }; setForm(next); if (attempted) setErrors(validateForm(next)); }}
              style={[s.input, key === 'notes' && s.multiline, errors[key] && s.invalid]}
              keyboardType={key === 'phone' ? 'phone-pad' : 'default'} autoComplete={key === 'name' ? 'name' : key === 'phone' ? 'tel' : 'off'}
              autoCapitalize={key === 'phone' ? 'none' : 'sentences'} multiline={key === 'notes'} textAlignVertical={key === 'notes' ? 'top' : 'center'} maxLength={key === 'notes' ? 500 : key === 'phone' ? 25 : 160} />
            {errors[key] && <Text accessibilityRole="alert" style={s.error}>{errors[key]}</Text>}
          </View>)}
          <Button title="ENVIAR CHAMADO  ↗" onPress={submit} />
          <Button title="Cancelar e voltar" secondary onPress={reset} />
        </View>}
        {screen === 'success' && <View style={s.content}>
          <Text style={s.eyebrow}>03 / SINAL ATIVADO</Text>
          <View style={[s.signal, s.activeSignal]}><Image source={require('./assets/bat-logo.png')} style={s.logo} resizeMode="contain" accessibilityLabel="Bat-Sinal aceso" /></View>
          <Text accessibilityRole="header" style={s.title}>O sinal está{ '\n' }no céu.</Text>
          <Text accessibilityLiveRegion="polite" style={s.description}>{form.name.trim()}, seu chamado foi registrado nesta demonstração.</Text>
          <View style={s.info}><Text style={s.eyebrow}>LOCAL INFORMADO</Text><Text style={s.infoText}>{form.location.trim()}</Text><Text style={s.muted}>Contato: {form.phone.trim()}</Text>{!!form.notes.trim() && <Text style={s.muted}>{form.notes.trim()}</Text>}</View>
          <Text style={s.description}>Simulação concluída. Nenhum dado foi enviado e nenhuma equipe foi acionada.</Text>
          <Button title="ENCERRAR SINAL" onPress={reset} />
        </View>}
        <View style={s.footer}><Text style={s.footerTitle}>BAT-SINAL / PROJETO DIO</Text><Text style={s.muted}>Demonstração educacional • Sem atendimento real</Text></View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>;
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#090c12' }, scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 58, paddingBottom: 32 },
  container: { width: '100%', maxWidth: 480, alignSelf: 'center', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingBottom: 26, borderBottomWidth: 1, borderBottomColor: '#252b36' },
  brand: { color: '#f5f6f8', fontWeight: '900', letterSpacing: 2, fontSize: 13 }, yellow: { color: '#f4cf40' }, online: { color: '#b6c3a5', fontSize: 10, letterSpacing: 1 },
  content: { paddingTop: 32, gap: 18 }, eyebrow: { color: '#f4cf40', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  signal: { alignSelf: 'center', width: 244, height: 164, borderRadius: 120, alignItems: 'center', justifyContent: 'center', backgroundColor: '#191b1a', borderWidth: 1, borderColor: '#373626', marginVertical: 10 },
  activeSignal: { backgroundColor: '#f4cf40', borderColor: '#ffe787' }, logo: { width: 210, height: 125 },
  title: { color: '#f5f6f8', fontSize: 38, fontWeight: '900', lineHeight: 43, letterSpacing: -1 },
  description: { color: '#a7afbf', fontSize: 16, lineHeight: 25 },
  button: { minHeight: 56, backgroundColor: '#f4cf40', padding: 17, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#101219', fontSize: 14, fontWeight: '800', letterSpacing: 1 }, secondary: { backgroundColor: '#171d28' }, secondaryText: { color: '#c6ccda', letterSpacing: 0 }, pressed: { opacity: 0.7 },
  info: { backgroundColor: '#131923', borderWidth: 1, borderColor: '#28303e', borderRadius: 14, padding: 20, gap: 12 }, infoText: { color: '#e3e7ef', fontSize: 15, lineHeight: 23 },
  field: { gap: 8 }, label: { color: '#e3e7ef', fontSize: 14, fontWeight: '600' },
  input: { backgroundColor: '#131923', borderColor: '#354052', borderWidth: 1, borderRadius: 10, padding: 16, color: '#f5f6f8', fontSize: 16, minHeight: 54 }, multiline: { minHeight: 120 }, invalid: { borderColor: '#ff9595' }, error: { color: '#ffabab', fontSize: 13, lineHeight: 19 },
  footer: { paddingTop: 40, marginTop: 'auto', gap: 8 }, footerTitle: { color: '#b2bac9', fontSize: 10, letterSpacing: 2, fontWeight: '700' }, muted: { color: '#949eaf', fontSize: 12, lineHeight: 19 },
});
