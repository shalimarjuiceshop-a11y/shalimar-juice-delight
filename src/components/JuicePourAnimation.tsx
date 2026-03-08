import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

// Total animation cycle duration
const TOTAL = 13;

const JuicePourAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase timings: 0=idle, 1=pineapple drop, 2=knife cut, 3=juice flow, 4=glass fill, 5=price reveal
    const timings = [500, 2000, 3500, 2000, 2500, 2500];
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const advance = (currentPhase: number) => {
      if (cancelled) return;
      setPhase(currentPhase);
      const nextPhase = currentPhase >= 5 ? 0 : currentPhase + 1;
      timeout = setTimeout(() => advance(nextPhase), timings[currentPhase]);
    };

    advance(1);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, []);

  const t = (s: number) => s / TOTAL;

  // Slice stacking data
  const sliceData = [
    { delay: 0, yEnd: -80 },
    { delay: 0.15, yEnd: -66 },
    { delay: 0.3, yEnd: -52 },
    { delay: 0.45, yEnd: -38 },
    { delay: 0.6, yEnd: -24 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[420px] md:min-h-[540px] overflow-hidden select-none">

      {/* Soft ambient glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80%",
          height: "80%",
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ═══ WOODEN CUTTING BOARD ═══ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "65%",
          maxWidth: 280,
          height: 18,
          background: "linear-gradient(180deg, hsl(28 45% 52%) 0%, hsl(25 40% 38%) 60%, hsl(22 35% 30%) 100%)",
          borderRadius: 6,
          bottom: "28%",
          zIndex: 4,
          boxShadow: "0 6px 20px hsl(25 30% 15% / 0.5), inset 0 1px 0 hsl(30 50% 65% / 0.3)",
        }}
        animate={{
          opacity: phase >= 1 && phase <= 3 ? 1 : 0,
          scaleX: phase >= 1 ? 1 : 0.7,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {[20, 40, 60, 80].map((left) => (
          <div key={left} className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, width: 1, height: "60%", background: "hsl(25 30% 30% / 0.3)", borderRadius: 1 }}
          />
        ))}
      </motion.div>

      {/* ═══ PHASE 1: PINEAPPLE DROPS ═══ */}
      <motion.div
        className="absolute"
        style={{ zIndex: 10, bottom: "30%" }}
        animate={{
          opacity: phase === 1 ? 1 : 0,
          y: phase === 1 ? 0 : -200,
          scale: phase === 1 ? 1 : 0.6,
          rotate: phase === 1 ? 0 : -15,
        }}
        transition={{
          duration: 1.2,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <img src={pineappleFruit} alt="Fresh Pineapple" className="w-28 md:w-36 drop-shadow-2xl" />
      </motion.div>

      {/* ═══ PHASE 2: KNIFE BLADE ═══ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 25,
          bottom: "30%",
          width: 6,
          height: 120,
          background: "linear-gradient(180deg, hsl(0 0% 75%) 0%, hsl(0 0% 92%) 40%, hsl(0 0% 85%) 100%)",
          borderRadius: "2px 2px 1px 1px",
          boxShadow: "2px 0 6px hsl(0 0% 0% / 0.2), -1px 0 4px hsl(0 0% 100% / 0.3)",
          transformOrigin: "bottom center",
        }}
        animate={{
          opacity: phase === 2 ? [0, 1, 1, 1, 1, 0] : 0,
          y: phase === 2 ? [-180, -60, 10, -80, 0, -200] : -200,
        }}
        transition={{
          duration: 3,
          times: phase === 2 ? [0, 0.1, 0.3, 0.5, 0.7, 1] : undefined,
          ease: "easeInOut",
        }}
      >
        {/* Knife handle */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2" style={{
          width: 14, height: 32,
          background: "linear-gradient(180deg, hsl(25 50% 25%), hsl(25 40% 35%))",
          borderRadius: 3,
        }} />
        {/* Blade edge */}
        <div className="absolute right-0 top-0 bottom-0" style={{
          width: 1, background: "linear-gradient(180deg, transparent, hsl(0 0% 100% / 0.6), transparent)",
        }} />
      </motion.div>

      {/* ═══ PINEAPPLE SLICES STACKING ═══ */}
      {sliceData.map((slice, i) => (
        <motion.div
          key={`slice-${i}`}
          className="absolute pointer-events-none"
          style={{ zIndex: 12 + i, bottom: "30%" }}
          animate={{
            opacity: phase === 2 || phase === 3 ? 1 : 0,
            y: phase >= 2 && phase <= 3 ? slice.yEnd : -20,
            scale: phase >= 2 ? 1 : 0.3,
            rotate: -2 + i * 1.5,
          }}
          transition={{
            duration: 0.5,
            delay: phase === 2 ? 0.3 + slice.delay * 2.5 : 0,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <img src={pineappleSlices} alt="" className="w-14 md:w-18 drop-shadow-lg" />
        </motion.div>
      ))}

      {/* Juice droplets during cutting */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = ((i / 8) * Math.PI * 1.6) - Math.PI * 0.3;
        const dist = 25 + (i % 4) * 18;
        const size = 3 + (i % 3) * 2;
        return (
          <motion.div
            key={`drop-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size, height: size,
              background: `hsl(var(--pineapple-gold) / ${0.55 + (i % 3) * 0.15})`,
              bottom: "32%", zIndex: 23,
            }}
            animate={{
              opacity: phase === 2 ? [0, 0.9, 0] : 0,
              x: phase === 2 ? [0, Math.cos(angle) * dist, Math.cos(angle) * dist * 1.1] : 0,
              y: phase === 2 ? [0, Math.sin(angle) * dist, Math.sin(angle) * dist + 30] : 0,
            }}
            transition={{
              duration: 1.2,
              delay: phase === 2 ? 0.3 + (i % 3) * 0.4 : 0,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* ═══ PHASE 3: JUICE STREAM ═══ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 10, bottom: "10%", height: "22%",
          background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.85), hsl(var(--pineapple-gold) / 0.6), hsl(var(--pineapple-gold) / 0.15))",
          borderRadius: 8, zIndex: 18, filter: "blur(0.5px)", transformOrigin: "top center",
        }}
        animate={{
          opacity: phase === 3 ? [0, 0.9, 1] : 0,
          scaleY: phase === 3 ? [0, 0.4, 1] : 0,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Side drips */}
      {[-7, 7].map((offset, i) => (
        <motion.div
          key={`drip-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 4, bottom: "14%", height: "15%",
            background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.6), transparent)",
            borderRadius: 4, left: `calc(50% + ${offset}px)`,
            zIndex: 17, filter: "blur(0.5px)", transformOrigin: "top center",
          }}
          animate={{
            opacity: phase === 3 ? 0.7 : 0,
            scaleY: phase === 3 ? 1 : 0,
          }}
          transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: "easeOut" }}
        />
      ))}

      {/* ═══ PHASE 4: GLASS RISES & FILLS ═══ */}
      <motion.div
        className="relative"
        style={{ zIndex: 28 }}
        animate={{
          opacity: phase >= 3 ? 1 : 0,
          x: phase >= 4 ? 0 : phase === 3 ? 80 : 250,
          y: phase >= 4 ? 15 : 15,
          scale: phase >= 4 ? 1 : 0.9,
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice"
          className="w-28 md:w-40 lg:w-44"
          style={{ filter: "drop-shadow(0 10px 25px hsl(var(--pineapple-gold) / 0.25))" }}
        />

        {/* Juice fill */}
        <motion.div
          className="absolute bottom-[8%] left-[18%] right-[18%] rounded-b-md overflow-hidden pointer-events-none"
          style={{
            transformOrigin: "bottom", zIndex: 29, height: "68%",
            background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.45), hsl(var(--pineapple-gold) / 0.2), transparent)",
            mixBlendMode: "overlay",
          }}
          animate={{
            scaleY: phase >= 4 ? 1 : phase === 3 ? 0.2 : 0,
            opacity: phase >= 4 ? 0.95 : phase === 3 ? 0.3 : 0,
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        {/* Bubbles */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 2 + (i % 3) * 2, height: 2 + (i % 3) * 2,
              background: `hsl(0 0% 100% / ${0.35 + i * 0.05})`,
              left: `${25 + i * 10}%`, bottom: `${15 + i * 5}%`, zIndex: 30,
            }}
            animate={{
              opacity: phase === 4 ? [0, 0.8, 0] : 0,
              y: phase === 4 ? [0, -28, -45] : 0,
            }}
            transition={{ duration: 1.5, delay: 0.4 + i * 0.2, ease: "easeOut" }}
          />
        ))}

        {/* Glass glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.2) 0%, transparent 65%)" }}
          animate={{
            opacity: phase >= 4 ? 1 : 0,
            scale: phase >= 5 ? 1.6 : phase >= 4 ? 1.3 : 0.8,
          }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      {/* ═══ PHASE 5: "JUST ₹10" BADGE ═══ */}
      <motion.div
        className="absolute bottom-4 md:bottom-8"
        style={{ zIndex: 40 }}
        animate={{
          scale: phase === 5 ? 1 : 0,
          opacity: phase === 5 ? 1 : 0,
          y: phase === 5 ? 0 : 30,
        }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-8 py-3 md:px-10 md:py-4 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-wide">JUST ₹10</span>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.3) 50%, transparent 100%)" }}
            animate={phase === 5 ? { x: ["-100%", "200%"] } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Sparkles on reveal */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const d = 60 + (i % 3) * 25;
        return (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 3 + (i % 2) * 2, height: 3 + (i % 2) * 2,
              background: "hsl(var(--pineapple-gold))",
              boxShadow: "0 0 6px 2px hsl(var(--pineapple-gold) / 0.5)",
              bottom: "10%", zIndex: 38,
            }}
            animate={{
              opacity: phase === 5 ? [0, 1, 0] : 0,
              x: phase === 5 ? [0, Math.cos(a) * d] : 0,
              y: phase === 5 ? [0, Math.sin(a) * d] : 0,
              scale: phase === 5 ? [0, 1.3, 0] : 0,
            }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

export default JuicePourAnimation;
