import { motion } from "motion/react";

interface SubPageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string; // kept for API compatibility but no longer used as dark overlay
}

export function SubPageHero({ title, subtitle }: SubPageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-20 flex items-center justify-center">
      {/* ── Ambient Background Blobs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-200/30 blur-[120px]" />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-100/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-pink-100/20 blur-[90px]" />
      </div>

      {/* ── Subtle grid pattern overlay ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #5A45FD 0, #5A45FD 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #5A45FD 0, #5A45FD 1px, transparent 0, transparent 50%)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          WeBuildReach
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-extrabold text-slate-900 mb-5 leading-tight"
          style={{ fontSize: "clamp(2.2rem, 6vw, 3.75rem)", lineHeight: 1.15 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Decorative pill divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary to-indigo-500"
        />
      </div>
    </section>
  );
}
