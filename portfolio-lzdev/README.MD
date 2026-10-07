# Portfólio LZ Dev

Projeto unificado na pasta `portfolio-lzdev` deste repositório. Requer Node.js 22.13 ou superior (validado com Node.js 24).

A raiz usa a estrutura React Native + Expo + TypeScript de `react-native-bat-pass-generator`: `App.tsx`, `assets`, `src/components`, `src/screens/Home` e `src/services`. A tela do gerador de senhas foi substituída pelo portfólio com apresentação, tecnologias, projetos, busca de certificados, serviços e contatos provenientes de `lzdev`.

## Executar o aplicativo

```powershell
cd C:\cursoreactapp-public\portfolio-lzdev
npm.cmd ci
npm.cmd start
```

Para abrir no navegador: `npm.cmd run web` (versão Expo, normalmente em `http://localhost:8081`). Para Android em um emulador ou dispositivo conectado por USB: `npm.cmd run android` (requer Android SDK/ADB configurado).

A base foi atualizada do Expo SDK 46 para o SDK 57, com React 19.2.3, React Native 0.86.3 e dependências alinhadas por `expo install --fix`. O SDK antigo não era compatível com o Expo Go atual. A web usa Metro explicitamente, com `@expo/metro-runtime` e React Native Web. A configuração de splash foi migrada para o plugin `expo-splash-screen`; as áreas seguras usam `react-native-safe-area-context`.

Para um celular Android sem ADB: execute `npm.cmd start`, mantenha computador e celular na mesma rede e leia o QR code com o Expo Go compatível com SDK 57. Confira a versão em https://expo.dev/go. Se a rede bloquear a conexão, use `npx.cmd expo start --tunnel`.

No PowerShell desta máquina, a política de execução bloqueia `npm.ps1`/`npx.ps1`. Use `npm.cmd` e `npx.cmd`, como nos exemplos, sem precisar mudar a política do Windows.

No celular, o botão dos certificados oferece o arquivo pelo compartilhamento do sistema; no navegador, abre o arquivo local empacotado. A execução em um aparelho deve ser conferida separadamente: exportar o bundle Android não compila um APK nem substitui um teste no dispositivo.

## Verificações do aplicativo

```powershell
npm.cmd run typecheck
npm.cmd run doctor
npm.cmd run export:web
npm.cmd run export:android -- --output-dir dist-native
```

As exportações ficam em `dist` e `dist-native`, ignoradas pelo Git. React, React Native, TypeScript e Babel seguem as versões compatíveis com o SDK, mesmo quando existem versões principais mais recentes.

`npm.cmd audit` ainda reporta alertas transitivos nas ferramentas do Expo/Metro (incluindo `braces`, `node-forge` e `uuid`). As versões estáveis disponíveis não eliminam todos esses alertas; não use `npm audit fix --force`, que propõe rebaixar o Expo e quebra a compatibilidade atual.

## Executar o site completo

A pasta `web` preserva o projeto web de `lzdev`, incluindo painel, APIs, configurações, imagens, testes e todos os dados originais. Os novos certificados também foram incluídos no catálogo web.

```powershell
cd C:\cursoreactapp-public\portfolio-lzdev\web
npm.cmd ci
npm.cmd run dev
```

Build: `npm.cmd run build`. Testes: `npm.cmd test`. O site usa React 19.3, Vite 8, Vitest 5 e TypeScript 7. O endereço de desenvolvimento padrão é `http://localhost:5173`. Pela raiz do aplicativo também é possível iniciar esse site com `npm.cmd run web:site` ou gerar seu build com `npm.cmd run build:site`, após instalar as dependências de `web`.

Para recursos do servidor, consulte `web/README.md` e configure `web/.env.example` conforme as instruções do projeto.

## Conteúdos e certificados

- `src/services/portfolio.ts`: contatos, tecnologias, bancos de dados e serviços.
- `src/services/repositories.ts`: projetos importados do catálogo de `lzdev`, sem nova sincronização online.
- `src/services/certificates.ts`: catálogo com 144 certificados e documentos, mantendo os títulos existentes. Arquivos novos sem título conhecido usam o nome original.
- `src/services/certificateAssets.ts`: referências estáticas para empacotar os documentos no aplicativo.
- `assets/certificados`: documentos utilizados pelo aplicativo.
- `assets/certificados/originais`: cópia exata dos 144 arquivos de OneDrive, com os nomes originais.
- `web/public/certificados`: documentos servidos pelo site.

As três pastas de origem foram preservadas. Componentes do gerador de senhas permanecem na estrutura original, mas não são usados pela tela do portfólio. Os recursos administrativos do site estão na versão web; o aplicativo apresenta o portfólio e seus documentos.
