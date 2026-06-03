import { Star } from "lucide-react";

interface NoteProps {
    note: number;
}

export default function Note({ note }: NoteProps) {
    return (
        <div className="flex bg-yellow-400 rounded-xl shadow-md p-1 opacity-40">
            <Star />
            <span className="ml-2 text-lg font-bold">{note}</span>
        </div>
    );
}
