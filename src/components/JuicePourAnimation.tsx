import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";

const PHASE_TIMINGS = [2200, 1800, 2000, 2500, 2500];

const JuicePourAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const advance = (p: number) => {
      if (cancelled) return;
      setPhase(p);
      const next = p >= 4 ? 0 : p + 1;
      timeout = setTimeout(() => advance(next), PHASE_TIMINGS[p]);
    };

    // Start after a brief delay
    timeout = setTimeout(() => advance(0), 300);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[420px] md:min-h-[540px] select-none overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80%", height: "80%",
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ground / Surface line */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "18%", width: "70%", maxWidth: 320, height: 6,
          background: "linear-gradient(90deg, transparent, hsl(var(--pineapple-gold) / 0.2), hsl(var(--pineapple-gold) / 0.35), hsl(var(--pineapple-gold) / 0.2), transparent)",
          borderRadius: 3, zIndex: 2,
        }}
      />

      {/* ═══ PHASE 0: PINEAPPLE BOUNCES IN ═══ */}
      <motion.div
        className="absolute"
        style={{ zIndex: 10, bottom: "20%" }}
        animate={{
          opacity: phase <= 2 ? 1 : 0,
          y: phase === 0
            ? ["-400%", "0%", "-60%", "0%", "-25%", "0%", "-8%", "0%"]
            : phase === 1 ? "0%" : phase === 2 ? "-30%" : "-400%",
          x: phase >= 2 ? "-120%" : "0%",
          scale: phase === 2 ? 0.6 : 1,
          rotate: phase === 0
            ? [15, -10, 8, -5, 3, -2, 1, 0]
            : phase === 2 ? -20 : 0,
        }}
        transition={{
          opacity: { duration: 0.3 },
          y: phase === 0
            ? { duration: 1.8, times: [0, 0.25, 0.38, 0.5, 0.62, 0.72, 0.85, 1], ease: "easeOut" }
            : { duration: 0.6, ease: "easeInOut" },
          x: { duration: 0.5, ease: "easeIn" },
          scale: { duration: 0.4 },
          rotate: phase === 0
            ? { duration: 1.8, times: [0, 0.25, 0.38, 0.5, 0.62, 0.72, 0.85, 1], ease: "easeOut" }
            : { duration: 0.4 },
        }}
      >
        <motion.img
          src={pineappleFruit}
          alt="Fresh Pineapple"
          className="w-28 md:w-36 lg:w-40"
          style={{ filter: "drop-shadow(0 15px 25px hsl(var(--pineapple-gold) / 0.3))" }}
        />

        {/* Squash on landing */}
        <AnimatePresence>
          {phase === 0 && (
            <>
              {/* Impact dust particles */}
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={`dust-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 4 + i * 1.5, height: 4 + i * 1.5,
                    background: `hsl(var(--pineapple-gold) / ${0.4 + i * 0.05})`,
                    bottom: -4, left: "50%", zIndex: 8,
                  }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: (i % 2 === 0 ? 1 : -1) * (15 + i * 12),
                    y: [0, -(5 + i * 4), 10],
                  }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ═══ PHASE 1: IDLE BOUNCE / ANTICIPATION ═══ */}
      {/* Small anticipation bounce before juice making */}
      
      {/* ═══ PHASE 2: JUICE SPLASH EFFECT ═══ */}
      {/* Juice droplets flying out */}
      {Array.from({ length: 10 }, (_, i) => {
        const angle = ((i / 10) * Math.PI * 1.2) - Math.PI * 0.1;
        const dist = 40 + (i % 4) * 20;
        const size = 4 + (i % 3) * 3;
        return (
          <motion.div
            key={`juice-drop-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size, height: size,
              background: `hsl(var(--pineapple-gold) / ${0.6 + (i % 3) * 0.12})`,
              bottom: "28%", left: "42%", zIndex: 15,
              boxShadow: `0 0 ${size}px hsl(var(--pineapple-gold) / 0.3)`,
            }}
            animate={{
              opacity: phase === 2 ? [0, 1, 0] : 0,
              x: phase === 2 ? [0, Math.cos(angle) * dist, Math.cos(angle) * dist * 1.2] : 0,
              y: phase === 2 ? [0, Math.sin(angle) * dist - 20, Math.sin(angle) * dist + 15] : 0,
            }}
            transition={{
              duration: 0.9,
              delay: phase === 2 ? 0.1 + (i % 4) * 0.08 : 0,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Juice splash burst */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 60, height: 60, bottom: "25%", zIndex: 14,
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.5) 0%, hsl(var(--pineapple-gold) / 0.1) 60%, transparent 100%)",
        }}
        animate={{
          scale: phase === 2 ? [0, 2.5, 3] : 0,
          opacity: phase === 2 ? [0, 0.8, 0] : 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* ═══ PHASE 3: GLASS BOUNCES IN ═══ */}
      <motion.div
        className="relative"
        style={{ zIndex: 20 }}
        animate={{
          opacity: phase >= 3 ? 1 : 0,
          y: phase === 3
            ? ["-350%", "0%", "-40%", "0%", "-12%", "0%"]
            : phase >= 4 ? "0%" : "-350%",
          rotate: phase === 3
            ? [-12, 8, -5, 3, -1, 0]
            : 0,
          scale: phase >= 3 ? 1 : 0.5,
        }}
        transition={{
          y: phase === 3
            ? { duration: 1.4, times: [0, 0.3, 0.45, 0.6, 0.78, 1], ease: "easeOut" }
            : { duration: 0.3 },
          rotate: phase === 3
            ? { duration: 1.4, times: [0, 0.3, 0.45, 0.6, 0.78, 1], ease: "easeOut" }
            : { duration: 0.3 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
        }}
      >
        <motion.img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice Glass"
          className="w-28 md:w-40 lg:w-44"
          style={{ filter: "drop-shadow(0 15px 30px hsl(var(--pineapple-gold) / 0.25))" }}
        />

        {/* Juice filling effect */}
        <motion.div
          className="absolute bottom-[8%] left-[18%] right-[18%] rounded-b-md overflow-hidden pointer-events-none"
          style={{
            transformOrigin: "bottom", zIndex: 21, height: "68%",
            background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.5), hsl(var(--pineapple-gold) / 0.2), transparent)",
            mixBlendMode: "overlay",
          }}
          animate={{
            scaleY: phase >= 3 ? [0, 0.3, 0.6, 1] : 0,
            opacity: phase >= 3 ? [0, 0.4, 0.7, 0.95] : 0,
          }}
          transition={{ duration: 1.2, delay: phase === 3 ? 0.8 : 0, ease: "easeOut" }}
        />

        {/* Bubbles in glass */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 2 + (i % 3) * 2, height: 2 + (i % 3) * 2,
              background: `hsl(0 0% 100% / ${0.35 + i * 0.06})`,
              left: `${22 + i * 11}%`, bottom: `${15 + i * 6}%`, zIndex: 22,
            }}
            animate={{
              opacity: phase === 3 ? [0, 0.8, 0] : 0,
              y: phase === 3 ? [0, -25, -40] : 0,
            }}
            transition={{ duration: 1.2, delay: 1 + i * 0.2, ease: "easeOut" }}
          />
        ))}

        {/* Glass landing impact */}
        {phase === 3 && Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`impact-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 5, height: 5, bottom: -2,
              background: `hsl(var(--pineapple-gold) / 0.4)`,
              left: "50%", zIndex: 19,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.7, 0],
              x: (i % 2 === 0 ? 1 : -1) * (20 + i * 10),
              y: [0, -8, 5],
            }}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.04, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* ═══ PHASE 4: "JUST ₹10" BOUNCES IN ═══ */}
      <motion.div
        className="absolute bottom-4 md:bottom-8"
        style={{ zIndex: 30 }}
        animate={{
          scale: phase === 4 ? [0, 1.3, 0.9, 1.1, 1] : 0,
          opacity: phase === 4 ? 1 : 0,
          y: phase === 4 ? [80, 0, -10, 0, -4, 0] : 80,
          rotate: phase === 4 ? [10, -5, 3, -1, 0] : 0,
        }}
        transition={{
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
          times: [0, 0.35, 0.55, 0.72, 1],
        }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-8 py-3 md:px-10 md:py-4 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-wide">
            JUST ₹10
          </span>
          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.35) 50%, transparent 100%)",
            }}
            animate={phase === 4 ? { x: ["-100%", "200%"] } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Sparkles around price badge */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const d = 55 + (i % 3) * 20;
        return (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute pointer-events-none"
            style={{
              width: 3 + (i % 2) * 2, height: 3 + (i % 2) * 2,
              background: "hsl(var(--pineapple-gold))",
              borderRadius: "50%",
              boxShadow: "0 0 6px 2px hsl(var(--pineapple-gold) / 0.5)",
              bottom: "8%", zIndex: 29,
            }}
            animate={{
              opacity: phase === 4 ? [0, 1, 0] : 0,
              x: phase === 4 ? [0, Math.cos(a) * d] : 0,
              y: phase === 4 ? [0, Math.sin(a) * d] : 0,
              scale: phase === 4 ? [0, 1.5, 0] : 0,
            }}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease: "easeOut" }}
          />
        );
      })}

      {/* Ground shadow that reacts to bounces */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "16%", width: "30%", height: 10, zIndex: 1,
          background: "radial-gradient(ellipse, hsl(30 10% 15% / 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{
          scaleX: phase === 0 || phase === 3
            ? [0.5, 1.3, 0.8, 1.1, 0.9, 1]
            : 1,
          opacity: phase <= 1 || phase >= 3 ? 0.5 : 0.2,
        }}
        transition={{
          scaleX: { duration: 1.4, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      />
    </div>
  );
};

export default JuicePourAnimation;
