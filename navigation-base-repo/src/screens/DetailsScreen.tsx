import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Page, styles } from '../components/ui';
import { getProject } from '../data/gallery';
import type { RootStackParamList } from '../navigation/types';

export default function DetailsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Details'>) {
  const project = getProject(route.params.projectId);
  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.replace('Main');
  return <Page>
    <Text style={styles.eyebrow}>{project?.category ?? 'ROTA DESCONHECIDA'}</Text>
    <Text style={styles.title}>{project?.title ?? 'Exemplo não encontrado'}</Text>
    <View style={styles.card}>
      {project && <Text style={{ color: project.color, fontSize: 72 }}>{project.symbol}</Text>}
      <Text style={styles.body}>{project?.description ?? 'Este identificador não corresponde a um exemplo. Volte e selecione um item da galeria.'}</Text>
    </View>
    <Text style={styles.body}>Você está em uma tela da pilha principal. Voltar retorna ao ponto anterior do aplicativo.</Text>
    <Button title="← Voltar" onPress={goBack} />
  </Page>;
}
