# Trilha React Native Flexbox

Exemplo da DIO atualizado de Expo SDK 46 para SDK 57, com React 19.2.3, React Native 0.86.3 e TypeScript 6. Os tres blocos coloridos e as propriedades de Flexbox do exemplo original foram preservados.

Origem: https://github.com/digitalinnovationone/trilha-react-native-flexbox
Commit de origem: `fa948563e39416ecbf74c89956dcee9154ed411c`.

## Executar

Requer Node.js >=22.13.0 (recomendado Node.js 24 LTS).

```sh
cd trilha-react-native-flexbox
npm ci
npm start
```

Use `npm run web`, `npm run android` ou `npm run ios` para abrir a plataforma desejada. No celular, use Expo Go compativel com SDK 57 ou um development build. No Windows, caso o PowerShell bloqueie `npm.ps1`, use `npm.cmd` e `npx.cmd`.

## Exemplo

Edite `App.tsx` para experimentar `flexDirection`, `justifyContent`, `alignItems` e `flexShrink`. O container organiza os blocos em coluna; o bloco azul pode encolher quando falta espaco no eixo principal.

## Validacao

```sh
npm run typecheck
npm run doctor
npm run export:web
npm run export:android
npm run export:ios
```

As exportacoes verificam os bundles JavaScript. Testes em dispositivos e compilacoes nativas requerem ferramentas Android/iOS ou EAS Build.

## Dependencias transitivas

A auditoria npm apos a atualizacao registrou 23 alertas (8 moderados e 15 altos), incluindo dependencias transitivas de Expo/Metro. A dependencia `ua-parser-js` foi atualizada dentro da faixa compativel. Nao use `npm audit fix --force`: as sugestoes incluem regressao para Expo 44 e React Native 0.72, incompativeis com esta configuracao.
