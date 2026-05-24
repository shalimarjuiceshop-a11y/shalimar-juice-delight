import { motion } from "framer-motion";

/**
 * Small, premium delivery scooter that rides in from the left,
 * pauses at center for ~4s (driver waves), then rides off right.
 * Designed to fill the blank space above the "Ready to Order?" headline.
 */
const OrderBikeAnimation = () => {
  // Total loop: enter (1.4s) -> hold center (4s) -> exit (1.4s) -> gap (1.2s) = 8s
  const TOTAL = 8;
  const tEnter = 1.4 / TOTAL;       // 0.175
  const tHoldEnd = (1.4 + 4) / TOTAL; // 0.675
  const tExit = (1.4 + 4 + 1.4) / TOTAL; // 0.85

  return (
    <div
      className="relative mx-auto mb-4 w-full max-w-[280px] h-[64px] overflow-hidden"
      aria-hidden="true"
    >
      {/* subtle road line */}
      <div
        className="absolute left-0 right-0 bottom-3 h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, hsl(45 100% 70% / 0.6), transparent)" }}
      />

      {/* dashes — only animate while bike is moving (we keep simple infinite, subtle) */}
      <motion.div
        className="absolute bottom-[10px] left-0 right-0 h-[2px] flex gap-2 opacity-40"
        animate={{ x: [0, -24] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="block w-3 h-[2px] flex-shrink-0 rounded-full" style={{ background: "hsl(45 100% 70%)" }} />
        ))}
      </motion.div>

      {/* Scooter */}
      <motion.div
        className="absolute bottom-2"
        style={{ left: 0 }}
        animate={{
          x: ["-30%", "42%", "42%", "120%", "120%"],
        }}
        transition={{
          duration: TOTAL,
          times: [0, tEnter, tHoldEnd, tExit, 1],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* tiny bounce only while moving — approximate with continuous gentle bob */}
        <motion.div
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="64" height="44" viewBox="0 0 80 56" fill="none">
            {/* shadow */}
            <ellipse cx="40" cy="52" rx="26" ry="2.2" fill="hsl(0 0% 0% / 0.35)" />

            {/* delivery box */}
            <rect x="6" y="14" width="20" height="18" rx="3" fill="hsl(140 70% 38%)" stroke="hsl(140 70% 25%)" strokeWidth="1" />
            <rect x="11" y="18" width="10" height="2" fill="hsl(45 100% 75%)" />
            <text x="16" y="28" textAnchor="middle" fontSize="6" fontWeight="700" fill="hsl(45 100% 80%)" fontFamily="sans-serif">S</text>

            {/* body */}
            <path d="M22 38 Q34 30 50 32 L60 36 Q62 40 58 42 L26 42 Q20 42 22 38 Z" fill="hsl(45 100% 55%)" stroke="hsl(35 90% 35%)" strokeWidth="1" />

            {/* headlight */}
            <circle cx="60" cy="36" r="2.2" fill="hsl(50 100% 88%)" />

            {/* seat */}
            <rect x="32" y="30" width="14" height="3" rx="1.5" fill="hsl(30 25% 15%)" />

            {/* driver */}
            <g>
              {/* leg */}
              <rect x="38" y="36" width="3" height="8" rx="1" fill="hsl(220 40% 25%)" />
              {/* torso */}
              <path d="M34 22 Q40 16 46 22 L46 34 L34 34 Z" fill="hsl(0 70% 50%)" />
              {/* arm to handle */}
              <path d="M45 24 L56 30" stroke="hsl(0 70% 50%)" strokeWidth="3" strokeLinecap="round" />
              {/* helmet */}
              <circle cx="40" cy="16" r="6" fill="hsl(45 100% 55%)" stroke="hsl(35 90% 35%)" strokeWidth="1" />
              <rect x="36" y="15" width="8" height="3" rx="1" fill="hsl(210 40% 20%)" />
            </g>

            {/* handlebar */}
            <line x1="54" y1="28" x2="60" y2="32" stroke="hsl(30 25% 15%)" strokeWidth="1.5" strokeLinecap="round" />

            {/* wheels */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "26px 44px" }}
            >
              <circle cx="26" cy="44" r="6" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1" />
              <line x1="26" y1="40" x2="26" y2="48" stroke="hsl(0 0% 40%)" strokeWidth="0.8" />
              <line x1="22" y1="44" x2="30" y2="44" stroke="hsl(0 0% 40%)" strokeWidth="0.8" />
            </motion.g>
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "56px 44px" }}
            >
              <circle cx="56" cy="44" r="6" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1" />
              <line x1="56" y1="40" x2="56" y2="48" stroke="hsl(0 0% 40%)" strokeWidth="0.8" />
              <line x1="52" y1="44" x2="60" y2="44" stroke="hsl(0 0% 40%)" strokeWidth="0.8" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderBikeAnimation;
