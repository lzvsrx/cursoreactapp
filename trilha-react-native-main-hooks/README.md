# Main Hooks Studio

Recriação do zero da [trilha React Native Main Hooks da DIO](https://github.com/digitalinnovationone/trilha-react-native-main-hooks), consultada no commit `eeaecbd54792947e16ba566a86d8c1ab6636ac91`. Implementação própria em português, com TypeScript estrito, Android, iOS e web.

## Executar

Requer Node.js 24 LTS (>=24.3) e npm. Use Expo Go compatível com SDK 58 ou development build.

```sh
cd trilha-react-native-main-hooks
npm ci
npm start
```

`npm run web` abre o navegador; `npm run android` requer aparelho/emulador; `npm run ios` requer macOS e Xcode para o simulador. No PowerShell, use `npm.cmd`/`npx.cmd` se scripts `.ps1` estiverem bloqueados.

## Demonstrações

| Aba | Hook | Interação |
| --- | --- | --- |
| Estado | `useState` | Pedido de café de 0 a 99 unidades, total derivado em centavos e reinício |
| Referência | `useRef` + `useState` | Campo controlado, foco imperativo e limpeza com foco |
| Reducer | `useReducer` + `useRef` | Digitação, escrever Felipe, limpar, prévia e desfazer até 30 alterações |

O original usa Expo 49 e executa `focus`/`setNativeProps` dentro do reducer. Aqui o reducer é puro e imutável; ações atualizam o texto controlado, enquanto o evento cuida do foco. Não há `any`, acesso imperativo ao texto nativo ou estado duplicado para o preço. As referências usam `ComponentRef<typeof TextInput>`.

Cada alteração do campo é uma entrada do histórico, inclusive digitação. Texto limitado a 160 unidades UTF-16, tanto no campo quanto no reducer. Abas desmontam o exemplo anterior: trocar de aba ou recarregar reinicia os dados. Sem backend ou persistência.

Interface com áreas seguras, rolagem, tratamento do teclado, estados acessíveis de abas e botões, campos rotulados e controles de pelo menos 48 pontos.

## Versões e fontes

Expo `~58.0.21`, React Native `0.88.0`, React/React DOM `19.3.0`, React Native Web `~0.21.4`, TypeScript `~6.0.3`. Dependências nativas seguem a matriz incluída no pacote Expo instalado e validada pelo Expo Doctor. A [branch oficial do SDK 58](https://github.com/expo/expo/blob/sdk-58/packages/expo/bundledNativeModules.json) pode antecipar patches ainda não exigidos pelo pacote publicado. O lockfile fixa a instalação.

- [useState](https://react.dev/reference/react/useState)
- [useRef](https://react.dev/reference/react/useRef)
- [useReducer e pureza](https://react.dev/reference/react/useReducer)

## Verificar

```sh
npm run typecheck
npm test
npm run doctor
npm run export:all
npm audit
```

Os testes verificam imutabilidade, escrita, limpeza, desfazer, ações sem alteração e limites. Exportar gera bundles, não APK/IPA. Os comandos também estão integrados à verificação do workspace e ao GitHub Actions.

Roteiro manual: remover cafés até zero; adicionar até 99; reiniciar; na aba Referência digitar, focar e limpar; no Reducer escrever, preencher Felipe, limpar e desfazer; alternar abas e conferir reinício. Conferir teclado, tela estreita e leitor de tela em dispositivos.

## Estrutura

```text
App.tsx               Interface e três demonstrações
src/state/editor.ts   Reducer puro, tipos e limites
tests/editor.test.mjs  Testes do editor
```

## Validação em 28/10/2026

- TypeScript: aprovado.
- Testes do reducer: 4 aprovados.
- Expo Doctor: 20/20 verificações aprovadas.
- Exportação conjunta: web, Android e iOS aprovados com React Native 0.88.0.

`npm audit` apontou 8 entradas (5 baixas e 3 altas), propagadas por dependências de ferramentas do Expo: `deepmerge` e `zod`. A correção total sugerida pelo npm regride para Expo 51; não foi aplicada. Consulte os avisos [deepmerge](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) e [Zod](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). Testes em aparelhos e revisão visual não foram realizados nesta entrega.
