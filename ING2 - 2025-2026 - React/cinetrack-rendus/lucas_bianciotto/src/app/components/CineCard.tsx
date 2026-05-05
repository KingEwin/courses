import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";

interface CineCardProps {
  item: CineItem;
  deleteItem: (id: number) => void;
  updateStatus: (id: number, status: Status) => void;
  onEdit: (item: CineItem) => void;
}

const STATUS_LABELS: Record<Status, string> = {
  "to-watch": "À regarder",
  watching: "En cours",
  completed: "Terminé",
};

const STATUS_COLORS: Record<Status, string> = {
  "to-watch": "bg-gray-600",
  watching: "bg-yellow-600",
  completed: "bg-green-700",
};

const TYPE_LABELS: Record<string, string> = {
  movie: "Film",
  series: "Série",
};

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < stars ? "text-[#E50914]" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CineCard({ item, deleteItem, updateStatus, onEdit }: CineCardProps) {
  return (
    <div className="group relative bg-[#1f1f1f] rounded-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 hover:z-10 hover:shadow-2xl">
      {/* Poster */}
      <div className="aspect-[2/3] bg-[#2a2a2a] relative">
        {item.posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.posterUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#333]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Badge type */}
      <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-[#E50914] text-white px-1.5 py-0.5 rounded">
        {TYPE_LABELS[item.type] ?? item.type}
      </span>

      {/* Edit button */}
      <button
        onClick={() => onEdit(item)}
        className="absolute top-2 right-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-white/20 text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
        aria-label="Modifier"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828A2 2 0 0110 16.414H8v-2a2 2 0 01.586-1.414z" />
        </svg>
      </button>

      {/* Delete button */}
      <button
        onClick={() => deleteItem(item.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-[#E50914] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
        aria-label="Supprimer"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Info panel */}
      <div className="p-3 flex flex-col gap-2">
        <h2 className="text-sm font-bold text-white leading-tight line-clamp-2">{item.title}</h2>

        <StarRating rating={item.rating} />

        <span
          className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${STATUS_COLORS[item.status]}`}
        >
          {STATUS_LABELS[item.status]}
        </span>

        <select
          value={item.status}
          onChange={(e) => updateStatus(item.id, e.target.value as Status)}
          className="mt-1 bg-[#2a2a2a] border border-[#444] text-gray-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-white cursor-pointer"
        >
          <option value="to-watch">À regarder</option>
          <option value="watching">En cours</option>
          <option value="completed">Terminé</option>
        </select>
      </div>
    </div>
  );
}
