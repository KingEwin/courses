import Image from "next/image";
import { CineItem } from "../models/cine-item";
import { getVideoTypeLabel } from "../types/media-type";
import { Calendar, Pencil, RefreshCw } from "lucide-react";
import Button from "./Button";
import Note from "./Note";
import Status from "./Status";

interface CineCardProps {
    item: CineItem;
}

export default function CineCard({ item }: CineCardProps) {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return (
        <div key={item.id} className="bg-gray-900 rounded-2xl shadow-md">
            <div className="relative aspect-2/3 w-full">
                <Image
                    src={item.screen != "" ? item.screen : "/screen/no-provided.png"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-t-2xl"
                    priority
                />
                <Status item={item} />
            </div>
            <div className="p-4">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-md font-bold text-white">{item.title}</h2>
                    <Note note={item.rating} />
                </div>
                <p>
                    <b className="text-sm font-medium text-neutral-500">{getVideoTypeLabel(item.type).toUpperCase()}</b>
                </p>
                <div className="mt-2 mb-2">
                    <p className="flex text-xs font-light text-neutral-500 gap-2">
                        <Calendar size={15} />
                        <b>Créé le {item.createdAt.toLocaleDateString("fr-FR", options)}</b>
                    </p>
                    <p className=" flex text-xs font-light text-neutral-500 gap-2">
                        <RefreshCw size={15} />
                        <b>Mis à jour le {item.updatedAt.toLocaleDateString("fr-FR", options)}</b>
                    </p>
                </div>
                <Button href={`/modifier-film?id=${item.id}`} variant="secondary" width="full">
                    <div className="flex items-center gap-4">
                        <Pencil size={15} />
                        Modifier
                    </div>
                </Button>
            </div>
        </div>
    );
}
