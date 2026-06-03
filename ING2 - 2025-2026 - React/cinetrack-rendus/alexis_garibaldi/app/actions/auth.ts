"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  clearSession,
  hashPassword,
  setSession,
  verifyPassword,
} from "@/lib/auth";

export type AuthActionState = {
  error: string | null;
};

const USERNAME_RE = /^[a-z0-9_-]{3,20}$/;

function pickString(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function signupAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const username = pickString(formData, "username").toLowerCase();
  const displayName = pickString(formData, "displayName");
  const password = pickString(formData, "password");

  if (!USERNAME_RE.test(username)) {
    return {
      error: "Username invalide (3-20 caractères, a-z, 0-9, _ ou -).",
    };
  }
  if (password.length < 6) {
    return { error: "Mot de passe trop court (6 caractères minimum)." };
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return { error: "Ce username est déjà pris." };
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      displayName: displayName || username,
      passwordHash,
    },
  });

  await setSession(user.id);
  revalidatePath("/");
  redirect("/");
}

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const username = pickString(formData, "username").toLowerCase();
  const password = pickString(formData, "password");

  if (!username || !password) {
    return { error: "Username et mot de passe requis." };
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return { error: "Utilisateur introuvable." };
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return { error: "Mot de passe incorrect." };
  }

  await setSession(user.id);
  revalidatePath("/");
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  revalidatePath("/");
  redirect("/");
}
