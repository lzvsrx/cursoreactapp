import { getRandomValues } from 'expo-crypto';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?';

/** Gera 16 caracteres com aleatoriedade criptográfica, sem viés de módulo. */
export default function generatePass(): string {
  let password = '';
  const limit = 256 - (256 % characters.length);
  while (password.length < 16) {
    const bytes = getRandomValues(new Uint8Array(32));
    for (const byte of bytes) {
      if (byte < limit) password += characters[byte % characters.length];
      if (password.length === 16) break;
    }
  }
  return password;
}
