import { AnimatePresence, motion } from "framer-motion";
import { Code2, Download, Mail, Moon, Network, Search, Sun, Terminal, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useKeyboardShortcut } from "../hooks/useKeyboardShortcut";

const email = "amassry.work@gmail.com";

function downloadCv() {
  const link = document.createElement("a");
  link.href = "/ahmed-almassri-cv.pdf";
  link.download = "Ahmed_Almassri_CV.pdf";
  link.click();
}

function copyEmail() {
  navigator.clipboard?.writeText(email);
}

export function CommandPalette({ open, setOpen, theme, setTheme, engineerMode, setEngineerMode }) {
  const [query, setQuery] = useState("");

  useKeyboardShortcut(() => setOpen((value) => !value));

  const actions = useMemo(
    () => [
      { label: "Go to Projects", hint: "Navigate", icon: Search, run: () => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }) },
      { label: "Go to Experience", hint: "Navigate", icon: Search, run: () => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" }) },
      { label: "Get in Touch", hint: "Email", icon: Mail, run: () => (window.location.href = `mailto:${email}`) },
      { label: "Copy Email", hint: "Clipboard", icon: Mail, run: copyEmail },
      { label: "Download CV", hint: "PDF", icon: Download, run: downloadCv },
      { label: theme === "noir" ? "Switch to Signal Theme" : "Switch to Noir Theme", hint: "Theme", icon: theme === "noir" ? Sun : Moon, run: () => setTheme(theme === "noir" ? "signal" : "noir") },
      { label: engineerMode ? "Hide Engineer Mode" : "Show Engineer Mode", hint: "Overlay", icon: Terminal, run: () => setEngineerMode((value) => !value) },
      { label: "Open GitHub", hint: "Social", icon: Code2, run: () => window.open("https://github.com/amassrywork-collab", "_blank", "noreferrer") },
      { label: "Open LinkedIn", hint: "Social", icon: Network, run: () => window.open("https://www.linkedin.com/in/ahmed-m-a-almassri-15415b334/", "_blank", "noreferrer") },
    ],
    [engineerMode, setEngineerMode, setTheme, theme],
  );

  const filtered = actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase()));

  const runAction = (action) => {
    action.run();
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-start bg-night/72 px-4 pt-24 backdrop-blur-xl md:place-items-center md:pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
            if (event.key === "Enter" && filtered[0]) runAction(filtered[0]);
          }}
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#080b0e]/92 shadow-lift"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="h-5 w-5 text-cyber" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search actions, navigation, theme..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
              <button aria-label="Close command palette" onClick={() => setOpen(false)} className="rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {filtered.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => runAction(action)}
                    className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition hover:bg-white/[0.08]"
                    data-cursor-label={action.hint}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-cyber">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-white">{action.label}</span>
                      <span className="block text-xs text-white/42">{action.hint}</span>
                    </span>
                  </button>
                );
              })}
              {!filtered.length ? <p className="px-4 py-10 text-center text-sm text-white/45">No matching command.</p> : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
