"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/ui/page-shell";
import { apiGet, apiPost } from "@/lib/api";
import { Agent } from "@/types/agent";

const defaultForm = {
  name: "ResearchBot",
  daily_budget: 10,
  max_spend_per_action: 2,
  allowed_providers: ["Weather API"],
  max_paid_actions_per_minute: 5,
  kill_switch: false
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadAgents() {
    const data = await apiGet<Agent[]>("/agents");
    setAgents(data);
  }

  useEffect(() => {
    loadAgents().catch(console.error);
  }, []);

  async function createAgent() {
    setLoading(true);
    try {
      await apiPost("/agents", defaultForm);
      await loadAgents();
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Agents"
      subtitle="Create and inspect local agent profiles for your dashboard."
    >
      <button
        onClick={createAgent}
        disabled={loading}
        className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950"
      >
        {loading ? "Creating..." : "Create Demo Agent"}
      </button>

      <div className="mt-6 grid gap-4">
        {agents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-slate-400">
            No agents yet. Create one.
          </div>
        ) : (
          agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                  {agent.status}
                </span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <div className="rounded-xl bg-slate-900 p-3">
                  <p className="text-xs text-slate-400">Daily Budget</p>
                  <p className="mt-1">{agent.daily_budget}</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-3">
                  <p className="text-xs text-slate-400">Max/Action</p>
                  <p className="mt-1">{agent.max_spend_per_action}</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-3">
                  <p className="text-xs text-slate-400">Providers</p>
                  <p className="mt-1">{agent.allowed_providers.join(", ")}</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-3">
                  <p className="text-xs text-slate-400">Kill Switch</p>
                  <p className="mt-1">{agent.kill_switch ? "On" : "Off"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PageShell>
  );
}
