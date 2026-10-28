import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { palette } from '../components/ui';
import { StackRoutes } from './stack.routes';

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: palette.blue, background: palette.background, card: palette.background, text: palette.ink, border: palette.border } };

export function Routes() {
  return <NavigationContainer theme={theme}><StackRoutes /></NavigationContainer>;
}
