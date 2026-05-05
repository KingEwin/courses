"use client";

import { useState } from "react";
import { useCineStore } from "@/store/useCineStore";
import { CineItem } from "../models/cine-item";
import { MediaType } from "../types/media-type";
import { Status } from "../types/status";
import { useTMDB, fetchMovieDetails, TMDBMovie } from "@/hooks/useTMDB";

interface CineFormProps {
  item?: CineItem;
  onClose: () => void;
}

const fieldStyle: React.CSSProperties = {
  background: "var(--surface)",
  boxShadow: "var(--neo-inset)",
  border: "none",
  outline: "none",
  color: "var(--ink)",
  borderRadius: "8px",
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
};

export default function CineForm({ item, onClose }: CineFormProps) {
  const { addItem, updateItem } = useCineStore();
  const [title, setTitle] = useState(item?.title ?? "");
  const [type, setType] = useState<MediaType>(item?.type ?? "movie");
  const [status, setStatus] = useState<Status>(item?.status ?? "to-watch");
  const [rating, setRating] = useState(item?.rating ?? 5);
  const [posterPath, setPosterPath] = useState(item?.posterPath ?? "");
  const [year, setYear] = useState(item?.year ?? "");
  const [overview, setOverview] = useState(item?.overview ?? "");
  const [voteAverage, setVoteAverage] = useState(item?.voteAverage ?? 0);
  const [originalLanguage, setOriginalLanguage] = useState(item?.originalLanguage ?? "");
  const [runtime, setRuntime] = useState<number | undefined>(item?.runtime);
  const [genres, setGenres] = useState<string[]>(item?.genres ?? []);

  const [tmdbQuery, setTmdbQuery] = useState("");
  const { results: tmdbResults, loading: tmdbLoading } = useTMDB(tmdbQuery);

  const isEdit = item !== undefined;

  const selectMovie = async (movie: TMDBMovie) => {
    setTitle(movie.title);
    setYear(movie.release_date?.slice(0, 4) ?? "");
    setPosterPath(movie.poster_path ?? "");
    setOverview(movie.overview ?? "");
    setVoteAverage(movie.vote_average ?? 0);
    setOriginalLanguage(movie.original_language ?? "");
    setTmdbQuery("");
    const details = await fetchMovieDetails(movie.id);
    if (details) {
      setRuntime(details.runtime ?? undefined);
      setGenres(details.genres.map((g) => g.name));
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (isEdit) {
      updateItem(item.id, { title, type, status, rating, posterPath, year, overview, voteAverage, originalLanguage, runtime, genres });
    } else {
      addItem({ title, type, status, rating, posterPath, year, overview, voteAverage, originalLanguage, runtime, genres });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(26,26,26,0.75)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          boxShadow: "var(--neo-shadow)",
          borderRadius: "20px",
          color: "var(--ink)",
        }}
        className="w-full max-w-md mx-4 p-7 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
      >
        <h2
          style={{ fontFamily: "var(--font-noto-serif-jp)" }}
          className="text-xl font-bold"
        >
          {isEdit ? "Modifier" : "Ajouter un titre"}
        </h2>

        {!isEdit && (
          <div className="relative">
            <label style={{ color: "var(--ink-secondary)" }} className="text-xs font-semibold mb-1 block">
              検索 / Rechercher sur TMDB
            </label>
            <input
              type="text"
              value={tmdbQuery}
              onChange={(e) => setTmdbQuery(e.target.value)}
              placeholder="Tapez un titre de film..."
              style={{ ...fieldStyle }}
            />
            {tmdbLoading && (
              <p style={{ color: "var(--ink-secondary)" }} className="text-xs mt-1">
                Chargement...
              </p>
            )}
            {tmdbResults.length > 0 && (
              <ul
                style={{
                  background: "var(--surface)",
                  boxShadow: "var(--neo-shadow)",
                  borderRadius: "12px",
                  position: "absolute",
                  zIndex: 10,
                  width: "100%",
                  marginTop: "4px",
                  overflow: "hidden",
                }}
              >
                {tmdbResults.map((movie, i) => (
                  <li
                    key={movie.id}
                    onClick={() => selectMovie(movie)}
                    style={{
                      borderBottom: i < tmdbResults.length - 1 ? "1px solid var(--neo-dark)" : "none",
                    }}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt=""
                        className="w-8 h-12 object-cover rounded"
                      />
                    ) : (
                      <div style={{ background: "var(--neo-dark)" }} className="w-8 h-12 rounded shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{movie.title}</p>
                      <p style={{ color: "var(--ink-secondary)" }} className="text-xs">
                        {movie.release_date?.slice(0, 4)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label style={{ color: "var(--ink-secondary)" }} className="text-xs font-semibold mb-1 block">
              Titre
            </label>
            <input
              style={{ ...fieldStyle }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ color: "var(--ink-secondary)" }} className="text-xs font-semibold mb-1 block">
              Type
            </label>
            <select
              style={{ ...fieldStyle, cursor: "pointer" }}
              value={type}
              onChange={(e) => setType(e.target.value as MediaType)}
            >
              <option value="movie">Film</option>
              <option value="series">Série</option>
            </select>
          </div>

          <div>
            <label style={{ color: "var(--ink-secondary)" }} className="text-xs font-semibold mb-1 block">
              Statut
            </label>
            <select
              style={{ ...fieldStyle, cursor: "pointer" }}
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value="to-watch">À voir</option>
              <option value="watching">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>

          <div>
            <label style={{ color: "var(--ink-secondary)" }} className="text-xs font-semibold mb-2 block">
              Note
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    color: star <= rating ? "var(--accent, #8B1A1A)" : "var(--neo-dark, #CEC9C1)",
                    fontSize: "28px",
                    lineHeight: 1,
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                  className="cursor-pointer hover:scale-110 transition-transform"
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              style={{
                background: "var(--ink)",
                color: "var(--neo-light)",
                borderRadius: "8px",
                flex: 1,
              }}
              className="py-2.5 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              {isEdit ? "Enregistrer" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "var(--surface)",
                boxShadow: "var(--neo-inset)",
                color: "var(--ink-secondary)",
                borderRadius: "8px",
                flex: 1,
              }}
              className="py-2.5 text-sm cursor-pointer hover:opacity-90 transition-opacity"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
