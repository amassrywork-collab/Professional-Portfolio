import { motion } from "framer-motion";
import React from "react";

export const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Pill({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/75 backdrop-blur">
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, copy }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyber">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-8 text-white/62 md:text-lg">{copy}</p> : null}
    </motion.div>
  );
}
