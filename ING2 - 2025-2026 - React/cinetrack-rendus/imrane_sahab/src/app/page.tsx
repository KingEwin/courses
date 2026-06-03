"use client";

import { type FormEvent, useState } from "react";
import { Status } from "./types/status";
import { CineItem } from "./models/cine-item";
import { cineItems } from "./data/cine-items";
import CineCard from "./components/CineCard";
import { MediaType } from "./types/media-type";

type TypeFilter = MediaType | "all";
type StatusFilter = Status | "all";

export default function Home() {
  const [items, setItems] = useState<CineItem[]>(cineItems);

  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState<string>("");
  const [newType, setNewType] = useState<MediaType>("movie");
  const [newStatus, setNewStatus] = useState<Status>("to-watch");
  const [newRating, setNewRating] = useState<number>(5);

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = newTitle.trim();
    if (!title) return;

    const now = new Date();
    const rating = Number.isFinite(newRating) ? newRating : 0;

    setItems((prev) => {
      const nextId = Math.max(0, ...prev.map((i) => i.id)) + 1;
      const createdItem: CineItem = {
        id: nextId,
        title,
        type: newType,
        status: newStatus,
        rating,
        createdAt: now,
        updatedAt: now,
      };
      return [createdItem, ...prev];
    });

    setIsAddOpen(false);
    setNewTitle("");
    setNewType("movie");
    setNewStatus("to-watch");
    setNewRating(5);
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((changedItem) => changedItem.id !== id));
  };

  const updateStatus = (id: number, status: Status) => {
    setItems((prev) =>
      prev.map((changedItem) => {
        if (changedItem.id === id) {
          return {
            ...changedItem,
            status,
            updatedAt: new Date(),
          };
        }
        return changedItem;
      }),
    );
  };

  const filteredItems = items.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CineTrack</h1>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            aria-label="Filter by type"
            className="h-10 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          >
            <option value="all">All types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>

          <select
            aria-label="Filter by status"
            className="h-10 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All statuses</option>
            <option value="to-watch">To Watch</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="button"
            className="h-10 px-4 rounded-lg border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            onClick={() => setIsAddOpen((v) => !v)}
          >
            {isAddOpen ? "Close" : "+ Add"}
          </button>
        </div>
      </div>

      {isAddOpen ? (
        <form
          onSubmit={addItem}
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2 className="text-lg font-bold mb-3">Add a movie / series</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div className="flex flex-col gap-1">
              <label htmlFor="new-title" className="text-sm font-semibold">
                Title
              </label>
              <input
                id="new-title"
                className="h-10 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Inception"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="new-type" className="text-sm font-semibold">
                Type
              </label>
              <select
                id="new-type"
                className="h-10 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                value={newType}
                onChange={(e) => setNewType(e.target.value as MediaType)}
              >
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="new-status" className="text-sm font-semibold">
                Status
              </label>
              <select
                id="new-status"
                className="h-10 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Status)}
              >
                <option value="to-watch">To Watch</option>
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="new-rating" className="text-sm font-semibold">
                Rating
              </label>
              <input
                id="new-rating"
                className="h-10 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                type="number"
                min={0}
                max={10}
                step={1}
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              + Add
            </button>
          </div>
        </form>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          return (
            <CineCard
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              updateStatus={updateStatus}
            />
          );
        })}
      </div>
    </div>
  );
}
