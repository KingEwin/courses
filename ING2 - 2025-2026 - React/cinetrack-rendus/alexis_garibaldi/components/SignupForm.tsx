"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  signupAction,
  type AuthActionState,
} from "@/app/actions/auth";

const INITIAL: AuthActionState = { error: null };

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupAction, INITIAL);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Username (a-z, 0-9, _ ou -, 3-20 caractères)">
        <input
          name="username"
          type="text"
          required
          minLength={3}
          maxLength={20}
          pattern="[a-z0-9_\\-]{3,20}"
          autoComplete="username"
          autoFocus
          className="ds-input"
        />
      </Field>
      <Field label="Nom affiché">
        <input
          name="displayName"
          type="text"
          maxLength={40}
          autoComplete="nickname"
          className="ds-input"
        />
      </Field>
      <Field label="Mot de passe (6 caractères minimum)">
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="ds-input"
        />
      </Field>
      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="ds-button ds-button-primary px-4 py-2 disabled:opacity-50"
      >
        {isPending ? "Création…" : "Créer mon profil"}
      </button>
      <p className="text-center text-sm text-zinc-600">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-bold text-blue-700">
          Connexion
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
