import { motion } from "framer-motion";
import { Code2, Cpu, Terminal } from "lucide-react";
import React from "react";

const bootSteps = ["Calibrating vision stack", "Mounting AI systems", "Launching portfolio"];

export function LoadingScreen() {
  return (
    <motion.div
      className="boot-loader fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-night px-5"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-grid-fade bg-[length:46px_46px] opacity-35" />
      <motion.div
        className="absolute h-[34rem] w-[34rem] rounded-full border border-cyber/20"
        animate={{ rotate: 360, scale: [0.96, 1.04, 0.96] }}
        transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 1.5, repeat: Infinity } }}
      />
      <motion.div
        className="absolute h-[23rem] w-[23rem] rounded-full border border-volt/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,224,255,.2),transparent_34%),radial-gradient(circle_at_72%_24%,rgba(200,255,84,.14),transparent_30%),linear-gradient(135deg,#071112_0%,#102023_48%,#171d14_100%)]" />

      <motion.div
        className="relative w-full max-w-xl rounded-[2rem] border border-white/14 bg-white/[0.075] p-7 shadow-lift backdrop-blur-2xl md:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyber">System Boot</p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-white md:text-5xl">Ahmed Almassri</h1>
          </div>
          <motion.div
            className="grid h-16 w-16 place-items-center rounded-2xl border border-cyber/35 bg-cyber/10 text-cyber shadow-glow"
            animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu className="h-8 w-8" />
          </motion.div>
        </div>

        <div className="mt-8 overflow-hidden rounded-full border border-white/10 bg-night/70 p-1">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-cyber via-volt to-coral"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="mt-6 grid gap-3">
          {bootSteps.map((step, index) => (
            <motion.div
              key={step}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-night/42 px-4 py-3"
              initial={{ opacity: 0.2, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.24, duration: 0.35 }}
            >
              {index === 0 ? <Code2 className="h-4 w-4 text-cyber" /> : null}
              {index === 1 ? <Terminal className="h-4 w-4 text-volt" /> : null}
              {index === 2 ? <Cpu className="h-4 w-4 text-coral" /> : null}
              <span className="text-sm font-semibold text-white/72">{step}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
