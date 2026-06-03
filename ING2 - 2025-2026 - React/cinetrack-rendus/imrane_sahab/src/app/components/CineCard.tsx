import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";

interface CineCardProps {
  item: CineItem;
  deleteItem: (id: number) => void;
  updateStatus: (id: number, status: Status) => void;
}

export default function CineCard({
  item,
  deleteItem,
  updateStatus,
}: CineCardProps) {
  const statusSelectId = `status-${item.id}`;

  return (
    <div
      key={item.id}
      className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-row justify-between items-start gap-3">
        <h2 className="text-lg font-bold leading-snug">{item.title}</h2>
        <button
          className="h-9 px-3 rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
          onClick={() => deleteItem(item.id)}
        >
          Delete
        </button>
      </div>

      <div className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
        <p>
          Type: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.type}</span>
        </p>
        <p>
          Status: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.status}</span>
        </p>
        <p>
          Rating: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.rating}</span>
        </p>
        <p>
          Created: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.createdAt.toLocaleDateString()}</span>
        </p>
        <p>
          Updated: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.updatedAt.toLocaleDateString()}</span>
        </p>
      </div>

      <div className="flex flex-row gap-2 mt-8 items-center">
        <label htmlFor={statusSelectId} className="text-sm font-semibold">
          Status
        </label>
        <select
          id={statusSelectId}
          className="h-9 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          value={item.status}
          onChange={(e) => updateStatus(item.id, e.target.value as Status)}
        >
          <option value="to-watch">To Watch</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
