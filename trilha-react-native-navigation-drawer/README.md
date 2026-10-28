# Drawer Explorer

Recriação do zero de [digitalinnovationone/trilha-react-native-navigation-drawer](https://github.com/digitalinnovationone/trilha-react-native-navigation-drawer), referência no commit `edb81847be9979a9be9f0a70bce9322658c7291b`.

Atualizado de Expo 48/React Navigation 6 para Expo SDK 58, React 19.3, React Native 0.88 e React Navigation 7 estável. Usa TypeScript estrito, Gesture Handler 3.3, Reanimated 4.7 e Worklets 0.13 compatíveis com este SDK. Os navegadores de abas e pilha não utilizados foram removidos.

## Executar

Use Node.js 24 LTS e npm:

```sh
cd trilha-react-native-navigation-drawer
npm ci
npm start
```

No PowerShell com scripts bloqueados, use `npm.cmd`. Também estão disponíveis `npm run web`, `npm run android` e `npm run ios`. Use Expo Go compatível com SDK 58 ou development build. Android local exige emulador/aparelho; iOS nativo local exige macOS/Xcode.

## Funcionalidades e estrutura

Menu lateral com Início e Galeria, ícones ativos, cabeçalhos em português e ação Fechar menu. É possível abrir pelo cabeçalho, pelos botões das telas ou pelo gesto na borda esquerda no celular. As três paisagens são desenhadas com componentes nativos e não dependem de imagens externas. A interface tem área segura, rolagem e largura limitada em telas grandes.

- `index.ts`: inicialização de Gesture Handler e registro do app.
- `App.tsx`: GestureHandlerRootView, SafeAreaProvider e StatusBar.
- `src/routes/index.tsx`: NavigationContainer e tema.
- `src/routes/drawer.routes.tsx`: Drawer tipado e menu personalizado.
- `src/routes/types.ts`: tipos das rotas, sem `any`.
- `src/screens`: Início e Galeria, com `openDrawer` e `navigate`.
- `src/components/ui.tsx`: estilos e componentes compartilhados.

O Babel usa `babel-preset-expo`, que configura o plugin de Worklets para as dependências instaladas. Não adicione o antigo plugin de Reanimated 2. O histórico do menu usa `backBehavior="history"`.

## Verificações

```sh
npm run typecheck
npm run doctor
npm run export:all
npm audit
```

Os bundles ficam em `dist/all`; não são APK/IPA. O projeto está incluído na verificação automática da raiz.

Verificação em 28/10/2026: TypeScript aprovado, Expo Doctor com 20/20 verificações e bundles web, Android e iOS exportados com sucesso. A auditoria registrou oito alertas (cinco baixos e três altos) na cadeia transitiva do Expo, originados em `deepmerge` e `zod`. A correção automática sugerida regride para Expo 51 e não foi aplicada.

Roteiro manual: abra e feche o menu pelo cabeçalho; escolha Galeria; retorne ao Início pelo menu e pelo botão; feche o menu tocando fora; confira o botão Voltar do Android e o gesto de abertura no celular. Teste leitor de tela, fonte ampliada e orientação horizontal. A execução interativa em aparelhos permanece necessária.

Referência: [Drawer Navigator](https://reactnavigation.org/docs/drawer-navigator/).
