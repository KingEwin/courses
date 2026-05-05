"use client";

import { useState } from "react";
import { useCineStore } from "./store/cine-store";
import CineCard from "./components/CineCard";
import AddCineItemForm from "./components/AddCineItemForm";
import EditCineItemForm from "./components/EditCineItemForm";
import { CineItem } from "./models/cine-item";

export default function Home() {
  const { search, setSearch, filteredItems, addItem, deleteItem, updateStatus, updateItem } =
    useCineStore();
  const [editingItem, setEditingItem] = useState<CineItem | null>(null);

  return (
    <div>
      {editingItem && (
        <EditCineItemForm
          item={editingItem}
          onSave={(updated) => {
            updateItem(updated);
            setEditingItem(null);
          }}
          onCancel={() => setEditingItem(null)}
        />
      )}

      <AddCineItemForm onAdd={addItem} />

      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un titre..."
          className="w-full bg-[#1f1f1f] border border-[#333] text-white placeholder-gray-500 rounded px-10 py-2.5 text-sm focus:outline-none focus:border-white transition"
        />
      </div>

      {filteredItems().length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-12">Aucun résultat.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems().map((item) => (
            <CineCard
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              updateStatus={updateStatus}
              onEdit={setEditingItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
