import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "AgentPay Studio",
  description: "Autonomous payments dashboard for Kite"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
