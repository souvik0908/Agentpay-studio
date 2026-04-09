import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function PageShell({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-2 text-slate-400">{subtitle}</p> : null}
        </div>
        {children}
      </main>
    </div>
  );
}
