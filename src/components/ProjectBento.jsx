import { AnimatePresence, motion } from "framer-motion";
import { Activity, BrainCircuit, ExternalLink, ShieldCheck, X } from "lucide-react";
import React, { useState } from "react";
import { Pill, reveal } from "./SectionHeading";

const projectIcons = {
  "human-tracking-pro": Activity,
  "smart-ai-school-system": BrainCircuit,
  sadms: ShieldCheck,
};

export function ProjectBento({ projects }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid auto-rows-[minmax(290px,auto)] gap-5 lg:grid-cols-12">
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            layoutId={`project-${project.id}`}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08, layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
            onClick={() => setSelected(project)}
            data-cursor-label="View Project"
            className={`surface-hover group relative min-h-[290px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.085] p-7 text-left shadow-lift backdrop-blur-2xl ${project.size}`}
            whileHover={{ y: -8, scale: 1.01 }}
          >
            <ProjectSurface project={project} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-night/78 px-4 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.article
              layoutId={`project-${selected.id}`}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#080b0e] p-7 shadow-lift md:p-9"
              onClick={(event) => event.stopPropagation()}
            >
              <ProjectSurface project={selected} expanded />
              <button
                aria-label="Close project detail"
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-night/70 text-white/70 backdrop-blur transition hover:text-white"
                onClick={() => setSelected(null)}
                data-cursor-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ProjectSurface({ project, expanded = false }) {
  const Icon = projectIcons[project.id] || BrainCircuit;

  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="absolute right-0 top-0 h-44 w-44 rounded-bl-[5rem] bg-white/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <motion.p layoutId={`project-eyebrow-${project.id}`} className="text-xs font-bold uppercase tracking-[0.24em] text-white/52">
              {project.eyebrow}
            </motion.p>
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-night/62 text-cyber transition group-hover:scale-105 group-hover:bg-cyber/12">
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </div>
          </div>
          <motion.h3 layoutId={`project-title-${project.id}`} className="max-w-2xl font-heading text-3xl font-bold text-white md:text-4xl">
            {project.title}
          </motion.h3>
          <motion.p layoutId={`project-copy-${project.id}`} className="mt-5 max-w-2xl text-base leading-8 text-white/68">
            {expanded ? project.detail : project.description}
          </motion.p>
        </div>

        {expanded ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric} className="rounded-2xl border border-white/10 bg-night/52 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyber">Signal</p>
                <p className="mt-2 font-heading text-lg font-bold text-white">{metric}</p>
              </div>
            ))}
          </motion.div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          {project.stack.map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
          {expanded ? (
            <span className="ml-auto inline-flex items-center gap-2 text-sm font-bold text-cyber">
              In-page case detail <ExternalLink className="h-4 w-4" />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}
