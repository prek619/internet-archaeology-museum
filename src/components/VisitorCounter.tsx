"use client";

import { useEffect, useState } from "react";

interface VisitorCounterProps {
  initialCount: number;
}

export default function VisitorCounter({ initialCount }: VisitorCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const stored = localStorage.getItem("museum-visitor-counted");
    if (!stored) {
      localStorage.setItem("museum-visitor-counted", "1");
      fetch("/api/visitor-count", { method: "POST" })
        .then((r) => r.json())
        .then((data) => {
          if (typeof data.count === "number") setCount(data.count);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="inline-flex flex-col items-center border-4 border-black bg-neo-secondary px-6 py-3 shadow-neo-sm">
      <span className="font-black text-3xl tracking-tighter">
        {count.toLocaleString()}
      </span>
      <span className="text-xs font-black uppercase tracking-widest text-black/70 mt-0.5">
        Visitors Have Contemplated This Collection
      </span>
    </div>
  );
}
