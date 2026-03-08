import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";

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
    <div className="relative w-full flex items-center justify-center h-[280px] sm:h-[340px] md:h-[420px] lg:h-[460px] select-none">
      {/* Ambient glow - centered */}
      <motion.div
        className="absolute inset-0 m-auto pointer-events-none"
        style={{
          width: "50%",
          height: "50%",
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{
          scale: phase === 1 ? 1.2 : 1,
          opacity: phase === 1 ? 0.6 : 0.3,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* PHASE 0: Pineapple - vertically centered */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 10 }}
        animate={{
          opacity: phase === 0 ? 1 : 0,
          y: phase === 0 ? [4, -6, 4] : 20,
          scale: phase === 0 ? 1 : 0.85,
        }}
        transition={{
          opacity: { duration: 0.7 },
          y: { duration: 3, repeat: phase === 0 ? Infinity : 0, ease: "easeInOut" },
          scale: { duration: 0.7 },
        }}
      >
        <img
          src={pineappleFruit}
          alt="Fresh Pineapple"
          className="h-36 sm:h-44 md:h-56 lg:h-64 w-auto drop-shadow-2xl"
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      {/* PHASE 1 & 2: Juice Glass - vertically centered */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 20 }}
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          y: phase >= 1 ? 0 : 40,
          scale: phase === 2 ? 1.06 : 1,
        }}
        transition={{
          opacity: { duration: 0.6, ease: "easeOut" },
          y: { duration: 0.9, ease: "easeOut" },
          scale: { duration: 1, ease: "easeInOut" },
        }}
      >
        <div className="relative">
          <img
            src={pineappleJuiceGlass}
            alt="Fresh Pineapple Juice"
            className="h-36 sm:h-44 md:h-52 lg:h-60 w-auto"
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 10px 24px hsl(var(--pineapple-gold) / 0.2))",
            }}
          />
          {/* Golden glow */}
          <motion.div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.12) 0%, transparent 55%)",
              borderRadius: "50%",
              transform: "scale(1.5)",
            }}
            animate={{
              opacity: phase >= 1 ? [0.3, 0.6, 0.3] : 0,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* PHASE 2: Price Badge - bottom center */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 30 }}
        animate={{
          opacity: phase === 2 ? 1 : 0,
          y: phase === 2 ? 0 : 12,
          scale: phase === 2 ? 1 : 0.9,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: phase === 2 ? 0.3 : 0,
        }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 md:py-3 shadow-pineapple relative overflow-hidden whitespace-nowrap">
          <span className="font-display text-base sm:text-lg md:text-2xl font-bold tracking-wide">
            JUST ₹10
          </span>
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

      {/* Ground shadow */}
      <motion.div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "28%",
          height: 5,
          background: "radial-gradient(ellipse, hsl(30 10% 15% / 0.07) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 1,
        }}
        animate={{
          scaleX: phase >= 1 ? 1 : 0.5,
          opacity: phase >= 1 ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

export default JuicePourAnimation;
