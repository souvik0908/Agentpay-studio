"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/ui/page-shell";
import { apiGet } from "@/lib/api";
import { KiteStatus } from "@/types/kite";

export default function ConnectKitePage() {
  const [status, setStatus] = useState<KiteStatus | null>(null);

  useEffect(() => {
    apiGet<KiteStatus>("/kite/status").then(setStatus).catch(console.error);
  }, []);

  return (
    <PageShell
      title="Connect Kite"
      subtitle="Mode 1-friendly screen for Kite MCP onboarding."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-semibold text-white">Connection Status</h3>
          <div className="mt-4 space-y-3 text-sm">
            <p>
              <span className="text-slate-400">Connected:</span>{" "}
              {status?.connected ? "Yes" : "No"}
            </p>
            <p>
              <span className="text-slate-400">MCP URL:</span>{" "}
              {status?.mcp_url || "Loading..."}
            </p>
            <p>
              <span className="text-slate-400">Session:</span>{" "}
              {status?.session_status || "Loading..."}
            </p>
            <p>
              <span className="text-slate-400">Wallet:</span>{" "}
              {status?.wallet_address || "Not connected"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-semibold text-white">What the user does</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-300">
            <li>Open Kite Portal</li>
            <li>Create Passport and fund testnet wallet</li>
            <li>Create an agent</li>
            <li>Copy MCP config into your app</li>
            <li>Authenticate and create a session</li>
          </ol>
        </div>
      </div>
    </PageShell>
  );
}
