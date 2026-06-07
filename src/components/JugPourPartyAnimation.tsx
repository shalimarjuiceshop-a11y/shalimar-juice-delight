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

    </div>
  );
};

export default JugPourPartyAnimation;
