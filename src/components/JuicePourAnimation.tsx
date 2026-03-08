import { motion } from "framer-motion";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

// Total cycle: 12s animation
const CYCLE = 12;
const TOTAL = CYCLE;

const JuicePourAnimation = () => {
  // Timeline phases (in seconds):
  // Phase 1: 0-2s    → Pineapple drops from top
  // Phase 2: 2-5s    → Knife cuts pineapple into slices (stacking)
  // Phase 3: 5-7s    → Slices compress, juice extracts
  // Phase 4: 7-9s    → Juice pours into glass
  // Phase 5: 9-12s   → "JUST ₹10" reveal + glass glow

  const t = (s: number) => s / TOTAL;

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] md:min-h-[520px] overflow-hidden">
      
      {/* Ambient tropical glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.12) 0%, transparent 65%)",
        }}
        animate={{ 
          scale: [1, 1.1, 1.05, 1.15, 1],
          opacity: [0.2, 0.4, 0.5, 0.7, 0.2],
        }}
        transition={{ duration: TOTAL, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cutting board / base surface */}
      <motion.div
        className="absolute"
        style={{
          width: "70%",
          height: 12,
          background: "linear-gradient(90deg, hsl(30 40% 35%), hsl(30 35% 45%), hsl(30 40% 35%))",
          borderRadius: 4,
          bottom: "32%",
          zIndex: 5,
          boxShadow: "0 4px 12px hsl(30 40% 20% / 0.4)",
        }}
        animate={{
          opacity: [0, 1, 1, 1, 0.5, 0],
          scaleX: [0.8, 1, 1, 1, 0.9, 0],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(0.5), t(5), t(6.5), t(7.5), t(8)],
          repeat: Infinity,
        }}
      />

      {/* ═══════ PHASE 1: Whole Pineapple Drops ═══════ */}
      <motion.div
        className="absolute"
        style={{ zIndex: 10 }}
        animate={{
          opacity: [0, 1, 1, 1, 0, 0, 0, 0],
          y: [-150, -80, 30, 30, 30, 30, 30, 30],
          scale: [0.7, 0.9, 1, 1, 0, 0, 0, 0],
          rotate: [0, -5, 0, 0, 0, 0, 0, 0],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(0.5), t(1.5), t(2), t(2.3), t(3), t(6), 1],
          ease: "easeOut",
          repeat: Infinity,
        }}
      >
        <motion.img
          src={pineappleFruit}
          alt="Fresh Pineapple"
          className="w-28 md:w-36 drop-shadow-2xl"
        />
      </motion.div>

      {/* ═══════ PHASE 2: Knife Cutting Animation ═══════ */}
      <motion.div
        className="absolute"
        style={{ 
          zIndex: 25,
          width: 100,
          height: 4,
          background: "linear-gradient(90deg, hsl(0 0% 70%), hsl(0 0% 85%), hsl(0 0% 70%))",
          borderRadius: 2,
          boxShadow: "0 2px 8px hsl(0 0% 0% / 0.3)",
        }}
        animate={{
          opacity: [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
          x: [-80, -80, -80, 80, -80, 80, -80, 80, 80, 80],
          y: [30, 30, 30, 40, 50, 60, 70, 80, 80, 80],
          rotate: [0, 0, -5, 5, -5, 5, -5, 5, 0, 0],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(1.8), t(2), t(2.5), t(3), t(3.5), t(4), t(4.5), t(5), 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Knife blade shine */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 60,
          height: 2,
          background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.8), transparent)",
          zIndex: 26,
        }}
        animate={{
          opacity: [0, 0, 0.8, 0, 0.8, 0, 0.8, 0, 0, 0],
          x: [-60, -60, 80, 80, 80, 80, 80, 80, 80, 80],
          y: [30, 30, 38, 38, 58, 58, 78, 78, 78, 78],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(1.8), t(2.3), t(2.6), t(3.3), t(3.6), t(4.3), t(4.6), t(5), 1],
          repeat: Infinity,
        }}
      />

      {/* ═══════ Pineapple Slices Stacking ═══════ */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.img
          key={`stack-slice-${i}`}
          src={pineappleSlices}
          alt=""
          className="absolute w-16 md:w-20 pointer-events-none drop-shadow-lg"
          style={{ zIndex: 15 + i }}
          animate={{
            opacity: [0, 0, 0, 0, i <= 0 ? 1 : 0, i <= 1 ? 1 : 0, i <= 2 ? 1 : 0, i <= 3 ? 1 : 0, 1, 1, 0.5, 0],
            y: [30, 30, 30, 30, 50 - i * 12, 50 - i * 12, 50 - i * 12, 50 - i * 12, 50 - i * 12, 100, 150, 150],
            scale: [0, 0, 0, 0, 1, 1, 1, 1, 1, 0.8, 0.3, 0],
            rotate: [0, 0, 0, 0, -3 + i * 2, -3 + i * 2, -3 + i * 2, -3 + i * 2, 0, 0, 0, 0],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(1.5), t(2), t(2.2 + i * 0.4), t(2.5 + i * 0.4), t(3 + i * 0.3), t(4), t(5), t(5.5), t(6.2), t(7), 1],
            ease: "easeOut",
            repeat: Infinity,
          }}
        />
      ))}

      {/* Juice droplets during cutting */}
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const radius = 30 + (i % 4) * 15;
        return (
          <motion.div
            key={`cut-drop-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              background: `hsl(var(--pineapple-gold) / ${0.6 + (i % 3) * 0.1})`,
              zIndex: 20,
            }}
            animate={{
              opacity: [0, 0, 0, 0.9, 0.6, 0, 0, 0, 0],
              x: [0, 0, 0, Math.cos(angle) * radius * 0.5, Math.cos(angle) * radius, Math.cos(angle) * radius, 0, 0, 0],
              y: [40, 40, 40, 40 + Math.sin(angle) * radius * 0.5, 40 + Math.sin(angle) * radius + 20, 40 + Math.sin(angle) * radius + 50, 0, 0, 0],
              scale: [0, 0, 0, 1, 0.8, 0, 0, 0, 0],
            }}
            transition={{
              duration: TOTAL,
              times: [0, t(2), t(2.3 + i * 0.15), t(2.8 + i * 0.1), t(3.5 + i * 0.08), t(4.5), t(5.5), t(6), 1],
              ease: "easeOut",
              repeat: Infinity,
            }}
          />
        );
      })}

      {/* ═══════ PHASE 3: Juice Extraction Stream ═══════ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 14,
          height: "40%",
          background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.8), hsl(var(--pineapple-gold) / 0.5), hsl(var(--pineapple-gold) / 0.2))",
          borderRadius: 8,
          top: "45%",
          zIndex: 22,
          filter: "blur(1px)",
        }}
        animate={{
          opacity: [0, 0, 0, 0, 0, 0.9, 1, 0.7, 0, 0],
          scaleY: [0, 0, 0, 0, 0, 0.3, 1, 1.2, 0, 0],
          scaleX: [1, 1, 1, 1, 1, 0.8, 1, 0.5, 0, 0],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(2), t(4), t(5), t(5.5), t(6), t(6.8), t(7.5), t(8.2), 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Side juice streams */}
      {[-8, 8].map((offset, i) => (
        <motion.div
          key={`side-stream-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 6,
            height: "30%",
            background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.6), transparent)",
            borderRadius: 4,
            top: "48%",
            left: `calc(50% + ${offset}px)`,
            zIndex: 21,
            filter: "blur(1px)",
          }}
          animate={{
            opacity: [0, 0, 0, 0, 0, 0.6, 0.8, 0.4, 0, 0],
            scaleY: [0, 0, 0, 0, 0, 0.4, 1, 0.6, 0, 0],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(3), t(5), t(5.5), t(5.8), t(6.2), t(7), t(7.8), t(8.5), 1],
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}

      {/* ═══════ PHASE 4: Glass Rises & Fills ═══════ */}
      <motion.div
        className="relative"
        style={{ zIndex: 30 }}
        animate={{
          y: [280, 280, 280, 280, 280, 280, 150, 30, 30, 30, 30],
          opacity: [0, 0, 0, 0, 0, 0.3, 0.8, 1, 1, 1, 1],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(2), t(4), t(5), t(5.5), t(6), t(6.8), t(7.5), t(9), t(11), 1],
          ease: "easeOut",
          repeat: Infinity,
        }}
      >
        <motion.img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice"
          className="w-28 md:w-40 lg:w-44 drop-shadow-2xl"
        />

        {/* Juice fill effect */}
        <motion.div
          className="absolute bottom-[8%] left-[18%] right-[18%] rounded-b-md overflow-hidden pointer-events-none"
          style={{
            transformOrigin: "bottom",
            zIndex: 31,
            height: "65%",
            background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.5), hsl(var(--pineapple-gold) / 0.2), transparent)",
            mixBlendMode: "overlay",
          }}
          animate={{
            scaleY: [0, 0, 0, 0, 0, 0, 0, 0.4, 0.8, 1, 1],
            opacity: [0, 0, 0, 0, 0, 0, 0, 0.6, 0.9, 1, 1],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(2), t(4), t(5), t(6), t(6.5), t(7), t(7.5), t(8.2), t(9), 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Bubbles in glass */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`glass-bubble-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              background: `hsl(var(--pineapple-gold) / ${0.4 + i * 0.05})`,
              left: `${22 + i * 9}%`,
              bottom: `${12 + i * 7}%`,
              zIndex: 32,
            }}
            animate={{
              opacity: [0, 0, 0, 0, 0, 0, 0, 0.7, 0.9, 0, 0],
              y: [0, 0, 0, 0, 0, 0, 0, -8, -25, -40, -40],
              scale: [0, 0, 0, 0, 0, 0, 0, 1, 1.1, 0, 0],
            }}
            transition={{
              duration: TOTAL,
              times: [0, t(3), t(5), t(6), t(6.5), t(7), t(7.3), t(7.8), t(8.5), t(9.2), 1],
              ease: "easeOut",
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Glass glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.3) 0%, transparent 60%)",
          }}
          animate={{
            opacity: [0, 0, 0, 0, 0, 0, 0.4, 0.8, 1, 1, 0.6],
            scale: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1, 1.3, 1.5, 1.5, 1.2],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(2), t(4), t(5), t(6), t(6.8), t(7.5), t(8.2), t(9), t(11), 1],
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* ═══════ PHASE 5: "JUST ₹10" Price Badge ═══════ */}
      <motion.div
        className="absolute bottom-4 md:bottom-8"
        style={{ zIndex: 40 }}
        animate={{
          scale: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.15, 1],
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
          y: [30, 30, 30, 30, 30, 30, 30, 30, 30, -8, 0],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(2), t(4), t(5), t(6), t(7), t(8), t(8.5), t(9), t(9.8), t(10.5)],
          ease: "backOut",
          repeat: Infinity,
        }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-8 py-3 md:px-10 md:py-4 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-wide">JUST ₹10</span>
          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(var(--pineapple-gold) / 0.4) 50%, transparent 100%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.2,
              delay: TOTAL * t(10),
              repeat: Infinity,
              repeatDelay: TOTAL - 1.2,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Sparkle effects during finale */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 4,
            height: 4,
            background: "hsl(var(--pineapple-gold))",
            borderRadius: "50%",
            boxShadow: "0 0 8px hsl(var(--pineapple-gold))",
            zIndex: 35,
          }}
          animate={{
            opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            x: [(i - 3) * 30, (i - 3) * 30, (i - 3) * 30, (i - 3) * 30, (i - 3) * 30, (i - 3) * 30, (i - 3) * 30, (i - 3) * 30, (i - 3) * 30, (i - 3) * 50, (i - 3) * 70],
            y: [60, 60, 60, 60, 60, 60, 60, 60, 60, 40 + (i % 2) * 30, 20],
            scale: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.2, 0],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(2), t(4), t(5), t(6), t(7), t(8), t(9), t(9.5), t(10.2), t(11)],
            ease: "easeOut",
            repeat: Infinity,
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
};

export default JuicePourAnimation;
