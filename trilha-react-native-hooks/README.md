# Hooks em ação — Expo SDK 58

Recriação do zero da [trilha de Hooks da DIO](https://github.com/digitalinnovationone/trilha-react-native-hooks), com código próprio, TypeScript estrito e exemplos interativos em português. Referência consultada no commit `fcdf9d1700de4b944dad27e35ef213f7f719645c`.

## Executar

Use Node.js 24 LTS (>= 24.3.0) e npm. Outras linhas aceitas pelo Expo estão declaradas em `engines` no `package.json`:

```sh
cd trilha-react-native-hooks
npm ci
npm start
```

No PowerShell, use `npm.cmd`/`npx.cmd` se os scripts `.ps1` estiverem bloqueados. `npm run web`, `npm run android` e `npm run ios` abrem as plataformas correspondentes. Android requer aparelho/emulador configurado; simulador iOS requer macOS/Xcode. Use Expo Go compatível com SDK 58 ou um development build.

## Exemplos

| Tela | Hooks | Comportamento |
| --- | --- | --- |
| Estado | `useState` | Carrinho com adição, remoção e limpeza, sem valores negativos |
| Efeitos | `useEffect`, `useState`, `useStopwatch` | Relógio com criação e limpeza do intervalo |
| Tarefas | `useReducer`, `useState`, `useRef`, `useMemo`, `useCallback` | Adicionar, concluir, reabrir, excluir, filtrar e limpar |

Cada tela explica os conceitos e exibe código. Há rolagem, tratamento de teclado, áreas seguras, rótulos e estados de acessibilidade.

**Dados somente em memória:** trocar de aba desmonta o exemplo anterior e reinicia os dados. Isso permite observar a limpeza do efeito ao desmontar o relógio. Recarregar o app apaga as tarefas; não há backend ou persistência.

## Melhorias em relação à referência

- O botão limpar realmente esvazia a lista; o original despachava outra inclusão.
- Reducer com ações tipadas e atualizações imutáveis, sem `any`.
- IDs estáveis como `key`, independentes da posição ou do título da tarefa.
- Rejeição de títulos vazios e IDs duplicados, entrada limitada a 160 caracteres e foco após inclusão.
- Carrinho limitado a zero e controles desabilitados quando não se aplicam.
- Efeito com dependência declarada e retorno com `clearInterval` para evitar intervalos após desmontagem.
- Seis testes de regras de negócio e exportações separadas por plataforma.

`useMemo` e `useCallback` são didáticos neste exemplo pequeno; ganhos de desempenho precisam ser medidos. `useRef` guarda a referência do campo e o próximo ID sem provocar renderização. Os dados exibidos ficam no estado.

A referência do campo usa `ComponentRef<typeof TextInput>`, compatível com a instância exposta pelo React Native 0.88, em vez de tratar o componente como o tipo da instância.

## Versões

Expo `~58.0.19`, React Native `0.88.0`, React/React DOM `19.3.0`, React Native Web `~0.21.4`, Safe Area Context `~5.10.1`, TypeScript `~6.0.3` e Babel 7. As versões seguem a [matriz oficial do SDK 58](https://github.com/expo/expo/blob/sdk-58/packages/expo/bundledNativeModules.json). O lockfile registra a instalação reproduzível; os demais projetos mantêm seus SDKs próprios.

## Verificar

```sh
npm run typecheck
npm test
npm run doctor
npm run export:all
npm audit
```

`export:all` gera as três plataformas em `dist/all`. As exportações individuais `export:web`, `export:android` e `export:ios` geram `dist/web`, `dist/android` e `dist/ios`. Essas pastas são ignoradas pelo Git. Exportar bundles não compila APK/IPA nem substitui testes em aparelhos.

Os testes cobrem inclusão e normalização, entradas inválidas, conclusão sem mutação, exclusão, limpeza e filtros. Eles não verificam automaticamente a interface nem o ciclo de vida do relógio.

Roteiro manual:

1. Adicione/remova itens do carrinho e confira que não fica negativo.
2. Inicie o relógio, aguarde e use “Parar e zerar”.
3. Inicie, troque de aba e volte: deve estar zerado e parado.
4. Tente adicionar tarefa em branco e confira o erro.
5. Adicione duas tarefas com mesmo título, conclua uma e use os filtros.
6. Exclua, limpe concluídas e depois limpe toda a lista.
7. Confira teclado, rolagem, orientação e leitor de tela no aparelho.

## Validação em 25/10/2026

- TypeScript: aprovado.
- Testes: 6 aprovados.
- Expo Doctor: 20/20 verificações aprovadas.
- Exportação conjunta: web, Android e iOS aprovadas.
- Auditoria: 5 entradas altas transitivas nas ferramentas do Expo, relacionadas a `node-forge` e `zod`. Elas permanecem pendentes; não foi aplicado `npm audit fix --force`, que sugeria regressão para Expo 44. Consulte os avisos [node-forge](https://github.com/advisories/GHSA-86w9-cpqp-85rv) e [Zod](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5).

Não houve execução em aparelhos nem teste visual da interface nesta validação.

## Estrutura

```text
App.tsx                    Interface e exemplos
index.ts                   Registro do componente raiz no Expo
src/hooks/useStopwatch.ts   Relógio com limpeza do intervalo
src/state/tasks.ts         Reducer, tipos e filtro
tests/tasks.test.mjs        Testes das regras da lista
```

## Referências

Projeto educacional com implementação própria, inspirado nos exercícios da DIO e sem reutilizar os assets do projeto original.

- [Repositório original da DIO](https://github.com/digitalinnovationone/trilha-react-native-hooks)
- [Referência de Hooks do React](https://react.dev/reference/react/hooks)
- [Documentação do Expo](https://docs.expo.dev/)
