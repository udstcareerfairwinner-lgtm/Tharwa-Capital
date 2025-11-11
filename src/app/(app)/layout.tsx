import { MainNav } from "@/components/main-nav";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-24">{children}</main>
      <MainNav />
    </div>
  );
}
