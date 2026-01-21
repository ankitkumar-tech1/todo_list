import React from 'react';
import { motion } from 'framer-motion';

const columnVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      type: 'spring',
      stiffness: 140,
      damping: 18
    }
  })
};

const shimmerClass =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-[shimmer_1.4s_infinite]';

export const HeroLayoutSkeleton = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-5 lg:flex-row">
      <motion.section
        className="glass-panel relative flex-1 p-5 sm:p-6 lg:p-7"
        variants={columnVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Your day, in flow.
            </h2>
            <p className="max-w-md text-xs text-muted sm:text-sm">
              Clean layout, micro-animations, and a structure that&apos;s perfect for a MERN
              portfolio project. Next steps: wire in real tasks, auth, and drag &amp; drop.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost ripple text-[11px] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-success" />
              Live preview UI
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-muted sm:text-xs">
          <span className="pill">Framer Motion transitions</span>
          <span className="pill">Glassmorphism</span>
          <span className="pill">Optimistic UI-ready layout</span>
        </div>

        <div className="mt-3 space-y-3">
          <div
            className={`glass-panel border-dashed border-white/10 p-3 sm:p-4 ${shimmerClass}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-muted uppercase tracking-[0.18em]">
                  Task composer (to be wired)
                </p>
                <p className="mt-1 text-sm text-foreground/90">
                  Add title, description, due date &amp; priority with a single, smooth motion.
                </p>
              </div>
              <button className="btn-primary ripple text-xs">
                <span>+ Quick task</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Today&apos;s focus
              </p>
              <span className="text-[11px] text-muted">Sample micro-interactions</span>
            </div>
            <div className="space-y-2.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="group flex cursor-default items-center justify-between gap-3 rounded-xl border border-white/5 bg-slate-900/60 px-3 py-2.5 text-xs transition-colors hover:border-accent/40 hover:bg-slate-900"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-muted text-[10px] text-muted group-hover:border-accent/70 group-hover:text-accent"
                    >
                      ✓
                    </motion.div>
                    <div>
                      <p className="text-[13px] font-medium">
                        {i === 0 && 'Animate add / delete transitions'}
                        {i === 1 && 'Wire filters & search UX'}
                        {i === 2 && 'Connect to Express + Mongo API'}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted">
                        Hover to feel the subtle motion and glassy surfaces – perfect for demos.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-accentSoft px-2 py-0.5 text-[10px] font-medium text-accent">
                      High
                    </span>
                    <span className="text-[10px] text-muted">Due today</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.aside
        className="glass-panel relative hidden w-full max-w-sm flex-col justify-between p-4 sm:flex sm:p-5 lg:flex"
        variants={columnVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <div className="mb-3 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Architecture preview
          </p>
          <p className="text-sm text-muted">
            Left: Task board. Right: Filters, stats, user-specific info. Below: drag &amp; drop.
          </p>
        </div>

        <div className="space-y-2.5 text-[11px] text-muted">
          <p>
            • <span className="text-foreground">Step 1</span>: Frontend skeleton with animations.
          </p>
          <p>
            • <span className="text-foreground">Step 2</span>: REST API + MongoDB schema.
          </p>
          <p>
            • <span className="text-foreground">Step 3</span>: JWT auth &amp; user tasks.
          </p>
          <p>
            • <span className="text-foreground">Step 4</span>: Drag &amp; drop + optimistic UI.
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-[11px] text-muted">
          <p className="mb-1 font-semibold text-foreground">Tip for portfolio:</p>
          <p>
            Record a short 20–30s screen capture of the animations + dark/light toggle. Add it to
            your README and LinkedIn post. This single project can show frontend, backend, and UX
            thinking.
          </p>
        </div>
      </motion.aside>
    </div>
  );
};

export default HeroLayoutSkeleton;

