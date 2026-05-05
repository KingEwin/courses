import { useUserPrefsStore } from "../store/userPrefsStore";

const LABELS = {
  fr: {
    title: "Préférences",
    theme: "Thème",
    language: "Langue",
    fontSize: "Taille du texte",
    reset: "Réinitialiser",
  },
  en: {
    title: "Preferences",
    theme: "Theme",
    language: "Language",
    fontSize: "Font size",
    reset: "Reset",
  },
};

export function Settings() {
  const theme = useUserPrefsStore((s) => s.theme);
  const language = useUserPrefsStore((s) => s.language);
  const fontSize = useUserPrefsStore((s) => s.fontSize);
  const setTheme = useUserPrefsStore((s) => s.setTheme);
  const setLanguage = useUserPrefsStore((s) => s.setLanguage);
  const setFontSize = useUserPrefsStore((s) => s.setFontSize);
  const reset = useUserPrefsStore((s) => s.reset);

  const labels = LABELS[language];

  return (
    <section
      style={{
        padding: "1.5rem",
        border: "1px solid currentColor",
        borderRadius: 8,
        display: "grid",
        gap: "0.75rem",
        maxWidth: 360,
      }}
    >
      <h2 style={{ marginTop: 0 }}>{labels.title}</h2>

      <label style={{ display: "grid", gap: 4 }}>
        {labels.theme}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        {labels.language}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "fr" | "en")}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        {labels.fontSize} : {fontSize}px
        <input
          type="range"
          min={12}
          max={24}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </label>

      <button onClick={reset} style={{ marginTop: "0.5rem" }}>
        {labels.reset}
      </button>
    </section>
  );
}
