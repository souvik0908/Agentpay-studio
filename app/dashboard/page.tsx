import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-300">
              PairSketch
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Hi, {user.username}
            </h1>
          </div>
          <LogoutButton />
        </header>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-pink-950/30">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-200">
              Auth is ready
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Your private couples space starts here.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              This protected area is reserved for the next parts: partner invite
              codes and the shared drawing canvas. For now, only logged-in users
              can see this page.
            </p>
          </div>

          <div className="rounded-[2rem] border border-pink-200/20 bg-pink-400/10 p-8">
            <h2 className="text-2xl font-semibold">Next build steps</h2>
            <ol className="mt-6 space-y-4 text-sm leading-6 text-pink-50">
              <li className="rounded-2xl bg-white/10 p-4">
                1. Generate partner connection codes.
              </li>
              <li className="rounded-2xl bg-white/10 p-4">
                2. Create a couple room after both partners connect.
              </li>
              <li className="rounded-2xl bg-white/10 p-4">
                3. Add one or two synchronized touch drawing canvases.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
