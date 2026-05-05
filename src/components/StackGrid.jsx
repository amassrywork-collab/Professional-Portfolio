import { motion } from "framer-motion";
import { BrainCircuit, Cloud, Code2, Database, Network, Router, ServerCog } from "lucide-react";
import React from "react";
import { reveal } from "./SectionHeading";

const iconMap = {
  Python: Code2,
  SQL: Database,
  AWS: Cloud,
  "AI/ML": BrainCircuit,
  "Server Architecture": ServerCog,
  Networking: Router,
};

export function StackGrid({ stack }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {stack.map((item) => (
        <motion.div
          key={item.name}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="surface-hover group rounded-[1.35rem] border border-white/12 bg-white/[0.085] p-5 text-center backdrop-blur-xl"
          data-cursor-label={item.name}
        >
          <StackIcon item={item} />
          <p className="mt-4 text-sm font-semibold text-white/78 transition group-hover:text-white">{item.name}</p>
        </motion.div>
      ))}
    </div>
  );
}

function StackIcon({ item }) {
  const Icon = iconMap[item.name] || Network;

  return (
    <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-night/72 ${item.tone} transition group-hover:scale-105 group-hover:bg-white/[0.08]`}>
      <Icon className="h-6 w-6" strokeWidth={1.8} />
    </div>
  );
}
