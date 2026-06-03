"use client";

import { useState } from "react";
import CineCard from "../components/CineCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import useCineStore from "./hooks/use-cine-store";
import Filters from "@/components/Filters";
import { getVideoTypeLabel, MEDIA_TYPES, MediaType } from "@/types/media-type";
import { getVideoStatusLabel, Status, STATUSES } from "@/types/status";

export default function Home() {
    const items = useCineStore((state) => state.items);
    const [query, setQuery] = useState("");
    const typeFilter = useCineStore((state) => state.typeFilter);
    const setTypeFilter = useCineStore((state) => state.setTypeFilter);
    const statusFilter = useCineStore((state) => state.statusFilter);
    const setStatusFilter = useCineStore((state) => state.setStatusFilter);

    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) &&
            (typeFilter === "all" || item.type === typeFilter) &&
            (statusFilter === "all" || item.status === statusFilter),
    );

    return (
        <div className="">
            <div className="flex justify-end my-4">
                <Button href="/ajouter-film" variant="careful" icon="+" width="full md:w-auto">
                    Ajouter un film
                </Button>
            </div>
            <div className="flex gap-4 flex-col md:flex-row mb-4">
                <SearchBar filterItems={setQuery} />
                <Filters
                    filter={MEDIA_TYPES.map((type) => ({ value: type, label: getVideoTypeLabel(type) }))}
                    setFilter={(value) => setTypeFilter(value as MediaType)}
                    defaultValue={typeFilter}
                />
                <Filters
                    filter={STATUSES.map((status) => ({ value: status, label: getVideoStatusLabel(status) }))}
                    setFilter={(value) => setStatusFilter(value as Status)}
                    defaultValue={statusFilter}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                    return <CineCard key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
}
