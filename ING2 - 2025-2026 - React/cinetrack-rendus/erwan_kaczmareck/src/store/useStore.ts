import { create } from 'zustand';
import { Media } from '../types';

const API_URL = 'https://69c1136c085e1a9fae3ff25c.mockapi.io/api/cinetrack/medias';

interface CineStore {
  medias: Media[];
  isLoading: boolean;
  fetchMedias: () => Promise<void>;
  addMedia: (media: Omit<Media, 'id'>) => Promise<void>;
  removeMedia: (id: string) => Promise<void>;
  updateMedia: (id: string, updatedMedia: Partial<Media>) => Promise<void>;
}

export const useStore = create<CineStore>((set, get) => ({
  medias: [],
  isLoading: false,

  fetchMedias: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      set({ medias: data, isLoading: false });
    } catch (error) {
      console.error("Erreur de chargement", error);
      set({ isLoading: false });
    }
  },

  addMedia: async (media) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(media),
      });
      const newMedia = await res.json();
      set((state) => ({ medias: [...state.medias, newMedia] }));
    } catch (error) {
      console.error("Erreur d'ajout", error);
    }
  },

  removeMedia: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      set((state) => ({ medias: state.medias.filter((m) => m.id !== id) }));
    } catch (error) {
      console.error("Erreur de suppression", error);
    }
  },

  updateMedia: async (id, updatedMedia) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMedia),
      });
      const updatedData = await res.json();
      set((state) => ({
        medias: state.medias.map((m) => (m.id === id ? updatedData : m)),
      }));
    } catch (error) {
      console.error("Erreur de mise à jour", error);
    }
  },
}));