import { useUserPrefsStore } from "../store/userPrefsStore";

const LABELS = {
  fr: { title: "Démo Zustand", switchLang: "EN", switchTheme: "Thème" },
  en: { title: "Zustand Demo", switchLang: "FR", switchTheme: "Theme" },
};

export function Header() {
  const language = useUserPrefsStore((s) => s.language);
  const theme = useUserPrefsStore((s) => s.theme);
  const setLanguage = useUserPrefsStore((s) => s.setLanguage);
  const toggleTheme = useUserPrefsStore((s) => s.toggleTheme);

  const labels = LABELS[language];

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid currentColor",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>{labels.title}</h1>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button onClick={() => setLanguage(language === "fr" ? "en" : "fr")}>
          {labels.switchLang}
        </button>
        <button onClick={toggleTheme}>
          {labels.switchTheme}: {theme}
        </button>
      </div>
    </header>
  );
}
