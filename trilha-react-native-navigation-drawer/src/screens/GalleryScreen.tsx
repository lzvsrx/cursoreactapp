import { Text, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, Landscape, Page, styles } from '../components/ui';
import type { DrawerParamList } from '../routes/types';

const landscapes = [
  { title: 'Vale sereno', label: '01 / NATUREZA', color: '#c1d2b5', sun: '#f5d38f', description: 'Verdes suaves e curvas abertas para um instante de tranquilidade.' },
  { title: 'Luz da manhã', label: '02 / LUZ', color: '#e9cebc', sun: '#fff1ca', description: 'O encontro entre a luz quente do amanhecer e as camadas da paisagem.' },
  { title: 'Horizonte distante', label: '03 / PERSPECTIVA', color: '#b9cbdc', sun: '#f5e2bf', description: 'Um horizonte azul que convida a descobrir o próximo caminho.' },
];
export default function GalleryScreen({ navigation }: DrawerScreenProps<DrawerParamList, 'gallery'>) {
  return <Page>
    <Text style={styles.eyebrow}>COLEÇÃO / 03 PAISAGENS</Text>
    <Text style={styles.title}>Um novo ponto de vista.</Text>
    <Text style={styles.body}>Composições locais, criadas com formas e cores. Explore a coleção e use o menu para mudar de tela.</Text>
    {landscapes.map(item => <View key={item.title} style={styles.card}><Landscape color={item.color} sun={item.sun} /><Text style={styles.eyebrow}>{item.label}</Text><Text style={styles.heading}>{item.title}</Text><Text style={styles.body}>{item.description}</Text></View>)}
    <Button title="Abrir menu lateral" onPress={() => navigation.openDrawer()} />
    <Button secondary title="← Voltar ao início" onPress={() => navigation.navigate('home')} />
  </Page>;
}
