"use client";

import { useSearchParams } from "next/navigation";
import Cineform from "../../components/Cineform";
import useCineStore from "../hooks/use-cine-store";

export default function AddFilm() {
    const searchParams = useSearchParams();
    const cineItemId = searchParams ? searchParams.get("id") : null;

    return (
        <div className="flex justify-center">
            <Cineform cineItem={cineItemId ? useCineStore.getState().getItemById(parseInt(cineItemId)) : undefined} />
        </div>
    );
}
