import Link from "next/link";

const items = [
  { href: "/", label: "Overview" },
  { href: "/agents", label: "Agents" },
  { href: "/connect-kite", label: "Connect Kite" },
  { href: "/run-task", label: "Run Task" },
  { href: "/ledger", label: "Ledger" }
];

export function Sidebar() {
  return (
    <aside className="w-full border-b border-white/10 bg-slate-900 p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">AgentPay</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Studio</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
