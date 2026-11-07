# Guia de atualização

O projeto usa Expo SDK 54 como referência inicial e versões aproximadas de pacotes. Não foi possível consultar o registro npm nem executar uma instalação neste ambiente. **Não afirmar que as versões fixadas são as últimas**.

1. `npm install`
2. `npm install expo@latest`
3. `npx expo install --fix`
4. `npx expo-doctor`
5. `npx tsc --noEmit`
6. `npx expo start --clear`

Se o Expo recomendar novas versões de React/React Native, siga a matriz de compatibilidade do SDK. Após uma migração, revise alterações incompatíveis nas bibliotecas e teste em aparelho físico.
