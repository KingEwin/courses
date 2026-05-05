"use client";

import { Heart, Search, X } from "lucide-react";
import { MediaType } from "../types/media-type";
import { Status } from "../types/status";

export interface Filters {
  name: string;
  type: MediaType | "all";
  status: Status | "all";
  minRating: number | "";
  maxRating: number | "";
  favoritesOnly: boolean;
}

export const DEFAULT_FILTERS: Filters = {
  name: "",
  type: "all",
  status: "all",
  minRating: "",
  maxRating: "",
  favoritesOnly: false,
};

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const TYPE_OPTIONS: { value: Filters["type"]; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "movie", label: "Film" },
  { value: "series", label: "Série" },
];

const STATUS_OPTIONS: { value: Filters["status"]; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "to-watch", label: "À voir" },
  { value: "watching", label: "En cours" },
  { value: "completed", label: "Terminé" },
];

const isActive = (filters: Filters) =>
  filters.name !== "" ||
  filters.type !== "all" ||
  filters.status !== "all" ||
  filters.minRating !== "" ||
  filters.maxRating !== "" ||
  filters.favoritesOnly;

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const selectClass =
    "rounded-lg px-3 py-2 text-sm border cursor-pointer focus:outline-none focus:ring-2 transition-all";
  const selectStyle = {
    background: "var(--md-surface-card)",
    borderColor: "var(--md-outline)",
    color: "var(--md-on-surface)",
  };

  return (
    <div
      className="rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-end shadow-sm"
      style={{
        background: "var(--md-surface-card)",
        boxShadow: "var(--md-shadow)",
      }}
    >
      {/* Name search */}
      <div className="flex flex-col gap-1 flex-1 min-w-48">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          htmlFor="filter-name"
          style={{ color: "var(--md-on-surface-variant)" }}
        >
          Rechercher
        </label>
        <div className="relative flex items-center">
          <Search
            size={15}
            className="absolute left-3 pointer-events-none"
            style={{ color: "var(--md-on-surface-variant)" }}
          />
          <input
            id="filter-name"
            type="text"
            placeholder="Titre..."
            value={filters.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-lg pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 transition-all"
            style={selectStyle}
          />
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          htmlFor="filter-type"
          style={{ color: "var(--md-on-surface-variant)" }}
        >
          Type
        </label>
        <select
          id="filter-type"
          value={filters.type}
          onChange={(e) => set("type", e.target.value as Filters["type"])}
          className={selectClass}
          style={selectStyle}
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          htmlFor="filter-status"
          style={{ color: "var(--md-on-surface-variant)" }}
        >
          Statut
        </label>
        <select
          id="filter-status"
          value={filters.status}
          onChange={(e) => set("status", e.target.value as Filters["status"])}
          className={selectClass}
          style={selectStyle}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grade range */}
      <div className="flex flex-col gap-1">
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--md-on-surface-variant)" }}
        >
          Note (min – max)
        </span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={10}
            placeholder="0"
            value={filters.minRating}
            onChange={(e) =>
              set("minRating", e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-16 rounded-lg px-2 py-2 text-sm border text-center focus:outline-none focus:ring-2 transition-all"
            style={selectStyle}
          />
          <span style={{ color: "var(--md-on-surface-variant)" }} className="text-sm">–</span>
          <input
            type="number"
            min={0}
            max={10}
            placeholder="10"
            value={filters.maxRating}
            onChange={(e) =>
              set("maxRating", e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-16 rounded-lg px-2 py-2 text-sm border text-center focus:outline-none focus:ring-2 transition-all"
            style={selectStyle}
          />
        </div>
      </div>

      {/* Clear button — only shown when filters are active */}
      {isActive(filters) && (
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 self-end"
          style={{
            borderColor: "var(--md-outline)",
            color: "#ef4444",
          }}
        >
          <X size={15} />
          Effacer
        </button>
      )}

      {/* Favorites toggle */}
      <button
        onClick={() => set("favoritesOnly", !filters.favoritesOnly)}
        aria-pressed={filters.favoritesOnly}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer self-end"
        style={{
          background: filters.favoritesOnly ? "#ec4899" : "var(--md-surface-card)",
          borderColor: filters.favoritesOnly ? "#ec4899" : "var(--md-outline)",
          color: filters.favoritesOnly ? "#fff" : "var(--md-on-surface)",
        }}
      >
        <Heart size={15} fill={filters.favoritesOnly ? "#fff" : "none"} />
        Favoris
      </button>
    </div>
  );
}
