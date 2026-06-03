import { CineItem } from "../models/cine-item";
import { getVideoStatusLabel } from "../types/status";

export default function Status({ item }: { item: CineItem }) {
    const baseClasses = "absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-md";
    const statusClasses: Record<string, string> = {
        "to-watch": "bg-blue-500 text-white",
        watching: "bg-yellow-500 text-black",
        watched: "bg-green-500 text-black",
    };
    const classes = `${baseClasses} ${statusClasses[item.status] || "bg-gray-500 text-white"}`;
    return (
        <div className={classes}>
            <span>{getVideoStatusLabel(item.status)}</span>
        </div>
    );
}
