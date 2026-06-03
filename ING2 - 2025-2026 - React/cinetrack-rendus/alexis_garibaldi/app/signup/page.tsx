import Link from "next/link";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/SignupForm";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-12">
      <Link href="/" className="text-sm text-zinc-700 hover:text-zinc-950">
        ← Retour
      </Link>
      <div className="ds-card flex flex-col gap-6 p-8">
        <header>
          <h1 className="text-xl">Créer un profil</h1>
          <p className="text-sm text-zinc-600">
            Pour suivre tes films et partager tes avis avec la communauté.
          </p>
        </header>
        <SignupForm />
      </div>
    </main>
  );
}
