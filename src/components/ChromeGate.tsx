"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

function isAppRoute(pathname: string | null): boolean {
  return !!pathname && pathname.startsWith("/app");
}

export function GatedNavbar() {
  const pathname = usePathname();
  if (isAppRoute(pathname)) return null;
  return <Navbar />;
}

export function GatedFooter() {
  const pathname = usePathname();
  if (isAppRoute(pathname)) return null;
  return <Footer />;
}
