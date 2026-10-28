import { useReducer, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { editorReducer, initialEditor, MAX_LENGTH } from './src/state/editor';

const lessons = ['Estado', 'Referência', 'Reducer'] as const;
type Lesson = typeof lessons[number];

function Button({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [s.button, disabled && s.disabled, pressed && s.pressed]}><Text style={s.buttonText}>{label}</Text></Pressable>;
}
function Note({ children, code }: { children: ReactNode; code: string }) {
  return <View style={s.note}><Text style={s.eyebrow}>POR DENTRO DO HOOK</Text><Text style={s.body}>{children}</Text><Text selectable style={s.code}>{code}</Text></View>;
}
function StateLesson() {
  const [quantity, setQuantity] = useState(1);
  const total = (quantity * 1090 / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return <>
    <Text style={s.cardTitle}>Pequenas mudanças, novas telas.</Text>
    <Text style={s.body}>Um café custa R$ 10,90. Monte seu pedido e veja o total acompanhar a quantidade.</Text>
    <View style={s.display}><Text style={s.eyebrow}>CAFÉS NO PEDIDO</Text><Text accessibilityLiveRegion="polite" style={s.number}>{quantity}</Text><Text style={s.total}>{total}</Text></View>
    <View style={s.row}><Button label="− Remover" disabled={quantity === 0} onPress={() => setQuantity(q => Math.max(0, q - 1))} /><Button label="+ Adicionar" disabled={quantity === 99} onPress={() => setQuantity(q => Math.min(99, q + 1))} /></View>
    <Button label="Reiniciar pedido" disabled={quantity === 1} onPress={() => setQuantity(1)} />
    <Note code={'const [quantity, setQuantity] = useState(1);\nconst total = quantity * 1090;'}>useState guarda a quantidade. O total é derivado em centavos, sem um segundo estado para sincronizar. O pedido aceita de 0 a 99 cafés.</Note>
  </>;
}
function RefLesson() {
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  return <>
    <Text style={s.cardTitle}>Uma referência. O foco certo.</Text>
    <Text style={s.body}>Digite uma ideia. Os botões acessam a instância do campo para controlar o foco.</Text>
    <Text style={s.label}>Sua ideia</Text>
    <TextInput ref={input} value={text} onChangeText={setText} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} accessibilityLabel="Sua ideia" placeholder="O que você quer construir?" placeholderTextColor="#727b8d" maxLength={MAX_LENGTH} style={s.input} />
    <Text accessibilityLiveRegion="polite" style={s.muted}>{focused ? 'Campo em foco' : 'Campo sem foco'} · {text.length}/{MAX_LENGTH}</Text>
    <View style={s.row}><Button label="Focar campo" onPress={() => input.current?.focus()} /><Button label="Limpar e focar" onPress={() => { setText(''); input.current?.focus(); }} /></View>
    <Note code={'const input = useRef(null);\ninput.current?.focus();'}>useRef mantém a referência entre renderizações. Alterar current não renderiza a tela; o texto visível pertence ao useState e ao value do campo.</Note>
  </>;
}
function ReducerLesson() {
  const [state, dispatch] = useReducer(editorReducer, initialEditor);
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  function clear() { dispatch({ type: 'clear' }); input.current?.focus(); }
  return <>
    <Text style={s.cardTitle}>Ações claras. Estado previsível.</Text>
    <Text style={s.body}>Recriação do editor da DIO: escreva, preencha com um exemplo, limpe e desfaça as últimas 30 alterações.</Text>
    <Text style={s.label}>Seu texto</Text>
    <TextInput ref={input} value={state.text} onChangeText={text => dispatch({ type: 'write', text })} accessibilityLabel="Texto do editor" placeholder="Comece a escrever…" placeholderTextColor="#727b8d" maxLength={MAX_LENGTH} style={s.input} />
    <View style={s.row}><Button label="Escrever Felipe" onPress={() => dispatch({ type: 'write', text: 'Felipe' })} /><Button label="Limpar e focar" onPress={clear} /><Button label="Desfazer" disabled={!state.history.length} onPress={() => dispatch({ type: 'undo' })} /></View>
    <View style={s.display}><Text style={s.eyebrow}>PRÉVIA DO ESTADO</Text><Text selectable style={s.preview}>{state.text || 'Seu texto aparece aqui.'}</Text><Text accessibilityLiveRegion="polite" style={s.muted}>{state.text.length}/{MAX_LENGTH} caracteres · {state.history.length} alterações disponíveis</Text></View>
    <Note code={"dispatch({ type: 'clear' });\ninput.current?.focus();"}>O reducer calcula o próximo estado sem modificar o anterior. Focar o campo é um efeito da interação e fica no evento, fora do reducer. O campo controlado mantém a prévia e o texto sincronizados.</Note>
  </>;
}

export default function App() {
  const [lesson, setLesson] = useState<Lesson>('Estado');
  return <SafeAreaProvider><SafeAreaView style={s.safe}><StatusBar style="dark" />
    <KeyboardAvoidingView style={s.safe} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets contentContainerStyle={s.scroll}>
        <View style={s.container}>
          <View style={s.row}><Text style={s.brand}>DIO / MOBILE LAB</Text><Text style={s.badge}>EXPO 58</Text></View>
          <Text accessibilityRole="header" style={s.title}>Main hooks<Text style={s.accent}>.</Text></Text>
          <Text style={s.subtitle}>Aprenda fazendo. Três fundamentos para interfaces que respondem a você.</Text>
          <View accessibilityRole="tablist" style={s.row}>{lessons.map((item, index) => <Pressable key={item} accessibilityRole="tab" accessibilityState={{ selected: lesson === item }} onPress={() => setLesson(item)} style={[s.tab, lesson === item && s.activeTab]}><Text style={[s.tabText, lesson === item && s.activeText]}>0{index + 1} / {item}</Text></Pressable>)}</View>
          <View style={s.card}>{lesson === 'Estado' ? <StateLesson /> : lesson === 'Referência' ? <RefLesson /> : <ReducerLesson />}</View>
          <Text style={s.footer}>useState · useRef · useReducer{ '\n' }Exemplos locais. Trocar de aba reinicia a demonstração.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView></SafeAreaProvider>;
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f3ef' }, scroll: { flexGrow: 1, padding: 20 }, container: { width: '100%', maxWidth: 760, alignSelf: 'center', gap: 24, paddingVertical: 24 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'center' }, brand: { flex: 1, color: '#505b70', fontSize: 11, fontWeight: '800', letterSpacing: 2 }, badge: { color: '#4338a0', backgroundColor: '#e7e3ff', padding: 9, borderRadius: 8, fontSize: 11, fontWeight: '700' },
  title: { color: '#202539', fontSize: 48, fontWeight: '800', letterSpacing: -2 }, accent: { color: '#6853da' }, subtitle: { color: '#60697c', fontSize: 18, lineHeight: 28 },
  tab: { flexGrow: 1, padding: 15, minHeight: 48, borderRadius: 12, backgroundColor: '#e7e7e2', alignItems: 'center' }, activeTab: { backgroundColor: '#292740' }, tabText: { color: '#51596b', fontSize: 13, fontWeight: '700' }, activeText: { color: '#fff' },
  card: { borderRadius: 24, borderWidth: 1, borderColor: '#deded8', backgroundColor: '#fff', padding: 24, gap: 18 }, cardTitle: { color: '#202539', fontSize: 26, lineHeight: 34, fontWeight: '700' }, body: { color: '#596277', fontSize: 15, lineHeight: 25 },
  display: { backgroundColor: '#f5f3ff', borderRadius: 16, padding: 22, alignItems: 'center', gap: 12 }, eyebrow: { color: '#6853bd', fontWeight: '800', fontSize: 10, letterSpacing: 1.5 }, number: { color: '#292740', fontSize: 64, fontWeight: '800', fontVariant: ['tabular-nums'] }, total: { color: '#6853bd', fontSize: 25, fontWeight: '600' },
  button: { flexGrow: 1, minHeight: 48, padding: 14, backgroundColor: '#6853bd', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }, buttonText: { color: '#fff', fontSize: 14, fontWeight: '700' }, disabled: { opacity: 0.4 }, pressed: { opacity: 0.75 },
  note: { borderTopWidth: 1, borderColor: '#e8e6ef', paddingTop: 22, gap: 12 }, code: { backgroundColor: '#292740', color: '#e2dcff', padding: 16, borderRadius: 12, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12, lineHeight: 22 },
  input: { color: '#202539', borderWidth: 1, borderColor: '#9992b4', borderRadius: 10, padding: 14, minHeight: 52, fontSize: 16 }, label: { color: '#35394f', fontWeight: '700', fontSize: 14 }, muted: { color: '#62697b', fontSize: 12, lineHeight: 20 }, preview: { color: '#292740', fontSize: 20, lineHeight: 28, alignSelf: 'stretch' }, footer: { color: '#62697b', fontSize: 12, lineHeight: 22, textAlign: 'center' },
});
