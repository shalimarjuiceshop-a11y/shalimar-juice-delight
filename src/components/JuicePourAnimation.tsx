import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";

const JuicePourAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timings = [800, 2200, 2500, 2500, 3000];
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const advance = (p: number) => {
      if (cancelled) return;
      setPhase(p);
      timeout = setTimeout(() => advance(p >= 4 ? 0 : p + 1), timings[p]);
    };

    advance(1);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[380px] md:min-h-[480px] overflow-hidden select-none">

      {/* Soft warm glow behind glass */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "70%",
          height: "70%",
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.12) 0%, transparent 70%)",
        }}
        animate={{
          scale: phase >= 2 ? 1.3 : 1,
          opacity: phase >= 2 ? 0.7 : 0.2,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Decorative golden ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          border: "1px solid hsl(var(--pineapple-gold) / 0.15)",
          zIndex: 1,
        }}
        animate={{
          scale: phase >= 2 ? [1, 1.4] : 0.8,
          opacity: phase >= 2 ? [0.4, 0] : 0,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* ═══ PHASE 1: GLASS APPEARS WITH GENTLE FLOAT ═══ */}
      <motion.div
        className="relative"
        style={{ zIndex: 20 }}
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          y: phase >= 1 ? [40, 0] : 60,
          scale: phase >= 1 ? 1 : 0.85,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Gentle floating motion when visible */}
        <motion.div
          animate={phase >= 1 && phase <= 3 ? {
            y: [0, -6, 0],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={pineappleJuiceGlass}
            alt="Fresh Pineapple Juice"
            className="w-24 md:w-32 lg:w-36"
            style={{
              filter: "drop-shadow(0 12px 30px hsl(var(--pineapple-gold) / 0.3))",
            }}
          />

          {/* ═══ PHASE 2: JUICE POURING FROM TOP ═══ */}
          {/* Main pour stream */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 8,
              height: 80,
              left: "50%",
              top: -85,
              marginLeft: -4,
              background: "linear-gradient(to bottom, transparent, hsl(var(--pineapple-gold) / 0.7), hsl(var(--pineapple-gold) / 0.9))",
              borderRadius: 6,
              zIndex: 19,
              transformOrigin: "top center",
            }}
            animate={{
              opacity: phase === 2 ? [0, 1, 1, 0.6, 0] : 0,
              scaleY: phase === 2 ? [0, 0.3, 1, 0.8, 0] : 0,
            }}
            transition={{
              duration: 2,
              times: [0, 0.15, 0.5, 0.8, 1],
              ease: "easeInOut",
            }}
          />

          {/* Small side drips */}
          {[-5, 5].map((x, i) => (
            <motion.div
              key={`drip-${i}`}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 3,
                height: 50,
                left: `calc(50% + ${x}px)`,
                top: -65,
                background: "linear-gradient(to bottom, transparent, hsl(var(--pineapple-gold) / 0.5))",
                borderRadius: 4,
                zIndex: 19,
                transformOrigin: "top center",
              }}
              animate={{
                opacity: phase === 2 ? [0, 0.7, 0] : 0,
                scaleY: phase === 2 ? [0, 1, 0] : 0,
              }}
              transition={{
                duration: 1.6,
                delay: 0.3 + i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Splash droplets at glass rim */}
          {Array.from({ length: 6 }, (_, i) => {
            const angle = ((i / 6) * Math.PI) - Math.PI / 2;
            return (
              <motion.div
                key={`splash-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 3 + (i % 2) * 2,
                  height: 3 + (i % 2) * 2,
                  background: "hsl(var(--pineapple-gold) / 0.7)",
                  left: "50%",
                  top: "5%",
                  zIndex: 22,
                }}
                animate={{
                  opacity: phase === 2 ? [0, 1, 0] : 0,
                  x: phase === 2 ? [0, Math.cos(angle) * (15 + i * 5)] : 0,
                  y: phase === 2 ? [0, Math.sin(angle) * (12 + i * 4)] : 0,
                  scale: phase === 2 ? [0, 1, 0] : 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + i * 0.06,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* ═══ PHASE 2-3: JUICE FILL LEVEL RISING ═══ */}
          <motion.div
            className="absolute bottom-[8%] left-[20%] right-[20%] rounded-b-md overflow-hidden pointer-events-none"
            style={{
              transformOrigin: "bottom",
              zIndex: 21,
              height: "65%",
              background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.5), hsl(var(--pineapple-gold) / 0.25), transparent)",
              mixBlendMode: "overlay",
            }}
            animate={{
              scaleY: phase >= 3 ? 1 : phase === 2 ? [0, 0.3, 0.7] : 0,
              opacity: phase >= 2 ? 0.9 : 0,
            }}
            transition={{
              duration: phase === 2 ? 2 : 0.8,
              ease: "easeOut",
            }}
          />

          {/* Rising bubbles */}
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 2 + (i % 2) * 2,
                height: 2 + (i % 2) * 2,
                background: "hsl(0 0% 100% / 0.4)",
                left: `${28 + i * 12}%`,
                bottom: `${18 + i * 6}%`,
                zIndex: 22,
              }}
              animate={{
                opacity: phase === 2 || phase === 3 ? [0, 0.8, 0] : 0,
                y: phase === 2 || phase === 3 ? [0, -20, -40] : 0,
              }}
              transition={{
                duration: 1.8,
                delay: 0.5 + i * 0.3,
                ease: "easeOut",
                repeat: phase === 2 || phase === 3 ? Infinity : 0,
                repeatDelay: 1,
              }}
            />
          ))}
        </motion.div>

        {/* Glass shadow on surface */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "80%",
            height: 10,
            background: "radial-gradient(ellipse, hsl(var(--pineapple-gold) / 0.15), transparent)",
            borderRadius: "50%",
          }}
          animate={{ opacity: phase >= 1 ? 0.6 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Glass glow aura */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.2) 0%, transparent 65%)",
          }}
          animate={{
            opacity: phase >= 3 ? 1 : phase >= 2 ? 0.5 : 0,
            scale: phase >= 3 ? 1.8 : 1.2,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* ═══ PHASE 4: "JUST ₹10" BADGE ═══ */}
      <motion.div
        className="absolute bottom-6 md:bottom-10"
        style={{ zIndex: 40 }}
        animate={{
          scale: phase === 4 ? [0, 1.1, 1] : phase >= 4 ? 1 : 0,
          opacity: phase >= 4 ? 1 : 0,
          y: phase >= 4 ? 0 : 20,
        }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-7 py-2.5 md:px-9 md:py-3.5 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-xl md:text-2xl font-bold tracking-wide">JUST ₹10</span>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.25) 50%, transparent 100%)",
            }}
            animate={phase >= 4 ? { x: ["-100%", "200%"] } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Subtle sparkles on final phase */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const d = 50 + (i % 3) * 20;
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 3,
              height: 3,
              background: "hsl(var(--pineapple-gold))",
              boxShadow: "0 0 6px hsl(var(--pineapple-gold) / 0.6)",
              bottom: "15%",
              zIndex: 35,
            }}
            animate={{
              opacity: phase === 4 ? [0, 1, 0] : 0,
              x: phase === 4 ? [0, Math.cos(a) * d] : 0,
              y: phase === 4 ? [0, Math.sin(a) * d] : 0,
            }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

export default JuicePourAnimation;
