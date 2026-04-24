import type { ReactNode } from "react";
import Sidebar from "@/components/app/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-[260px] flex-1 px-10 pb-12 pt-9">{children}</div>
    </div>
  );
}
