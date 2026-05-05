import { useState, useEffect } from "react";
import { MediaType } from "../types/media-type";
import { Status } from "../types/status";

interface CineFormProps {
  onSubmit: (data: {
    title: string;
    type: MediaType;
    status: Status;
    rating: number;
    imageUrl?: string;
    year?: string;
    genre?: string;
    director?: string;
    plot?: string;
    actors?: string;
    runtime?: string;
  }) => void;
  onCancel: () => void;
}

interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function CineForm({ onSubmit, onCancel }: CineFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<MediaType>("movie");
  const [status, setStatus] = useState<Status>("to-watch");
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!title.trim() || title.length < 3) {
        setSearchResults([]);
        return;
      }
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      if (!apiKey || apiKey === "YOUR_OMDB_API_KEY_HERE") return;

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`
        );
        const data = await response.json();
        
        if (data.Response === "True" && data.Search) {
          setSearchResults(data.Search.slice(0, 5));
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Erreur de recherche:", error);
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 400);
    return () => clearTimeout(debounceTimer);
  }, [title]);

  const fetchMovieData = async (searchTitle: string, searchType: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    if (!apiKey || apiKey === "YOUR_OMDB_API_KEY_HERE") return null;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchTitle)}&type=${searchType === "series" ? "series" : "movie"}&plot=full`
      );
      const data = await response.json();
      
      if (data.Response === "True") {
        return {
          title: data.Title || searchTitle,
          imageUrl: data.Poster !== "N/A" ? data.Poster : undefined,
          year: data.Year !== "N/A" ? data.Year : undefined,
          genre: data.Genre !== "N/A" ? data.Genre : undefined,
          director: data.Director !== "N/A" ? data.Director : undefined,
          plot: data.Plot !== "N/A" ? data.Plot : undefined,
          actors: data.Actors !== "N/A" ? data.Actors : undefined,
          runtime: data.Runtime !== "N/A" ? data.Runtime : undefined,
        };
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    const apiData = await fetchMovieData(title.trim(), type);
    
    onSubmit({
      title: apiData?.title || title.trim(),
      type,
      status,
      rating,
      imageUrl: apiData?.imageUrl,
      year: apiData?.year,
      genre: apiData?.genre,
      director: apiData?.director,
      plot: apiData?.plot,
      actors: apiData?.actors,
      runtime: apiData?.runtime,
    });
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-5">Ajouter un film</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 relative">
            <label htmlFor="title" className="text-xs font-medium text-muted">
              Titre
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted"
              placeholder="Titre du film..."
              required
              autoComplete="off"
            />
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.imdbID}
                    type="button"
                    onClick={() => {
                      setTitle(result.Title);
                      setType(result.Type === "series" ? "series" : "movie");
                      setShowResults(false);
                    }}
                    className="w-fulltext-left px-3 py-2 hover:bg-surface-hover transition-colors flex items-center justify-start gap-3 border-b border-border/50 last:border-0"
                  >
                    {result.Poster && result.Poster !== "N/A" ? (
                      <img src={result.Poster} alt="" className="w-8 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-8 h-12 bg-background rounded"></div>
                    )}
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium text-foreground">{result.Title}</span>
                      <span className="text-xs text-muted">{result.Year} • {result.Type === "series" ? "Série" : "Film"}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="type" className="text-xs font-medium text-muted">
              Type (automatique)
            </label>
            <select
              id="type"
              value={type}
              disabled
              className="px-3 py-2 rounded-lg bg-background/50 border border-border text-muted cursor-not-allowed"
            >
              <option value="movie">Film</option>
              <option value="series">Série</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="formStatus"
              className="text-xs font-medium text-muted"
            >
              Statut
            </label>
            <select
              id="formStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="px-3 py-2 rounded-lg bg-background border border-border text-foreground cursor-pointer"
            >
              <option value="to-watch">À regarder</option>
              <option value="watching">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted">
              Note ({rating}/10)
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={(e) => {
                    const buttons = e.currentTarget.parentElement?.querySelectorAll('button');
                    buttons?.forEach((btn, idx) => {
                      if (idx < star) {
                        btn.style.color = '#eab308'; // yellow-500
                      } else {
                        btn.style.color = '#3f3f46'; // gray-700
                      }
                    });
                  }}
                  onMouseLeave={(e) => {
                    const buttons = e.currentTarget.parentElement?.querySelectorAll('button');
                    buttons?.forEach((btn, idx) => {
                      if (idx < rating) {
                        btn.style.color = '#eab308';
                      } else {
                        btn.style.color = '#3f3f46';
                      }
                    });
                  }}
                  className="text-2xl transition-colors cursor-pointer focus:outline-none"
                  style={{ color: star <= rating ? '#eab308' : '#3f3f46' }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-3 justify-end mt-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-border text-muted cursor-pointer hover:bg-surface-hover hover:text-foreground transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-lg bg-accent text-white font-medium cursor-pointer hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {isLoading ? "Recherche..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
