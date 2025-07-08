// Layout base para páginas Astro
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-fredoka">
      <main className="container py-8">{children}</main>
    </div>
  );
}
