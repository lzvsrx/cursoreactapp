# Tabs Atelier

Recriação do zero de [digitalinnovationone/trilha-react-native-navigation-tabs](https://github.com/digitalinnovationone/trilha-react-native-navigation-tabs), referência no commit `7e42882ec0562a96c0015081e345e93d4b9d083f`.

O original usa Expo 48 e React Navigation 6. Esta versão usa Expo SDK 58, React 19.3, React Native 0.88, React Navigation 7 estável e TypeScript estrito. Mantém as abas Início e Galeria, com conteúdo em português e ícones MaterialCommunityIcons que respeitam o tamanho, a cor e o foco fornecidos pelo navegador. Os navegadores de pilha não utilizados e as dependências legadas foram removidos.

## Executar

Use Node.js 24 LTS e npm:

```sh
cd trilha-react-native-navigation-tabs
npm ci
npm start
```

No PowerShell com scripts bloqueados, use `npm.cmd`. Também estão disponíveis `npm run web`, `npm run android` e `npm run ios`. Use Expo Go compatível com SDK 58 ou development build. Android local exige emulador/aparelho; iOS nativo local exige macOS/Xcode.

## Funcionalidades

- Duas abas tipadas: Início e Galeria, com cabeçalhos em português.
- Quatro composições desenhadas com componentes nativos, sem imagens externas.
- Filtros Todas, Geometria e Paisagem; opção Somente favoritos.
- Favoritos compartilhados entre as telas e contagem no Início.
- Mensagem de coleção vazia com botão para limpar os filtros.
- Filtros e favoritos mantidos ao alternar entre abas durante a sessão. Fechar ou recarregar reinicia o estado; não há persistência em disco.
- Histórico de abas com `backBehavior="history"`, área segura e layout com rolagem.

## Estrutura

- `App.tsx`: área segura, StatusBar e provider da galeria.
- `src/routes/index.tsx`: NavigationContainer e tema.
- `src/routes/bottom-tabs.routes.tsx`: abas e ícones.
- `src/routes/types.ts`: tipos das rotas.
- `src/screens`: Início e Galeria.
- `src/context/GalleryContext.tsx`: favoritos compartilhados em memória.
- `src/data/gallery.ts`: coleção local e categorias.
- `src/components/ui.tsx`: componentes visuais e estilos.

## Verificar

```sh
npm run typecheck
npm run doctor
npm run export:all
npm audit
```

Os bundles ficam em `dist/all`. As exportações não geram APK/IPA e não substituem testes em aparelhos. O projeto está incluído no script e no workflow de verificação da raiz.

Verificação em 28/10/2026: TypeScript aprovado, Expo Doctor com 20/20 verificações e bundles web, Android e iOS exportados com sucesso. A auditoria registrou oito alertas (cinco baixos e três altos) na cadeia transitiva do Expo, originados em `deepmerge` e `zod`. A correção automática sugerida regride para Expo 51 e não foi aplicada.

Roteiro manual: abra a Galeria pelo botão e pelas abas; filtre por categoria; favorite uma composição; volte ao Início e confira a contagem; retorne à Galeria e confira o filtro mantido; remova o favorito; teste Somente favoritos e a recuperação da lista vazia. Confira o botão Voltar do Android, leitor de tela, fontes ampliadas e orientação horizontal. Testes interativos em dispositivos permanecem necessários.

Referência: [Bottom Tabs do React Navigation](https://reactnavigation.org/docs/bottom-tab-navigator/).
