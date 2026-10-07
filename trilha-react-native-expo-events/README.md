# React Native Expo Events

Exemplos de eventos de texto, foco e toque em React Native, originalmente de
[digitalinnovationone/trilha-react-native-expo-events](https://github.com/digitalinnovationone/trilha-react-native-expo-events).

Atualizado para o Expo SDK 57 estável, React 19.2 e React Native 0.86,
seguindo as versões compatíveis indicadas pelo Expo. TypeScript e Babel também
foram atualizados. A tela de abertura usa o plugin `expo-splash-screen`.

## Executar

Use Node.js 22.13+ ou 24.3+ (LTS) e npm. Dentro desta pasta:

```sh
npm ci
npm start
```

Use `npm run android`, `npm run ios` ou `npm run web` para abrir a plataforma
desejada. O simulador iOS exige macOS; em outros sistemas, use um dispositivo
com uma versão do Expo Go compatível com o SDK 57.

## Verificar

```sh
npm run typecheck
npx expo install --check
npm run doctor
npx expo export --platform all
```

Os bundles gerados ficam em `dist/` e não são versionados. A exportação verifica
o empacotamento, mas não substitui testes em dispositivos nem builds nativos.

## Dependências

O `package-lock.json` registra as versões instaladas. Use `npx expo install --fix`
para manter os pacotes alinhados ao SDK, conforme o
[guia de atualização do Expo](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/).

Na atualização de 7 de outubro de 2026, `npm audit` ainda apontou alertas em
dependências indiretas do Expo/Metro, incluindo pacotes sem correção publicada.
Não use `npm audit fix --force` sem revisar as mudanças: a resolução sugerida
pelo npm inclui retornar a versões antigas do Expo e do React Native.
