import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";

// Interface des props qui devront être transmis à chaque Cinecard
interface CineCardProps {
    item: CineItem; // item
    deleteItem: (id: number) => void; // fonction de suppression
    editItem: (id: number) => void; // fonction d'édition
    updateStatus: (id: number, status: Status) => void; // fonction de changement de status
}

// Badge de statut avec couleur associée
const statusConfig: Record<Status, { label: string; color: string; bg: string }> = {
    "to-watch": { label: "À voir",    color: "#6ec6a0", bg: "rgba(110,198,160,0.1)" },
    "watching":  { label: "En cours", color: "#e8a84a", bg: "rgba(232,168,74,0.1)"  },
    "completed": { label: "Vu",       color: "#6a9fd8", bg: "rgba(106,159,216,0.1)" },
};

// Composant
export default function CineCard({
                                     item,
                                     deleteItem,
                                     editItem,
                                     updateStatus,
                                 }: CineCardProps) {

    const status = statusConfig[item.status] ?? statusConfig["to-watch"];

    return (
        <div
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeUp 0.5s ease both',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-accent)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
        >

            {/* Liseré doré à gauche */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, bottom: 0,
                width: '3px',
                background: `linear-gradient(180deg, var(--accent-gold), transparent)`,
            }} />

            {/* En-tête de la carte */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                    lineHeight: 1.3,
                    flex: 1,
                    paddingRight: '0.5rem',
                }}>
                    {item.title}
                </h2>

                {/* Badge statut actuel */}
                <span style={{
                    fontSize: '0.65rem',
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: status.color,
                    background: status.bg,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '2px',
                    whiteSpace: 'nowrap',
                }}>
          {status.label}
        </span>
            </div>

            {/* Métadonnées */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
                <Row label="Type"     value={item.type} />
                <Row label="Note"     value={`${item.rating} / 10`} highlight />
                <Row label="Ajouté"   value={new Date(item.createdAt).toLocaleDateString('fr-FR')} />
                <Row label="Modifié"  value={new Date(item.updatedAt).toLocaleDateString('fr-FR')} />
            </div>

            {/* Séparateur */}
            <div style={{ height: '1px', background: 'var(--border)', margin: '0.25rem 0 0.75rem' }} />

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>

                <select
                    defaultValue={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value as Status)}
                    style={{
                        flex: 1,
                        padding: '0.4rem 0.6rem',
                        background: 'var(--bg-deep)',
                        border: '1px solid var(--border-accent)',
                        borderRadius: '2px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontFamily: "'DM Sans', sans-serif",
                        cursor: 'pointer',
                    }}
                >
                    <option value="to-watch">À voir</option>
                    <option value="watching">En cours</option>
                    <option value="completed">Vu</option>
                </select>

                <ActionButton
                    label="Éditer"
                    color="#4a6a9a"
                    hoverColor="#5a7aaa"
                    onClick={() => editItem(item.id)}
                />

                <ActionButton
                    label="✕"
                    color="#7a3535"
                    hoverColor="#9a4545"
                    onClick={() => deleteItem(item.id)}
                />

            </div>
        </div>
    );
}

// Composant utilitaire : ligne de métadonnée
function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </span>
            <span style={{
                fontSize: '0.8rem',
                color: highlight ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: highlight ? 500 : 300,
            }}>
        {value}
      </span>
        </div>
    );
}

// Composant utilitaire : bouton d'action
function ActionButton({ label, color, hoverColor, onClick }: {
    label: string; color: string; hoverColor: string; onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.4rem 0.75rem',
                background: color,
                border: 'none',
                borderRadius: '2px',
                color: 'var(--text-primary)',
                fontSize: '0.72rem',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = hoverColor; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = color; }}
        >
            {label}
        </button>
    );
}