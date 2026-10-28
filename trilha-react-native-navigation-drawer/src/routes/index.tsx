import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { colors } from '../components/ui';
import { DrawerRoutes } from './drawer.routes';

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: colors.accent, background: colors.background, card: colors.background, text: colors.ink, border: colors.border } };
export function Routes() {
  return <NavigationContainer theme={theme}><DrawerRoutes /></NavigationContainer>;
}
