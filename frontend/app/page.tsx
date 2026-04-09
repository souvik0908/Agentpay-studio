import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function HomePage() {
  return (
    <PageShell
      title="AgentPay Studio"
      subtitle="Bootable starter for Kite MCP + x402 + dashboard-driven agent payments."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Create agents",
            desc: "Define budgets, per-action caps, provider allow-lists, and kill switch policies.",
            href: "/agents"
          },
          {
            title: "Connect Kite",
            desc: "Track MCP URL, session status, and wallet readiness for Kite integration.",
            href: "/connect-kite"
          },
          {
            title: "Run paid tasks",
            desc: "Trigger an x402-style flow and inspect payment + result timeline.",
            href: "/run-task"
          }
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{card.desc}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
