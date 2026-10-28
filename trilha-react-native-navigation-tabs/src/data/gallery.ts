export const categories = ['Todas', 'Geometria', 'Paisagem'] as const;
export type Category = typeof categories[number];
export const artworks = [
  { id: 'aurora', title: 'Aurora', category: 'Paisagem', color: '#433f77', accent: '#f3b8b0', description: 'Luz suave e formas que lembram o primeiro instante do dia.' },
  { id: 'encontro', title: 'Encontro', category: 'Geometria', color: '#345e53', accent: '#d2ef9f', description: 'Um estudo de equilíbrio entre círculos, linhas e espaço.' },
  { id: 'dunas', title: 'Dunas', category: 'Paisagem', color: '#8b543c', accent: '#ffdaac', description: 'Curvas e tons quentes inspirados no movimento da areia.' },
  { id: 'orbital', title: 'Orbital', category: 'Geometria', color: '#294b76', accent: '#a7d9ec', description: 'Contrastes e sobreposições em uma composição de formas livres.' },
] as const;
export type Artwork = typeof artworks[number];
