"use client";

import { useState } from "react";
import { Status } from "./types/status";
import { CineItem } from "./models/cine-item";
import { cineItems } from "./data/cine-items";
import CineCard from "./components/CineCard";

export default function Home() {
  const [items, setItems] = useState<CineItem[]>(cineItems);

  const deleteItem = (id: number) => {
    setItems(items.filter((changedItem) => changedItem.id !== id));
  };

  const updateStatus = (id: number, status: Status) => {
    setItems(
      items.map((changedItem) => {
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

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">CineTrack</h1>

      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => {
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
