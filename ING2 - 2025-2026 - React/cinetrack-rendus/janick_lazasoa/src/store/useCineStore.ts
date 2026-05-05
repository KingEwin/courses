import { create } from "zustand";
import { CineItem } from "@/app/models/cine-item";

let nextId = Date.now();

interface CineStore {
  items: CineItem[];
  addItem: (data: Omit<CineItem, "id" | "createdAt" | "updatedAt">) => void;
  deleteItem: (id: number) => void;
  updateItem: (id: number, data: Partial<Omit<CineItem, "id" | "createdAt">>) => void;
}

export const useCineStore = create<CineStore>((set) => ({
  items: [],
  addItem: (data) =>
    set((state) => ({
      items: [
        ...state.items,
        { ...data, id: nextId++, createdAt: new Date(), updatedAt: new Date() },
      ],
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateItem: (id, data) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...data, updatedAt: new Date() } : item
      ),
    })),
}));
