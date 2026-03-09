import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";
import pineappleShakeGlass from "@/assets/pineapple-shake.png";

// Phase durations in ms
// 0: Pineapple entrance (3s) → 1: Slicing (2.5s) → 2: Glass slides in (3s) → 3: Hero glass + badge (4s) → repeat
const PHASE_DURATIONS = [3000, 2500, 3000, 4000];

const smoothEase = [0.22, 1, 0.36, 1] as const;

// Golden sparkle particles
const Sparkles = ({ active, count = 12 }: { active: boolean; count?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * -160 - 40,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 0.8,
        duration: Math.random() * 1.2 + 0.8,
      })),
    [count]
  );

  return (
    <AnimatePresence>
      {active &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              left: "50%",
              top: "50%",
              background: `radial-gradient(circle, hsl(45 100% 75%), hsl(40 100% 50%))`,
              boxShadow: `0 0 ${p.size * 2}px hsl(45 100% 60% / 0.6)`,
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: p.x,
              y: p.y,
              scale: [0, 1.2, 0.8, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}
    </AnimatePresence>
  );
};

// Orbiting ring of light
const OrbitalRing = ({ active }: { active: boolean }) => (
  <motion.div
    className="absolute inset-0 m-auto pointer-events-none"
    style={{
      width: "70%",
      height: "70%",
      border: "1px solid hsl(45 100% 60% / 0.15)",
      borderRadius: "50%",
    }}
    animate={{
      rotate: active ? 360 : 0,
      scale: active ? [1, 1.08, 1] : 0.8,
      opacity: active ? [0.2, 0.4, 0.2] : 0,
    }}
    transition={{
      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    }}
  />
);

const JuicePourAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const advance = (p: number) => {
      if (cancelled) return;
      setPhase(p);
      const next = p >= 3 ? 0 : p + 1;
      timeout = setTimeout(() => advance(next), PHASE_DURATIONS[p]);
    };

    timeout = setTimeout(() => advance(0), 400);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center h-[300px] sm:h-[360px] md:h-[440px] lg:h-[500px] select-none">
      {/* Background ambient glow */}
      <motion.div
        className="absolute inset-0 m-auto pointer-events-none"
        style={{
          width: "65%",
          height: "65%",
          background:
            "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.08) 0%, hsl(var(--pineapple-gold) / 0.03) 40%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{
          scale: phase >= 2 ? 1.3 : 1,
          opacity: phase >= 2 ? 0.8 : 0.4,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Orbital ring */}
      <OrbitalRing active={phase >= 1} />

      {/* Second orbital ring (counter-rotating) */}
      <motion.div
        className="absolute inset-0 m-auto pointer-events-none"
        style={{
          width: "85%",
          height: "85%",
          border: "1px dashed hsl(45 100% 60% / 0.08)",
          borderRadius: "50%",
        }}
        animate={{
          rotate: phase >= 1 ? -360 : 0,
          opacity: phase >= 1 ? 0.3 : 0,
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          opacity: { duration: 1 },
        }}
      />

      {/* ── PHASE 0: Pineapple grand entrance ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 10 }}
        animate={{
          opacity: phase === 0 ? 1 : 0,
          scale: phase === 0 ? 1 : 0.6,
          rotate: phase === 0 ? [0, -2, 2, 0] : 0,
          y: phase === 0 ? [0, -8, 0] : 30,
        }}
        transition={{
          opacity: { duration: 0.6, ease: smoothEase },
          scale: { duration: 0.7, ease: smoothEase },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 3, repeat: phase === 0 ? Infinity : 0, ease: "easeInOut" },
        }}
      >
        <div className="relative">
          <img
            src={pineappleFruit}
            alt="Fresh Pineapple"
            className="h-40 sm:h-52 md:h-64 lg:h-72 w-auto"
            style={{
              objectFit: "contain",
              filter:
                "drop-shadow(0 20px 40px hsl(var(--pineapple-gold) / 0.3)) drop-shadow(0 8px 16px hsl(30 15% 10% / 0.4))",
            }}
          />
          {/* Subtle pulsing glow behind pineapple */}
          <motion.div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.15) 0%, transparent 60%)",
              borderRadius: "50%",
              transform: "scale(1.8)",
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── PHASE 1: Slices burst out ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 15 }}
        animate={{
          opacity: phase === 1 ? 1 : 0,
          scale: phase === 1 ? 1 : 0.5,
          rotate: phase === 1 ? [0, 5, -3, 0] : 0,
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: {
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1], // spring-like
          },
          rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="relative">
          <img
            src={pineappleSlices}
            alt="Pineapple Slices"
            className="h-36 sm:h-44 md:h-56 lg:h-64 w-auto"
            style={{
              objectFit: "contain",
              filter:
                "drop-shadow(0 16px 32px hsl(var(--pineapple-gold) / 0.25)) drop-shadow(0 4px 12px hsl(30 15% 10% / 0.3))",
            }}
          />
          {/* Sparkle burst on slice phase */}
          <Sparkles active={phase === 1} count={16} />
        </div>
      </motion.div>

      {/* ── PHASE 2 & 3: Juice Glass ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 20 }}
        animate={{
          opacity: phase >= 2 ? 1 : 0,
          x: phase >= 2 ? 0 : 80,
          y: phase === 3 ? -8 : 0,
          scale: phase === 3 ? 1.12 : phase >= 2 ? 1 : 0.8,
          rotate: phase >= 2 ? [0, -1, 1, 0] : 5,
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: { duration: 1, ease: smoothEase },
          y: { duration: 2, repeat: phase === 3 ? Infinity : 0, ease: "easeInOut" },
          scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="relative">
          <img
            src={pineappleJuiceGlass}
            alt="Fresh Pineapple Juice Glass"
            className="h-40 sm:h-52 md:h-60 lg:h-68 w-auto"
            style={{
              objectFit: "contain",
              filter:
                "drop-shadow(0 20px 40px hsl(var(--pineapple-gold) / 0.25)) drop-shadow(0 8px 20px hsl(30 15% 10% / 0.35))",
            }}
          />

          {/* Radiant glow behind glass */}
          <motion.div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.18) 0%, hsl(var(--pineapple-gold) / 0.05) 40%, transparent 65%)",
              borderRadius: "50%",
              transform: "scale(2)",
            }}
            animate={{
              opacity: phase >= 2 ? [0.4, 0.8, 0.4] : 0,
              scale: phase === 3 ? [2, 2.2, 2] : 2,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Sparkles on glass appear */}
          <Sparkles active={phase === 2} count={10} />
        </div>
      </motion.div>

      {/* ── PHASE 3: Price Badge with dramatic entrance ── */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2"
        style={{ zIndex: 30 }}
        animate={{
          opacity: phase === 3 ? 1 : 0,
          y: phase === 3 ? 0 : 20,
          scale: phase === 3 ? [0.8, 1.08, 1] : 0.8,
        }}
        transition={{
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1],
          delay: phase === 3 ? 0.4 : 0,
        }}
      >
        <div
          className="relative overflow-hidden whitespace-nowrap rounded-full px-8 py-2.5 sm:px-10 sm:py-3 md:px-12 md:py-3.5"
          style={{
            background: "linear-gradient(135deg, hsl(45 100% 52%), hsl(38 95% 45%))",
            boxShadow:
              "0 0 24px hsl(45 100% 51% / 0.5), 0 0 48px hsl(45 100% 51% / 0.25), 0 8px 24px hsl(30 15% 10% / 0.3)",
          }}
        >
          <span
            className="font-display text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide"
            style={{ color: "hsl(30 10% 12%)" }}
          >
            JUST ₹10
          </span>

          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, hsl(0 0% 100% / 0.35) 50%, transparent 70%)",
            }}
            animate={phase === 3 ? { x: ["-120%", "220%"] } : { x: "-120%" }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Ground reflection */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "35%",
          height: 6,
          background:
            "radial-gradient(ellipse, hsl(var(--pineapple-gold) / 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 1,
        }}
        animate={{
          scaleX: phase >= 2 ? 1.2 : 0.5,
          opacity: phase >= 2 ? 0.6 : 0.15,
        }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

export default JuicePourAnimation;
