import { Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Page, styles } from '../components/ui';
import type { TabParamList } from '../navigation/types';

export default function HomeScreen({ navigation }: BottomTabScreenProps<TabParamList, 'Home'>) {
  return <Page>
    <Text style={styles.eyebrow}>DIO / REACT NATIVE LAB</Text>
    <Text style={styles.title}>Uma nova tela.{ '\n' }Uma nova possibilidade.</Text>
    <Text style={styles.body}>Explore os fundamentos de navegação em um aplicativo feito para aprender na prática.</Text>
    <View style={styles.card}>
      <Text style={styles.eyebrow}>01 — EXPLORE O APLICATIVO</Text>
      <Text style={styles.heading}>Seu próximo destino começa aqui.</Text>
      <Text style={styles.body}>Abra a galeria, escolha um exemplo e descubra como abas, pilhas e parâmetros conectam as telas.</Text>
      <Button title="Explorar galeria →" onPress={() => navigation.navigate('Gallery')} />
    </View>
    <Text style={styles.eyebrow}>PEQUENOS CONCEITOS. GRANDES CAMINHOS.</Text>
    <Text style={styles.body}>Início → Galeria → Detalhes{ '\n' }Use as abas para mudar de área e a seta no topo para voltar de um detalhe.</Text>
  </Page>;
}
