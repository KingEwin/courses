"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCineStore } from "./hooks/use-cine-store";
import { CineItem } from "./models/cine-item";
import CineCard from "./components/CineCard";
import CineForm from "./components/CineForm";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  
  const {
    items,
    visibleItems,
    search,
    filterStatus,
    filterType,
    fetchItems,
    addItem,
    setSearch,
    setFilterStatus,
    setFilterType,
  } = useCineStore();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchItems();
    }
  }, [sessionStatus, fetchItems]);

  const [showForm, setShowForm] = useState(false);

  const handleAddItem = async (data: {
    title: string;
    type: CineItem["type"];
    status: CineItem["status"];
    rating: number;
    imageUrl?: string;
    year?: string;
    genre?: string;
    director?: string;
    plot?: string;
    actors?: string;
    runtime?: string;
  }) => {
    await addItem(data as any);
    setShowForm(false);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
          CineTrack
        </h1>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm border border-border px-3 py-1.5 rounded-lg text-muted hidden sm:block">
                {(session.user as any)?.email}
              </span>
              <button
                className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium cursor-pointer hover:bg-surface transition-colors"
                onClick={() => signOut()}
              >
                Se déconnecter
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-accent text-white font-medium cursor-pointer hover:bg-accent-hover transition-colors"
                onClick={() => setShowForm(true)}
              >
                + Créer
              </button>
            </>
          ) : (
            <button
              className="px-5 py-2.5 rounded-lg bg-accent text-white font-medium cursor-pointer hover:bg-accent-hover transition-colors"
              onClick={() => signIn()}
            >
              Connexion / Inscription
            </button>
          )}
        </div>
      </div>

      {!session ? (
        <div className="text-center py-20 flex flex-col items-center justify-center bg-surface border border-border rounded-xl">
          <h2 className="text-xl font-bold mb-3">Bienvenue sur CineTrack</h2>
          <p className="text-muted mb-6 max-w-md">
            Connectez-vous pour commencer à sauvegarder les films et séries que
            vous voulez regarder, ceux en cours, et ceux déjà terminés !
          </p>
          <button
            className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
            onClick={() => signIn()}
          >
            Se connecter pour commencer
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Rechercher un titre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder-muted flex-1"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as CineItem["status"] | "")}
          className="px-3 py-2 rounded-lg bg-surface border border-border text-foreground cursor-pointer"
        >
          <option value="">Tous les statuts</option>
          <option value="to-watch">À regarder</option>
          <option value="watching">En cours</option>
          <option value="completed">Terminé</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CineItem["type"] | "")}
          className="px-3 py-2 rounded-lg bg-surface border border-border text-foreground cursor-pointer"
        >
          <option value="">Tous les types</option>
          <option value="movie">Film</option>
          <option value="series">Série</option>
        </select>
      </div>

      {showForm && (
        <CineForm
          onSubmit={handleAddItem}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-3 gap-5">
        {visibleItems.map((item) => (
          <CineCard key={item.id} item={item} />
        ))}
      </div>

        {visibleItems.length === 0 && (
          <p className="text-center text-muted mt-12 text-sm col-span-3">
            Aucun résultat trouvé.
          </p>
        )}
        </>
      )}
    </div>
  );
}
