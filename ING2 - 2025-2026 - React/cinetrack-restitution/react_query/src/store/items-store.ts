import { create } from "zustand";
import { CineItem } from "../app/models/cine-item";
import { Status } from "../app/types/status";

type NewItemData = Omit<CineItem, "id" | "createdAt" | "updatedAt" | "isFavorite">;
type UpdateItemData = Partial<Omit<CineItem, "id" | "createdAt">>;

interface ItemsStore {
  items: CineItem[];
  isLoading: boolean;
  fetchItems: () => Promise<void>;
  addItem: (data: NewItemData) => Promise<void>;
  updateItem: (id: number, data: UpdateItemData) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  updateStatus: (id: number, status: Status) => Promise<void>;
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
  items: [],
  isLoading: false,

  fetchItems: async () => {
    set({ isLoading: true });
    const res = await fetch("/api/items");
    const data: CineItem[] = await res.json();
    // Dates come back as strings from JSON — convert them
    const items = data.map((i) => ({
      ...i,
      createdAt: new Date(i.createdAt),
      updatedAt: new Date(i.updatedAt),
    }));
    set({ items, isLoading: false });
  },

  addItem: async (data) => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const item: CineItem = await res.json();
    set((state) => ({
      items: [
        { ...item, createdAt: new Date(item.createdAt), updatedAt: new Date(item.updatedAt) },
        ...state.items,
      ],
    }));
  },

  updateItem: async (id, data) => {
    const res = await fetch(`/api/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated: CineItem = await res.json();
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id
          ? { ...updated, createdAt: new Date(updated.createdAt), updatedAt: new Date(updated.updatedAt) }
          : i
      ),
    }));
  },

  deleteItem: async (id) => {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  toggleFavorite: async (id) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;
    await get().updateItem(id, { isFavorite: !item.isFavorite });
  },

  updateStatus: async (id, status) => {
    await get().updateItem(id, { status });
  },
}));
