import { logoutCurrentUser } from "@/lib/auth";

export async function POST() {
  await logoutCurrentUser();

  return Response.json({ ok: true });
}
