import { useUserPrefsStore } from "../store/userPrefsStore";

const COPY = {
  fr: {
    title: "Bienvenue",
    body: "Cet écran applique en direct le thème et la taille de police choisis dans les préférences. Aucun prop n'est passé entre composants : tout vient du store partagé.",
  },
  en: {
    title: "Welcome",
    body: "This screen applies the chosen theme and font size from the preferences in real time. No props are passed between components — everything comes from the shared store.",
  },
};

export function Content() {
  const language = useUserPrefsStore((s) => s.language);
  const fontSize = useUserPrefsStore((s) => s.fontSize);

  const copy = COPY[language];

  return (
    <article style={{ padding: "1.5rem", fontSize }}>
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
    </article>
  );
}
