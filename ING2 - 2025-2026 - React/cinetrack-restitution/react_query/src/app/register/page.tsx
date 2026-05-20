"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Film, UserPlus } from "lucide-react";
import { useRegister } from "../../hooks/useRegister";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = useRegister();
  const errorMessage = register.error?.message ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register.mutateAsync({ email, password, name });
    } catch {
      // error already exposed via register.error — let React Query handle it
      return;
    }
    // Auto sign-in after registration
    await signIn("credentials", { email, password, redirect: false });
    router.push("/");
    router.refresh();
  };

  const inputClass =
    "w-full rounded-lg px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 transition-all";
  const inputStyle = {
    background: "var(--md-surface)",
    borderColor: "var(--md-outline)",
    color: "var(--md-on-surface)",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--md-background)" }}>
      <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden" style={{ background: "var(--md-surface-card)" }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5" style={{ background: "var(--md-primary)" }}>
          <Film size={24} className="text-white" />
          <span className="text-white text-xl font-semibold tracking-wide">CineTrack</span>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--md-on-surface)" }}>Créer un compte</h1>
            <p className="text-sm mt-1" style={{ color: "var(--md-on-surface-variant)" }}>
              Commencez à suivre vos films et séries
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--md-on-surface-variant)" }}>
                Prénom <span className="normal-case text-xs opacity-60">(optionnel)</span>
              </label>
              <input
                type="text"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre prénom"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--md-on-surface-variant)" }}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--md-on-surface-variant)" }}>
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6 caractères minimum"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={register.isPending}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{ background: "var(--md-primary)" }}
            >
              {register.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <UserPlus size={16} />
                  Créer mon compte
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-center" style={{ color: "var(--md-on-surface-variant)" }}>
            Déjà inscrit ?{" "}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: "var(--md-primary)" }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
