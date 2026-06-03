"use client";

import { useState } from "react";
import { CineItem } from "../models/cine-item";
import { getVideoTypeLabel, MEDIA_TYPES, MediaType } from "../types/media-type";
import { getVideoStatusLabel, Status, STATUSES } from "../types/status";
import { useRouter } from "next/navigation";
import useCineStore from "../app/hooks/use-cine-store";
import Button from "./Button";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface CineformProps {
    cineItem?: CineItem;
}

export default function Cineform({ cineItem }: Readonly<CineformProps>) {
    const [newRating, setNewRating] = useState(cineItem?.rating ?? 5);
    const [error, setError] = useState<string | null>(null);
    const addItem = useCineStore((state) => state.addItem);
    const updateItem = useCineStore((state) => state.updateItem);
    const deleteItem = useCineStore((state) => state.deleteItem);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const changeRating = (newValue: number) => {
        setNewRating(newValue);
    };

    const handleSubmitAdd = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("title") || !formData.get("type") || !formData.get("status")) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        setError(null);
        const newItem = {
            id: Date.now(),
            title: formData.get("title") as string,
            type: formData.get("type") as MediaType,
            status: formData.get("status") as Status,
            rating: newRating,
            screen: formData.get("screen") as string,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        addItem(newItem);
        console.log("Item ajouté :", newItem);
        router.push("/");
    };

    const handleSubmitEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("title") || !formData.get("type") || !formData.get("status")) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        setError(null);
        const updatedItem = {
            ...cineItem,
            title: formData.get("title") as string,
            type: formData.get("type") as MediaType,
            status: formData.get("status") as Status,
            rating: newRating,
            screen: formData.get("screen") as string,
            updatedAt: new Date(),
        } as CineItem;
        updateItem(updatedItem);
        router.push("/");
    };

    const handleDeleteItem = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (cineItem) {
            deleteItem(cineItem.id);
            setShowModal(false);
            router.push("/"); // si tu veux rediriger après suppression
        }
    };
    return (
        <div className="bg-gray-900 p-4 rounded-md shadow-md flex-col w-full md:w-1/2 xl:w-1/3 mt-4 border border-gray-700">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg text-white font-bold">{cineItem ? "Modifier le film" : "Nouveau film"}</h2>
            </div>
            <form
                className="flex flex-col text-white mt-4 gap-4"
                onSubmit={cineItem ? handleSubmitEdit : handleSubmitAdd}
            >
                <label className="font-semibold" htmlFor="title">
                    Titre *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                    defaultValue={cineItem?.title ?? ""}
                    required
                />
                <div className="flex w-full gap-4">
                    <div className="flex flex-col w-1/2 gap-2">
                        <label className="font-semibold" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            defaultValue={cineItem?.type ?? "movie"}
                            className="bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                        >
                            {MEDIA_TYPES.map(
                                (type) =>
                                    type != "all" && (
                                        <option key={type} value={type}>
                                            {getVideoTypeLabel(type)}
                                        </option>
                                    ),
                            )}
                        </select>
                    </div>
                    <div className="flex flex-col w-1/2 gap-2">
                        <label className="font-semibold" htmlFor="status">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={cineItem?.status ?? "to-watch"}
                            className="bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                        >
                            {STATUSES.map(
                                (status) =>
                                    status !== "all" && (
                                        <option key={status} value={status}>
                                            {getVideoStatusLabel(status)}
                                        </option>
                                    ),
                            )}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                    <label className="font-semibold" htmlFor="rating">
                        Note ({newRating}/10)
                    </label>
                    <input
                        type="range"
                        id="rating"
                        name="rating"
                        min="0"
                        max="10"
                        step="1"
                        value={newRating}
                        onChange={(e) => changeRating(Number(e.target.value))}
                        className="bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="screen">
                        Image de couverture (URL)
                    </label>
                    <input
                        type="url"
                        id="screen"
                        name="screen"
                        className="bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                        defaultValue={cineItem?.screen ?? ""}
                    />
                </div>
                {error && <p className="text-red-500 text-sm w-full text-center">{error}</p>}
                {cineItem ? (
                    <div className="flex justify-between">
                        <Button onclick={handleDeleteItem} variant="danger">
                            Supprimer
                        </Button>
                        <Button type="submit" variant="careful">
                            Modifier
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button type="submit" variant="primary" width="full">
                            Ajouter
                        </Button>
                    </div>
                )}
            </form>
            <DeleteConfirmModal
                isOpen={showModal}
                itemName={cineItem?.title ?? "cet élément"}
                onConfirm={confirmDelete}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
}
