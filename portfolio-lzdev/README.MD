# Portfólio LZ Dev

Projeto unificado em `C:\cursoreactapp\portfolio-lzdev`.

A raiz usa a estrutura React Native + Expo + TypeScript de `react-native-bat-pass-generator`: `App.tsx`, `assets`, `src/components`, `src/screens/Home` e `src/services`. A tela do gerador de senhas foi substituída pelo portfólio com apresentação, tecnologias, projetos, busca de certificados, serviços e contatos provenientes de `lzdev`.

## Executar o aplicativo

```powershell
cd C:\cursoreactapp\portfolio-lzdev
npm.cmd install
npm.cmd start
```

Para abrir no navegador: `npm.cmd run web`. Para Android: `npm.cmd run android` (requer emulador ou dispositivo configurado).

A base foi mantida no Expo SDK 46 do projeto original. Um Expo Go atual pode não aceitar esse SDK; use um ambiente compatível ou atualize o SDK antes de executar em dispositivos atuais. A execução em celular precisa ser verificada em um dispositivo. No celular, o botão dos certificados oferece o arquivo pelo compartilhamento do sistema; no navegador, abre o arquivo local empacotado.

## Executar o site completo

A pasta `web` preserva o projeto web de `lzdev`, incluindo painel, APIs, configurações, imagens, testes e todos os dados originais. Os novos certificados também foram incluídos no catálogo web.

```powershell
cd C:\cursoreactapp\portfolio-lzdev\web
npm.cmd ci
npm.cmd run dev
```

Build: `npm.cmd run build`. Testes: `npm.cmd test`. Para recursos do servidor, consulte `web/README.md` e configure `web/.env.example` conforme as instruções do projeto.

## Conteúdos e certificados

- `src/services/portfolio.ts`: contatos, tecnologias, bancos de dados e serviços.
- `src/services/repositories.ts`: projetos importados do catálogo de `lzdev`, sem nova sincronização online.
- `src/services/certificates.ts`: catálogo com 144 certificados e documentos, mantendo os títulos existentes. Arquivos novos sem título conhecido usam o nome original.
- `src/services/certificateAssets.ts`: referências estáticas para empacotar os documentos no aplicativo.
- `assets/certificados`: documentos utilizados pelo aplicativo.
- `assets/certificados/originais`: cópia exata dos 144 arquivos de OneDrive, com os nomes originais.
- `web/public/certificados`: documentos servidos pelo site.

As três pastas de origem foram preservadas. Componentes do gerador de senhas permanecem na estrutura original, mas não são usados pela tela do portfólio. Os recursos administrativos do site estão na versão web; o aplicativo apresenta o portfólio e seus documentos.
