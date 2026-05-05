import { motion } from "framer-motion";

/**
 * Compact, premium delivery-boy-on-bike animation.
 * Sits beside the "Place Your Order" heading.
 * The boy rides a motorbike across the frame, carrying a juice delivery box,
 * with motion-blurred road, exhaust puff and a small "Shalimar" delivery box.
 */
const DeliveryBikeAnimation = () => {
  return (
    <div
      className="relative w-full max-w-[260px] h-[110px] mx-auto overflow-hidden rounded-2xl border border-primary/25"
      style={{
        background:
          "linear-gradient(180deg, hsl(38 70% 28%) 0%, hsl(35 50% 22%) 60%, hsl(30 35% 16%) 100%)",
      }}
      aria-label="Shalimar delivery boy on bike"
    >
      {/* sun */}
      <div
        className="absolute top-2 right-3 w-6 h-6 rounded-full"
        style={{ background: "hsl(45 100% 70%)", boxShadow: "0 0 18px hsl(45 100% 60% / 0.7)" }}
      />

      {/* moving road dashes (parallax) */}
      <motion.div
        className="absolute bottom-3 left-0 right-0 h-[2px] flex gap-3"
        animate={{ x: [0, -40] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="block w-6 h-[2px] flex-shrink-0" style={{ background: "hsl(45 100% 70%)" }} />
        ))}
      </motion.div>

      {/* speed lines */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[1.5px] rounded-full"
          style={{
            top: `${30 + i * 12}%`,
            background: "hsl(45 100% 80% / 0.45)",
            width: "30%",
          }}
          animate={{ x: ["110%", "-110%"], opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: "linear" }}
        />
      ))}

      {/* Bike + boy crossing */}
      <motion.div
        className="absolute bottom-3 left-0"
        animate={{ x: ["-30%", "115%"] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
        style={{ width: 110 }}
      >
        {/* tiny bobbing for road bumps */}
        <motion.div
          animate={{ y: [0, -1.5, 0, -0.5, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          <svg viewBox="0 0 120 70" className="w-full h-[80px]">
            {/* exhaust puff */}
            <motion.g
              animate={{ opacity: [0.6, 0, 0.6], scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ transformOrigin: "12px 50px" }}
            >
              <circle cx="10" cy="48" r="4" fill="hsl(0 0% 80% / 0.55)" />
              <circle cx="6" cy="44" r="3" fill="hsl(0 0% 80% / 0.4)" />
            </motion.g>

            {/* delivery box on back */}
            <g>
              <rect x="20" y="22" width="22" height="20" rx="2" fill="hsl(0 75% 48%)" stroke="hsl(30 30% 12%)" strokeWidth="1" />
              <rect x="20" y="28" width="22" height="2" fill="hsl(45 100% 60%)" />
              <text x="31" y="38" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(45 100% 90%)">SJS</text>
            </g>

            {/* bike body */}
            <g>
              {/* frame */}
              <path d="M 35 55 L 60 42 L 78 55" stroke="hsl(0 75% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <rect x="55" y="38" width="20" height="6" rx="2" fill="hsl(30 30% 14%)" />
              {/* headlight */}
              <circle cx="82" cy="42" r="3.5" fill="hsl(45 100% 75%)" />
              <motion.path
                d="M 86 42 L 100 38 L 100 46 Z"
                fill="hsl(45 100% 70%)"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              {/* handle */}
              <path d="M 78 38 L 82 34" stroke="hsl(0 0% 15%)" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* wheels (spinning) */}
            <motion.g
              style={{ transformOrigin: "32px 58px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="32" cy="58" r="9" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1.5" />
              <line x1="32" y1="50" x2="32" y2="66" stroke="hsl(45 90% 70%)" strokeWidth="1" />
              <line x1="24" y1="58" x2="40" y2="58" stroke="hsl(45 90% 70%)" strokeWidth="1" />
            </motion.g>
            <motion.g
              style={{ transformOrigin: "82px 58px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="82" cy="58" r="9" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1.5" />
              <line x1="82" y1="50" x2="82" y2="66" stroke="hsl(45 90% 70%)" strokeWidth="1" />
              <line x1="74" y1="58" x2="90" y2="58" stroke="hsl(45 90% 70%)" strokeWidth="1" />
            </motion.g>

            {/* delivery boy */}
            <g>
              {/* legs */}
              <rect x="52" y="40" width="4" height="10" rx="1.5" fill="hsl(220 35% 22%)" />
              <rect x="60" y="40" width="4" height="10" rx="1.5" fill="hsl(220 35% 22%)" />
              {/* body */}
              <rect x="48" y="22" width="20" height="20" rx="4" fill="hsl(0 75% 48%)" />
              <rect x="50" y="26" width="16" height="3" fill="hsl(45 100% 60%)" />
              {/* arms holding handle */}
              <rect x="62" y="26" width="18" height="4" rx="2" fill="hsl(0 75% 48%)" transform="rotate(-12 62 26)" />
              {/* head */}
              <circle cx="58" cy="16" r="7" fill="hsl(30 55% 76%)" />
              {/* helmet */}
              <path d="M 50 14 Q 50 7 58 7 Q 66 7 66 14 L 66 17 L 50 17 Z" fill="hsl(0 75% 38%)" />
              <rect x="52" y="14" width="12" height="3.5" fill="hsl(200 60% 75%)" opacity="0.9" />
              {/* eye */}
              <circle cx="60" cy="16" r="0.9" fill="hsl(0 0% 10%)" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* subtle "DELIVERING" badge */}
      <div className="absolute top-2 left-2 inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-background/70 text-foreground border border-primary/30 backdrop-blur">
        <motion.span
          className="w-1 h-1 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        On the way
      </div>
    </div>
  );
};

export default DeliveryBikeAnimation;
