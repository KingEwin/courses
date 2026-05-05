"use client";

import React, { useState } from "react"; 
import { Show } from "@/types/show";

type Props = {
  show: Show;
  onDelete: (id: number) => void;
  onEdit: (updated: Show) => void;
};

export default function ShowCard({ show, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState<number>(show.rating);
  const [liked, setLiked] = useState(false); // cœur toggle

  const handleSave = () => {
    onEdit({ ...show, rating });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-64 overflow-hidden relative">
      <img
        src={show.image}
        alt={show.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-3">
        <h2 className="font-bold text-lg">{show.title}</h2>
        <p className="text-sm text-gray-500">{show.releaseDate}</p>

        {isEditing ? (
          <div className="mt-2 flex flex-col gap-2">
            <input
              type="number"
              value={rating}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRating(Number(e.target.value))
              }
              className="p-1 rounded border border-gray-300"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-1 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mt-2">
              <p>⭐ {show.rating}/10</p>
              {/* cœur toggle */}
              <button
                onClick={() => setLiked(!liked)}
                className="text-2xl transition-colors"
                style={{ color: liked ? "red" : "gray" }}
                aria-label={liked ? "Unlike" : "Like"}
              >
                {liked ? "❤️" : "🤍"}
              </button>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-500 py-1 rounded text-white"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(show.id)}
                className="flex-1 bg-red-500 py-1 rounded text-white"
              >
                Supprimer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}