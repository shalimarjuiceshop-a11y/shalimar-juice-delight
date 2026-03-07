import { motion } from "framer-motion";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

// Total cycle: 10s animation + 1s pause
const CYCLE = 10;
const PAUSE = 1;
const TOTAL = CYCLE + PAUSE;

const JuicePourAnimation = () => {
  // Timeline phases (in seconds):
  // Phase 1: 0-2s    → Pineapple appears, rotates, glows
  // Phase 2: 2-3.5s  → Pineapple slices apart (cutting)
  // Phase 3: 3.5-5.5s → Juice extraction (liquid flows down)
  // Phase 4: 5-7.5s  → Glass rises, juice fills
  // Phase 5: 7.5-10s → "JUST ₹10" reveal

  const t = (s: number) => s / TOTAL; // normalize to 0-1

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] md:min-h-[520px] overflow-hidden">
      
      {/* Ambient tropical glow - pulses throughout */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.15) 0%, transparent 65%)",
        }}
        animate={{ 
          scale: [1, 1.1, 1.05, 1.15, 1],
          opacity: [0.2, 0.4, 0.5, 0.7, 0.2],
        }}
        transition={{ duration: TOTAL, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tropical light rays */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 2,
            height: "40%",
            background: `linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.08), transparent)`,
            transformOrigin: "bottom center",
            bottom: "50%",
            left: "50%",
            rotate: `${angle}deg`,
            zIndex: 1,
          }}
          animate={{ opacity: [0, 0.3, 0.1, 0.4, 0] }}
          transition={{ duration: TOTAL, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* ═══════ PHASE 1: Whole Pineapple Appears & Rotates ═══════ */}
      <motion.div
        className="absolute"
        style={{ zIndex: 10, top: "8%" }}
        animate={{
          opacity:  [0, 1, 1, 1,    0, 0, 0, 0, 0],
          y:        [-80, 0, 0, 0,   60, 60, 60, 60, 60],
          scale:    [0.6, 1, 1, 0.9, 0.3, 0, 0, 0, 0],
          rotate:   [0, 0, 8, -5,    0, 0, 0, 0, 0],
        }}
        transition={{
          duration: TOTAL,
          times:    [0, t(0.8), t(1.5), t(2), t(3), t(3.5), t(5), t(8), 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <motion.img
          src={pineappleFruit}
          alt="Fresh Pineapple"
          className="w-32 md:w-40 drop-shadow-2xl"
        />
        {/* Spotlight on pineapple */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.3) 0%, transparent 70%)",
          }}
          animate={{ scale: [0.8, 1.4, 1.5, 1.2, 0], opacity: [0, 0.6, 0.8, 0.4, 0] }}
          transition={{ duration: TOTAL, times: [0, t(0.8), t(1.5), t(2.5), t(3.5)], repeat: Infinity }}
        />
      </motion.div>

      {/* ═══════ PHASE 2: Pineapple Slices Fly Apart (Cutting) ═══════ */}
      {[
        { x: -90, y: -40, rotate: -35, startY: 0 },
        { x: 95, y: -25, rotate: 30, startY: 0 },
        { x: -60, y: 50, rotate: -20, startY: 10 },
        { x: 70, y: 60, rotate: 25, startY: 5 },
        { x: -30, y: 80, rotate: -10, startY: 0 },
        { x: 40, y: -60, rotate: 40, startY: -10 },
      ].map((slice, i) => (
        <motion.img
          key={`slice-${i}`}
          src={pineappleSlices}
          alt=""
          className="absolute w-7 md:w-10 pointer-events-none drop-shadow-md"
          style={{ zIndex: 15 }}
          animate={{
            opacity: [0, 0, 0, 0.9, 0.7, 0.4, 0, 0, 0],
            x:       [0, 0, 0, slice.x * 0.6, slice.x, slice.x, slice.x, 0, 0],
            y:       [slice.startY, slice.startY, slice.startY, slice.y * 0.5, slice.y, slice.y + 60, slice.y + 120, 0, 0],
            scale:   [0.2, 0.2, 0.2, 1, 0.9, 0.6, 0.2, 0, 0],
            rotate:  [0, 0, 0, slice.rotate * 0.5, slice.rotate, slice.rotate + 15, slice.rotate + 30, 0, 0],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(1.5), t(2), t(2.5), t(3), t(3.8), t(4.5), t(5), 1],
            ease: "easeOut",
            repeat: Infinity,
            delay: i * 0.08,
          }}
        />
      ))}

      {/* Juice splash particles during cutting */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 40 + Math.random() * 30;
        return (
          <motion.div
            key={`splash-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 4 + i % 3 * 2,
              height: 4 + i % 3 * 2,
              background: `hsl(var(--pineapple-gold) / ${0.5 + (i % 3) * 0.15})`,
              zIndex: 16,
            }}
            animate={{
              opacity: [0, 0, 0, 0.8, 0.5, 0, 0, 0, 0],
              x: [0, 0, 0, Math.cos(angle) * radius * 0.5, Math.cos(angle) * radius, Math.cos(angle) * radius * 1.2, 0, 0, 0],
              y: [0, 0, 0, Math.sin(angle) * radius * 0.5, Math.sin(angle) * radius, Math.sin(angle) * radius + 30, 0, 0, 0],
              scale: [0, 0, 0, 1, 0.8, 0, 0, 0, 0],
            }}
            transition={{
              duration: TOTAL,
              times: [0, t(1.8), t(2.2), t(2.6), t(3.2), t(3.8), t(4.2), t(5), 1],
              ease: "easeOut",
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        );
      })}

      {/* ═══════ PHASE 3: Juice Liquid Stream Flowing Down ═══════ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 12,
          height: "35%",
          background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.7), hsl(var(--pineapple-gold) / 0.3), transparent)",
          borderRadius: 6,
          top: "30%",
          zIndex: 17,
          filter: "blur(1px)",
        }}
        animate={{
          opacity:  [0, 0, 0, 0, 0.8, 0.9, 0.6, 0, 0, 0],
          scaleY:   [0, 0, 0, 0, 0.3, 1, 1, 0, 0, 0],
          scaleX:   [1, 1, 1, 1, 0.8, 1, 0.6, 0.3, 0, 0],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(2), t(3), t(3.5), t(4), t(4.8), t(5.5), t(6.5), t(7), 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Secondary thinner juice streams */}
      {[-6, 6].map((offset, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 5,
            height: "25%",
            background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.5), transparent)",
            borderRadius: 4,
            top: "35%",
            left: `calc(50% + ${offset}px)`,
            zIndex: 17,
            filter: "blur(1px)",
          }}
          animate={{
            opacity:  [0, 0, 0, 0, 0.5, 0.7, 0.3, 0, 0],
            scaleY:   [0, 0, 0, 0, 0.5, 1, 0.5, 0, 0],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(2.5), t(3.5), t(4), t(4.3), t(5), t(5.8), t(6.5), 1],
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}

      {/* ═══════ PHASE 4: Glass Rises & Juice Fills ═══════ */}
      <motion.div
        className="relative"
        style={{ zIndex: 20 }}
        animate={{
          y:       [250, 250, 250, 250, 180, 20, 20, 20, 20, 20],
          opacity: [0,   0,   0,   0,   0.5, 1,  1,  1,  1,  1],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(1), t(3), t(4.2), t(4.8), t(5.8), t(6.5), t(8), t(9.5), 1],
          ease: "easeOut",
          repeat: Infinity,
        }}
      >
        <motion.img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice - Small Street Style Glass"
          className="w-28 md:w-40 lg:w-44 drop-shadow-2xl"
        />

        {/* Juice fill overlay inside glass */}
        <motion.div
          className="absolute bottom-[8%] left-[18%] right-[18%] rounded-b-md overflow-hidden pointer-events-none"
          style={{
            transformOrigin: "bottom",
            zIndex: 21,
            height: "65%",
            background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.4), hsl(var(--pineapple-gold) / 0.15), transparent)",
            mixBlendMode: "overlay" as const,
          }}
          animate={{
            scaleY:  [0, 0, 0, 0, 0, 0, 0.3, 0.7, 1, 1],
            opacity: [0, 0, 0, 0, 0, 0, 0.5, 0.8, 0.9, 0.9],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(1), t(3), t(4), t(4.5), t(5.5), t(6), t(6.8), t(7.5), 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Bubbles inside glass during fill */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3 + i % 3 * 2,
              height: 3 + i % 3 * 2,
              background: `hsl(var(--pineapple-gold) / ${0.3 + i * 0.05})`,
              left: `${25 + i * 10}%`,
              bottom: `${15 + i * 8}%`,
              zIndex: 22,
            }}
            animate={{
              opacity: [0, 0, 0, 0, 0, 0, 0.6, 0.8, 0, 0],
              y:       [0, 0, 0, 0, 0, 0, -5, -20, -35, -35],
              scale:   [0, 0, 0, 0, 0, 0, 1, 1.2, 0, 0],
            }}
            transition={{
              duration: TOTAL,
              times: [0, t(2), t(4), t(5), t(5.5), t(6), t(6.5), t(7.2), t(7.8), 1],
              ease: "easeOut",
              repeat: Infinity,
              delay: i * 0.12,
            }}
          />
        ))}

        {/* Glass glow effect */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.25) 0%, transparent 60%)",
          }}
          animate={{
            opacity: [0, 0, 0, 0, 0, 0.3, 0.8, 1, 1, 0.5],
            scale:   [0.8, 0.8, 0.8, 0.8, 0.8, 1, 1.2, 1.4, 1.4, 1],
          }}
          transition={{
            duration: TOTAL,
            times: [0, t(2), t(4), t(4.5), t(5), t(5.8), t(6.5), t(7.5), t(9), 1],
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* ═══════ PHASE 5: "JUST ₹10" Price Reveal ═══════ */}
      <motion.div
        className="absolute bottom-6 md:bottom-10"
        style={{ zIndex: 30 }}
        animate={{
          scale:   [0, 0, 0, 0, 0, 0, 0, 0, 1.2, 1],
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
          y:       [20, 20, 20, 20, 20, 20, 20, 20, -5, 0],
        }}
        transition={{
          duration: TOTAL,
          times: [0, t(1), t(3), t(4), t(5), t(6), t(7), t(7.5), t(8.2), t(8.8)],
          ease: "backOut",
          repeat: Infinity,
        }}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-8 py-3 md:px-10 md:py-4 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-wide">JUST ₹10</span>
          {/* Glowing highlight sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(var(--pineapple-gold) / 0.3) 50%, transparent 100%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.5,
              delay: TOTAL * t(8.5),
              repeat: Infinity,
              repeatDelay: TOTAL - 1.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default JuicePourAnimation;
