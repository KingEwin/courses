import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-12">
      <Link href="/" className="text-sm text-zinc-700 hover:text-zinc-950">
        ← Retour
      </Link>
      <div className="ds-card flex flex-col gap-6 p-8">
        <header>
          <h1 className="text-xl">Connexion</h1>
          <p className="text-sm text-zinc-600">
            Retrouve ta cinémathèque et tes reviews.
          </p>
        </header>
        <LoginForm />
      </div>
    </main>
  );
}
