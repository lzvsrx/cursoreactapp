export const artworks = [
  { id: 'horizonte', title: 'Horizonte azul', category: 'COR & EQUILÍBRIO', color: '#234de6', accent: '#b7d5ff', description: 'Um encontro entre formas simples e tons de azul. As camadas lembram um horizonte que muda a cada novo ponto de vista.' },
  { id: 'orbita', title: 'Órbita solar', category: 'FORMA & MOVIMENTO', color: '#b44b25', accent: '#ffdf9e', description: 'Círculos em contraste criam uma composição quente, inspirada no movimento dos astros e na luz do fim da tarde.' },
  { id: 'jardim', title: 'Jardim tranquilo', category: 'RITMO & NATUREZA', color: '#266455', accent: '#c5e6bd', description: 'Verdes suaves, curvas e espaços abertos convidam a desacelerar. Um pequeno estudo sobre ritmo visual e natureza.' },
] as const;

export type Artwork = typeof artworks[number];
export function getArtwork(id: string): Artwork | undefined {
  return artworks.find(artwork => artwork.id === id);
}
