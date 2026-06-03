"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  loginAction,
  type AuthActionState,
} from "@/app/actions/auth";

const INITIAL: AuthActionState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, INITIAL);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Username">
        <input
          name="username"
          type="text"
          required
          autoComplete="username"
          autoFocus
          className="ds-input"
        />
      </Field>
      <Field label="Mot de passe">
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="ds-input"
        />
      </Field>
      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="ds-button ds-button-primary px-4 py-2 disabled:opacity-50"
      >
        {isPending ? "Connexion…" : "Se connecter"}
      </button>
      <p className="text-center text-sm text-zinc-600">
        Pas encore de profil ?{" "}
        <Link href="/signup" className="font-bold text-blue-700">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-zinc-700">{label}</span>
      {children}
    </label>
  );
}
