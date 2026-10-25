import { useCallback, useMemo, useReducer, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useStopwatch } from './src/hooks/useStopwatch';
import { filterTasks, tasksReducer, type TaskFilter } from './src/state/tasks';

const demos = [
  { id: 'state', label: '01  Estado', hook: 'useState' },
  { id: 'effect', label: '02  Efeitos', hook: 'useEffect' },
  { id: 'tasks', label: '03  Tarefas', hook: 'useReducer' },
] as const;
type Demo = typeof demos[number]['id'];

function Action({ label, onPress, secondary = false, disabled = false }: { label: string; onPress: () => void; secondary?: boolean; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [s.button, secondary && s.secondary, disabled && s.disabled, pressed && s.pressed]}>
    <Text style={[s.buttonText, secondary && s.secondaryText]}>{label}</Text>
  </Pressable>;
}

function Card({ hook, title, children }: { hook: string; title: string; children: ReactNode }) {
  return <View style={s.card}><Text style={s.hook}>{hook}</Text><Text accessibilityRole="header" style={s.cardTitle}>{title}</Text>{children}</View>;
}

function Lesson({ children }: { children: ReactNode }) {
  return <View style={s.lesson}><Text style={s.lessonTitle}>O QUE ESTÁ ACONTECENDO</Text><Text style={s.body}>{children}</Text></View>;
}

function StateDemo() {
  const [count, setCount] = useState(0);
  return <>
    <Card hook="useState" title="Um toque. Um novo estado.">
      <Text style={s.body}>Adicione e remova itens de um carrinho. O valor mínimo é zero.</Text>
      <View style={s.counter}><Text accessibilityLiveRegion="polite" accessibilityLabel={`${count} itens no carrinho`} style={s.number}>{count}</Text><Text style={s.muted}>{count === 1 ? 'item no carrinho' : 'itens no carrinho'}</Text></View>
      <View style={s.row}><Action label="− Remover" secondary disabled={count === 0} onPress={() => setCount(previous => Math.max(0, previous - 1))} /><Action label="+ Adicionar" onPress={() => setCount(previous => previous + 1)} /></View>
      <Action label="Esvaziar carrinho" secondary disabled={count === 0} onPress={() => setCount(0)} />
    </Card>
    <Lesson>useState guarda o valor entre renderizações. A atualização funcional recebe o estado anterior, evitando depender de um valor antigo capturado pelo callback.</Lesson>
    <Text style={s.code}>{'setCount(previous => previous + 1)'}</Text>
  </>;
}

function EffectDemo() {
  const { running, seconds, start, reset } = useStopwatch();
  const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  return <>
    <Card hook="useEffect + custom hook" title="Observe o ciclo de vida.">
      <Text style={s.body}>Inicie o relógio e depois reinicie ou troque de aba. O intervalo é removido na limpeza do efeito.</Text>
      <View style={s.counter}><Text accessibilityLabel={`${seconds} segundos decorridos`} style={s.number}>{display}</Text><Text accessibilityLiveRegion="polite" style={s.muted}>{running ? 'Intervalo ativo' : 'Aguardando início'}</Text></View>
      <View style={s.row}><Action label="Iniciar" disabled={running} onPress={start} /><Action label="Parar e zerar" secondary disabled={!running && seconds === 0} onPress={reset} /></View>
    </Card>
    <Lesson>O efeito cria um intervalo somente enquanto running está ativo. A função de retorno executa clearInterval quando a dependência muda ou o componente desmonta. useStopwatch reúne essa lógica em um hook reutilizável.</Lesson>
    <Text style={s.code}>{'useEffect(() => {\n  // cria o intervalo\n  return () => clearInterval(interval);\n}, [running]);'}</Text>
  </>;
}

