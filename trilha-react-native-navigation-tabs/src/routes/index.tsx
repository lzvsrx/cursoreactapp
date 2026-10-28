import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { colors } from '../components/ui';
import { BottomTabsRoutes } from './bottom-tabs.routes';

const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, primary: colors.accent, background: colors.background, card: colors.background, text: colors.text, border: colors.border } };
export function Routes() {
  return <NavigationContainer theme={theme}><BottomTabsRoutes /></NavigationContainer>;
}
