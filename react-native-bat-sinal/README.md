# Bat-Sinal • Gotham City

Aplicativo mobile do desafio **Recrie um app de Bat Sinal**, da DIO, implementado com React Native, Expo e TypeScript. Interface em português, com identidade escura e amarela e fluxo completo de solicitação de ajuda fictícia.

## Funcionalidades

- Tela inicial com símbolo do Batman e botão para ativar o Bat-Sinal.
- Ao ativar, o logo e o botão inicial dão lugar ao formulário, como solicitado no briefing.
- Campos de nome, telefone, localização atual e observações opcionais.
- Validação de nome, telefone com DDD e localização, com erros junto aos campos.
- Confirmação com sinal iluminado e resumo dos dados informados.
- Cancelamento ou encerramento apagam os dados e retornam ao início.
- Layout com rolagem, largura adaptável, tratamento de teclado e rótulos de acessibilidade.

**É uma demonstração educacional. Não envia dados, não contata serviços e não realiza atendimento de emergência.** Os dados ficam somente na memória da sessão; não há backend, armazenamento persistente ou geolocalização.

## Executar

Requisitos: Node.js >= 22.13.0 e npm. Este projeto acompanha o Expo SDK 57 utilizado pelos demais exercícios deste repositório, com React 19.2.3 e React Native 0.86.3. Não é uma migração para o SDK mais recente.

```sh
cd react-native-bat-sinal
npm ci
npm start
```

Abra com um Expo Go compatível com SDK 57 ou development build. Para executar na web:

```sh
npm run web
```

Também disponíveis: `npm run android` e `npm run ios`. Android requer dispositivo/emulador configurado; simulador iOS requer macOS e Xcode.

## Verificação

```sh
npm run typecheck
npm test
npm run doctor
npm run export:web
npm run export:android
npm run export:ios
```

Exportações verificam os bundles, não substituem testes em dispositivos.

Roteiro manual:

1. Ative o sinal e confira que a tela inicial é substituída pelo formulário.
2. Envie vazio: nome, telefone e localização devem apresentar erros.
3. Preencha nome, telefone com DDD e localização; deixe observações vazias e envie.
4. Confira a confirmação e a localização informada.
5. Encerre e abra o formulário novamente: os campos devem estar vazios.
6. Confira cancelamento, teclado, rolagem em tela pequena e campos com leitor de tela.

## Organização e decisões técnicas

```text
App.tsx             Interface, componentes e fluxo entre as três telas
src/validation.ts   Tipos e regras de validação sem dependência da interface
assets/bat-logo.png Símbolo reutilizado do exercício Bat Pass deste repositório
app.json            Configuração do Expo
```

O fluxo usa uma união de estados (`home`, `form`, `success`) e `useState`, evitando dependências de navegação para três etapas simples. `StyleSheet` centraliza o estilo; `ScrollView` e `KeyboardAvoidingView` permitem alcançar os campos com o teclado aberto. A validação aceita espaços, parênteses, hífen e prefixo internacional no telefone, verificando entre 10 e 15 dígitos; não verifica a existência do número. A localização é digitada para não exigir permissões. O logo é um recurso local, sem dependência de rede.

## Entrega na DIO

Este projeto está na pasta `react-native-bat-sinal` do repositório configurado como origem: [lzvsrx/cursoreactapp](https://github.com/lzvsrx/cursoreactapp). Publique as alterações antes de enviar o link e verifique se o repositório está público.

Descrição sugerida:

> Desenvolvi um app de Bat-Sinal em React Native, Expo e TypeScript. O projeto apresenta ativação do sinal, formulário com validação de nome, telefone e localização, observações opcionais e confirmação visual. Inclui layout adaptável, acessibilidade e documentação das decisões técnicas.

Assista às aulas exigidas pela plataforma e envie o link em **Entregar Projeto**. A implementação não comprova a conclusão das vídeo-aulas.

## Referências e créditos

- [Briefing oficial da DIO](https://hermes.dio.me/files/assets/03a528b2-80b5-4abf-88d1-890dc0176615.pdf)
- [Compatibilidade das versões do Expo](https://docs.expo.dev/versions/latest/)
- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- Batman e Bat-Sinal são personagens e marcas da DC Comics. Projeto de estudo, sem afiliação oficial.