function TasksDemo() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [error, setError] = useState('');
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  const nextId = useRef(1);
  const visibleTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const completed = tasks.filter(task => task.done).length;
  const addTask = useCallback(() => {
    if (!title.trim()) { setError('Digite uma tarefa antes de adicionar.'); input.current?.focus(); return; }
    dispatch({ type: 'add', id: nextId.current++, title });
    setTitle(''); setError(''); input.current?.focus();
  }, [title]);
  return <>
    <Card hook="useReducer + useState" title="Organize seu próximo passo.">
      <Text style={s.body}>Um estado, várias ações. Adicione, conclua, filtre e remova tarefas.</Text>
      <Text nativeID="task-label" style={s.label}>Nova tarefa</Text>
      <TextInput ref={input} accessibilityLabel="Nova tarefa" accessibilityLabelledBy="task-label" value={title}
        onChangeText={value => { setTitle(value); setError(''); }} onSubmitEditing={addTask} returnKeyType="done"
        placeholder="Ex.: praticar useReducer" placeholderTextColor="#8f9dad" maxLength={160} style={s.input} />
      {!!error && <Text accessibilityRole="alert" style={s.error}>{error}</Text>}
      <Action label="+ Adicionar tarefa" onPress={addTask} />
      <View style={s.filters}>{([{ id: 'all', label: 'Todas' }, { id: 'pending', label: 'Pendentes' }, { id: 'done', label: 'Concluídas' }] as const).map(item =>
        <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ selected: filter === item.id }} onPress={() => setFilter(item.id)} style={[s.chip, filter === item.id && s.activeChip]}><Text style={[s.chipText, filter === item.id && s.activeChipText]}>{item.label}</Text></Pressable>
      )}</View>
      <Text accessibilityLiveRegion="polite" style={s.muted}>{completed} de {tasks.length} concluídas · {visibleTasks.length} neste filtro</Text>
      {visibleTasks.length === 0 && <View style={s.empty}><Text style={s.body}>{tasks.length ? 'Nenhuma tarefa neste filtro.' : 'Sua lista começa com uma ideia.'}</Text></View>}
      {visibleTasks.map(task => <View key={task.id} style={s.task}>
        <Pressable accessibilityRole="checkbox" accessibilityLabel={task.title} accessibilityState={{ checked: task.done }} onPress={() => dispatch({ type: 'toggle', id: task.id })} style={s.taskToggle}>
          <Text style={s.check}>{task.done ? '✓' : '○'}</Text><Text style={[s.taskTitle, task.done && s.done]}>{task.title}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Excluir tarefa ${task.title}`} onPress={() => dispatch({ type: 'remove', id: task.id })} style={s.remove}><Text style={s.removeText}>×</Text></Pressable>
      </View>)}
      <Action label="Limpar concluídas" secondary disabled={completed === 0} onPress={() => dispatch({ type: 'clear-completed' })} />
      <Action label="Limpar toda a lista" secondary disabled={tasks.length === 0} onPress={() => dispatch({ type: 'clear' })} />
    </Card>
    <Lesson>useReducer centraliza as transições sem mutar o estado. useRef mantém o campo de entrada e o próximo ID; useMemo calcula o filtro a partir das dependências; useCallback mantém a referência do callback enquanto seu título não muda. Neste exemplo pequeno, a memoização é didática, não uma promessa de ganho de desempenho.</Lesson>
    <Text style={s.code}>{"dispatch({ type: 'clear' })\n// Limpar realmente esvazia a lista."}</Text>
  </>;
}

export default function App() {
  const [demo, setDemo] = useState<Demo>('state');
  return <SafeAreaProvider><SafeAreaView style={s.safe}>
    <StatusBar style="light" />
    <KeyboardAvoidingView style={s.safe} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        <View style={s.container}>
          <View style={s.brandRow}><Text style={s.brand}>DIO / REACT NATIVE</Text><Text style={s.version}>SDK 58</Text></View>
          <Text accessibilityRole="header" style={s.title}>Hooks em ação.</Text>
          <Text style={s.subtitle}>Explore o estado, os efeitos e as decisões que fazem uma interface reagir.</Text>
          <View accessibilityRole="tablist" style={s.tabs}>{demos.map(item => <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{ selected: demo === item.id }} onPress={() => setDemo(item.id)} style={[s.tab, demo === item.id && s.activeTab]}>
            <Text style={[s.tabText, demo === item.id && s.activeTabText]}>{item.label}</Text>
          </Pressable>)}</View>
          {demo === 'state' ? <StateDemo /> : demo === 'effect' ? <EffectDemo /> : <TasksDemo />}
          <Text style={s.footer}>Laboratório educacional · Dados somente em memória.{ '\n' }Trocar de aba reinicia o exemplo e desmonta o anterior.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView></SafeAreaProvider>;
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b121b' }, scroll: { flexGrow: 1, padding: 20 }, container: { width: '100%', maxWidth: 680, alignSelf: 'center', gap: 20, paddingVertical: 16 },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, brand: { color: '#9fb1c4', fontSize: 11, fontWeight: '700', letterSpacing: 2 }, version: { color: '#9bf2cc', fontSize: 11, backgroundColor: '#19362f', padding: 8, borderRadius: 7 },
  title: { color: '#f1f6fc', fontSize: 40, lineHeight: 46, fontWeight: '800', letterSpacing: -1 }, subtitle: { color: '#a4b4c7', fontSize: 17, lineHeight: 26 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, tab: { flexGrow: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, backgroundColor: '#172332' }, activeTab: { backgroundColor: '#9bf2cc' }, tabText: { color: '#c3d0df', fontSize: 13, fontWeight: '700' }, activeTabText: { color: '#10291f' },
  card: { backgroundColor: '#14202e', borderColor: '#2b3b4d', borderWidth: 1, padding: 22, borderRadius: 18, gap: 16 }, hook: { color: '#9bf2cc', fontSize: 12, fontWeight: '700', letterSpacing: 1 }, cardTitle: { color: '#f1f6fc', fontSize: 25, lineHeight: 32, fontWeight: '700' }, body: { color: '#b9c7d7', fontSize: 15, lineHeight: 24 }, muted: { color: '#9daec2', fontSize: 13, lineHeight: 21 },
  counter: { alignItems: 'center', gap: 8, paddingVertical: 16 }, number: { color: '#f1f6fc', fontSize: 56, fontWeight: '800', fontVariant: ['tabular-nums'] }, row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  button: { flexGrow: 1, minHeight: 48, backgroundColor: '#9bf2cc', borderRadius: 10, padding: 14, alignItems: 'center', justifyContent: 'center' }, buttonText: { color: '#10291f', fontSize: 14, fontWeight: '700' }, secondary: { backgroundColor: '#263649' }, secondaryText: { color: '#e3edf8' }, disabled: { opacity: 0.45 }, pressed: { opacity: 0.75 },
  lesson: { gap: 10, borderLeftColor: '#9bf2cc', borderLeftWidth: 3, paddingLeft: 16 }, lessonTitle: { color: '#9bf2cc', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }, code: { color: '#d2c0ff', backgroundColor: '#111a27', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', padding: 16, borderRadius: 10, fontSize: 12, lineHeight: 21 },
  label: { color: '#dce6f2', fontSize: 14, fontWeight: '600' }, input: { backgroundColor: '#0b121b', minHeight: 52, borderRadius: 10, borderColor: '#465d74', borderWidth: 1, padding: 14, color: '#f1f6fc', fontSize: 16 }, error: { color: '#ffb3b8', fontSize: 13 }, filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, chip: { minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, backgroundColor: '#263649', borderRadius: 8 }, activeChip: { backgroundColor: '#9bf2cc' }, chipText: { color: '#d1deed', fontSize: 12 }, activeChipText: { color: '#10291f' },
  task: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1d2b3b', borderRadius: 10 }, taskToggle: { flex: 1, flexDirection: 'row', gap: 12, padding: 14, minHeight: 48, alignItems: 'center' }, check: { color: '#9bf2cc', fontSize: 22 }, taskTitle: { color: '#edf3fb', fontSize: 15, lineHeight: 22, flex: 1 }, done: { textDecorationLine: 'line-through', color: '#9daec2' }, remove: { minHeight: 48, minWidth: 48, alignItems: 'center', justifyContent: 'center' }, removeText: { color: '#ffb3b8', fontSize: 26 }, empty: { paddingVertical: 20, alignItems: 'center' }, footer: { color: '#8fa2b8', fontSize: 12, lineHeight: 21, textAlign: 'center' },
});
