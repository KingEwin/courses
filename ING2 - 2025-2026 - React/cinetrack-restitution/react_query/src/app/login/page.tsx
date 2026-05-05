"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Film, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/");
      router.refresh();
    }
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
            <h1 className="text-xl font-bold" style={{ color: "var(--md-on-surface)" }}>Connexion</h1>
            <p className="text-sm mt-1" style={{ color: "var(--md-on-surface-variant)" }}>
              Accédez à votre liste de films et séries
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--md-on-surface-variant)" }}>
                Email
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
                Mot de passe
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{ background: "var(--md-primary)" }}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn size={16} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-center" style={{ color: "var(--md-on-surface-variant)" }}>
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-semibold hover:underline" style={{ color: "var(--md-primary)" }}>
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
