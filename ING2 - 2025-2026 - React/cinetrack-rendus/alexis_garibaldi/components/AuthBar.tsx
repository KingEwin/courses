import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import type { SessionUser } from "@/lib/auth";

export function AuthBar({ user }: { user: SessionUser | null }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="ds-display border-2 border-zinc-500 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase">
          Guest
        </span>
        <Link
          href="/login"
          className="ds-button ds-button-ghost px-2 py-0.5 text-[11px] font-bold uppercase"
        >
          Connexion
        </Link>
        <Link
          href="/signup"
          className="ds-button ds-button-primary px-2 py-0.5 text-[11px] font-bold uppercase"
        >
          Créer un profil
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="ds-display border-2 border-blue-500 bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-900">
        {user.displayName}
      </span>
      <form action={logoutAction}>
        <button
          type="submit"
          className="ds-button ds-button-ghost px-2 py-0.5 text-[11px] font-bold uppercase"
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}
