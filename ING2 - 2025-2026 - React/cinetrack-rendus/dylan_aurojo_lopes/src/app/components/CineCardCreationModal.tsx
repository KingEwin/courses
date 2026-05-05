"use client";

import { useState } from "react";
import { Status } from "../types/status";
import { MediaType } from "@/app/types/media-type";

// Props à passer pour la modale d'édition d'une Card
interface Props {
    // Fonction de sauvegarde
    onSave: (item: { // Transmettre un item
        id: number;
        title: string;
        type: MediaType;
        status: Status
        rating: number;
        createdAt: Date;
        updatedAt: Date
    }) => void;
    onCancel: () => void;
}

// Composant
export default function CineCardCreationModal({ onSave, onCancel }: Props) {

    // Valeur par défaut des attributs à transmettre
    const [title, setTitle] = useState("");
    const [type, setType] = useState<MediaType>("movie")
    const [status, setStatus] = useState<Status>("to-watch");
    const [rating, setRating] = useState(0);

    // Fonction de validation (après appui sur bouton)
    // Appel de la fonction de sauvegarde
    const handleSubmit = () => {
        onSave({
            id: 0,
            title,
            type,
            status,
            rating,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };


    return (

        <div style={{
            background: 'var(--bg-modal)',
            border: '1px solid var(--border-accent)',
            borderRadius: '4px',
            padding: '1.75rem',
            marginBottom: '1.5rem',
            position: 'relative',
            animation: 'fadeUp 0.3s ease both',
            maxWidth: '420px',
        }}>

            {/* Trait doré en haut */}
            <div style={{
                position: 'absolute',
                top: 0, left: '1.75rem', right: '1.75rem',
                height: '2px',
                background: 'linear-gradient(90deg, var(--accent-gold), transparent)',
                borderRadius: '1px',
            }} />

            {/* Titre de la modale */}
            <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                margin: '0 0 0.25rem',
            }}>
                Nouvelle entrée
            </p>
            <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem',
                color: 'var(--text-primary)',
                margin: '0 0 1.5rem',
            }}>
                Ajouter un film ou une série
            </h2>

            {/* Champ titre */}
            <FieldLabel>Titre</FieldLabel>
            <input
                style={inputStyle}
                placeholder="Ex: Mulholland Drive"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Champ type */}
            <FieldLabel>Type de média</FieldLabel>
            <select
                style={inputStyle}
                value={type}
                onChange={(e) => setType(e.target.value as MediaType)}
            >
                <option value="movie">Film</option>
                <option value="series">Série</option>
            </select>

            {/* Champ note */}
            <FieldLabel>Note initiale (0 – 10)</FieldLabel>
            <input
                style={inputStyle}
                type="number"
                min={0}
                max={10}
                placeholder="0"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />

            {/* Champ statut */}
            <FieldLabel>Statut</FieldLabel>
            <select
                style={inputStyle}
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
            >
                <option value="to-watch">À voir</option>
                <option value="watching">En cours</option>
                <option value="completed">Vu</option>
            </select>

            {/* Boutons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>

                <button
                    style={primaryBtn}
                    onClick={handleSubmit}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-amber)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-gold)'; }}
                >
                    Ajouter
                </button>

                <button
                    style={ghostBtn}
                    onClick={onCancel}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--text-secondary)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-accent)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
                >
                    Annuler
                </button>

            </div>

        </div>
    );
}

// Utilitaires de style
function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label style={{
            display: 'block',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '0.3rem',
        }}>
            {children}
        </label>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.55rem 0.75rem',
    background: 'var(--bg-deep)',
    border: '1px solid var(--border-accent)',
    borderRadius: '2px',
    color: 'var(--text-primary)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.875rem',
    marginBottom: '0.9rem',
    outline: 'none',
};

const primaryBtn: React.CSSProperties = {
    flex: 1,
    padding: '0.6rem',
    background: 'var(--accent-gold)',
    border: 'none',
    borderRadius: '2px',
    color: 'var(--bg-deep)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background 0.2s ease',
};

const ghostBtn: React.CSSProperties = {
    padding: '0.6rem 1rem',
    background: 'transparent',
    border: '1px solid var(--border-accent)',
    borderRadius: '2px',
    color: 'var(--text-secondary)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
};