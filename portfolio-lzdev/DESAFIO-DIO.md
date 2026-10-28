# Desafio DIO — Meu portfólio em duas telas

Aplicativo React Native com Expo e TypeScript, adaptado do [portfólio pessoal LZ Dev](https://github.com/lzvsrx/lzdev). Entrega na pasta `portfolio-lzdev` do [repositório do curso](https://github.com/lzvsrx/cursoreactapp/tree/main/portfolio-lzdev).

| Tela | Conteúdo |
| --- | --- |
| Perfil (Main Screen) | Foto local, nome, apresentação, GitHub, LinkedIn, WhatsApp e demais contatos. Preserva projetos, certificados e serviços. |
| Habilidades (Skill Screen) | Mesma foto e nome, árvore com seis ramos e as 34 habilidades do portfólio, cada uma com percentual, nível e barra de progresso acessível. |

A navegação usa abas com estado tipado em `App.tsx`, sem dependência adicional. As telas permanecem montadas para preservar busca, seção e rolagem ao alternar abas. O botão Voltar do Android retorna de Habilidades para Perfil. A barra inferior respeita a área segura do dispositivo.

Os percentuais vêm do portfólio original e são autoavaliações: básico abaixo de 70%, intermediário de 70 a 84% e avançado a partir de 85%. Não são resultados de avaliações ou certificações.

## Executar

Requer Node.js >=22.13 e Expo Go compatível com SDK 57 ou development build.

```sh
cd portfolio-lzdev
npm ci
npm start
```

Use `npm run web` para navegador, `npm run android` para Android e `npm run ios` para iOS (macOS e Xcode). No PowerShell, use `npm.cmd` se a política bloquear `npm.ps1`.

## Arquivos

- `App.tsx`: navegação e retorno do Android.
- `src/components/ProfileHeader.tsx`: identificação reutilizada.
- `src/screens/Home/Home.tsx`: tela principal e contatos.
- `src/screens/Skills/Skills.tsx`: árvore e níveis.
- `src/services/portfolio.ts`: contatos, habilidades e ramos.
- `assets/profile.jpg`: foto empacotada, disponível sem internet.

Não depende de banco de dados nem de template externo no Figma. Os dados são locais. Links externos precisam de internet e de aplicativo compatível quando aplicável.

## Validação

```sh
npm run typecheck
npm run export:web
npm run export:android
npm run export:ios
```

As exportações verificam a geração dos bundles; não substituem testes em aparelhos físicos ou a compilação de APK/IPA.

Roteiro manual: abrir Perfil, conferir foto/nome e contatos, alternar para Habilidades, conferir os seis ramos e níveis, voltar ao Perfil e verificar a preservação da busca de projetos. No Android, testar também o botão Voltar em Habilidades.
