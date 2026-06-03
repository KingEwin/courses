"use client";

import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import { useCineStore } from "../store/cine-store";

interface CineCardProps {
  item: CineItem;
}

const statusConfig: Record<Status, { label: string; color: string }> = {
  "to-watch": { label: "À regarder", color: "bg-blue-100 text-blue-700" },
  watching: { label: "En cours", color: "bg-amber-100 text-amber-700" },
  completed: { label: "Terminé", color: "bg-green-100 text-green-700" },
};

const typeLabel: Record<string, string> = {
  movie: "Film",
  series: "Série",
};

export default function CineCard({ item }: CineCardProps) {
  const { dispatch } = useCineStore();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-bold text-gray-900 leading-tight">
          {item.title}
        </h2>
        <button
          onClick={() => dispatch({ type: "DELETE_ITEM", payload: item.id })}
          className="shrink-0 text-gray-400 hover:text-red-500 transition text-lg leading-none cursor-pointer"
          aria-label="Supprimer"
        >
          ×
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {typeLabel[item.type] ?? item.type}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusConfig[item.status].color}`}
        >
          {statusConfig[item.status].label}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < item.rating ? "bg-gray-800" : "bg-gray-200"}`}
          />
        ))}
        <span className="ml-2 text-xs font-bold text-gray-700">
          {item.rating}/10
        </span>
      </div>

      <div className="text-xs text-gray-400">
        Mis à jour le {item.updatedAt.toLocaleDateString("fr-FR")}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Statut
        </label>
        <select
          value={item.status}
          className="ml-auto text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
          onChange={(e) =>
            dispatch({
              type: "UPDATE_STATUS",
              payload: { id: item.id, status: e.target.value as Status },
            })
          }
        >
          <option value="to-watch">À regarder</option>
          <option value="watching">En cours</option>
          <option value="completed">Terminé</option>
        </select>
      </div>
    </div>
  );
}