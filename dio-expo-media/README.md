# 📱 DIO Media Studio — React Native + Expo

Projeto de portfólio inspirado no desafio [trilha-react-native-expo-video](https://github.com/digitalinnovationone/trilha-react-native-expo-video), ampliado com TypeScript, câmera, gravação de vídeo, reprodução de vídeo/áudio, álbuns e compartilhamento.

## Tecnologias

- React Native + Expo SDK 54 (base inicial conhecida; use o procedimento abaixo para atualizar ao SDK mais recente compatível)
- TypeScript e React Navigation 7
- expo-camera, expo-media-library, expo-sharing
- expo-video e expo-audio (**substituem expo-av**, depreciado)
- expo-image-picker e expo-document-picker

## Instalação

Requer Node.js LTS, npm, Android com Expo Go ou development build.

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo start --clear
```

### Atualizar para a última versão publicada

As versões do arquivo `package.json` são uma **base de compatibilidade**, não uma garantia de que sejam as últimas disponíveis no dia do download. Para atualizar, com internet:

```bash
npm install expo@latest
npx expo install --fix
npx expo-doctor
```

Para gerar lockfile reproduzível, execute `npm install` e versione o `package-lock.json` resultante.

> Importante: ao migrar de SDK principal, confira as notas de migração do Expo e eventuais mudanças nas APIs.

## Recursos

| Aba | Função |
| --- | --- |
| Início | Apresentação |
| Câmera | Foto, vídeo e salvamento na galeria |
| Galeria | Listagem de fotos/vídeos, álbuns e compartilhamento |
| Player | Vídeo nativo e áudio local |

## Permissões

As permissões são solicitadas em tempo de execução. A configuração nativa fica em `app.json`. Em Android 13+ o acesso à galeria pode ser limitado pelo usuário. Para testar todos os recursos, prefira **dispositivo físico**; simuladores podem não disponibilizar câmera/microfone.

## Testes manuais

1. Negue e depois autorize a câmera; verifique o tratamento de permissão.
2. Fotografe e confirme que a imagem aparece na galeria.
3. Grave um vídeo com áudio, pare e confirme o salvamento.
4. Selecione uma foto na galeria, crie um álbum e compartilhe.
5. Abra um vídeo e um arquivo de áudio no player.

## Publicação no GitHub

```bash
git init
git add .
git commit -m "feat: projeto DIO Expo Media Studio"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

## Observações

O app não inclui backend nem banco de dados porque trabalha com a biblioteca de mídia local do dispositivo. Não acompanha vídeos, músicas ou imagens protegidas por direitos autorais. Algumas APIs nativas exigem uma build de desenvolvimento dependendo do ambiente.

**Autor:** projeto de estudo para entrega na DIO.
