import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";

/*
  Clean 3-phase cinematic animation:
  Phase 0 — Pineapple floats elegantly (3.5s)
  Phase 1 — Pineapple fades, glass rises from below with golden glow (3s)
  Phase 2 — Glass settles, price badge appears with subtle shine (4s)
  Then loops.
*/
const TIMINGS = [3500, 3000, 4000];

const JuicePourAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const advance = (p: number) => {
      if (cancelled) return;
      setPhase(p);
      const next = p >= 2 ? 0 : p + 1;
      timeout = setTimeout(() => advance(next), TIMINGS[p]);
    };

    timeout = setTimeout(() => advance(0), 300);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center min-h-[320px] md:min-h-[480px] select-none overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{
          scale: phase === 1 ? 1.2 : 1,
          opacity: phase === 1 ? 0.6 : 0.3,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* ── PHASE 0: PINEAPPLE SHOWCASE ── */}
      <motion.div
        className="absolute"
        style={{ zIndex: 10, bottom: "18%" }}
        animate={{
          opacity: phase === 0 ? 1 : 0,
          y: phase === 0 ? [8, -8, 8] : 30,
          scale: phase === 0 ? 1 : 0.85,
        }}
        transition={{
          opacity: { duration: 0.8 },
          y: { duration: 3, repeat: phase === 0 ? Infinity : 0, ease: "easeInOut" },
          scale: { duration: 0.8 },
        }}
      >
        <img
          src={pineappleFruit}
          alt="Fresh Pineapple"
          className="h-48 md:h-64 w-auto drop-shadow-2xl"
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      {/* ── PHASE 1 & 2: JUICE GLASS ── */}
      <motion.div
        className="absolute"
        style={{ zIndex: 20, bottom: "14%" }}
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          y: phase >= 1 ? 0 : 60,
          scale: phase === 2 ? 1.08 : 1,
        }}
        transition={{
          opacity: { duration: 0.6, ease: "easeOut" },
          y: { duration: 1, ease: "easeOut" },
          scale: { duration: 1.2, ease: "easeInOut" },
        }}
      >
        <img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice"
          className="h-48 md:h-60 w-auto"
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 12px 28px hsl(var(--pineapple-gold) / 0.25))",
          }}
        />

        {/* Golden glow behind glass */}
        <motion.div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.15) 0%, transparent 55%)",
            borderRadius: "50%",
            transform: "scale(1.6)",
          }}
          animate={{
            opacity: phase >= 1 ? [0.4, 0.7, 0.4] : 0,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* ── PHASE 2: PRICE BADGE ── */}
      <motion.div
        className="absolute bottom-4 md:bottom-8"
        style={{ zIndex: 30 }}
        animate={{
          opacity: phase === 2 ? 1 : 0,
          y: phase === 2 ? 0 : 16,
          scale: phase === 2 ? 1 : 0.9,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: phase === 2 ? 0.3 : 0,
        }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-8 py-2.5 md:px-10 md:py-3 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-lg md:text-2xl font-bold tracking-wide">
            JUST ₹10
          </span>
          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.25) 50%, transparent 100%)",
            }}
            animate={phase === 2 ? { x: ["-100%", "200%"] } : { x: "-100%" }}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Ground reflection */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          width: "30%",
          height: 6,
          background: "radial-gradient(ellipse, hsl(30 10% 15% / 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 1,
        }}
        animate={{
          scaleX: phase >= 1 ? 1 : 0.5,
          opacity: phase >= 1 ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

export default JuicePourAnimation;
