# Projetos React e React Native

Repositorio publico que reune os quatro projetos de C:\cursoreactapp, mantendo seus codigos, configuracoes, arquivos de dependencias, imagens e documentos.

| Pasta | Projeto |
| --- | --- |
| `lzdev` | Portfolio web com React, TypeScript e Vite |
| `portfolio-lzdev` | Portfolio React Native com Expo e site completo na pasta `web` |
| `react-native-bat-pass-generator` | Gerador de senhas com React Native e Expo |
| `trilha-react-native-green-latern-app` | Aplicativo de lanterna com React Native e Expo |

## Executar

Instale Node.js e npm. Cada projeto possui suas proprias dependencias; execute os comandos dentro da pasta correspondente.

### Portfolio web

```sh
cd lzdev
npm ci
npm run dev
```

Para o site dentro do portfolio integrado, use `cd portfolio-lzdev/web` e os mesmos comandos.

### Aplicativos Expo

Entre em `portfolio-lzdev`, `react-native-bat-pass-generator` ou `trilha-react-native-green-latern-app`:

```sh
npm install
npm start
```

Os scripts `npm run web`, `npm run android` e `npm run ios` iniciam as plataformas correspondentes. Os aplicativos usam Expo SDK 46 e precisam de ambiente compativel; consulte os READMEs de cada projeto.

## Configuracao e documentacao

Os READMEs originais foram preservados em cada pasta. Os arquivos `.env.example` documentam a configuracao das APIs web; configure suas proprias credenciais localmente. Dependencias instaladas, builds, caches, historicos Git individuais e credenciais locais nao fazem parte deste repositorio.

O aplicativo de lanterna tem origem em https://github.com/digitalinnovationone/trilha-react-native-green-latern-app. As referencias e atribuicoes existentes nos projetos foram preservadas.
