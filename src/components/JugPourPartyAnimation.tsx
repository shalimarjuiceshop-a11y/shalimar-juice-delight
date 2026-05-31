import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Premium SVG pour animation:
 * Phase 0 (1.2s): jug tilts toward glass
 * Phase 1 (2.2s): stream pours, glass fills
 * Phase 2 (3.0s): jug rights, "Cheers!" text pops, hold
 * Phase 3 (0.8s): glass empties (fade), loop
 */
const PHASES = [1200, 2200, 3000, 800];

const JugPourPartyAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p + 1) % 4), PHASES[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const pouring = phase === 1;
  const full = phase === 1 || phase === 2;
  const tilted = phase === 0 || phase === 1;
  const showText = phase === 2;

  // Fill level (0 empty -> 1 full). Glass interior: y 54..96, height 42
  const fillY = full ? 56 : 96;
  const fillH = full ? 40 : 0;

  return (
    <div className="relative mx-auto w-full max-w-[260px] h-[150px] md:h-[170px] select-none pointer-events-none">
      {/* Pop text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-1 left-1/2 -translate-x-1/2 z-10"
          >
            <span
              className="font-display text-[11px] md:text-xs font-extrabold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, hsl(45 100% 55%), hsl(38 95% 48%))",
                color: "hsl(30 15% 12%)",
                boxShadow: "0 8px 24px -8px hsl(45 100% 50% / 0.55), 0 0 0 1px hsl(45 100% 60% / 0.35) inset",
              }}
            >
              Cheers! 🍹
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <svg viewBox="0 0 260 150" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <linearGradient id="juiceGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(38 100% 60%)" />
            <stop offset="100%" stopColor="hsl(28 95% 48%)" />
          </linearGradient>
          <linearGradient id="jugGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 100% 65%)" />
            <stop offset="100%" stopColor="hsl(32 95% 50%)" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 0% 100% / 0.35)" />
            <stop offset="100%" stopColor="hsl(0 0% 100% / 0.12)" />
          </linearGradient>
          <clipPath id="glassClip">
            <path d="M155 54 L153 100 Q153 104 157 104 L187 104 Q191 104 191 100 L189 54 Z" />
          </clipPath>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="172" cy="128" rx="48" ry="4" fill="hsl(30 20% 5% / 0.35)" />

        {/* Glass */}
        <g>
          {/* fill (clipped) */}
          <motion.rect
            x="150"
            width="44"
            fill="url(#juiceGrad)"
            initial={false}
            animate={{ y: fillY, height: fillH }}
            transition={{ duration: phase === 1 ? 2 : 0.6, ease: "easeOut" }}
            clipPath="url(#glassClip)"
          />
          {/* glass body outline */}
          <path
            d="M155 54 L153 100 Q153 104 157 104 L187 104 Q191 104 191 100 L189 54 Z"
            fill="url(#glassGrad)"
            stroke="hsl(0 0% 100% / 0.55)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* rim */}
          <ellipse cx="172" cy="54" rx="17" ry="2.5" fill="none" stroke="hsl(0 0% 100% / 0.7)" strokeWidth="1.2" />
          {/* highlight */}
          <path d="M158 60 L157 96" stroke="hsl(0 0% 100% / 0.45)" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Stream */}
        <AnimatePresence>
          {pouring && (
            <motion.rect
              x="170"
              y="38"
              width="3.5"
              height="18"
              rx="1.75"
              fill="url(#juiceGrad)"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: [0, 1, 1, 0.8] }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: "170px 38px" }}
            />
          )}
        </AnimatePresence>

        {/* Splash drops while pouring */}
        {pouring && (
          <g>
            {[0, 0.4, 0.8].map((d, i) => (
              <motion.circle
                key={i}
                cx="172"
                r="1.6"
                fill="hsl(38 100% 60%)"
                initial={{ cy: 50, opacity: 0 }}
                animate={{ cy: [50, 56], opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: d, repeat: Infinity, repeatDelay: 0.2 }}
              />
            ))}
          </g>
        )}

        {/* Jug (tilts) */}
        <motion.g
          initial={false}
          animate={{ rotate: tilted ? -38 : 0, x: tilted ? -6 : 0, y: tilted ? 2 : 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.4, 0.64, 1] }}
          style={{ transformOrigin: "108px 50px" }}
        >
          {/* handle */}
          <path
            d="M82 30 Q66 36 66 50 Q66 64 82 70"
            fill="none"
            stroke="url(#jugGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* body */}
          <path
            d="M80 22 L130 22 Q138 22 138 30 L138 64 Q138 74 128 74 L86 74 Q78 74 78 64 L78 30 Q78 22 86 22 Z"
            fill="url(#jugGrad)"
            stroke="hsl(30 80% 35%)"
            strokeWidth="1.3"
          />
          {/* spout */}
          <path d="M130 26 L146 22 L142 36 L130 34 Z" fill="url(#jugGrad)" stroke="hsl(30 80% 35%)" strokeWidth="1.2" strokeLinejoin="round" />
          {/* juice surface inside jug */}
          <rect x="82" y="32" width="52" height="8" rx="2" fill="hsl(38 100% 62%)" opacity="0.9" />
          {/* highlight */}
          <rect x="86" y="28" width="4" height="40" rx="2" fill="hsl(0 0% 100% / 0.35)" />
          {/* hand/cuff (subtle) */}
          <rect x="118" y="64" width="22" height="10" rx="3" fill="hsl(212 60% 55%)" />
          <rect x="118" y="70" width="22" height="6" fill="hsl(212 60% 45%)" />
        </motion.g>
      </svg>
    </div>
  );
};

export default JugPourPartyAnimation;
