"use client";

import { useState, useEffect, useRef } from "react";
import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import {
  X,
  Film,
  Tv,
  Star,
  CalendarDays,
  RefreshCw,
  Clock,
  Eye,
  CheckCircle2,
  Heart,
  ImageOff,
  Check,
} from "lucide-react";

const STATUS_META: Record<Status, { label: string; icon: React.ReactNode; color: string }> = {
  "to-watch": { label: "À voir", icon: <Clock size={13} />, color: "#f59e0b" },
  watching:   { label: "En cours", icon: <Eye size={13} />, color: "#3b82f6" },
  completed:  { label: "Terminé", icon: <CheckCircle2 size={13} />, color: "#22c55e" },
};

interface DetailsModalProps {
  item: CineItem;
  onClose: () => void;
  toggleFavorite: (id: number) => void;
  onSaveRating: (id: number, rating: number) => void;
}

export default function DetailsModal({ item, onClose, toggleFavorite, onSaveRating }: DetailsModalProps) {
  const statusMeta = STATUS_META[item.status];
  const [localRating, setLocalRating] = useState(item.rating);
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep localRating in sync when item updates externally
  useEffect(() => {
    setLocalRating(item.rating);
  }, [item.rating]);

  const handleRatingChange = (value: number) => {
    setLocalRating(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSaveRating(item.id, value);
      setSaved(true);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSaved(false), 1500);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ background: "var(--md-surface-card)", maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Status bar at top */}
        <div className="h-1.5 w-full shrink-0" style={{ background: statusMeta.color }} />

        <div className="flex flex-col sm:flex-row overflow-hidden flex-1 min-h-0">
          {/* Poster — fixed 2:3 column, object-contain so nothing is cropped */}
          <div
            className="sm:w-56 shrink-0 flex items-center justify-center"
            style={{
              background:
                item.type === "series"
                  ? "linear-gradient(135deg, #0f1e17 0%, #0a3324 100%)"
                  : "linear-gradient(135deg, #13103a 0%, #1e1b4b 100%)",
              minHeight: "14rem",
            }}
          >
            {item.poster ? (
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-full object-contain"
                style={{ maxHeight: "420px" }}
              />
            ) : (
              <ImageOff size={40} style={{ color: "rgba(255,255,255,0.2)" }} />
            )}
          </div>

          {/* Details panel */}
          <div className="flex flex-col flex-1 overflow-y-auto min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-3">
              <h2
                className="text-xl font-bold leading-tight flex-1"
                style={{ color: "var(--md-on-surface)" }}
              >
                {item.title}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0"
                aria-label="Fermer"
              >
                <X size={20} style={{ color: "var(--md-on-surface-variant)" }} />
              </button>
            </div>

            {/* Chips */}
            <div className="flex items-center gap-2 flex-wrap px-6 pb-4">
              {/* Type */}
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                style={{ background: "var(--md-primary)" }}
              >
                {item.type === "series" ? <Tv size={12} /> : <Film size={12} />}
                {item.type === "series" ? "Série" : "Film"}
              </span>

              {/* Status */}
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                style={{ background: statusMeta.color }}
              >
                {statusMeta.icon}
                {statusMeta.label}
              </span>

              {/* Favorite toggle */}
              <button
                onClick={() => toggleFavorite(item.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer"
                style={{
                  background: item.isFavorite ? "#fce7f3" : "var(--md-surface)",
                  color: item.isFavorite ? "#be185d" : "var(--md-on-surface-variant)",
                  border: "1px solid",
                  borderColor: item.isFavorite ? "#fbcfe8" : "var(--md-outline)",
                }}
              >
                <Heart size={12} fill={item.isFavorite ? "#be185d" : "none"} />
                {item.isFavorite ? "Favori" : "Ajouter aux favoris"}
              </button>
            </div>

            <div className="mx-6 h-px shrink-0" style={{ background: "var(--md-outline)" }} />

            {/* Rating editor */}
            <div className="px-6 py-4">
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--md-on-surface-variant)" }}
              >
                Ma note
              </span>
              <div className="flex items-center gap-3 mt-2">
                <Star size={16} className="text-yellow-400 fill-yellow-400 shrink-0" />
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={localRating}
                  onChange={(e) => handleRatingChange(Number(e.target.value))}
                  className="flex-1 accent-yellow-400 cursor-pointer"
                />
                <span
                  className="w-12 text-center text-sm font-bold tabular-nums"
                  style={{ color: "var(--md-on-surface)" }}
                >
                  {localRating}/10
                </span>
                {saved && (
                  <span
                    className="flex items-center gap-1 text-xs font-semibold shrink-0"
                    style={{ color: "#22c55e" }}
                  >
                    <Check size={12} />Enregistré
                  </span>
                )}
              </div>
            </div>

            <div className="mx-6 h-px shrink-0" style={{ background: "var(--md-outline)" }} />

            {/* Overview */}
            <div className="px-6 py-4 flex-1">
              {item.overview ? (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--md-on-surface-variant)" }}
                >
                  {item.overview}
                </p>
              ) : (
                <p
                  className="text-sm italic"
                  style={{ color: "var(--md-on-surface-variant)", opacity: 0.4 }}
                >
                  Aucune description disponible.
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="px-6 pb-4 flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--md-on-surface-variant)" }}>
                <CalendarDays size={12} />
                Ajouté le {item.createdAt.toLocaleDateString("fr-FR")}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--md-on-surface-variant)" }}>
                <RefreshCw size={12} />
                Mis à jour le {item.updatedAt.toLocaleDateString("fr-FR")}
              </span>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-end px-6 py-3 border-t shrink-0"
              style={{ borderColor: "var(--md-outline)" }}
            >
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
                style={{ borderColor: "var(--md-outline)", color: "var(--md-on-surface-variant)" }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
