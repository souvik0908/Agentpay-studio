"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/ui/page-shell";
import { apiGet, apiPost } from "@/lib/api";
import { Agent } from "@/types/agent";
import { TaskRunResponse } from "@/types/task";

export default function RunTaskPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [result, setResult] = useState<TaskRunResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGet<Agent[]>("/agents")
      .then((data) => {
        setAgents(data);
        if (data.length > 0) {
          setSelectedAgentId(data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  async function runTask() {
    if (!selectedAgentId) return;

    setLoading(true);
    try {
      const response = await apiPost<TaskRunResponse>("/tasks/run", {
        agent_id: selectedAgentId,
        prompt: "Get weather data for a paid endpoint and complete the paid flow.",
        location: "San Francisco"
      });
      setResult(response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Run Task"
      subtitle="Trigger a stubbed MCP + x402 payment flow."
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm text-slate-400">Agent</label>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white"
            >
              <option value="">Select an agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={runTask}
            disabled={loading || !selectedAgentId}
            className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950"
          >
            {loading ? "Running..." : "Run Demo Task"}
          </button>
        </div>
      </div>

      {result ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Execution Summary</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-slate-900 p-3">
                <p className="text-xs text-slate-400">Status</p>
                <p className="mt-1">{result.status}</p>
              </div>
              <div className="rounded-xl bg-slate-900 p-3">
                <p className="text-xs text-slate-400">Provider</p>
                <p className="mt-1">{result.provider}</p>
              </div>
              <div className="rounded-xl bg-slate-900 p-3">
                <p className="text-xs text-slate-400">Estimated Cost</p>
                <p className="mt-1">{result.estimated_cost}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Execution Steps</h3>
            <div className="mt-4 space-y-3">
              {result.steps.map((step, index) => (
                <div key={`${step.title}-${index}`} className="rounded-xl bg-slate-900 p-4">
                  <p className="font-medium text-white">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Result</h3>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-300">
              {JSON.stringify(result.result, null, 2)}
            </pre>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}
