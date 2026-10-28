# Projetos React e React Native

Repositório de estudos e desafios DIO com React, React Native, Expo e TypeScript. Cada projeto possui instalação e dependências independentes. Código no GitHub: [lzvsrx/cursoreactapp](https://github.com/lzvsrx/cursoreactapp).

Entrega de 28/10/2026: consulte o [relatório e instruções de restauração](docs/ENTREGA-2026-10-28.md). Dependências, builds e caches ignorados ficam na [Release de backup completo](https://github.com/lzvsrx/cursoreactapp/releases/tag/backup-completo-2026-10-28).

| Pasta | Projeto |
| --- | --- |
| `trilha-react-native-navigation-drawer` | Drawer Explorer com Expo SDK 58, menu lateral e rotas tipadas |
| `trilha-react-native-navigation-tabs` | Tabs Atelier com Expo SDK 58, abas tipadas, filtros e favoritos |
| `trilha-react-native-navigation-stack` | Stack Studio recriado com Expo SDK 58, Native Stack e rotas tipadas |
| `navigation-base-repo` | Navigation Lab recriado do zero com Expo SDK 58, abas e pilha tipadas |
| `lzdev` | Portfolio web com React, TypeScript e Vite |
| `portfolio-lzdev` | Portfolio React Native com Expo e site completo na pasta `web` |
| `react-native-bat-pass-generator` | Gerador de senhas com React Native e Expo |
| `react-native-bat-sinal` | Desafio DIO: Bat-Sinal com formulário validado e confirmação local |
| `trilha-react-native-green-latern-app` | Aplicativo de lanterna com React Native e Expo |
| `trilha-react-native-components` | Exemplos de componentes com React Native, TypeScript e Expo SDK 57 |
| `trilha-react-native-flexbox` | Exemplo de Flexbox da DIO atualizado para Expo SDK 57 |
| `trilha-react-native-expo-events` | Exemplos de eventos de entrada e toque com Expo SDK 57 |
| `trilha-react-native-main-hooks` | Main Hooks Studio: estado, referências e editor com reducer, Expo SDK 58 |
| `trilha-react-native-hooks` | Hooks recriados do zero: estado, efeitos e tarefas com Expo SDK 58 |

## Executar

Instale Node.js 24 LTS (>=24.3.0) e npm. Cada projeto possui suas proprias dependencias; execute os comandos dentro da pasta correspondente.

### Portfolio web

```sh
cd portfolio-lzdev/web
npm ci
npm run dev
```

A pasta `lzdev` está ausente desta cópia local, conforme o [relatório de entrega](docs/ENTREGA-2026-10-28.md). Seu conteúdo permanece versionado no GitHub; use o site integrado acima nesta cópia.

### Aplicativos Expo

Entre em qualquer pasta de aplicativo Expo listada acima:

```sh
npm ci
npm start
```

Os scripts `npm run web`, `npm run android` e `npm run ios` iniciam as plataformas correspondentes. Os seis aplicativos Hooks, Main Hooks, Navigation Base, Stack, Tabs e Drawer usam Expo SDK 58, React 19.3.0 e React Native 0.88.0. Os outros sete aplicativos usam Expo SDK 57, React 19.2.3 e React Native 0.86.3. Use Expo Go compativel com o SDK do projeto ou um development build.

## Configuracao e documentacao

As instruções de cada projeto estão em seus READMEs e documentos de desafio. Os arquivos `.env.example` documentam a configuracao das APIs web; configure suas proprias credenciais localmente. Dependencias instaladas, builds, caches, historicos Git individuais e credenciais locais nao fazem parte deste repositorio.

O aplicativo de lanterna tem origem em https://github.com/digitalinnovationone/trilha-react-native-green-latern-app. As referencias e atribuicoes existentes nos projetos foram preservadas.

## Componentes React Native (Expo SDK 57)

A pasta `trilha-react-native-components` usa dependencias atuais compativeis com o SDK 57. Consulte seu README para requisitos e exemplos. Execute `cd trilha-react-native-components`, `npm ci` e `npm start`. Origem: https://github.com/digitalinnovationone/trilha-react-native-components.

## Verificar as atualizacoes

Nos sites (`lzdev` e `portfolio-lzdev/web`), execute `npm run build` e `npm test`. Os sites usam React 19.3, Vite 8, Vitest 5 e TypeScript 7.

Nos 13 aplicativos Expo, execute `npm run typecheck`, `npm run doctor`, `npm run export:web`, `npm run export:android` e `npm run export:ios`. As exportacoes validam os bundles; a compilacao e o teste dos aplicativos nativos em dispositivos exigem Android SDK/Xcode ou EAS Build. Babel 7 e TypeScript 6 seguem a compatibilidade de cada SDK.

Consulte `npm audit` em cada pasta. Ainda existem avisos em dependencias transitivas do Expo (como node-forge, deepmerge e zod, conforme o projeto); nao aplique `npm audit fix --force`, pois a correcao sugerida regride o SDK e quebra esta migracao. Acompanhe atualizacoes oficiais do Expo.

## Revisao e verificacao automatica

Consulte o [relatorio de revisao de 25/10/2026](docs/REVISAO-2026-10-25.md) para os resultados, correcoes e pendencias. Os backups dos arquivos ignorados ficam na [Release desta revisao](https://github.com/lzvsrx/cursoreactapp/releases/tag/revisao-2026-10-25).

Esse relatório retrata a revisão anterior à adição de Hooks. Consulte também os resultados em [Hooks em ação](trilha-react-native-hooks/README.md) e [Main Hooks Studio](trilha-react-native-main-hooks/README.md). Backups existentes não incluem automaticamente projetos adicionados após sua geração.

A verificação automática inclui 15 pacotes: 13 aplicativos Expo e dois sites. Para executá-la localmente, todas as pastas precisam estar presentes e com dependências instaladas, incluindo `lzdev` (restaure-a do GitHub nesta cópia):

```sh
node scripts/verify-workspace.mjs
```

Bat-Sinal, Hooks e Main Hooks também possuem `npm test`. O script executa builds e testes dos sites, testes da API (`npm run test:api`), TypeScript, Expo Doctor, exportacoes das tres plataformas e auditoria de dependencias. Logs e resultados JSON ficam na pasta temporaria do sistema, em `cursoreactapp-verification`. Avisos de auditoria sao registrados separadamente das falhas de build/teste. O workflow `.github/workflows/verify.yml` repete as checagens no GitHub.

O gerador Bat Pass agora usa `expo-crypto` para gerar 16 caracteres e trata erros de geracao/copia. O app Lanterna Verde alterna o simbolo na interface; ele nao controla o flash fisico do celular. Os paineis administrativos dos sites continuam locais: o login no navegador nao substitui autenticacao de servidor. A sincronizacao requer as variaveis do `.env.example` configuradas no servidor e um segredo proprio.

## Backup dos arquivos gerados

Os arquivos ignorados podem ser publicados como anexos de uma Release, mantendo o historico Git com codigo, assets e lockfiles. Para gerar os arquivos compactados e um manifesto com SHA-256:

```sh
python scripts/backup-generated.py CAMINHO_FORA_DO_REPOSITORIO
```

O backup inclui as pastas ignoradas presentes no momento da execucao, como `node_modules`, `dist`, `dist-native`, `.expo` e `.expo-shared`. Cada arquivo compactado e listado novamente para verificar sua integridade. Arquivos ignorados avulsos exigem revisao antes de publicar. Os backups de dependencias sao especificos do ambiente Windows; em outra maquina, prefira `npm ci` com os lockfiles.

Para conferir um download no PowerShell, use `Get-FileHash ARQUIVO.tar.gz -Algorithm SHA256` e compare com o manifesto da Release. Para restaurar, entre na raiz de uma copia deste repositorio e execute `tar -xzf CAMINHO_DO_ARQUIVO.tar.gz`. A extracao restaura as pastas geradas do projeto correspondente e pode substituir arquivos gerados existentes.

## Main Hooks Studio — entrega de 28/10/2026

Recriação do zero de [trilha-react-native-main-hooks da DIO](https://github.com/digitalinnovationone/trilha-react-native-main-hooks), com Expo 58, TypeScript estrito e interface em português.

| Demonstração | Conteúdo |
| --- | --- |
| Estado | `useState`, pedido de café de 0 a 99 unidades e total derivado em centavos |
| Referência | `useRef`, foco e limpeza de campo controlado |
| Reducer | `useReducer`, escrever, preencher, limpar e desfazer até 30 alterações |

O reducer é puro e imutável; o foco fica nos eventos da interface. O texto aceita até 160 unidades UTF-16. Os dados ficam em memória e reiniciam ao trocar de aba. Veja o [README](trilha-react-native-main-hooks/README.md) e o [desafio](trilha-react-native-main-hooks/DESAFIO-DIO.md).

```sh
cd trilha-react-native-main-hooks
npm ci
npm start
```

No PowerShell, use `npm.cmd` e `npx.cmd` se os scripts `.ps1` estiverem bloqueados.

Validação: TypeScript aprovado, quatro testes aprovados, Expo Doctor com 20/20 verificações e exportação de bundles web, Android e iOS aprovada. Não houve teste em aparelho nem revisão visual. A auditoria registrou oito entradas transitivas nas ferramentas do Expo (cinco baixas e três altas), relacionadas a `deepmerge` e `zod`; detalhes no README do projeto. Estes resultados não representam uma nova execução da validação dos demais aplicativos.
