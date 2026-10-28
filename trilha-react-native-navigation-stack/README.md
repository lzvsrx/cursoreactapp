# Stack Studio

Recriação do zero de [digitalinnovationone/trilha-react-native-navigation-stack](https://github.com/digitalinnovationone/trilha-react-native-navigation-stack), baseada no commit `b3c3338f2fce8a2170450aea3bb8a736d5aa1512`.

O exemplo original usa Expo 48, React Navigation 6, navegação sem tipagem e dependências de navegação antigas misturadas. Esta versão usa Expo SDK 58, React 19.3, React Native 0.88, React Navigation 7 estável e TypeScript estrito. O Native Stack substitui o Stack em JavaScript; pacotes legados foram removidos.

## Executar

Requisitos: Node.js 24 LTS e npm.

```sh
cd trilha-react-native-navigation-stack
npm ci
npm start
```

No PowerShell com execução de scripts bloqueada, use `npm.cmd`. Para selecionar plataforma, execute `npm run web`, `npm run android` ou `npm run ios`. Use Expo Go compatível com SDK 58 ou um development build. Android local exige emulador/aparelho; iOS nativo local exige macOS e Xcode.

## Fluxo e estrutura

Início → Galeria → Detalhes. A galeria contém três composições desenhadas com componentes nativos, disponíveis sem serviços externos. Os botões exercitam `navigate`, `goBack` e `popToTop`; o cabeçalho oferece retorno nativo.

- `src/routes/index.tsx`: contexto de navegação e tema.
- `src/routes/stack.routes.tsx`: pilha e títulos dos cabeçalhos.
- `src/routes/types.ts`: nomes e parâmetros tipados, sem `any`.
- `src/screens`: telas separadas de Início, Galeria e Detalhes.
- `src/data/artworks.ts`: dados locais e busca por identificador.
- `src/components/ui.tsx`: layout adaptável, área segura, botões e composições.

A rota de detalhes recebe apenas `artworkId`; identificadores desconhecidos mostram uma mensagem com caminho de volta à galeria. A interface tem rolagem, rótulos acessíveis e largura limitada em telas grandes.

## Verificações

```sh
npm run typecheck
npm run doctor
npm run export:all
npm audit
```

As exportações geram bundles em `dist/all`; não geram APK/IPA nem substituem testes em aparelhos. O projeto também está incluído no workflow e no script de verificação da raiz.

Resultados em 28/10/2026: TypeScript aprovado, Expo Doctor com 20/20 verificações e bundles web, Android e iOS exportados com sucesso. `npm audit` registrou oito alertas (cinco baixos e três altos), provenientes de `deepmerge` e `zod` na cadeia transitiva do Expo. A correção automática sugerida regride para Expo 51 e não foi aplicada.

Roteiro manual: abra a galeria, selecione cada composição, volte pelo cabeçalho e pelo botão da tela, use Voltar ao início e repita. No Android, confira o botão Voltar do sistema; no iOS, o gesto de retorno. Confira também fonte ampliada, tela estreita e tablet. Estes testes interativos precisam ser executados em dispositivos.

Documentação: [Native Stack](https://reactnavigation.org/docs/native-stack-navigator/) e [instalação do React Navigation 7](https://reactnavigation.org/docs/7.x/getting-started/).
