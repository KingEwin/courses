import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import {
  Trash2,
  Film,
  Tv,
  Star,
  Eye as EyeIcon,
  Clock,
  CheckCircle2,
  Heart,
  ImageOff,
} from "lucide-react";

const STATUS_META: Record<
  Status,
  { label: string; icon: React.ReactNode; color: string }
> = {
  "to-watch": {
    label: "À voir",
    icon: <Clock size={12} />,
    color: "#f59e0b",
  },
  watching: {
    label: "En cours",
    icon: <EyeIcon size={12} />,
    color: "#3b82f6",
  },
  completed: {
    label: "Terminé",
    icon: <CheckCircle2 size={12} />,
    color: "#22c55e",
  },
};

const TYPE_META: Record<string, { label: string; bgGradient: string }> = {
  movie: { label: "Film", bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" },
  series: { label: "Série", bgGradient: "linear-gradient(135deg, #14261f 0%, #065f46 100%)" },
};

interface CineCardProps {
  item: CineItem;
  deleteItem: (id: number) => void;
  updateStatus: (id: number, status: Status) => void;
  onDetails: (item: CineItem) => void;
  toggleFavorite: (id: number) => void;
}

export default function CineCard({
  item,
  deleteItem,
  updateStatus,
  onDetails,
  toggleFavorite,
}: CineCardProps) {
  const statusMeta = STATUS_META[item.status];
  const typeMeta = TYPE_META[item.type] ?? { label: item.type, bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-xl"
      style={{
        background: "var(--md-surface-card)",
        boxShadow: "var(--md-shadow)",
      }}
    >
      {/* Clickable upper area */}
      <div
        className="flex flex-col flex-1 cursor-pointer group"
        onClick={() => onDetails(item)}
      >
        {/* Poster area */}
        <div className="relative h-56 overflow-hidden">
          {item.poster ? (
            <img
              src={item.poster}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: typeMeta.bgGradient }}
            >
              <ImageOff size={32} style={{ color: "rgba(255,255,255,0.2)" }} />
            </div>
          )}

          {/* Status color bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: statusMeta.color }} />

          {/* Favorite button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
            aria-label={item.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <Heart
              size={16}
              style={{ color: item.isFavorite ? "#f43f5e" : "white" }}
              fill={item.isFavorite ? "#f43f5e" : "none"}
            />
          </button>

          {/* Rating badge */}
          {item.rating > 0 && (
            <div
              className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.55)", color: "#fde68a" }}
            >
              <Star size={11} fill="#fde68a" />
              {item.rating}/10
            </div>
          )}

          {/* Type chip */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.55)", color: "white" }}
          >
            {item.type === "series" ? <Tv size={11} /> : <Film size={11} />}
            {typeMeta.label}
          </div>

          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 px-4 pt-3 pb-2">
          <h2
            className="text-sm font-bold leading-tight line-clamp-2"
            style={{ color: "var(--md-on-surface)" }}
          >
            {item.title}
          </h2>
          <span
            className="self-start flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ background: statusMeta.color }}
          >
            {statusMeta.icon}
            {statusMeta.label}
          </span>
          {item.overview && (
            <p
              className="text-xs leading-relaxed line-clamp-2 mt-0.5"
              style={{ color: "var(--md-on-surface-variant)" }}
            >
              {item.overview}
            </p>
          )}
        </div>
      </div>

      {/* Footer — not part of click area */}
      <div
        className="flex items-center gap-1 px-3 py-2.5 border-t"
        style={{ borderColor: "var(--md-outline)" }}
      >
        <select
          value={item.status}
          onChange={(e) => updateStatus(item.id, e.target.value as Status)}
          className="flex-1 rounded-lg px-2 py-1 text-xs border cursor-pointer focus:outline-none focus:ring-2 transition-all"
          style={{
            background: "var(--md-surface)",
            borderColor: "var(--md-outline)",
            color: "var(--md-on-surface)",
          }}
        >
          <option value="to-watch">À voir</option>
          <option value="watching">En cours</option>
          <option value="completed">Terminé</option>
        </select>

        <button
          onClick={() => deleteItem(item.id)}
          aria-label="Supprimer"
          className="ml-1 p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-400 hover:text-red-600 transition-all cursor-pointer shrink-0"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
