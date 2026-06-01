import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import emptyGlass from "@/assets/empty-glass-real.png";

/**
 * Realistic fixed-glass pour animation.
 * Glass stays anchored. Juice stream falls from top into the glass,
 * fill rises smoothly, "BOOK NOW" badge appears on full, loop.
 *
 * Phase 0 (0.5s): idle empty glass
 * Phase 1 (2.6s): stream falls + fill rises
 * Phase 2 (2.6s): stream stops, BOOK NOW badge pops, hold
 * Phase 3 (0.7s): fill drains, reset
 */
const PHASES = [500, 2600, 2600, 700];

const JugPourPartyAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p + 1) % 4), PHASES[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const streaming = phase === 1;
  const filled = phase === 1 || phase === 2;
  const showBadge = phase === 2;

  // Glass interior (in % of container) — tuned to the empty-glass photo
  // Container is 210px wide, ~220px tall. Glass body roughly spans:
  // top of liquid area ~ 22%, bottom ~ 88%, left ~ 30%, right ~ 70%
  const liquidTopEmpty = 86; // % from top when empty
  const liquidTopFull = 26; // % from top when full
  const liquidTop = filled ? liquidTopFull : liquidTopEmpty;

  return (
    <div className="relative mx-auto w-full max-w-[210px] h-[220px] md:h-[240px] select-none pointer-events-none">
      {/* BOOK NOW badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-30"
          >
            <span
              className="font-display text-[11px] md:text-[12px] font-extrabold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(135deg, hsl(45 100% 60%), hsl(35 95% 50%))",
                color: "hsl(30 25% 8%)",
                boxShadow:
                  "0 12px 32px -10px hsl(38 100% 50% / 0.65), 0 0 0 1px hsl(45 100% 70% / 0.55) inset",
              }}
            >
              Book Now
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling juice stream (above and into glass) */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence>
          {streaming && (
            <motion.div
              key="stream"
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: "4%",
                width: "8px",
                height: "30%",
                background:
                  "linear-gradient(180deg, hsl(45 100% 65%) 0%, hsl(38 100% 55%) 60%, hsl(32 100% 50%) 100%)",
                borderRadius: "8px",
                filter: "drop-shadow(0 0 6px hsl(38 100% 55% / 0.55))",
                transformOrigin: "top center",
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0, transformOrigin: "bottom center" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Splash droplets at impact point */}
        {streaming &&
          [0, 0.25, 0.5, 0.75].map((d, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${48 + (i % 2 === 0 ? -1 : 1) * (3 + i)}%`,
                top: "30%",
                width: 5,
                height: 5,
                background: "hsl(42 100% 60%)",
                boxShadow: "0 0 6px hsl(38 100% 55% / 0.7)",
              }}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, 10 + i * 2],
                x: [(i % 2 === 0 ? -1 : 1) * (4 + i), (i % 2 === 0 ? -1 : 1) * (10 + i * 2)],
                scale: [0.6, 1, 0.4],
              }}
              transition={{ duration: 0.7, delay: d, repeat: Infinity, repeatDelay: 0.1 }}
            />
          ))}
      </div>

      {/* Liquid inside glass (rises smoothly) */}
      <div
        className="absolute inset-0 z-[15] overflow-hidden"
        style={{
          // clip strictly to glass interior shape (slightly tapered)
          clipPath:
            "polygon(32% 22%, 68% 22%, 71% 88%, 29% 88%)",
        }}
      >
        <motion.div
          className="absolute left-0 right-0 bottom-0"
          initial={false}
          animate={{ top: `${liquidTop}%` }}
          transition={{
            duration: phase === 1 ? 2.5 : phase === 3 ? 0.65 : 0.4,
            ease: phase === 1 ? [0.45, 0.05, 0.35, 1] : "easeIn",
          }}
          style={{
            background:
              "linear-gradient(180deg, hsl(45 100% 62%) 0%, hsl(38 100% 55%) 40%, hsl(30 100% 48%) 100%)",
            boxShadow: "inset 0 6px 12px hsl(50 100% 70% / 0.45)",
          }}
        >
          {/* surface highlight wave */}
          <motion.div
            className="absolute -top-[3px] left-0 right-0 h-[6px] rounded-[50%]"
            style={{
              background:
                "linear-gradient(180deg, hsl(50 100% 78% / 0.9), hsl(45 100% 65% / 0.3))",
            }}
            animate={streaming ? { scaleY: [1, 1.4, 1], scaleX: [1, 1.02, 1] } : { scaleY: 1 }}
            transition={{ duration: 0.4, repeat: streaming ? Infinity : 0 }}
          />
        </motion.div>
      </div>

      {/* Empty glass photo (fixed, on top so rim/edges read correctly) */}
      <img
        src={emptyGlass}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain z-20"
        style={{ filter: "drop-shadow(0 18px 22px hsl(30 50% 4% / 0.45))" }}
      />

      {/* Ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[2%] h-[6px] rounded-[50%] z-0"
        style={{
          width: "50%",
          background:
            "radial-gradient(ellipse at center, hsl(30 30% 4% / 0.55), transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* Sparkles on full */}
      <AnimatePresence>
        {showBadge && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full z-30"
                style={{
                  left: `${28 + i * 11}%`,
                  top: `${18 + (i % 2) * 8}%`,
                  background: "hsl(48 100% 75%)",
                  boxShadow: "0 0 8px hsl(45 100% 60%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -12] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.4,
                  delay: i * 0.12,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JugPourPartyAnimation;
