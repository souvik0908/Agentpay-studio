"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignup = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/auth/${isSignup ? "register" : "login"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    setIsSubmitting(false);

    if (!response.ok) {
      setError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-pink-100 bg-white/90 p-8 shadow-2xl shadow-pink-100/80 backdrop-blur">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          PairSketch
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {isSignup
            ? "Choose a username and password. Partner pairing comes in the next step."
            : "Log in with your username and password to continue."}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            className="text-sm font-medium text-slate-800"
            htmlFor="username"
          >
            Username
          </label>
          <input
            autoComplete="username"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
            id="username"
            name="username"
            pattern="[a-z0-9_]{3,32}"
            placeholder="alex_heart"
            required
            type="text"
          />
          <p className="mt-2 text-xs text-slate-500">
            3-32 lowercase letters, numbers, or underscores.
          </p>
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-800"
            htmlFor="password"
          >
            Password
          </label>
          <input
            autoComplete={isSignup ? "new-password" : "current-password"}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
            id="password"
            minLength={8}
            name="password"
            placeholder="At least 8 characters"
            required
            type="password"
          />
        </div>

        {error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          className="w-full rounded-2xl bg-pink-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-pink-300"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Please wait..."
            : isSignup
              ? "Create account"
              : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          className="font-semibold text-pink-700 hover:text-pink-800"
          href={isSignup ? "/login" : "/signup"}
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </div>
  );
}
