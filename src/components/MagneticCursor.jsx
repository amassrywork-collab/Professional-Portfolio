import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 360, damping: 32, mass: 0.35 });
  const springY = useSpring(cursorY, { stiffness: 360, damping: 32, mass: 0.35 });
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    const move = (event) => {
      cursorX.set(event.clientX - 18);
      cursorY.set(event.clientY - 18);
    };

    const enter = (event) => {
      const target = event.target.closest("a, button, [data-cursor-label]");
      if (!target) return;
      setLabel(target.getAttribute("data-cursor-label") || "");
      setVariant(target.getAttribute("data-cursor-variant") || "active");
    };

    const leave = (event) => {
      if (event.relatedTarget?.closest?.("a, button, [data-cursor-label]")) return;
      setLabel("");
      setVariant("default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, [cursorX, cursorY]);

  const isCopy = variant === "copy";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden items-center justify-center rounded-full border border-cyber/60 mix-blend-difference md:flex"
      animate={{
        width: label ? 116 : 36,
        height: label ? 36 : 36,
        borderRadius: label ? 999 : 18,
        backgroundColor: label ? (isCopy ? "rgba(200,255,84,0.42)" : "rgba(255,255,255,0.38)") : "rgba(255,255,255,0)",
      }}
      transition={{ type: "spring", stiffness: 360, damping: 32 }}
      style={{ x: springX, y: springY, willChange: "transform, width, height" }}
    >
      {label ? <span className="px-3 text-center text-[11px] font-black uppercase tracking-wide text-white">{label}</span> : null}
    </motion.div>
  );
}
