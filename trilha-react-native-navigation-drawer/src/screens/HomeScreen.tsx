import { Text, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, Landscape, Page, styles } from '../components/ui';
import type { DrawerParamList } from '../routes/types';

export default function HomeScreen({ navigation }: DrawerScreenProps<DrawerParamList, 'home'>) {
  return <Page>
    <Text style={styles.eyebrow}>DIO / DRAWER EXPLORER</Text>
    <Text style={styles.title}>Abra o menu.{ '\n' }Descubra caminhos.</Text>
    <Text style={styles.body}>Uma coleção de paisagens para explorar a navegação por menu lateral.</Text>
    <Landscape />
    <Button title="Abrir menu lateral" onPress={() => navigation.openDrawer()} />
    <Button secondary title="Ir direto à galeria →" onPress={() => navigation.navigate('gallery')} />
    <View style={styles.card}><Text style={styles.heading}>Tudo começa por um caminho.</Text><Text style={styles.body}>Use o botão de menu no cabeçalho ou deslize a partir da borda esquerda no celular. Escolha Galeria para visitar a coleção.</Text></View>
  </Page>;
}
