"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/ui/page-shell";
import { apiGet } from "@/lib/api";
import { PaymentRecord } from "@/types/payment";

export default function LedgerPage() {
  const [rows, setRows] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    apiGet<PaymentRecord[]>("/ledger").then(setRows).catch(console.error);
  }, []);

  return (
    <PageShell
      title="Ledger"
      subtitle="Payment records created by successful task executions."
    >
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-6 bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.15em] text-slate-400">
          <div>Provider</div>
          <div>Task</div>
          <div>Agent</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Receipt</div>
        </div>

        {rows.length === 0 ? (
          <div className="px-4 py-6 text-slate-400">No payments yet. Run a task first.</div>
        ) : (
          rows.map((row) => (
            <div key={row.id} className="grid grid-cols-6 border-t border-white/10 px-4 py-4 text-sm">
              <div>{row.provider}</div>
              <div className="truncate">{row.task_id}</div>
              <div className="truncate">{row.agent_id}</div>
              <div>{row.amount}</div>
              <div>{row.status}</div>
              <div>{row.receipt_ref}</div>
            </div>
          ))
        )}
      </div>
    </PageShell>
  );
}
