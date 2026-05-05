import { useState } from "react";
import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import { useCineStore } from "../hooks/use-cine-store";

interface CineCardProps {
  item: CineItem;
}

const statusLabel: Record<Status, string> = {
  "to-watch": "À regarder",
  watching: "En cours",
  completed: "Terminé",
};

const statusColor: Record<Status, string> = {
  "to-watch": "bg-yellow-500/15 text-yellow-400",
  watching: "bg-blue-500/15 text-blue-400",
  completed: "bg-emerald-500/15 text-emerald-400",
};

export default function CineCard({ item }: CineCardProps) {
  const { deleteItem, updateStatus } = useCineStore();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        key={item.id}
        onClick={() => setShowDetails(true)}
        className="bg-surface border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-200 flex flex-col cursor-pointer hover:scale-[1.02]"
      >
        {item.imageUrl && (
          <div className="w-full h-64 mb-4 rounded-lg overflow-hidden border border-border/50 relative">
            <img
              src={item.imageUrl}
              alt={`Affiche de ${item.title}`}
              className="w-full h-full object-cover object-center"
            />
            {item.year && (
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
                {item.year}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-row justify-between items-start gap-2">
          <div>
            <h2 className="text-lg font-semibold leading-tight line-clamp-1" title={item.title}>{item.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted">
                {item.type === "movie" ? "🎬 Film" : "📺 Série"}
              </span>
            </div>
          </div>
          <button
            className="text-sm px-3 py-1 rounded-lg text-danger border border-danger/30 cursor-pointer hover:bg-danger hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(item.id);
            }}
          >
            Supprimer
          </button>
        </div>

        {item.genre && (
          <div className="mt-2 text-xs text-muted/80 line-clamp-1" title={item.genre}>
            {item.genre}
          </div>
        )}

        {item.plot && (
          <p className="mt-3 text-sm text-foreground/80 line-clamp-3 leading-relaxed flex-1">
            {item.plot}
          </p>
        )}

        <div className="mt-auto pt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[item.status]}`}
            >
              {statusLabel[item.status]}
            </span>
            <div className="flex items-center gap-1 text-sm">
              <span className="font-semibold text-accent">{item.rating}</span>
              <span className="text-muted">/10</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 mt-4 pt-4 border-t border-border items-center">
          <label htmlFor={`status-${item.id}`} className="text-xs text-muted">
            Statut
          </label>
          <select
            id={`status-${item.id}`}
            value={item.status}
            onClick={(e) => e.stopPropagation()}
            className="text-sm px-2 py-1 rounded-lg bg-background border border-border text-foreground cursor-pointer flex-1"
            onChange={(e) => updateStatus(item.id, e.target.value as Status)}
          >
            <option value="to-watch">À regarder</option>
            <option value="watching">En cours</option>
            <option value="completed">Terminé</option>
          </select>
        </div>
      </div>

      {showDetails && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <div 
            className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {item.imageUrl && (
              <div className="md:w-1/3 bg-black flex-shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover object-center max-h-[40vh] md:max-h-none"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-1">{item.title} {item.year ? <span className="text-xl text-muted font-normal">({item.year})</span> : null}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span>{item.type === "movie" ? "🎬 Film" : "📺 Série"}</span>
                    {item.runtime && <span>⏳ {item.runtime}</span>}
                    {item.genre && <span>🏷️ {item.genre}</span>}
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="p-2 rounded-full hover:bg-surface-hover text-muted hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted">Votre note:</span>
                  <div className="bg-accent/10 px-3 py-1 rounded-lg">
                    <span className="font-bold text-accent text-lg">{item.rating}</span><span className="text-accent/60">/10</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted">Statut:</span>
                  <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${statusColor[item.status]}`}>
                    {statusLabel[item.status]}
                  </span>
                </div>
              </div>

              {item.plot && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
                  <p className="text-foreground/80 leading-relaxed">{item.plot}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {item.director && item.director !== "N/A" && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted mb-1">Réalisateur</h3>
                    <p className="text-foreground">{item.director}</p>
                  </div>
                )}
                {item.actors && item.actors !== "N/A" && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted mb-1">Casting</h3>
                    <p className="text-foreground">{item.actors}</p>
                  </div>
                )}
              </div>

              <div className="text-xs text-muted/60 mt-8 flex justify-between items-center">
                <span>Ajouté le {item.createdAt.toLocaleDateString()}</span>
                <button
                  className="px-4 py-2 rounded-lg text-danger border border-danger/30 hover:bg-danger hover:text-white transition-colors"
                  onClick={() => {
                    deleteItem(item.id);
                    setShowDetails(false);
                  }}
                >
                  Supprimer l'œuvre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
