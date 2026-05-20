"use client";

import { useState } from "react";
import { CineItem } from "../models/cine-item";
import { MediaType } from "../types/media-type";
import { Status } from "../types/status";
import { X, Film, Tv, Plus, Pencil, Search, ImageOff } from "lucide-react";
import { useTmdbSearch } from "../../hooks/useTmdbSearch";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import type { TmdbResult } from "../../lib/api";

interface AddItemModalProps {
  onAdd: (item: CineItem) => void;
  onClose: () => void;
  initialItem?: CineItem;
}

export default function AddItemModal({
  onAdd,
  onClose,
  initialItem,
}: AddItemModalProps) {
  const isEdit = !!initialItem;

  const [titre, setTitre] = useState(initialItem?.title ?? "");
  const [type, setType] = useState<MediaType>(initialItem?.type ?? "movie");
  const [statut, setStatut] = useState<Status>(initialItem?.status ?? "to-watch");
  const [note, setNote] = useState<number>(initialItem?.rating ?? 0);

  // TMDB search — UI state only; data lives in React Query
  const [tmdbQuery, setTmdbQuery] = useState("");
  const debouncedQuery = useDebouncedValue(tmdbQuery, 400);
  const { data: tmdbResults = [], isFetching: tmdbLoading } =
    useTmdbSearch(debouncedQuery);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [selectedOverview, setSelectedOverview] = useState<string | null>(null);

  const pickTmdb = (result: TmdbResult) => {
    setTitre(result.title);
    setType(result.type);
    setSelectedPoster(result.poster);
    setSelectedOverview(result.overview || null);
    setTmdbQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onAdd({
      id: initialItem?.id ?? Date.now(),
      title: titre.trim(),
      type,
      status: statut,
      rating: note,
      isFavorite: initialItem?.isFavorite ?? false,
      poster: selectedPoster ?? initialItem?.poster ?? null,
      overview: selectedOverview ?? initialItem?.overview ?? null,
      createdAt: initialItem?.createdAt ?? new Date(),
      updatedAt: new Date(),
    });
    onClose();
  };

  const inputClass =
    "w-full rounded-lg px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 transition-all";
  const inputStyle = {
    background: "var(--md-surface)",
    borderColor: "var(--md-outline)",
    color: "var(--md-on-surface)",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-4 rounded-3xl shadow-2xl overflow-hidden"
        style={{ background: "var(--md-surface-card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "var(--md-primary)" }}
        >
          <span className="text-white text-lg font-semibold">
            {isEdit ? "Modifier l'élément" : "Ajouter un élément"}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6 max-h-[80vh] overflow-y-auto">
          {/* TMDB search — only shown when adding */}
          {!isEdit && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--md-on-surface-variant)" }}>
                Rechercher sur TMDB
              </span>
              <div className="relative flex items-center">
                <Search size={15} className="absolute left-3 pointer-events-none" style={{ color: "var(--md-on-surface-variant)" }} />
                <input
                  type="text"
                  placeholder="Inception, Breaking Bad…"
                  value={tmdbQuery}
                  onChange={(e) => setTmdbQuery(e.target.value)}
                  className="w-full rounded-lg pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 transition-all"
                  style={inputStyle}
                />
                {tmdbLoading && (
                  <div className="absolute right-3 animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" style={{ color: "var(--md-primary)" }} />
                )}
              </div>

              {tmdbResults.length > 0 && (
                <ul className="flex flex-col rounded-xl overflow-hidden border" style={{ borderColor: "var(--md-outline)" }}>
                  {tmdbResults.map((r) => (
                    <li key={r.tmdbId}>
                      <button
                        type="button"
                        onClick={() => pickTmdb(r)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                        style={{ background: "var(--md-surface)", color: "var(--md-on-surface)" }}
                      >
                        {r.thumbnail ? (
                          <img src={r.thumbnail} alt={r.title} className="w-8 h-12 object-cover rounded shrink-0" />
                        ) : (
                          <div className="w-8 h-12 rounded shrink-0 flex items-center justify-center" style={{ background: "var(--md-surface-card)" }}>
                            <ImageOff size={14} style={{ color: "var(--md-on-surface-variant)" }} />
                          </div>
                        )}
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="font-semibold truncate">{r.title}</span>
                          <span className="text-xs flex items-center gap-1.5" style={{ color: "var(--md-on-surface-variant)" }}>
                            {r.type === "series" ? <Tv size={11} /> : <Film size={11} />}
                            {r.type === "series" ? "Série" : "Film"}{r.year ? ` · ${r.year}` : ""}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Divider if TMDB search is shown */}
          {!isEdit && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "var(--md-outline)" }} />
              <span className="text-xs" style={{ color: "var(--md-on-surface-variant)" }}>ou remplir manuellement</span>
              <div className="flex-1 h-px" style={{ background: "var(--md-outline)" }} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Selected poster preview */}
            {selectedPoster && (
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--md-surface)" }}>
                <img src={selectedPoster} alt="Poster" className="w-10 h-14 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "var(--md-on-surface)" }}>{titre}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--md-on-surface-variant)" }}>Sélectionné depuis TMDB</p>
                </div>
                <button type="button" onClick={() => setSelectedPoster(null)} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                  <X size={14} style={{ color: "var(--md-on-surface-variant)" }} />
                </button>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" htmlFor="modal-titre" style={{ color: "var(--md-on-surface-variant)" }}>
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                id="modal-titre"
                type="text"
                required
                placeholder="Ex : Inception"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--md-on-surface-variant)" }}>
                Type
              </span>
              <div className="flex gap-2">
                {(
                  [
                    { value: "movie" as MediaType, label: "Film", icon: <Film size={15} /> },
                    { value: "series" as MediaType, label: "Série", icon: <Tv size={15} /> },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setType(opt.value)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer"
                    style={
                      type === opt.value
                        ? { background: "var(--md-primary)", borderColor: "var(--md-primary)", color: "#fff" }
                        : { background: "var(--md-surface)", borderColor: "var(--md-outline)", color: "var(--md-on-surface)" }
                    }
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" htmlFor="modal-statut" style={{ color: "var(--md-on-surface-variant)" }}>
                Statut
              </label>
              <select
                id="modal-statut"
                value={statut}
                onChange={(e) => setStatut(e.target.value as Status)}
                className={inputClass + " cursor-pointer"}
                style={inputStyle}
              >
                <option value="to-watch">À voir</option>
                <option value="watching">En cours</option>
                <option value="completed">Terminé</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" htmlFor="modal-note" style={{ color: "var(--md-on-surface-variant)" }}>
                Note (0 – 10)
              </label>
              <input
                id="modal-note"
                type="number"
                min={0}
                max={10}
                value={note}
                onChange={(e) => setNote(Number(e.target.value))}
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
                style={{ borderColor: "var(--md-outline)", color: "var(--md-on-surface-variant)" }}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                style={{ background: "var(--md-primary)" }}
              >
                {isEdit ? <><Pencil size={15} />Modifier</> : <><Plus size={16} />Ajouter</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
