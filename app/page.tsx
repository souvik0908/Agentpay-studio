import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fecdd3,transparent_28%),radial-gradient(circle_at_bottom_right,#c7d2fe,transparent_32%),linear-gradient(135deg,#fff7ed,#fdf2f8_48%,#eef2ff)] text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <Link className="text-lg font-black tracking-tight" href="/">
            PairSketch
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                href="/dashboard"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  className="rounded-full px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/70"
                  href="/login"
                >
                  Log in
                </Link>
                <Link
                  className="rounded-full bg-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700"
                  href="/signup"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-600">
              Private couple space
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-[-0.04em] sm:text-7xl">
              Draw, connect, and keep little moments together.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Part one is ready: simple username/password authentication backed
              by SQL sessions. Partner codes and the shared drawing canvas will
              come next after you approve this foundation.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                className="rounded-full bg-slate-950 px-7 py-4 text-center font-semibold text-white transition hover:bg-slate-800"
                href={user ? "/dashboard" : "/signup"}
              >
                {user ? "Open dashboard" : "Create account"}
              </Link>
              <Link
                className="rounded-full border border-slate-300 bg-white/70 px-7 py-4 text-center font-semibold text-slate-800 transition hover:bg-white"
                href={user ? "/dashboard" : "/login"}
              >
                {user ? "Continue" : "I already have an account"}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-2xl shadow-pink-200/70 backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-pink-200">
                    Secure session
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">Auth checkpoint</h2>
                </div>
                <div className="h-12 w-12 rounded-full bg-pink-400/30" />
              </div>
              <div className="mt-10 space-y-4">
                {[
                  "Username and password forms",
                  "Hashed passwords in PostgreSQL",
                  "httpOnly session cookie",
                  "Protected dashboard route",
                ].map((item) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
