import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import { MediaType } from "../types/media-type";
import { create } from "zustand";

interface CineStore {
    items: CineItem[];

    visibleItems: CineItem[];
    search: string;
    filterStatus: Status | "";
    filterType: MediaType | "";

    fetchItems: () => Promise<void>;
    addItem: (item: Omit<CineItem, "id" | "createdAt" | "updatedAt">) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
    updateStatus: (id: number, status: Status) => Promise<void>;

    setSearch: (search: string) => void;
    setFilterStatus: (filterStatus: Status | "") => void;
    setFilterType: (filterType: MediaType | "") => void;
}

function applyFilters(
    items: CineItem[],
    search: string,
    filterStatus: Status | "",
    filterType: MediaType | "",
): CineItem[] {
    return items.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === "" || item.status === filterStatus;
        const matchesType = filterType === "" || item.type === filterType;
        return matchesSearch && matchesStatus && matchesType;
    });
}

export const useCineStore = create<CineStore>((set, get) => ({
    items: [],
    visibleItems: [],
    search: "",
    filterStatus: "",
    filterType: "",

    fetchItems: async () => {
        try {
            const res = await fetch("/api/movies");
            if (res.ok) {
                const data = await res.json();
                const processed = data.map((d: any) => ({
                    ...d,
                    createdAt: new Date(d.createdAt),
                    updatedAt: new Date(d.updatedAt),
                }));
                set({
                    items: processed,
                    visibleItems: applyFilters(processed, get().search, get().filterStatus, get().filterType),
                });
            }
        } catch (e) {
            console.error(e);
        }
    },

    addItem: async (item) => {
        try {
            const res = await fetch("/api/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            if (res.ok) {
                const data = await res.json();
                const newItem = {
                    ...data,
                    createdAt: new Date(data.createdAt),
                    updatedAt: new Date(data.updatedAt),
                };
                set((state) => {
                    const newItems = [...state.items, newItem];
                    return {
                        items: newItems,
                        visibleItems: applyFilters(newItems, state.search, state.filterStatus, state.filterType),
                    };
                });
            }
        } catch (e) {
            console.error(e);
        }
    },

    deleteItem: async (id: number) => {
        try {
            const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
            if (res.ok) {
                set((state) => {
                    const newItems = state.items.filter((item) => item.id !== id);
                    return {
                        items: newItems,
                        visibleItems: applyFilters(newItems, state.search, state.filterStatus, state.filterType),
                    };
                });
            }
        } catch (e) {
            console.error(e);
        }
    },

    updateStatus: async (id: number, status: Status) => {
        try {
            const res = await fetch(`/api/movies/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                const data = await res.json();
                set((state) => {
                    const newItems = state.items.map((item) => {
                        if (item.id === id) {
                            return { ...item, status, updatedAt: new Date(data.updatedAt) };
                        }
                        return item;
                    });
                    return {
                        items: newItems,
                        visibleItems: applyFilters(newItems, state.search, state.filterStatus, state.filterType),
                    };
                });
            }
        } catch (e) {
            console.error(e);
        }
    },

    setSearch: (search: string) => set((state) => ({
        search,
        visibleItems: applyFilters(state.items, search, state.filterStatus, state.filterType),
    })),

    setFilterStatus: (filterStatus: Status | "") => set((state) => ({
        filterStatus,
        visibleItems: applyFilters(state.items, state.search, filterStatus, state.filterType),
    })),

    setFilterType: (filterType: MediaType | "") => set((state) => ({
        filterType,
        visibleItems: applyFilters(state.items, state.search, state.filterStatus, filterType),
    })),
}));