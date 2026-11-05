# 🏎️ Lamborghini Garage — Desafio DIO

Aplicativo educacional desenvolvido com **React Native, Expo e TypeScript**, inspirado no projeto da trilha React Native da Digital Innovation One.

## Funcionalidades
- Catálogo de veículos Lamborghini com imagens remotas.
- Integração com a API pública da DIO.
- Navegação circular entre carros (anterior/próximo).
- Exibição de modelo, ano e preço.
- Tema escuro, interface responsiva, estados de carregamento e erro.
- Código modular, TypeScript e acessibilidade básica.

## Requisitos
- Node.js LTS (recomendado Node.js 20.19+ para Expo SDK 54).
- npm.
- Expo Go no celular, ou emulador Android/iOS.

## Instalação
```bash
npm install
npx expo start
```
Escaneie o QR Code com o Expo Go. Para iniciar Android no emulador, pressione `a` no terminal do Expo. Para abrir no navegador, instale as dependências web compatíveis com o SDK usando `npx expo install react-dom react-native-web @expo/metro-runtime` e execute `npm run web`.

## Verificação
```bash
npm run typecheck
```

## Estrutura
```text
App.tsx
src/
  components/CarCard.tsx
  services/lamborghiniApi.ts
  theme/colors.ts
  types/car.ts
app.json
package.json
tsconfig.json
```

## Fontes e créditos
- Projeto de referência: https://github.com/digitalinnovationone/trilha-react-native-expo-lamborghini-app
- API: https://digitalinnovationone.github.io/fake-data-api-lamborghini/api/lamborghini.json
- Imagens: https://digitalinnovationone.github.io/fake-data-api-lamborghini/assets/1.png

Imagens e dados são carregados remotamente e exigem conexão com a internet. Este projeto não possui vínculo comercial com a Lamborghini.

## Publicação no GitHub
Crie um repositório vazio no GitHub e execute:
```bash
git init
git add .
git commit -m "feat: desafio DIO Lamborghini Garage com Expo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/lamborghini-garage-dio.git
git push -u origin main
```

## Autor
Projeto preparado para personalização e publicação no portfólio.
