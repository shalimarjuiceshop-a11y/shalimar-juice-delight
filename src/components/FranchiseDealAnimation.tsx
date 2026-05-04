import { motion } from "framer-motion";

/**
 * Cute cartoon animation for the Franchise page.
 * Two businessmen meet in front of a Shalimar Juice shop and shake hands —
 * sealing a franchise deal. A floating "DEAL!" badge + sparkles appear.
 * Pure hand-crafted SVG + Framer Motion. Loops forever.
 */
const FranchiseDealAnimation = () => {
  return (
    <div
      className="relative w-full max-w-md mx-auto h-[180px] md:h-[210px] overflow-hidden rounded-2xl border border-primary/25 shadow-pineapple"
      style={{
        background:
          "linear-gradient(180deg, hsl(38 75% 24%) 0%, hsl(35 60% 32%) 55%, hsl(45 70% 48%) 100%)",
      }}
    >
      {/* sun */}
      <div className="absolute top-3 left-8 w-14 h-14 rounded-full blur-2xl opacity-70" style={{ background: "hsl(45 100% 60%)" }} />
      <div className="absolute top-5 left-10 w-8 h-8 rounded-full" style={{ background: "hsl(45 100% 75%)", boxShadow: "0 0 28px hsl(45 100% 60% / 0.7)" }} />

      {/* floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[36px]" style={{ background: "linear-gradient(180deg, hsl(35 40% 30%) 0%, hsl(30 30% 18%) 100%)" }} />
      <div className="absolute bottom-[35px] left-0 right-0 h-[2px] opacity-60" style={{ background: "hsl(45 80% 55%)" }} />

      <svg
        viewBox="0 0 600 240"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ===== SHALIMAR JUICE SHOP (background) ===== */}
        <g transform="translate(180, 18)">
          {/* roof / awning */}
          <rect x="0" y="0" width="240" height="14" fill="hsl(0 75% 45%)" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 20} y="0" width="10" height="14" fill="hsl(45 95% 55%)" />
          ))}
          {/* signboard */}
          <rect x="10" y="14" width="220" height="30" fill="hsl(45 100% 55%)" stroke="hsl(30 30% 14%)" strokeWidth="2" />
          <text x="120" y="35" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="17" fill="hsl(30 30% 14%)" letterSpacing="2">SHALIMAR JUICE</text>
          {/* shop body */}
          <rect x="10" y="44" width="220" height="100" fill="hsl(35 40% 18%)" stroke="hsl(45 70% 50%)" strokeWidth="1.5" />
          {/* counter window */}
          <rect x="22" y="58" width="196" height="62" fill="hsl(38 60% 28%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
          {/* glasses on counter */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${36 + i * 36}, 92)`}>
              <path d="M 0 0 L 12 0 L 11 20 L 1 20 Z" fill={["hsl(45 100% 60%)", "hsl(15 90% 55%)", "hsl(120 50% 45%)", "hsl(280 50% 60%)", "hsl(45 100% 60%)"][i]} />
              <rect x="0" y="0" width="12" height="3" fill="hsl(45 100% 85%)" />
            </g>
          ))}
          {/* ₹10 board */}
          <g transform="translate(178, 52)">
            <rect x="0" y="0" width="44" height="28" rx="3" fill="hsl(0 80% 50%)" stroke="hsl(45 100% 75%)" strokeWidth="2" />
            <text x="22" y="20" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="15" fill="hsl(45 100% 95%)">₹10</text>
          </g>
        </g>

        {/* ===== BUSINESSMAN 1 (left) ===== */}
        <motion.g
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* legs */}
          <rect x="195" y="186" width="13" height="22" rx="3" fill="hsl(220 30% 18%)" />
          <rect x="213" y="186" width="13" height="22" rx="3" fill="hsl(220 30% 18%)" />
          <ellipse cx="201" cy="210" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          <ellipse cx="219" cy="210" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          {/* suit body */}
          <rect x="190" y="138" width="42" height="52" rx="6" fill="hsl(220 35% 22%)" />
          {/* shirt + tie */}
          <polygon points="205,138 211,150 217,138" fill="hsl(0 0% 96%)" />
          <polygon points="208,142 214,142 213,162 209,162" fill="hsl(0 80% 50%)" />
          {/* head */}
          <circle cx="211" cy="124" r="17" fill="hsl(30 55% 78%)" />
          <path d="M 195 122 Q 195 108 211 108 Q 227 108 227 122 Q 227 116 220 113 Q 211 110 203 113 Q 195 116 195 122 Z" fill="hsl(30 25% 16%)" />
          {/* eyes */}
          <circle cx="206" cy="125" r="2" fill="hsl(0 0% 10%)" />
          <circle cx="216" cy="125" r="2" fill="hsl(0 0% 10%)" />
          {/* smile */}
          <path d="M 206 132 Q 211 136 216 132" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* RIGHT arm — extends to handshake */}
          <motion.g
            style={{ transformOrigin: "230px 150px" }}
            animate={{ rotate: [25, -10, -10, 25, 25] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 0.85, 1], ease: "easeInOut" }}
          >
            <rect x="228" y="148" width="40" height="9" rx="4" fill="hsl(220 35% 22%)" />
            <circle cx="270" cy="153" r="6" fill="hsl(30 55% 78%)" />
          </motion.g>

          {/* left arm */}
          <rect x="184" y="148" width="9" height="30" rx="4" fill="hsl(220 35% 22%)" />
          <circle cx="188" cy="178" r="5" fill="hsl(30 55% 78%)" />
        </motion.g>

        {/* ===== BUSINESSMAN 2 (right) ===== */}
        <motion.g
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          {/* legs */}
          <rect x="370" y="186" width="13" height="22" rx="3" fill="hsl(35 30% 22%)" />
          <rect x="388" y="186" width="13" height="22" rx="3" fill="hsl(35 30% 22%)" />
          <ellipse cx="376" cy="210" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          <ellipse cx="394" cy="210" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          {/* suit body */}
          <rect x="365" y="138" width="42" height="52" rx="6" fill="hsl(35 50% 35%)" />
          {/* shirt + tie */}
          <polygon points="380,138 386,150 392,138" fill="hsl(0 0% 96%)" />
          <polygon points="383,142 389,142 388,162 384,162" fill="hsl(220 70% 45%)" />
          {/* head */}
          <circle cx="386" cy="124" r="17" fill="hsl(30 60% 72%)" />
          <path d="M 370 122 Q 370 108 386 108 Q 402 108 402 122 Q 402 116 395 113 Q 386 110 378 113 Q 370 116 370 122 Z" fill="hsl(20 35% 18%)" />
          {/* eyes */}
          <circle cx="381" cy="125" r="2" fill="hsl(0 0% 10%)" />
          <circle cx="391" cy="125" r="2" fill="hsl(0 0% 10%)" />
          {/* smile */}
          <path d="M 381 132 Q 386 136 391 132" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* LEFT arm — extends to handshake */}
          <motion.g
            style={{ transformOrigin: "365px 150px" }}
            animate={{ rotate: [-25, 10, 10, -25, -25] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 0.85, 1], ease: "easeInOut" }}
          >
            <rect x="328" y="148" width="40" height="9" rx="4" fill="hsl(35 50% 35%)" />
            <circle cx="328" cy="153" r="6" fill="hsl(30 60% 72%)" />
          </motion.g>

          {/* right arm */}
          <rect x="404" y="148" width="9" height="30" rx="4" fill="hsl(35 50% 35%)" />
          <circle cx="408" cy="178" r="5" fill="hsl(30 60% 72%)" />
        </motion.g>

        {/* ===== HANDSHAKE FLASH ===== */}
        <motion.g
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1.2, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.4, 0.7, 0.85], ease: "easeOut" }}
          style={{ transformOrigin: "299px 153px" }}
        >
          <circle cx="299" cy="153" r="14" fill="hsl(45 100% 70% / 0.4)" />
          <g stroke="hsl(45 100% 75%)" strokeWidth="2" strokeLinecap="round">
            <line x1="299" y1="138" x2="299" y2="132" />
            <line x1="299" y1="174" x2="299" y2="168" />
            <line x1="284" y1="153" x2="278" y2="153" />
            <line x1="320" y1="153" x2="314" y2="153" />
            <line x1="289" y1="143" x2="285" y2="139" />
            <line x1="313" y1="143" x2="317" y2="139" />
            <line x1="289" y1="163" x2="285" y2="167" />
            <line x1="313" y1="163" x2="317" y2="167" />
          </g>
        </motion.g>

        {/* ===== "DEAL!" BADGE ===== */}
        <motion.g
          animate={{ opacity: [0, 0, 0, 1, 1, 0], y: [0, 0, 0, -6, -6, -10], scale: [0.5, 0.5, 0.5, 1, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.35, 0.45, 0.55, 0.85, 1], ease: "easeOut" }}
          style={{ transformOrigin: "300px 96px" }}
        >
          <g transform="translate(254, 78)">
            <ellipse cx="46" cy="18" rx="46" ry="20" fill="hsl(120 60% 40%)" stroke="hsl(45 100% 70%)" strokeWidth="2.5" />
            <text x="46" y="24" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="18" fill="hsl(45 100% 95%)" letterSpacing="2">DEAL ✓</text>
          </g>
        </motion.g>

        {/* sparkles around handshake */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          const cx = 299 + Math.cos(angle) * 28;
          const cy = 153 + Math.sin(angle) * 22;
          return (
            <motion.g
              key={i}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 1.2 + i * 0.12 }}
            >
              <circle cx={cx} cy={cy} r="2" fill="hsl(45 100% 75%)" />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default FranchiseDealAnimation;
