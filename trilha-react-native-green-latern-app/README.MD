# Green Lantern — React Native

Aplicativo da trilha da DIO: toque no símbolo para alternar entre os estados ligado e desligado.

Repositório original: https://github.com/digitalinnovationone/trilha-react-native-green-latern-app

## Executar no Windows

No PowerShell:

```powershell
cd C:\cursoreactapp\trilha-react-native-green-latern-app
npm.cmd ci
npm.cmd start
```

O comando `npm.cmd` funciona mesmo quando o PowerShell bloqueia scripts `npm.ps1`.
Para abrir em um emulador Android configurado, execute `npm.cmd run android`.

## Verificar TypeScript

```powershell
npx.cmd tsc --noEmit
```

O projeto usa Expo SDK 57, React 19.2.3 e React Native 0.86.3. Requer Node.js >=22.13.0 e Expo Go compativel com SDK 57 ou development build.
