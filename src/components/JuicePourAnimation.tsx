import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";

// Phase durations in ms
// 0=cut, 1=slices rise, 2=glass slides in (empty), 3=juice fills, 4=glass zoom, 5=price
const TIMINGS = [5000, 2400, 3000, 3600, 3000, 5000];

const JuicePourAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const advance = (p: number) => {
      if (cancelled) return;
      setPhase(p);
      const next = p >= 5 ? 0 : p + 1;
      timeout = setTimeout(() => advance(next), TIMINGS[p]);
    };

    timeout = setTimeout(() => advance(0), 400);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center min-h-[500px] md:min-h-[600px] select-none overflow-hidden">
      {/* Soft ambient glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "70%",
          height: "70%",
          background:
            "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.08) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── PHASE 0 & 1: WHOLE PINEAPPLE + KNIFE CUT ── */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ zIndex: 10, bottom: "22%" }}
        animate={{
          opacity: phase <= 1 ? 1 : 0,
          scale: phase <= 1 ? 1 : 0.7,
          y: phase === 0 ? 0 : -10,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <img
          src={pineappleFruit}
          alt="Fresh Pineapple"
          className="h-52 md:h-72 w-auto"
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      {/* Knife blade - slow smooth cut */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 20,
          bottom: "24%",
          width: 5,
          height: 100,
          background:
            "linear-gradient(180deg, hsl(0 0% 78%) 0%, hsl(0 0% 93%) 45%, hsl(0 0% 88%) 100%)",
          borderRadius: "2px 2px 1px 1px",
          boxShadow:
            "1px 0 4px hsl(0 0% 0% / 0.15), -1px 0 3px hsl(0 0% 100% / 0.25)",
          transformOrigin: "bottom center",
        }}
        animate={{
          opacity: phase === 0 ? [0, 0, 1, 1, 1, 0] : 0,
          y: phase === 0 ? [-160, -160, -50, 20, -30, -160] : -160,
        }}
        transition={{
          duration: 2.2,
          times: phase === 0 ? [0, 0.15, 0.3, 0.55, 0.75, 1] : undefined,
          ease: "easeInOut",
        }}
      >
        {/* Knife handle */}
        <div
          className="absolute -top-7 left-1/2 -translate-x-1/2"
          style={{
            width: 12,
            height: 28,
            background:
              "linear-gradient(180deg, hsl(25 50% 28%), hsl(25 42% 38%))",
            borderRadius: 3,
          }}
        />
      </motion.div>

      {/* Juice droplets during cutting */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = ((i / 6) * Math.PI * 1.4) - Math.PI * 0.2;
        const dist = 20 + (i % 3) * 14;
        const size = 3 + (i % 3);
        return (
          <motion.div
            key={`drop-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              background: `hsl(var(--pineapple-gold) / ${0.5 + (i % 3) * 0.15})`,
              bottom: "30%",
              zIndex: 18,
            }}
            animate={{
              opacity: phase === 0 ? [0, 0.8, 0] : 0,
              x: phase === 0 ? [0, Math.cos(angle) * dist] : 0,
              y: phase === 0 ? [0, Math.sin(angle) * dist] : 0,
            }}
            transition={{
              duration: 0.9,
              delay: phase === 0 ? 1 + (i % 3) * 0.25 : 0,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* ── PHASE 1: PINEAPPLE SLICES RISE ── */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`slice-${i}`}
          className="absolute pointer-events-none"
          style={{ zIndex: 12 + i, bottom: "24%" }}
          animate={{
            opacity: phase === 1 || phase === 2 ? 1 : 0,
            y:
              phase === 1
                ? -30 - i * 16
                : phase === 2
                ? -50 - i * 12
                : 0,
            rotate: -3 + i * 2,
            scale: phase >= 1 && phase <= 2 ? 1 : 0.4,
          }}
          transition={{
            duration: 0.7,
            delay: phase === 1 ? i * 0.12 : 0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <img
            src={pineappleSlices}
            alt=""
            className="h-14 md:h-16 w-auto"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      ))}

      {/* ── PHASE 2: EMPTY GLASS SLIDES FROM RIGHT ── */}
      <motion.div
        className="absolute"
        style={{ zIndex: 25, bottom: "16%" }}
        animate={{
          opacity: phase >= 2 ? 1 : 0,
          x: phase >= 2 ? 0 : 250,
          scale: phase === 4 ? 1.4 : phase >= 2 ? 1 : 0.8,
          y: phase === 4 ? -20 : 0,
        }}
        transition={{
          x: { duration: 1, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.4 },
          scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.8, ease: "easeOut" },
        }}
      >
        <img
          src={pineappleJuiceGlass}
          alt="₹10 Pineapple Juice Glass"
          className="h-32 md:h-40 w-auto"
          style={{
            objectFit: "contain",
            filter:
              "drop-shadow(0 8px 20px hsl(var(--pineapple-gold) / 0.2))",
          }}
        />

        {/* ── PHASE 3: JUICE FILLS INSIDE GLASS ── */}
        <motion.div
          className="absolute bottom-[8%] left-[20%] right-[20%] overflow-hidden pointer-events-none"
          style={{
            height: "65%",
            transformOrigin: "bottom",
            background:
              "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.45), hsl(var(--pineapple-gold) / 0.18), transparent)",
            borderRadius: "0 0 4px 4px",
            mixBlendMode: "overlay",
            zIndex: 26,
          }}
          animate={{
            scaleY: phase >= 3 ? 1 : 0,
            opacity: phase >= 3 ? 0.9 : 0,
          }}
          transition={{
            duration: 1.6,
            ease: "easeOut",
          }}
        />

        {/* Bubbles */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`bub-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 2 + (i % 2) * 2,
              height: 2 + (i % 2) * 2,
              background: `hsl(0 0% 100% / ${0.3 + i * 0.08})`,
              left: `${25 + i * 12}%`,
              bottom: `${18 + i * 8}%`,
              zIndex: 27,
            }}
            animate={{
              opacity: phase === 3 ? [0, 0.7, 0] : 0,
              y: phase === 3 ? [0, -20, -35] : 0,
            }}
            transition={{
              duration: 1.2,
              delay: 0.5 + i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* ── PHASE 4: GLOW ON ZOOM ── */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.2) 0%, transparent 60%)",
          }}
          animate={{
            opacity: phase === 4 ? 1 : 0,
            scale: phase === 4 ? 1.8 : 1,
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Juice stream from slices to glass */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 6,
          height: "12%",
          bottom: "28%",
          background:
            "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.7), hsl(var(--pineapple-gold) / 0.3), transparent)",
          borderRadius: 6,
          zIndex: 15,
          transformOrigin: "top center",
          filter: "blur(0.5px)",
        }}
        animate={{
          opacity: phase === 3 ? [0, 0.85, 0.6] : 0,
          scaleY: phase === 3 ? [0, 1, 0.8] : 0,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* ── PHASE 5: "JUST ₹10" BADGE ── */}
      <motion.div
        className="absolute bottom-2 md:bottom-6"
        style={{ zIndex: 35 }}
        animate={{
          opacity: phase === 5 ? 1 : 0,
          scale: phase === 5 ? [0.6, 1.08, 1] : 0.6,
          y: phase === 5 ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-7 py-2.5 md:px-9 md:py-3 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-xl md:text-2xl font-bold tracking-wide">
            JUST ₹10
          </span>
          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.3) 50%, transparent 100%)",
            }}
            animate={phase === 5 ? { x: ["-100%", "200%"] } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Subtle sparkles on price reveal */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const d = 45 + (i % 2) * 18;
        return (
          <motion.div
            key={`sp-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3,
              height: 3,
              background: "hsl(var(--pineapple-gold))",
              boxShadow: "0 0 5px hsl(var(--pineapple-gold) / 0.5)",
              bottom: "6%",
              zIndex: 34,
            }}
            animate={{
              opacity: phase === 5 ? [0, 1, 0] : 0,
              x: phase === 5 ? [0, Math.cos(a) * d] : 0,
              y: phase === 5 ? [0, Math.sin(a) * d] : 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.06,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Ground shadow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "14%",
          width: "35%",
          height: 8,
          background:
            "radial-gradient(ellipse, hsl(30 10% 15% / 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 1,
        }}
        animate={{
          scaleX: phase >= 2 ? 1 : 0.6,
          opacity: phase >= 2 ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default JuicePourAnimation;
