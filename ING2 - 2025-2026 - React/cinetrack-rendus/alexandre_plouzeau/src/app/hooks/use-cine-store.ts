import { CineItem } from "../../models/cine-item";
import { Status } from "../../types/status";
import { MediaType } from "../../types/media-type";
import { create } from "zustand";
import { cineItems } from "../data/cine-items";

interface CineStore {
    items: CineItem[];
    visibleItems: CineItem[];

    searchFilter: string;
    typeFilter: MediaType;
    statusFilter: Status;

    addItem: (item: CineItem) => void;
    getItemById: (id: number) => CineItem | undefined;
    updateItem: (updatedItem: CineItem) => void;
    deleteItem: (id: number) => void;
    updateStatus: (id: number, status: Status) => void;
    setSearchFilter: (query: string) => void;
    setTypeFilter: (type: MediaType) => void;
    setStatusFilter: (status: Status) => void;
}

const useCineStore = create<CineStore>((set, get) => ({
    items: cineItems,
    visibleItems: [],
    searchFilter: "",
    typeFilter: "all" as MediaType,
    statusFilter: "all" as Status,
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    getItemById: (id) => get().items.find((item) => item.id === id),
    updateItem: (updatedItem) =>
        set((state) => ({
            items: state.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
        })),
    deleteItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    updateStatus: (id, status) =>
        set((state) => ({
            items: state.items.map((item) => (item.id === id ? { ...item, status } : item)),
        })),
    setSearchFilter: (query) => set({ searchFilter: query }),
    setTypeFilter: (type) => set({ typeFilter: type }),
    setStatusFilter: (status) => set({ statusFilter: status }),
}));

export default useCineStore;
