"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUnreadCount, reset, useDemoState } from "@/lib/demoState";

type NavKey = "dashboard" | "messages" | "orders" | "progress" | "resources" | "account";

const NAV: Array<{ key: NavKey; label: string; href: string; icon: React.ReactNode }> = [
  { key: "dashboard", label: "Dashboard", href: "/app/dashboard", icon: <IconDashboard /> },
  { key: "messages", label: "Messages", href: "/app/dashboard/messages", icon: <IconMessages /> },
  { key: "orders", label: "Orders", href: "/app/dashboard/orders", icon: <IconOrders /> },
  { key: "progress", label: "Progress", href: "/app/dashboard/progress", icon: <IconProgress /> },
  { key: "resources", label: "Resources", href: "/app/dashboard/resources", icon: <IconResources /> },
  { key: "account", label: "Account", href: "/app/dashboard/account", icon: <IconAccount /> },
];

function activeKey(pathname: string): NavKey {
  if (pathname.startsWith("/app/dashboard/messages")) return "messages";
  if (pathname.startsWith("/app/dashboard/orders")) return "orders";
  if (pathname.startsWith("/app/dashboard/progress")) return "progress";
  if (pathname.startsWith("/app/dashboard/resources")) return "resources";
  if (pathname.startsWith("/app/dashboard/account")) return "account";
  return "dashboard";
}

export default function Sidebar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const state = useDemoState();
  const unread = getUnreadCount(state);
  const active = activeKey(pathname);

  const firstName = state.user?.firstName ?? "Demo";
  const lastName = state.user?.lastName ?? "Patient";
  const initials = `${firstName[0] ?? "D"}${lastName[0] ?? "P"}`.toUpperCase();
  const planName = state.plan?.tier
    ? state.plan.tier[0].toUpperCase() + state.plan.tier.slice(1)
    : "Accelerate";

  const onSignOut = () => {
    reset();
    router.push("/");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-secondary bg-gradient-to-b from-[#F5F0EA] to-background px-4 pb-5 pt-7">
      <Link
        href="/app/dashboard"
        className="mb-8 flex items-center gap-2.5 px-3 font-display text-[22px] font-semibold tracking-tight text-foreground"
      >
        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
        Nuvela
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map((item) => {
          const isActive = active === item.key;
          const showBadge = item.key === "messages" && unread > 0;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground hover:bg-secondary/30"
              }`}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-accent"
                  aria-hidden
                />
              )}
              <span className="h-5 w-5 flex-shrink-0">{item.icon}</span>
              {item.label}
              {showBadge && (
                <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-semibold text-white">
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-2 flex items-center gap-3 border-t border-secondary pt-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-semibold text-foreground">
            {firstName} {lastName}
          </div>
          <div className="truncate text-xs text-foreground/55">{planName} Plan</div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-foreground/45 transition-colors hover:bg-secondary/30 hover:text-foreground"
          aria-label="Sign out"
          title="Sign out"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconDashboard() {
  return (
    <IconBase>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </IconBase>
  );
}
function IconMessages() {
  return (
    <IconBase>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </IconBase>
  );
}
function IconOrders() {
  return (
    <IconBase>
      <rect x="3" y="7" width="18" height="14" rx="1" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M3 12h18" />
    </IconBase>
  );
}
function IconProgress() {
  return (
    <IconBase>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </IconBase>
  );
}
function IconResources() {
  return (
    <IconBase>
      <path d="M4 4h11a3 3 0 013 3v13a2 2 0 00-2-2H4z" />
      <path d="M4 4v15" />
      <path d="M8 8h7" />
      <path d="M8 12h7" />
    </IconBase>
  );
}
function IconAccount() {
  return (
    <IconBase>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </IconBase>
  );
}
