import { useUserPrefsStore } from "./store/userPrefsStore";
import { Header } from "./components/Header";
import { Settings } from "./components/Settings";
import { Content } from "./components/Content";

const THEMES = {
  light: { background: "#ffffff", color: "#111827" },
  dark: { background: "#111827", color: "#f9fafb" },
};

export function App() {
  const theme = useUserPrefsStore((s) => s.theme);
  const palette = THEMES[theme];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.background,
        color: palette.color,
        fontFamily: "system-ui, sans-serif",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      <Header />
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "1.5rem",
          padding: "1.5rem",
          alignItems: "start",
        }}
      >
        <Content />
        <Settings />
      </main>
    </div>
  );
}
