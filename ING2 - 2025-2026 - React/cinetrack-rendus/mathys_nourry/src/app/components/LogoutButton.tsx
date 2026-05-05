"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      title="Se déconnecter"
      className="p-2 rounded-full hover:bg-white/20 text-white transition-all cursor-pointer"
      aria-label="Se déconnecter"
    >
      <LogOut size={18} />
    </button>
  );
}
