import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1120' }, container: { padding: 24, paddingTop: 48, maxWidth: 1100, width: '100%', alignSelf: 'center' },
  header: { marginBottom: 30 }, brand: { color: '#4ade80', fontSize: 18, fontWeight: '800', marginBottom: 20 },
  photo: { width: 112, height: 112, borderRadius: 56, borderWidth: 3, borderColor: '#4ade80', marginBottom: 24 },
  title: { color: '#f8fafc', fontSize: 36, fontWeight: '800', marginBottom: 12 }, subtitle: { color: '#4ade80', fontSize: 20, marginBottom: 12 },
  text: { color: '#cbd5e1', fontSize: 16, lineHeight: 25 }, muted: { color: '#94a3b8', fontSize: 13, marginTop: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }, section: { marginBottom: 24 }, heading: { color: '#f8fafc', fontSize: 26, fontWeight: '700', marginBottom: 16 },
  card: { backgroundColor: '#162033', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#263449', marginBottom: 12 }, cardTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#162033', color: '#f8fafc', borderColor: '#334155', borderWidth: 1, borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 16 },
  track: { height: 6, backgroundColor: '#334155', borderRadius: 3, marginTop: 12 }, fill: { height: 6, backgroundColor: '#4ade80', borderRadius: 3 },
  error: { color: '#fca5a5', marginBottom: 16 }, footer: { color: '#94a3b8', textAlign: 'center', marginVertical: 24 },
});
