import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";
export type Language = "fr" | "en";

type UserPrefsState = {
  theme: Theme;
  language: Language;
  fontSize: number;

  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setFontSize: (fontSize: number) => void;
  toggleTheme: () => void;
  reset: () => void;
};

const DEFAULTS = {
  theme: "light" as Theme,
  language: "fr" as Language,
  fontSize: 16,
};

export const useUserPrefsStore = create<UserPrefsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      reset: () => set(DEFAULTS),
    }),
    { name: "user-prefs" }
  )
);
