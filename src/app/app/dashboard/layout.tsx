import type { ReactNode } from "react";
import Sidebar from "@/components/app/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 px-4 pb-12 pt-20 sm:px-6 md:ml-[260px] md:px-10 md:pt-9">
        {children}
      </div>
    </div>
  );
}
