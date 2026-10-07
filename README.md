# Projetos React e React Native

Repositorio publico que reune seis projetos React e React Native, mantendo seus codigos, configuracoes, arquivos de dependencias, imagens e documentos.

| Pasta | Projeto |
| --- | --- |
| `lzdev` | Portfolio web com React, TypeScript e Vite |
| `portfolio-lzdev` | Portfolio React Native com Expo e site completo na pasta `web` |
| `react-native-bat-pass-generator` | Gerador de senhas com React Native e Expo |
| `trilha-react-native-green-latern-app` | Aplicativo de lanterna com React Native e Expo |
| `trilha-react-native-components` | Exemplos de componentes com React Native, TypeScript e Expo SDK 57 |
| `trilha-react-native-flexbox` | Exemplo de Flexbox da DIO atualizado para Expo SDK 57 |

## Executar

Instale Node.js 24 LTS (ou >=22.13.0) e npm. Cada projeto possui suas proprias dependencias; execute os comandos dentro da pasta correspondente.

### Portfolio web

```sh
cd lzdev
npm ci
npm run dev
```

Para o site dentro do portfolio integrado, use `cd portfolio-lzdev/web` e os mesmos comandos.

### Aplicativos Expo

Entre em `portfolio-lzdev`, `react-native-bat-pass-generator`, `trilha-react-native-green-latern-app`, `trilha-react-native-components` ou `trilha-react-native-flexbox`:

```sh
npm ci
npm start
```

Os scripts `npm run web`, `npm run android` e `npm run ios` iniciam as plataformas correspondentes. Todos os aplicativos usam Expo SDK 57, React 19.2.3 e React Native 0.86.3, seguindo a matriz de compatibilidade do Expo. Use um Expo Go compativel com SDK 57 ou um development build.

## Configuracao e documentacao

Os READMEs originais foram preservados em cada pasta. Os arquivos `.env.example` documentam a configuracao das APIs web; configure suas proprias credenciais localmente. Dependencias instaladas, builds, caches, historicos Git individuais e credenciais locais nao fazem parte deste repositorio.

O aplicativo de lanterna tem origem em https://github.com/digitalinnovationone/trilha-react-native-green-latern-app. As referencias e atribuicoes existentes nos projetos foram preservadas.

## Componentes React Native (Expo SDK 57)

A pasta `trilha-react-native-components` usa dependencias atuais compativeis com o SDK 57. Consulte seu README para requisitos e exemplos. Execute `cd trilha-react-native-components`, `npm ci` e `npm start`. Origem: https://github.com/digitalinnovationone/trilha-react-native-components.

## Verificar as atualizacoes

Nos sites (`lzdev` e `portfolio-lzdev/web`), execute `npm run build` e `npm test`. Os sites usam React 19.3, Vite 8, Vitest 5 e TypeScript 7.

Nos cinco aplicativos Expo, execute `npm run typecheck`, `npm run doctor`, `npm run export:web`, `npm run export:android` e `npm run export:ios`. As exportacoes validam os bundles; a compilacao e o teste dos aplicativos nativos em dispositivos exigem Android SDK/Xcode ou EAS Build. Babel 7 e TypeScript 6 foram mantidos por compatibilidade com o SDK 57.

Consulte `npm audit` em cada pasta. Ainda existem avisos em dependencias transitivas do Expo (braces, node-forge e uuid); nao aplique `npm audit fix --force`, pois a correcao sugerida regride o SDK e quebra esta migracao. Acompanhe atualizacoes oficiais do Expo.
