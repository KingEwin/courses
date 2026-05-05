"use client";

import { useState, useMemo, useEffect } from "react";
import { Status } from "./types/status";
import { CineItem } from "./models/cine-item";
import { useItemsStore } from "../store/items-store";
import CineCard from "./components/CineCard";
import AddItemModal from "./components/AddItemModal";
import FilterBar, { Filters, DEFAULT_FILTERS } from "./components/FilterBar";
import DetailsModal from "./components/DetailsModal";
import { Plus, Film } from "lucide-react";

export default function Home() {
  const { items, isLoading, fetchItems, addItem, updateItem, deleteItem, toggleFavorite, updateStatus } =
    useItemsStore();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showModal, setShowModal] = useState(false);
  const [viewingItemId, setViewingItemId] = useState<number | null>(null);

  // Always reflect latest store state — fixes stale favorite/rating in modal
  const viewingItem = viewingItemId !== null ? items.find((i) => i.id === viewingItemId) : undefined;

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Apply all filters
  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (
        filters.name &&
        !item.title.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      if (filters.type !== "all" && item.type !== filters.type) return false;
      if (filters.status !== "all" && item.status !== filters.status)
        return false;
      if (filters.minRating !== "" && item.rating < filters.minRating)
        return false;
      if (filters.maxRating !== "" && item.rating > filters.maxRating)
        return false;
      if (filters.favoritesOnly && !item.isFavorite) return false;
      return true;
    });
  }, [items, filters]);

  const openAdd = () => {
    setShowModal(true);
  };

  const openDetails = (item: CineItem) => {
    setViewingItemId(item.id);
  };

  const handleSave = async (item: CineItem) => {
    await addItem({
      title: item.title,
      type: item.type,
      status: item.status,
      rating: item.rating,
      poster: item.poster ?? null,
      overview: item.overview ?? null,
    });
  };

  const handleSaveRating = (id: number, rating: number) => {
    updateItem(id, { rating });
  };

  const handleUpdateStatus = (id: number, status: Status) => {
    updateStatus(id, status);
  };

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--md-on-surface-variant)" }}
        >
          Ma liste ({filtered.length}
          {filtered.length !== items.length && (
            <span className="text-sm font-normal"> / {items.length}</span>
          )}
          )
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
          style={{ background: "var(--md-primary)" }}
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      {/* Filter bar */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center mt-24 opacity-40">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-current border-t-transparent" style={{ color: "var(--md-primary)" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-24 opacity-40">
          <Film size={64} />
          <p className="text-lg font-medium">
            {items.length === 0
              ? "Aucun élément dans votre liste"
              : "Aucun résultat pour ces filtres"}
          </p>
          <p className="text-sm">
            {items.length === 0
              ? "Cliquez sur « Ajouter » pour commencer"
              : "Essayez de modifier vos critères de recherche"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <CineCard
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              updateStatus={handleUpdateStatus}
              onDetails={openDetails}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddItemModal
          onAdd={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {viewingItem && (
        <DetailsModal
          item={viewingItem}
          onClose={() => setViewingItemId(null)}
          toggleFavorite={toggleFavorite}
          onSaveRating={handleSaveRating}
        />
      )}
    </>
  );
}
