"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { CineItem } from "../models/cine-item";
import { MediaType } from "../types/media-type";
import { Status } from "../types/status";

interface AddCineItemFormProps {
  onAdd: (item: CineItem) => void;
}

export default function AddCineItemForm({ onAdd }: AddCineItemFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      type: "movie" as MediaType,
      status: "to-watch" as Status,
      rating: 0,
      posterUrl: "",
    },
    onSubmit: ({ value }) => {
      const newItem: CineItem = {
        id: Date.now(),
        title: value.title,
        type: value.type,
        status: value.status,
        rating: value.rating,
        posterUrl: value.posterUrl || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAdd(newItem);
      form.reset();
      setOpen(false);
    },
  });

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-[#E50914] hover:bg-[#b20710] text-white font-semibold text-sm px-5 py-2.5 rounded transition cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter un titre
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1f1f1f] border border-[#333] rounded-lg p-6 flex flex-col gap-4 w-full max-w-md mx-4"
        >
          <h2 className="text-base font-bold text-white">Nouveau titre</h2>

          <form.Field
            name="title"
            validators={{ onChange: ({ value }) => (!value ? "Le titre est requis" : undefined) }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Titre
                </label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Ex: Inception"
                  className="bg-[#2a2a2a] border border-[#444] text-white placeholder-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-white transition"
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="text-[#E50914] text-xs">{field.state.meta.errors[0]}</span>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="type">
            {(field) => (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Type
                </label>
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as MediaType)}
                  className="bg-[#2a2a2a] border border-[#444] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-white transition cursor-pointer"
                >
                  <option value="movie">Film</option>
                  <option value="series">Série</option>
                </select>
              </div>
            )}
          </form.Field>

          <form.Field name="status">
            {(field) => (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Statut
                </label>
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as Status)}
                  className="bg-[#2a2a2a] border border-[#444] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-white transition cursor-pointer"
                >
                  <option value="to-watch">À regarder</option>
                  <option value="watching">En cours</option>
                  <option value="completed">Terminé</option>
                </select>
              </div>
            )}
          </form.Field>

          <form.Field
            name="rating"
            validators={{
              onChange: ({ value }) =>
                value < 0 || value > 10 ? "La note doit être entre 0 et 10" : undefined,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Note (0–10)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className="bg-[#2a2a2a] border border-[#444] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-white transition"
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="text-[#E50914] text-xs">{field.state.meta.errors[0]}</span>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="posterUrl">
            {(field) => (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  URL du poster (optionnel)
                </label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://..."
                  className="bg-[#2a2a2a] border border-[#444] text-white placeholder-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-white transition"
                />
              </div>
            )}
          </form.Field>

          <div className="flex gap-3 pt-1">
            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="flex-1 bg-[#E50914] hover:bg-[#b20710] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-2 rounded transition cursor-pointer"
                >
                  Ajouter
                </button>
              )}
            </form.Subscribe>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-[#2a2a2a] hover:bg-[#333] text-gray-300 font-semibold text-sm py-2 rounded transition cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </form>
        </div>
      )}
    </div>
  );
}
