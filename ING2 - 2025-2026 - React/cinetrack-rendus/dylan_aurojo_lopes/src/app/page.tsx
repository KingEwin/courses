"use client";

import { useState } from "react";
import { Status } from "./types/status";
import { CineItem } from "./models/cine-item";
import { cineItems } from "./data/cine-items";
import CineCard from "./components/CineCard";
import CineCardEditingModal from "./components/CineCardEditingModal";
import CineCardCreationModal from "./components/CineCardCreationModal"
import {useCineStore} from "./store/CineStore"


export default function Home() {

  // Récupération des items du store
  const items = useCineStore((state) => state.items);

  // Définir l'item à éditer
  const [editingItem, setEditingItem] = useState<CineItem | null>(null);

  // Définir si l'on est en mode "ajout"
  const [isAdding, setIsAdding] = useState(false);

  // Récupération de l'hydration pour affichage de la page
  const hasHydrated = useCineStore((state) => state.hasHydrated);

  // Récupération des fonctions du store
  const updateItem = useCineStore((state) => state.updateItem);
  const deleteItem = useCineStore((state) => state.deleteItem);
  const addItem = useCineStore((state) => state.addItem);
  const updateStatus = useCineStore((state) => state.updateStatus);


  // Fonction customisé pour définir quel item est en cours de modification
  const editItem = (id: number) => {
    const  itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
    }
  }

  // Fonction de sauvegarder de l'item
  // Appel de la fonction de mise à jour dans le store et nullifier l'item en cours d'édition
  const saveItem = (updatedItem: CineItem) => {
    updateItem(updatedItem);
    setEditingItem(null);
  };

  // Affichage du chargement tant que hasHydrated est faux : les chargements de données ne sont pas finis
  if (!hasHydrated) {
    return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: 'var(--accent-gold)',
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem',
          letterSpacing: '0.2em',
        }}>
          <span style={{ opacity: 0.7 }}>— Chargement —</span>
        </div>
    );
  }

  return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* En-tête */}
        <header style={{
          marginBottom: '3rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          animation: 'fadeUp 0.6s ease both',
        }}>
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}>
              Ma collection
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              CineTrack
            </h1>
          </div>

          <button
              onClick={() => setIsAdding(true)}
              style={{
                marginLeft: '1rem',
                padding: '0.65rem 1.5rem',
                background: 'transparent',
                border: '1px solid var(--accent-gold)',
                color: 'var(--accent-gold)',
                borderRadius: '2px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-gold)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--bg-deep)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-gold)';
              }}
          >
            + Ajouter
          </button>
        </header>

        {/*Si en court d'ajout : afficher la modale de création*/}
        {isAdding && (
            <CineCardCreationModal
                // Passage des props
                // Ajout de l'item créé dans la modale
                onSave={(item) => {
                  addItem(item);
                  setIsAdding(false);
                }}

                // Annulation
                onCancel={() => setIsAdding(false)}
            />
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {items.map((item, index) => {
            // pour chaque item : si en mode d'édition
            if (editingItem?.id === item.id) {
              return (
                  // Affichage de la modale d'édition et transfert des props
                  <CineCardEditingModal
                      key={item.id}
                      item={item}
                      onSave={saveItem}
                      onCancel={() => setEditingItem(null)}
                  />
              );
            }

            return (
                // Affichage de la cinecard via transfert de props
                <CineCard
                    key={item.id}
                    item={item}
                    editItem={editItem}
                    deleteItem={deleteItem}
                    updateStatus={updateStatus}
                />

            );

          })}

        </div>

      </div>
  );
}