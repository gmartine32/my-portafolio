// Ejemplo de componente React base
import React from "react";

export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
      {children}
    </button>
  );
}
