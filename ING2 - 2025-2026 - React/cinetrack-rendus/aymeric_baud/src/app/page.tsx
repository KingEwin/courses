"use client";

import { useState } from "react";
import { CineProvider, useCineStore } from "./store/cine-store";
import CineCard from "./components/CineCard";
import AddItemForm from "./components/AddItemForm";

function CineList() {
  const { items } = useCineStore();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(1);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      item.rating >= minRating,
  );

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-2xl font-bold">CineTrack</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition cursor-pointer"
        >
          + Ajouter
        </button>
      </div>

      <div className="flex gap-3 mb-6 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre..."
          className="flex-1 bg-white border border-white/60 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white/80 transition"
        />
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-white/60">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">
            Note min
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-28 accent-gray-900 cursor-pointer"
          />
          <span className="text-sm font-bold text-gray-700 w-6 text-center">
            {minRating}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <CineCard key={item.id} item={item} />
        ))}
        {filteredItems.length === 0 && (
          <p className="col-span-3 text-center text-gray-500 py-12 text-sm">
            Aucun résultat.
          </p>
        )}
      </div>

      {showForm && <AddItemForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default function Home() {
  return (
    <CineProvider>
      <CineList />
    </CineProvider>
  );
}