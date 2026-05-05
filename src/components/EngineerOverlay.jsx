import React, { useLayoutEffect, useRef, useState } from "react";
import { Cpu } from "lucide-react";

export function EngineerFrame({ active, label, stack, grid, children }) {
  const start = useRef(typeof performance !== "undefined" ? performance.now() : Date.now());
  const [renderTime, setRenderTime] = useState("0.00");

  useLayoutEffect(() => {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    setRenderTime((now - start.current).toFixed(2));
  }, []);

  return (
    <div className="relative">
      {children}
      {active ? (
        <div className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] border border-cyber/40 bg-cyber/[0.025]">
          <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full border border-cyber/35 bg-night/80 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-cyber shadow-glow backdrop-blur">
            <Cpu className="h-3.5 w-3.5" />
            <span>{label}</span>
            <span className="text-white/38">Render {renderTime}ms</span>
          </div>
          <div className="absolute bottom-3 right-3 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/12 bg-night/82 p-3 text-[11px] text-white/58 backdrop-blur">
            <p>Stack: {stack}</p>
            <p>Grid: {grid}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
