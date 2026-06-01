import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import juicePourReal from "@/assets/juice-pour-real.png.asset.json";

/**
 * Realistic photo-based pour animation.
 * Phase 0 (0.6s): empty glass settles in
 * Phase 1 (2.4s): real juice pour reveals from bottom -> top (clip-path fill)
 * Phase 2 (3.0s): "Cheers!" pops, hold full glass
 * Phase 3 (0.7s): fade/empty, loop
 */
const PHASES = [600, 2400, 3000, 700];

const JugPourPartyAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p + 1) % 4), PHASES[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  // Reveal percentage of the real image (from bottom).
  // 0 = nothing visible (empty glass), 100 = full pour shot visible.
  const reveal =
    phase === 0 ? 0 : phase === 1 ? 100 : phase === 2 ? 100 : 0;
  const showText = phase === 2;

  return (
    <div className="relative mx-auto w-full max-w-[200px] h-[180px] md:h-[200px] select-none pointer-events-none">
      {/* Pop text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-1 left-1/2 -translate-x-1/2 z-20"
          >
            <span
              className="font-display text-[11px] md:text-xs font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(135deg, hsl(45 100% 58%), hsl(35 95% 50%))",
                color: "hsl(30 20% 10%)",
                boxShadow:
                  "0 10px 30px -10px hsl(38 100% 50% / 0.6), 0 0 0 1px hsl(45 100% 65% / 0.5) inset",
              }}
            >
              Cheers! Book Now
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ground shadow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-1 h-2 rounded-[50%]"
        style={{
          width: "55%",
          background:
            "radial-gradient(ellipse at center, hsl(30 30% 5% / 0.55), transparent 70%)",
          filter: "blur(2px)",
        }}
        animate={{ opacity: reveal > 0 ? 0.9 : 0.4, scaleX: reveal > 0 ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
      />

      {/* Real photo with rising reveal (clip-path) */}
      <motion.img
        src={juicePourReal.url}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain"
        style={{ filter: "drop-shadow(0 18px 24px hsl(30 50% 5% / 0.45))" }}
        initial={false}
        animate={{
          clipPath: `inset(${100 - reveal}% 0% 0% 0%)`,
        }}
        transition={{
          duration: phase === 1 ? 2.2 : phase === 3 ? 0.6 : 0.4,
          ease: phase === 1 ? [0.45, 0.05, 0.35, 1] : "easeOut",
        }}
      />

      {/* Empty glass silhouette (subtle, always visible behind) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full -z-0 opacity-40"
        aria-hidden
      >
        <defs>
          <linearGradient id="emptyGlass" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 0% 100% / 0.10)" />
            <stop offset="100%" stopColor="hsl(0 0% 100% / 0.03)" />
          </linearGradient>
        </defs>
        {/* faint hint of glass outline so reveal feels grounded */}
        <path
          d="M78 78 L74 168 Q74 174 80 174 L120 174 Q126 174 126 168 L122 78 Z"
          fill="url(#emptyGlass)"
          stroke="hsl(0 0% 100% / 0.18)"
          strokeWidth="1"
        />
      </svg>

      {/* Sparkle particles on full */}
      <AnimatePresence>
        {showText && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${30 + i * 14}%`,
                  top: `${20 + (i % 2) * 10}%`,
                  background: "hsl(45 100% 70%)",
                  boxShadow: "0 0 8px hsl(45 100% 60%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], y: [0, -10] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, delay: i * 0.12, repeat: Infinity, repeatDelay: 0.6 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JugPourPartyAnimation;
