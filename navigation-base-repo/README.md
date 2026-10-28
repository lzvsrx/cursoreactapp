# Navigation Lab

Recriação do zero da base educacional [digitalinnovationone/navigation-base-repo](https://github.com/digitalinnovationone/navigation-base-repo), referência no commit `44dfc0bf76f8a417f0e395b12f113b29b60c3f47`. O original usa Expo 49 e duas telas de exemplo sem navegação conectada. Esta implementação possui interface em português, tema escuro, abas Início/Galeria e detalhes em uma pilha nativa.

## Executar

Use Node.js 24 LTS e npm:

```sh
cd navigation-base-repo
npm ci
npm start
```

Execute `npm run web`, `npm run android` ou `npm run ios` para selecionar uma plataforma. No PowerShell com scripts bloqueados, use `npm.cmd` em vez de `npm`. iOS nativo local exige macOS/Xcode; Android exige emulador ou aparelho. Use Expo Go compatível com SDK 58 ou um development build.

## Estrutura

- `App.tsx`: NavigationContainer, abas e Native Stack.
- `src/navigation/types.ts`: parâmetros tipados de todas as rotas.
- `src/screens`: Início, Galeria e Detalhes.
- `src/components/ui.tsx`: componentes e estilos compartilhados.
- `src/data/gallery.ts`: conteúdo local dos exemplos.

Galeria envia `projectId` para Detalhes. Um identificador desconhecido mostra uma mensagem de recuperação. O botão Voltar usa o histórico da navegação, com retorno à tela principal quando não há histórico.

## Verificar

```sh
npm run typecheck
npm run doctor
npm run export:all
```

Teste manual: abra Início, toque em Explorar galeria, abra cada cartão, volte pelo cabeçalho e pelo botão da tela, alterne entre as abas e confira o botão Voltar do Android. Verifique também a interface em telas pequenas e com fonte ampliada. Exportar bundles não substitui executar em aparelhos.

## Atualização

Expo SDK 58 e React Navigation 7 estável; dependências nativas alinhadas por `expo install`. O lockfile registra as versões instaladas. Não usa a versão prévia do React Navigation 8. Consulte [React Navigation](https://reactnavigation.org/docs/7.x/getting-started/) e [Native Stack](https://reactnavigation.org/docs/hello-react-navigation/).

Verificação em 28/10/2026: TypeScript aprovado, Expo Doctor com 20/20 verificações e exportação dos bundles web, Android e iOS concluída. `npm audit` reportou oito alertas (cinco baixos e três altos), originados nas dependências transitivas `deepmerge` e `zod` da cadeia Expo. A correção automática sugerida regride para Expo 51; não foi aplicada. Testes interativos em aparelhos ainda precisam ser realizados.
