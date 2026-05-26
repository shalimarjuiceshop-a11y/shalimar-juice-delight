import { motion } from "framer-motion";

/**
 * Real-world party celebration scene rendered around the "Order for Your Party" CTA.
 * Two juice glasses clink at the center, golden droplets fly, and confetti bursts
 * radiate outward in a continuous, production-grade loop.
 */
const PartyCelebrationAnimation = () => {
  // Confetti pieces — fixed positions for deterministic, polished animation
  const confetti = [
    { x: -120, y: -40, rot: -25, delay: 0,   color: "hsl(45 100% 55%)" },
    { x:  120, y: -55, rot:  20, delay: 0.2, color: "hsl(25 90% 55%)" },
    { x: -160, y:  10, rot:  35, delay: 0.4, color: "hsl(45 100% 70%)" },
    { x:  160, y:   0, rot: -15, delay: 0.6, color: "hsl(15 85% 60%)" },
    { x:  -80, y: -80, rot:  10, delay: 0.8, color: "hsl(45 100% 65%)" },
    { x:   80, y: -90, rot: -30, delay: 1.0, color: "hsl(35 95% 60%)" },
    { x: -200, y: -20, rot:  45, delay: 1.2, color: "hsl(45 100% 75%)" },
    { x:  200, y: -30, rot: -45, delay: 1.4, color: "hsl(25 90% 65%)" },
  ];

  return (
    <div
      className="relative mx-auto w-full max-w-[420px] h-[160px] pointer-events-none"
      aria-hidden="true"
    >
      {/* Soft golden glow halo */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, hsl(45 100% 55% / 0.35) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Confetti burst */}
      {confetti.map((c, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 block rounded-[2px]"
          style={{ width: 8, height: 14, background: c.color }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0 }}
          animate={{
            x: [0, c.x],
            y: [0, c.y, c.y + 60],
            opacity: [0, 1, 1, 0],
            rotate: [0, c.rot * 6],
            scale: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: 2.6,
            delay: c.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.2, 0.8, 1],
          }}
        />
      ))}

      {/* Clinking juice glasses — center stage */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-1">
        {/* Left glass — tilts right */}
        <motion.svg
          width="64" height="84" viewBox="0 0 64 84"
          animate={{ rotate: [-18, -2, -18], y: [0, -2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 100%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))" }}
        >
          <defs>
            <linearGradient id="juiceL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(40 100% 65%)" />
              <stop offset="100%" stopColor="hsl(30 95% 50%)" />
            </linearGradient>
          </defs>
          {/* glass body */}
          <path d="M10 6 L54 6 L48 78 L16 78 Z" fill="hsl(45 30% 95% / 0.18)" stroke="hsl(45 80% 85% / 0.9)" strokeWidth="1.5" />
          {/* juice fill */}
          <path d="M13 22 L51 22 L47 78 L17 78 Z" fill="url(#juiceL)" />
          {/* surface highlight */}
          <ellipse cx="32" cy="22" rx="19" ry="2.4" fill="hsl(45 100% 80% / 0.65)" />
          {/* shine */}
          <path d="M18 18 L20 70" stroke="hsl(45 100% 95% / 0.7)" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>

        {/* Right glass — tilts left */}
        <motion.svg
          width="64" height="84" viewBox="0 0 64 84"
          animate={{ rotate: [18, 2, 18], y: [0, -2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 100%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))" }}
        >
          <defs>
            <linearGradient id="juiceR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(40 100% 65%)" />
              <stop offset="100%" stopColor="hsl(30 95% 50%)" />
            </linearGradient>
          </defs>
          <path d="M10 6 L54 6 L48 78 L16 78 Z" fill="hsl(45 30% 95% / 0.18)" stroke="hsl(45 80% 85% / 0.9)" strokeWidth="1.5" />
          <path d="M13 22 L51 22 L47 78 L17 78 Z" fill="url(#juiceR)" />
          <ellipse cx="32" cy="22" rx="19" ry="2.4" fill="hsl(45 100% 80% / 0.65)" />
          <path d="M18 18 L20 70" stroke="hsl(45 100% 95% / 0.7)" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      </div>

      {/* Clink sparkle — flashes when glasses meet */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[36px]"
        animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", times: [0, 0.45, 0.55] }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <g fill="hsl(45 100% 85%)">
            <path d="M18 2 L20 16 L18 18 L16 16 Z" />
            <path d="M18 34 L20 20 L18 18 L16 20 Z" />
            <path d="M2 18 L16 16 L18 18 L16 20 Z" />
            <path d="M34 18 L20 16 L18 18 L20 20 Z" />
          </g>
        </svg>
      </motion.div>

      {/* Juice droplets flying upward from the clink */}
      {[-22, -8, 8, 22].map((dx, i) => (
        <motion.span
          key={`d-${i}`}
          className="absolute left-1/2 top-1/2 block rounded-full"
          style={{ width: 6, height: 8, background: "hsl(40 100% 60%)" }}
          initial={{ x: 0, y: -20, opacity: 0, scale: 0 }}
          animate={{
            x: [0, dx],
            y: [-20, -56, -20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.6],
          }}
          transition={{
            duration: 1.6,
            delay: 0.5 + i * 0.05,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default PartyCelebrationAnimation;
