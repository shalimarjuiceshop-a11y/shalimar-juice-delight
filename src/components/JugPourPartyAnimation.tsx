import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import juiceFullGlass from "@/assets/juice-pour-real.png.asset.json";

/**
 * Always-full juice glass with a continuous juice drop animation from above.
 * Glass quantity never changes — only the falling stream + droplets animate.
 * "Book Now" badge appears briefly on a slow rhythm.
 */
const JugPourPartyAnimation = () => {
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const cycle = () => {
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 2200);
    };
    cycle();
    const id = setInterval(cycle, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[210px] h-[220px] md:h-[240px] select-none pointer-events-none">
      {/* Book Now badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
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

      {/* Falling juice droplets from above the glass */}
      <div className="absolute inset-0 z-10 overflow-visible">
        {[0, 0.4, 0.8, 1.2, 1.6].map((delay, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${48 + (i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}%`,
              top: "0%",
              width: 6,
              height: 10,
              background:
                "linear-gradient(180deg, hsl(45 100% 65%), hsl(32 100% 50%))",
              boxShadow: "0 0 8px hsl(38 100% 55% / 0.6)",
            }}
            initial={{ y: -10, opacity: 0, scaleY: 0.8 }}
            animate={{
              y: [-10, 70],
              opacity: [0, 1, 1, 0],
              scaleY: [0.8, 1.4, 1.6, 1],
            }}
            transition={{
              duration: 1.1,
              delay,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: "easeIn",
            }}
          />
        ))}

        {/* Soft glow at impact point on rim */}
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: "30%",
            width: 18,
            height: 6,
            background:
              "radial-gradient(ellipse, hsl(45 100% 70% / 0.55), transparent 70%)",
            filter: "blur(2px)",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* The full juice glass photo — fixed, always full */}
      <img
        src={juiceFullGlass.url}
        alt="Fresh juice"
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain z-20"
        style={{ filter: "drop-shadow(0 18px 22px hsl(30 50% 4% / 0.5))" }}
      />

      {/* Ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[2%] h-[6px] rounded-[50%] z-0"
        style={{
          width: "55%",
          background:
            "radial-gradient(ellipse at center, hsl(30 30% 4% / 0.6), transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* Sparkles around full glass */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full z-30"
          style={{
            left: `${22 + i * 18}%`,
            top: `${20 + (i % 2) * 12}%`,
            background: "hsl(48 100% 75%)",
            boxShadow: "0 0 8px hsl(45 100% 60%)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.4, 0],
            y: [0, -10],
          }}
          transition={{
            duration: 1.8,
            delay: i * 0.35,
            repeat: Infinity,
            repeatDelay: 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default JugPourPartyAnimation;
