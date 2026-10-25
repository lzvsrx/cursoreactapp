# Projetos React e React Native

Repositorio publico que reune projetos React e React Native, mantendo seus codigos, configuracoes, arquivos de dependencias, imagens e documentos.

| Pasta | Projeto |
| --- | --- |
| `lzdev` | Portfolio web com React, TypeScript e Vite |
| `portfolio-lzdev` | Portfolio React Native com Expo e site completo na pasta `web` |
| `react-native-bat-pass-generator` | Gerador de senhas com React Native e Expo |
| `react-native-bat-sinal` | Desafio DIO: Bat-Sinal com formulário validado e confirmação local |
| `trilha-react-native-green-latern-app` | Aplicativo de lanterna com React Native e Expo |
| `trilha-react-native-components` | Exemplos de componentes com React Native, TypeScript e Expo SDK 57 |
| `trilha-react-native-flexbox` | Exemplo de Flexbox da DIO atualizado para Expo SDK 57 |
| `trilha-react-native-expo-events` | Exemplos de eventos de entrada e toque com Expo SDK 57 |
| `trilha-react-native-hooks` | Hooks recriados do zero: estado, efeitos e tarefas com Expo SDK 58 |

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

Entre em qualquer pasta de aplicativo Expo listada acima:

```sh
npm ci
npm start
```

Os scripts `npm run web`, `npm run android` e `npm run ios` iniciam as plataformas correspondentes. Hooks usa Expo SDK 58, React 19.3.0 e React Native 0.88.0. Os demais aplicativos usam Expo SDK 57, React 19.2.3 e React Native 0.86.3. Use Expo Go compativel com o SDK do projeto ou um development build.

## Configuracao e documentacao

Os READMEs originais foram preservados em cada pasta. Os arquivos `.env.example` documentam a configuracao das APIs web; configure suas proprias credenciais localmente. Dependencias instaladas, builds, caches, historicos Git individuais e credenciais locais nao fazem parte deste repositorio.

O aplicativo de lanterna tem origem em https://github.com/digitalinnovationone/trilha-react-native-green-latern-app. As referencias e atribuicoes existentes nos projetos foram preservadas.

## Componentes React Native (Expo SDK 57)

A pasta `trilha-react-native-components` usa dependencias atuais compativeis com o SDK 57. Consulte seu README para requisitos e exemplos. Execute `cd trilha-react-native-components`, `npm ci` e `npm start`. Origem: https://github.com/digitalinnovationone/trilha-react-native-components.

## Verificar as atualizacoes

Nos sites (`lzdev` e `portfolio-lzdev/web`), execute `npm run build` e `npm test`. Os sites usam React 19.3, Vite 8, Vitest 5 e TypeScript 7.

Nos oito aplicativos Expo, execute `npm run typecheck`, `npm run doctor`, `npm run export:web`, `npm run export:android` e `npm run export:ios`. As exportacoes validam os bundles; a compilacao e o teste dos aplicativos nativos em dispositivos exigem Android SDK/Xcode ou EAS Build. Babel 7 e TypeScript 6 seguem a compatibilidade de cada SDK.

Consulte `npm audit` em cada pasta. Ainda existem avisos em dependencias transitivas do Expo (node-forge e zod); nao aplique `npm audit fix --force`, pois a correcao sugerida regride o SDK e quebra esta migracao. Acompanhe atualizacoes oficiais do Expo.

## Revisao e verificacao automatica

Consulte o [relatorio de revisao de 25/10/2026](docs/REVISAO-2026-10-25.md) para os resultados, correcoes e pendencias. Os backups dos arquivos ignorados ficam na [Release desta revisao](https://github.com/lzvsrx/cursoreactapp/releases/tag/revisao-2026-10-25).

Esse relatorio e o backup retratam a revisao anterior a adicao de Hooks. Os resultados do novo projeto estao em [trilha-react-native-hooks/README.md](trilha-react-native-hooks/README.md).

Para verificar os dez pacotes, com dependencias ja instaladas:

```sh
node scripts/verify-workspace.mjs
```

O script executa builds e testes dos sites, testes da API (`npm run test:api`), TypeScript, Expo Doctor, exportacoes das tres plataformas e auditoria de dependencias. Logs e resultados JSON ficam na pasta temporaria do sistema, em `cursoreactapp-verification`. Avisos de auditoria sao registrados separadamente das falhas de build/teste. O workflow `.github/workflows/verify.yml` repete as checagens no GitHub.

O gerador Bat Pass agora usa `expo-crypto` para gerar 16 caracteres e trata erros de geracao/copia. O app Lanterna Verde alterna o simbolo na interface; ele nao controla o flash fisico do celular. Os paineis administrativos dos sites continuam locais: o login no navegador nao substitui autenticacao de servidor. A sincronizacao requer as variaveis do `.env.example` configuradas no servidor e um segredo proprio.

## Backup dos arquivos gerados

Os arquivos ignorados podem ser publicados como anexos de uma Release, mantendo o historico Git com codigo, assets e lockfiles. Para gerar os arquivos compactados e um manifesto com SHA-256:

```sh
python scripts/backup-generated.py CAMINHO_FORA_DO_REPOSITORIO
```

O backup inclui as pastas ignoradas presentes no momento da execucao, como `node_modules`, `dist`, `dist-native`, `.expo` e `.expo-shared`. Cada arquivo compactado e listado novamente para verificar sua integridade. Arquivos ignorados avulsos exigem revisao antes de publicar. Os backups de dependencias sao especificos do ambiente Windows; em outra maquina, prefira `npm ci` com os lockfiles.

Para conferir um download no PowerShell, use `Get-FileHash ARQUIVO.tar.gz -Algorithm SHA256` e compare com o manifesto da Release. Para restaurar, entre na raiz de uma copia deste repositorio e execute `tar -xzf CAMINHO_DO_ARQUIVO.tar.gz`. A extracao restaura as pastas geradas do projeto correspondente e pode substituir arquivos gerados existentes.
