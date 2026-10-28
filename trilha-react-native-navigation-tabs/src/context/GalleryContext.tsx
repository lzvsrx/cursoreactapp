import { createContext, useContext, useState, type ReactNode } from 'react';
import { artworks } from '../data/gallery';

type GalleryState = { favorites: string[]; toggleFavorite: (id: string) => void };
const GalleryContext = createContext<GalleryState | null>(null);
export function GalleryProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorite = (id: string) => {
    if (!artworks.some(artwork => artwork.id === id)) return;
    setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };
  return <GalleryContext.Provider value={{ favorites, toggleFavorite }}>{children}</GalleryContext.Provider>;
}
export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGallery deve ser usado dentro de GalleryProvider');
  return context;
}
