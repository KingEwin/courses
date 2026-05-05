"use client";

import { useState } from "react";
import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import { useCineStore } from "@/store/useCineStore";
import CineForm from "./CineForm";

interface CineCardProps {
  item: CineItem;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ letterSpacing: "2px" }}>
      <span style={{ color: "var(--accent, #8B1A1A)" }}>{"★".repeat(rating)}</span>
      <span style={{ color: "var(--neo-dark, #CEC9C1)" }}>{"★".repeat(5 - rating)}</span>
    </span>
  );
}

const TYPE_LABELS: Record<CineItem["type"], string> = {
  movie: "Film",
  series: "Série",
};

const STATUS_LABELS: Record<Status, string> = {
  "to-watch": "À voir",
  watching: "En cours",
  completed: "Terminé",
};

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h${m > 0 ? String(m).padStart(2, "0") : ""}` : `${m}min`;
}

export default function CineCard({ item }: CineCardProps) {
  const { deleteItem } = useCineStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const overviewShort =
    item.overview && item.overview.length > 80
      ? item.overview.slice(0, 80)
      : null;

  return (
    <>
      {isEditing && <CineForm item={item} onClose={() => setIsEditing(false)} />}

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(26,26,26,0.75)" }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg, #F5F0E8)",
              boxShadow: "var(--neo-shadow)",
              borderRadius: "20px",
              color: "var(--ink)",
            }}
            className="w-full max-w-md mx-4 p-7 flex flex-col gap-4"
          >
            <h3
              style={{ fontFamily: "var(--font-noto-serif-jp)" }}
              className="text-lg font-bold"
            >
              {item.title}
            </h3>
            <p style={{ color: "var(--ink-secondary)" }} className="text-sm leading-relaxed">
              {item.overview}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                background: "var(--surface)",
                boxShadow: "var(--neo-inset)",
                color: "var(--ink-secondary)",
                borderRadius: "8px",
                alignSelf: "flex-end",
              }}
              className="text-xs px-4 py-2 cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      <div
        style={{
          background: "var(--surface)",
          boxShadow: "var(--neo-shadow)",
          borderRadius: "16px",
          color: "var(--ink)",
        }}
        className="overflow-hidden flex flex-col"
      >
        {item.posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
            alt={item.title}
            className="w-full h-52 object-cover"
          />
        ) : (
          <div
            style={{ background: "var(--neo-dark)", color: "var(--ink-secondary)" }}
            className="w-full h-52 flex items-center justify-center text-xs tracking-widest uppercase"
          >
            Pas d&apos;affiche
          </div>
        )}

        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex justify-between items-start gap-2">
            <h2
              style={{ fontFamily: "var(--font-noto-serif-jp)" }}
              className="text-base font-bold leading-snug"
            >
              {item.title}
            </h2>
            {item.year && (
              <span style={{ color: "var(--ink-secondary)" }} className="text-xs shrink-0 mt-0.5">
                {item.year}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span
              style={{
                background: "var(--neo-dark)",
                color: "var(--ink-secondary)",
                borderRadius: "4px",
              }}
              className="text-xs px-2 py-0.5 font-medium"
            >
              {TYPE_LABELS[item.type]}
            </span>
            <StarRating rating={item.rating} />
          </div>

          {item.genres && item.genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.genres.map((g) => (
                <span
                  key={g}
                  style={{
                    background: "var(--neo-dark)",
                    color: "var(--ink-secondary)",
                    borderRadius: "4px",
                  }}
                  className="text-xs px-1.5 py-0.5"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          {(item.voteAverage || item.runtime || item.originalLanguage) && (
            <p style={{ color: "var(--ink-secondary)" }} className="text-xs flex gap-2 flex-wrap">
              {item.voteAverage ? (
                <span>TMDB {item.voteAverage.toFixed(1)}/10</span>
              ) : null}
              {item.runtime ? (
                <span>· {formatRuntime(item.runtime)}</span>
              ) : null}
              {item.originalLanguage ? (
                <span>· {item.originalLanguage.toUpperCase()}</span>
              ) : null}
            </p>
          )}

          {item.overview && (
            <p style={{ color: "var(--ink-secondary)" }} className="text-xs leading-relaxed">
              {overviewShort ? (
                <>
                  {overviewShort}{"... "}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ color: "var(--accent)" }}
                    className="cursor-pointer hover:underline"
                  >
                    Voir plus
                  </button>
                </>
              ) : (
                item.overview
              )}
            </p>
          )}

          <div className="flex items-center gap-2">
            <span style={{ color: "var(--ink-secondary)" }} className="text-xs font-semibold">
              Statut
            </span>
            <span
              style={{
                background: "var(--neo-dark)",
                color: "var(--ink)",
                borderRadius: "4px",
              }}
              className="text-xs px-2 py-0.5"
            >
              {STATUS_LABELS[item.status]}
            </span>
          </div>

          <p style={{ color: "var(--ink-secondary)" }} className="text-xs">
            Ajouté le {item.createdAt.toLocaleDateString("fr-FR")}
          </p>

          <div className="flex items-center justify-between mt-auto pt-1">
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: "var(--surface)",
                boxShadow: "var(--neo-inset)",
                color: "var(--ink)",
                borderRadius: "8px",
              }}
              className="text-xs px-3 py-1.5 cursor-pointer font-medium"
            >
              Éditer
            </button>
            <button
              onClick={() => deleteItem(item.id)}
              style={{ color: "var(--accent)" }}
              className="text-xs cursor-pointer hover:underline"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
