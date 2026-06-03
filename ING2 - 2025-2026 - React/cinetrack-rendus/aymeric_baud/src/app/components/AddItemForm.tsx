"use client";

import { useState } from "react";
import { CineItem } from "../models/cine-item";
import { MediaType } from "../types/media-type";
import { Status } from "../types/status";
import { useCineStore } from "../store/cine-store";

interface AddItemFormProps {
  onClose: () => void;
}

export default function AddItemForm({ onClose }: AddItemFormProps) {
  const { dispatch } = useCineStore();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<MediaType>("movie");
  const [status, setStatus] = useState<Status>("to-watch");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: CineItem = {
      id: Date.now(),
      title: title.trim(),
      type,
      status,
      rating,
      createdAt: new Date(),
      updatedAt: new Date(),
      liked: false,
    };

    dispatch({ type: "ADD_ITEM", payload: newItem });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Ajouter un titre</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nom du film ou de la série..."
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Type
            </label>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(
                [
                  { value: "movie", label: "Film" },
                  { value: "series", label: "Série" },
                ] as { value: MediaType; label: string }[]
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={`flex-1 py-2.5 text-sm font-medium transition cursor-pointer ${
                    type === value
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Statut
            </label>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(
                [
                  { value: "to-watch", label: "À regarder" },
                  { value: "watching", label: "En cours" },
                  { value: "completed", label: "Terminé" },
                ] as { value: Status; label: string }[]
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`flex-1 py-2 text-xs font-medium transition cursor-pointer ${
                    status === value
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Note{" "}
              <span className="text-gray-400 font-normal normal-case">
                — {rating} / 10
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full accent-gray-900 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-300 select-none">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition cursor-pointer"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
