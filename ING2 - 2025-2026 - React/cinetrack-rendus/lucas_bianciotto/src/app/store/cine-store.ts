import { create } from "zustand";
import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import { cineItems } from "../data/cine-items";

interface CineStore {
  items: CineItem[];
  search: string;
  setSearch: (search: string) => void;
  filteredItems: () => CineItem[];
  addItem: (item: CineItem) => void;
  deleteItem: (id: number) => void;
  updateStatus: (id: number, status: Status) => void;
  updateItem: (updated: CineItem) => void;
}

export const useCineStore = create<CineStore>((set, get) => ({
  items: cineItems,
  search: "",

  setSearch: (search) => set({ search }),

  filteredItems: () => {
    const { items, search } = get();
    if (!search.trim()) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  },

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),

  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateStatus: (id, status) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, status, updatedAt: new Date() } : i,
      ),
    })),

  updateItem: (updated) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === updated.id ? { ...updated, updatedAt: new Date() } : i,
      ),
    })),
}));
