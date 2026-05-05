import { useState } from "react";
import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";

// Props à transmettre pour l'édition
interface EditCineCardProps {
    item: CineItem; // Item
    onSave: (updatedItem: CineItem) => void; // Fonction de sauvegarde
    onCancel: () => void; // Fonction d'annulation
}

// Composant
export default function CineCardEditingModal({item, onSave, onCancel,}: EditCineCardProps) {

    // Valeur initiale de l'item à modifier
    const [title, setTitle] = useState(item.title);
    const [status, setStatus] = useState<Status>(item.status);
    const [rating, setRating] = useState(item.rating);

    // Fonction de validation (après appui sur bouton)
    const handleSubmit = () => {
        // Appel de la fonction de sauvegarde
        onSave({
            // Transfert de l'item et des attributs modifié
            ...item,
            title,
            status,
            rating,
            updatedAt: new Date(),
        });
    };

    return (
        <div style={{
            background: 'var(--bg-modal)',
            border: '1px solid var(--accent-gold-dim)',
            borderRadius: '4px',
            padding: '1.75rem',
            position: 'relative',
            animation: 'fadeUp 0.3s ease both',
        }}>

            {/* Titre de la modale */}
            <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                margin: '0 0 0.25rem',
            }}>
                Modification
            </p>
            <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                margin: '0 0 1.25rem',
                fontStyle: 'italic',
            }}>
                {item.title}
            </h2>

            {/* Champ titre */}
            <FieldLabel>Titre</FieldLabel>
            <input
                style={inputStyle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

            {/* Champ note */}
            <FieldLabel>Note (0 – 10)</FieldLabel>
            <input
                type="number"
                min={0}
                max={10}
                style={inputStyle}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />

            {/* Boutons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>

                <button style={primaryBtn} onClick={handleSubmit}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-amber)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-gold)'; }}
                >
                    Sauvegarder
                </button>

                <button style={ghostBtn} onClick={onCancel}
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