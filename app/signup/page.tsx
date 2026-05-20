import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,#ffe4ef,transparent_35%),linear-gradient(135deg,#fff7ed,#fdf2f8_45%,#eef2ff)] px-6 py-12">
      <AuthForm mode="signup" />
    </main>
  );
}
