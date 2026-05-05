"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isRegistering) {
      // S'inscrire
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        setLoading(false);
        return;
      }

      try {
        // Encodage base64 comme demandé (même si en backend c'est aussi hashé par bcrypt)
        const base64Password = btoa(password);

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: base64Password }),
        });

        if (res.ok) {
          // Connecter automatiquement après inscription
          const signInRes = await signIn("credentials", {
            redirect: false,
            email,
            password: base64Password,
          });

          if (signInRes?.error) {
            setError(signInRes.error);
          } else {
            router.push("/");
            router.refresh();
          }
        } else {
          const data = await res.json();
          setError(data.message || "Erreur lors de l'inscription.");
        }
      } catch (err) {
        setError("Impossible de s'inscrire.");
      }
    } else {
      // Se connecter
      try {
        const base64Password = btoa(password);
        
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password: base64Password,
        });

        if (res?.error) {
          setError("Email ou mot de passe incorrect.");
        } else {
          router.push("/");
          router.refresh();
        }
      } catch (err) {
        setError("Impossible de se connecter.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent text-center mb-6">
          CineTrack
        </h2>
        
        <h3 className="text-xl font-medium text-foreground text-center mb-8">
          {isRegistering ? "Créer un compte" : "Connexion à votre compte"}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-muted mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors mt-6 disabled:opacity-50"
          >
            {loading ? "Chargement..." : isRegistering ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(""); // Réinitialiser l'erreur quand on bascule
            }}
            className="text-sm text-accent hover:text-accent-hover transition-colors bg-transparent border-none cursor-pointer"
          >
            {isRegistering
              ? "Vous avez déjà un compte ? Connectez-vous"
              : "Pas de compte ? Inscrivez-vous"}
          </button>
        </div>
      </div>
    </div>
  );
}