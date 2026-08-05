import React from "react";

export default function BlogResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3! gap-x-[var(--gap-lg)] gap-y-[var(--space-xl)] animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex h-full flex-col">
          <div className="relative w-full aspect-[1.85] border-2 border-primary/20 bg-muted mb-6"></div>
          <div className="h-6 bg-muted mb-3 w-3/4"></div>
          <div className="h-4 bg-muted mb-6 w-full"></div>
          <div className="h-4 bg-muted mb-6 w-5/6"></div>
          <div className="mt-auto border-t border-border/40 pt-4 flex justify-between">
             <div className="h-4 bg-muted w-1/4"></div>
             <div className="h-4 bg-muted w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
