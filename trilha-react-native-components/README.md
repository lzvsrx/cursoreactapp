# Componentes React Native

Projeto didatico baseado em https://github.com/digitalinnovationone/trilha-react-native-components, revisao `72b0ad86717fd5943b85c4ee17b98989d033a590`. Os exemplos e imagens de referencia foram adaptados para uma instalacao nova com Expo SDK 57 e TypeScript estrito.

## Executar

Use Node.js 22.13 ou superior e npm.

```sh
cd trilha-react-native-components
npm ci
npm start
```

Use `npm run android`, `npm run ios` ou `npm run web` para escolher a plataforma. No Windows, a compilacao local para iOS exige um Mac; a interface web pode ser executada localmente. Se o PowerShell bloquear `npm.ps1`, use `npm.cmd` e `npx.cmd`.

## Exemplos

- `ScrollView`, `View` e `Text`: estrutura, rolagem e textos aninhados.
- `Image` e `Switch`: exibir ou ocultar a imagem original.
- `TextInput` e `Button`: entrada de nome e exibicao do valor atual.
- `Pressable`: pressionamento simples, longo, inicio e fim do toque.
- `SafeAreaView` e `StatusBar`: areas seguras e barra de status.

## Validacao

```sh
npm run typecheck
npx expo install --check
npx expo-doctor
npm run export:web
```

A exportacao web fica em `dist/`, ignorada pelo Git. O lockfile fixa as dependencias; futuras atualizacoes devem seguir https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/ e manter as versoes compativeis com o SDK.

## Origem

Material de referencia: Digital Innovation One, repositorio vinculado acima. As imagens originais foram mantidas para uso didatico. Esta pasta integra o Git do projeto principal, sem historico Git aninhado.

## Auditoria de dependencias

Em 07/10/2026, `npm audit` reportou 22 ocorrencias (7 moderadas e 15 altas) na cadeia de dependencias Expo/Metro, incluindo braces, node-forge e uuid. `npm audit fix` nao resolveu as ocorrencias. A sugestao com `--force` rebaixa Expo para 44 e quebra a atualizacao; por isso nao foi aplicada. Acompanhe as correcoes upstream antes de usar esta base em producao.
