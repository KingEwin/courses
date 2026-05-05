"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import { cineItems } from "../data/cine-items";


// Props du stockage des fonctions et variables nécéssaires aux composants
interface CineStore {

    items: CineItem[]; // stockage des items

    addItem: (item: CineItem) => void; // Fonction d'ajout d'item
    deleteItem: (id: number) => void; // Fonction de suppression d'item
    updateItem: (item: CineItem) => void; // Fonction de mise à jour de l'item
    updateStatus: (id: number, status: Status) => void; // Fonction de mise à jour du statut

    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

// Création de l'export utilisable du store
export const useCineStore = create<CineStore>()(
    persist(
        // Setter
        (set) => ({
            items: cineItems, // récuparation des items
            hasHydrated: false, // "Hydration" : pour l'affichage de la page à la fin d'une action

            // Fonction de changement de l'hydration
            setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

            // Focntion d'ajout d'un item
            addItem: (newItem) =>
                set((state) => ({
                    items: [
                        ...state.items,
                        {
                            ...newItem,
                            id: Date.now(),
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ],
                })),

            // Fonciton de suppression d'un item
            deleteItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            // Fonction de mise à jour d'un item
            updateItem: (updatedItem) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    ),
                })),

            // Fonction de mise à jour d'un statut
            updateStatus: (id, status) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? { ...item, status, updatedAt: new Date() }
                            : item
                    ),
                })),
        }),
        {

            name: "cine-storage", // clé pour le stockage local
            // Rehydratation pour affichage de la page après chargement
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);