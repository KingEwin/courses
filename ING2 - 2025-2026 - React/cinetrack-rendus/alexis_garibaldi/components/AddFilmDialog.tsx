"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Modal } from "@/components/Modal";
import { useTmdbSearch } from "@/hooks/useTmdbSearch";
import { useFilmsStore } from "@/store/films";
import { createFilm, importFilmFromTmdb } from "@/app/actions/films";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Tab = "tmdb" | "manual";

export function AddFilmDialog({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("tmdb");

  return (
    <Modal open={open} onClose={onClose} title="Ajouter un film">
      <div className="mb-4 flex gap-2 border-b border-zinc-300">
        <TabButton active={tab === "tmdb"} onClick={() => setTab("tmdb")}>
          🔎 Chercher sur TMDB
        </TabButton>
        <TabButton active={tab === "manual"} onClick={() => setTab("manual")}>
          ✏️ Saisie manuelle
        </TabButton>
      </div>
      {tab === "tmdb" ? (
        <TmdbSearchPanel onAdded={onClose} />
      ) : (
        <ManualEntryForm onCreated={onClose} />
      )}
    </Modal>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 text-sm font-bold ${
        active
          ? "border-b-2 border-blue-500 text-blue-700"
          : "text-zinc-600 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
  );
}

function TmdbSearchPanel({ onAdded }: { onAdded: () => void }) {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useTmdbSearch(query);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const upsertFilm = useFilmsStore((s) => s.upsertFilm);
  const films = useFilmsStore((s) => s.films);
  const [, startTransition] = useTransition();

  const alreadyImported = (tmdbId: number) =>
    films.some((f) => f.tmdbId === tmdbId);

  const onPick = (tmdbId: number) => {
    setPendingId(tmdbId);
    startTransition(async () => {
      try {
        const film = await importFilmFromTmdb(tmdbId);
        upsertFilm(film);
        onAdded();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Import impossible";
        alert(msg);
      } finally {
        setPendingId(null);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Inception, Le Voyage de Chihiro…"
        className="ds-input"
      />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="max-h-[50vh] overflow-y-auto">
        {loading && (
          <p className="text-sm text-zinc-500">Recherche en cours…</p>
        )}
        {!loading && query.trim().length >= 2 && results.length === 0 && (
          <p className="text-sm text-zinc-500">Aucun résultat.</p>
        )}
        <ul className="flex flex-col gap-2">
          {results.map((r) => {
            const imported = alreadyImported(r.tmdbId);
            const isPending = pendingId === r.tmdbId;
            return (
              <li
                key={r.tmdbId}
                className="ds-card flex items-stretch gap-3 p-2"
              >
                <div className="relative h-24 w-16 shrink-0 bg-zinc-200">
                  {r.posterUrl && (
                    <Image
                      src={r.posterUrl}
                      alt={`Affiche : ${r.title}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-bold leading-tight">{r.title}</p>
                  <p className="text-xs text-zinc-600">{r.year ?? "—"}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                    {r.overview ?? "Pas de synopsis."}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={imported || isPending}
                  onClick={() => onPick(r.tmdbId)}
                  className="ds-button ds-button-primary self-center px-3 py-1 text-xs disabled:opacity-50"
                >
                  {imported ? "Déjà ajouté" : isPending ? "Import…" : "Ajouter"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function ManualEntryForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [error, setError] = useState<string | null>(null);
  const upsertFilm = useFilmsStore((s) => s.upsertFilm);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    const yearNum = year.trim() ? Number.parseInt(year, 10) : null;
    if (yearNum !== null && (Number.isNaN(yearNum) || yearNum < 1888)) {
      setError("Année invalide.");
      return;
    }
    startTransition(async () => {
      try {
        const film = await createFilm({
          title: title.trim(),
          year: yearNum,
          director: director.trim() || null,
        });
        upsertFilm(film);
        setTitle("");
        setYear("");
        setDirector("");
        onCreated();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Création impossible";
        setError(msg);
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <Field label="Titre *">
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ds-input"
        />
      </Field>
      <Field label="Année">
        <input
          type="number"
          inputMode="numeric"
          min={1888}
          max={2100}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="ds-input"
        />
      </Field>
      <Field label="Réalisateur">
        <input
          type="text"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          className="ds-input"
        />
      </Field>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="ds-button ds-button-primary px-4 py-2 disabled:opacity-50"
        >
          {isPending ? "Création…" : "Ajouter le film"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-zinc-700">{label}</span>
      {children}
    </label>
  );
}
