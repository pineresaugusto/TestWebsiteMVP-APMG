import type { ReactNode } from "react";
import FunnelHeader from "./_components/FunnelHeader";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <FunnelHeader />
      {children}
    </div>
  );
}
