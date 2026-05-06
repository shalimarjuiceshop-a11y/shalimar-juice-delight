import { motion } from "framer-motion";

/**
 * Cinematic "The Signing" sequence for the Franchise page.
 * Phases (loop ~7s):
 *  0.00 - 0.20  → Two cartoon men face the contract (bobbing)
 *  0.20 - 0.45  → Slow-motion pen lowers, touches paper, GOLDEN INK flows out
 *                 (camera zoom-in on signature via inner SVG transform)
 *  0.45 - 0.55  → "DEAL SEALED" red stamp slams down (boom + ring)
 *  0.55 - 0.75  → Camera zooms back; men shake hands
 *  0.75 - 1.00  → A tiny new Shalimar Juice shop POPS UP from the contract
 *                 with confetti — "new franchise opened!"
 */
const FranchiseDealAnimation = () => {
  return (
    <div
      className="relative w-full max-w-md mx-auto h-[210px] md:h-[240px] overflow-hidden rounded-2xl border border-primary/25 shadow-pineapple"
      style={{
        background:
          "linear-gradient(180deg, hsl(38 75% 22%) 0%, hsl(35 60% 30%) 55%, hsl(45 70% 46%) 100%)",
      }}
      aria-label="Franchise deal signing animation"
    >
      {/* sun */}
      <div className="absolute top-3 left-8 w-14 h-14 rounded-full blur-2xl opacity-70" style={{ background: "hsl(45 100% 60%)" }} />
      <div className="absolute top-5 left-10 w-8 h-8 rounded-full" style={{ background: "hsl(45 100% 75%)", boxShadow: "0 0 28px hsl(45 100% 60% / 0.7)" }} />

      {/* floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[36px]" style={{ background: "linear-gradient(180deg, hsl(35 40% 30%) 0%, hsl(30 30% 18%) 100%)" }} />
      <div className="absolute bottom-[35px] left-0 right-0 h-[2px] opacity-60" style={{ background: "hsl(45 80% 55%)" }} />

      <svg viewBox="0 0 600 280" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="goldInk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(45 100% 50%)" />
            <stop offset="50%" stopColor="hsl(45 100% 75%)" />
            <stop offset="100%" stopColor="hsl(38 95% 45%)" />
          </linearGradient>
          <radialGradient id="flashG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(45 100% 90%)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(45 100% 60%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============ CAMERA (zoom into signature, then mini shop) ============ */}
        <motion.g
          style={{ originX: 0, originY: 0 }}
          animate={{
            scale: [1, 1, 2.4, 2.4, 1, 1, 1, 2.2, 2.2, 1],
            x:     [0, 0, -428, -428, 0, 0, 0, -360, -360, 0],
            y:     [0, 0, -281, -281, 0, 0, 0, -144, -144, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            times: [0, 0.18, 0.24, 0.45, 0.52, 0.58, 0.74, 0.8, 0.94, 1],
            ease: "easeInOut",
          }}
        >

        {/* ============ BACKGROUND SHOP ============ */}
        <g transform="translate(180, 14)" opacity="0.95">
          <rect x="0" y="0" width="240" height="12" fill="hsl(0 75% 45%)" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 20} y="0" width="10" height="12" fill="hsl(45 95% 55%)" />
          ))}
          <rect x="10" y="12" width="220" height="26" fill="hsl(45 100% 55%)" stroke="hsl(30 30% 14%)" strokeWidth="2" />
          <text x="120" y="31" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="15" fill="hsl(30 30% 14%)" letterSpacing="2">SHALIMAR JUICE</text>
          <rect x="10" y="38" width="220" height="78" fill="hsl(35 40% 18%)" stroke="hsl(45 70% 50%)" strokeWidth="1.5" />
          <rect x="22" y="50" width="196" height="50" fill="hsl(38 60% 28%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${36 + i * 36}, 76)`}>
              <path d="M 0 0 L 12 0 L 11 18 L 1 18 Z" fill={["hsl(45 100% 60%)", "hsl(15 90% 55%)", "hsl(120 50% 45%)", "hsl(280 50% 60%)", "hsl(45 100% 60%)"][i]} />
              <rect x="0" y="0" width="12" height="3" fill="hsl(45 100% 85%)" />
            </g>
          ))}
        </g>

        {/* ============ DESK / CONTRACT (CENTER) ============ */}
        <g transform="translate(150, 168)">
          {/* desk */}
          <rect x="0" y="36" width="300" height="14" rx="2" fill="hsl(28 40% 22%)" stroke="hsl(30 30% 12%)" strokeWidth="1" />
          {/* contract paper */}
          <motion.g
            animate={{ y: [0, 0, 0, 0, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 0.6, 1] }}
          >
            <rect x="80" y="6" width="140" height="36" rx="1.5" fill="hsl(40 30% 96%)" stroke="hsl(30 25% 70%)" strokeWidth="0.6" />
            <line x1="86" y1="14" x2="214" y2="14" stroke="hsl(0 0% 75%)" strokeWidth="0.5" />
            <line x1="86" y1="20" x2="214" y2="20" stroke="hsl(0 0% 75%)" strokeWidth="0.5" />
            <line x1="86" y1="26" x2="170" y2="26" stroke="hsl(0 0% 75%)" strokeWidth="0.5" />
            {/* signature line */}
            <line x1="120" y1="36" x2="200" y2="36" stroke="hsl(0 0% 35%)" strokeWidth="0.7" />
            <text x="120" y="40" fontFamily="DM Sans" fontWeight="700" fontSize="3.5" fill="hsl(0 0% 40%)">SIGNATURE</text>

            {/* GOLDEN SIGNATURE — drawn on as pen signs */}
            <motion.path
              d="M 124 33 Q 132 26 140 33 Q 148 40 156 30 Q 164 24 172 33 Q 180 40 188 31"
              fill="none"
              stroke="url(#goldInk)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 2px hsl(45 100% 70%))" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 0, 1, 1, 1, 1] }}
              transition={{ duration: 7, repeat: Infinity, times: [0, 0.2, 0.22, 0.45, 0.55, 0.95, 1], ease: "easeInOut" }}
            />

            {/* DEAL SEALED stamp */}
            <motion.g
              animate={{
                opacity: [0, 0, 0, 0, 1, 1, 1, 0.95],
                scale: [3, 3, 3, 2.4, 1, 1.05, 1, 1],
                rotate: [-18, -18, -18, -18, -10, -8, -10, -10],
              }}
              transition={{ duration: 7, repeat: Infinity, times: [0, 0.45, 0.5, 0.52, 0.56, 0.6, 0.65, 1], ease: "easeOut" }}
              style={{ transformOrigin: "165px 24px" }}
            >
              <ellipse cx="165" cy="24" rx="32" ry="11" fill="none" stroke="hsl(0 80% 48%)" strokeWidth="1.6" />
              <ellipse cx="165" cy="24" rx="28" ry="8.5" fill="none" stroke="hsl(0 80% 48%)" strokeWidth="0.8" />
              <text x="165" y="22" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6.5" fill="hsl(0 80% 48%)" letterSpacing="1.4">DEAL</text>
              <text x="165" y="29" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6.5" fill="hsl(0 80% 48%)" letterSpacing="1.4">SEALED</text>
            </motion.g>
          </motion.g>

          {/* PEN — slow descend, touch, lift */}
          <motion.g
            animate={{
              y: [-30, -30, -22, -10, -2, -2, -28, -28, -28],
              rotate: [-30, -30, -34, -38, -42, -42, -32, -32, -30],
              x: [0, 0, 4, 10, 18, 26, 30, 30, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, times: [0, 0.1, 0.16, 0.2, 0.24, 0.45, 0.5, 0.92, 1], ease: "easeInOut" }}
            style={{ transformOrigin: "150px 30px" }}
          >
            <g transform="translate(120, 8)">
              {/* barrel */}
              <rect x="0" y="0" width="34" height="6" rx="1.5" fill="hsl(220 70% 35%)" stroke="hsl(0 0% 8%)" strokeWidth="0.5" />
              <rect x="22" y="0" width="12" height="6" fill="hsl(45 100% 55%)" />
              {/* clip */}
              <rect x="6" y="-2" width="10" height="2" fill="hsl(0 0% 75%)" />
              {/* tip */}
              <polygon points="0,3 -8,6 0,7" fill="hsl(0 0% 18%)" />
              <circle cx="-7" cy="6" r="0.9" fill="hsl(45 100% 65%)" />
            </g>
          </motion.g>
        </g>

        {/* ============ BUSINESSMAN 1 (left) ============ */}
        <motion.g animate={{ y: [0, -1.5, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="58" y="200" width="13" height="22" rx="3" fill="hsl(220 30% 18%)" />
          <rect x="76" y="200" width="13" height="22" rx="3" fill="hsl(220 30% 18%)" />
          <ellipse cx="64" cy="224" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          <ellipse cx="82" cy="224" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          <rect x="53" y="152" width="42" height="52" rx="6" fill="hsl(220 35% 22%)" />
          <polygon points="68,152 74,164 80,152" fill="hsl(0 0% 96%)" />
          <polygon points="71,156 77,156 76,176 72,176" fill="hsl(0 80% 50%)" />
          <circle cx="74" cy="138" r="17" fill="hsl(30 55% 78%)" />
          <path d="M 58 136 Q 58 122 74 122 Q 90 122 90 136 Q 90 130 83 127 Q 74 124 66 127 Q 58 130 58 136 Z" fill="hsl(30 25% 16%)" />
          <circle cx="69" cy="139" r="2" fill="hsl(0 0% 10%)" />
          <circle cx="79" cy="139" r="2" fill="hsl(0 0% 10%)" />
          <path d="M 69 146 Q 74 150 79 146" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* RIGHT arm — holds pen first half, then handshake */}
          <motion.g
            style={{ transformOrigin: "92px 164px" }}
            animate={{ rotate: [10, 10, 35, 50, 50, 50, -5, -5, 10] }}
            transition={{ duration: 7, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.45, 0.55, 0.6, 0.92, 1], ease: "easeInOut" }}
          >
            <rect x="90" y="162" width="40" height="9" rx="4" fill="hsl(220 35% 22%)" />
            <circle cx="132" cy="167" r="6" fill="hsl(30 55% 78%)" />
          </motion.g>

          <rect x="47" y="162" width="9" height="30" rx="4" fill="hsl(220 35% 22%)" />
          <circle cx="51" cy="192" r="5" fill="hsl(30 55% 78%)" />
        </motion.g>

        {/* ============ BUSINESSMAN 2 (right) ============ */}
        <motion.g animate={{ y: [0, -1.5, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
          <rect x="510" y="200" width="13" height="22" rx="3" fill="hsl(35 30% 22%)" />
          <rect x="528" y="200" width="13" height="22" rx="3" fill="hsl(35 30% 22%)" />
          <ellipse cx="516" cy="224" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          <ellipse cx="534" cy="224" rx="10" ry="3" fill="hsl(0 0% 8%)" />
          <rect x="505" y="152" width="42" height="52" rx="6" fill="hsl(35 50% 35%)" />
          <polygon points="520,152 526,164 532,152" fill="hsl(0 0% 96%)" />
          <polygon points="523,156 529,156 528,176 524,176" fill="hsl(220 70% 45%)" />
          <circle cx="526" cy="138" r="17" fill="hsl(30 60% 72%)" />
          <path d="M 510 136 Q 510 122 526 122 Q 542 122 542 136 Q 542 130 535 127 Q 526 124 518 127 Q 510 130 510 136 Z" fill="hsl(20 35% 18%)" />
          <circle cx="521" cy="139" r="2" fill="hsl(0 0% 10%)" />
          <circle cx="531" cy="139" r="2" fill="hsl(0 0% 10%)" />
          <path d="M 521 146 Q 526 150 531 146" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* LEFT arm — handshake after stamp */}
          <motion.g
            style={{ transformOrigin: "505px 164px" }}
            animate={{ rotate: [-10, -10, -10, -10, -10, -10, 10, 10, -10] }}
            transition={{ duration: 7, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.45, 0.55, 0.6, 0.92, 1], ease: "easeInOut" }}
          >
            <rect x="468" y="162" width="40" height="9" rx="4" fill="hsl(35 50% 35%)" />
            <circle cx="468" cy="167" r="6" fill="hsl(30 60% 72%)" />
          </motion.g>

          <rect x="546" y="162" width="9" height="30" rx="4" fill="hsl(35 50% 35%)" />
          <circle cx="550" cy="192" r="5" fill="hsl(30 60% 72%)" />
        </motion.g>

        {/* ============ STAMP BOOM FLASH ============ */}
        <motion.g
          animate={{ opacity: [0, 0, 0, 0, 1, 0.6, 0, 0], scale: [0.4, 0.4, 0.4, 0.4, 1.4, 1.8, 2.2, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, times: [0, 0.45, 0.5, 0.52, 0.56, 0.62, 0.7, 1], ease: "easeOut" }}
          style={{ transformOrigin: "315px 192px" }}
        >
          <circle cx="315" cy="192" r="30" fill="url(#flashG)" />
          <g stroke="hsl(0 80% 60%)" strokeWidth="2" strokeLinecap="round" opacity="0.85">
            <line x1="315" y1="160" x2="315" y2="150" />
            <line x1="345" y1="192" x2="357" y2="192" />
            <line x1="285" y1="192" x2="273" y2="192" />
            <line x1="335" y1="172" x2="345" y2="162" />
            <line x1="295" y1="172" x2="285" y2="162" />
          </g>
        </motion.g>

        {/* ============ MINI SHOP POP-UP from contract ============ */}
        <motion.g
          animate={{
            opacity: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            scale: [0, 0, 0, 0, 0, 0, 0.2, 1, 1.04, 1],
            y: [10, 10, 10, 10, 10, 10, 6, 0, 0, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, times: [0, 0.4, 0.55, 0.6, 0.65, 0.7, 0.74, 0.82, 0.88, 1], ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "300px 130px" }}
        >
          <g transform="translate(254, 80)">
            {/* roof */}
            <rect x="0" y="22" width="92" height="6" fill="hsl(0 75% 48%)" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x={i * 11.5} y="22" width="6" height="6" fill="hsl(45 95% 55%)" />
            ))}
            {/* sign */}
            <rect x="3" y="28" width="86" height="14" rx="2" fill="hsl(45 100% 58%)" stroke="hsl(30 30% 12%)" strokeWidth="1" />
            <text x="46" y="38" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="8" fill="hsl(30 30% 12%)" letterSpacing="1">SHALIMAR</text>
            {/* body */}
            <rect x="3" y="42" width="86" height="34" fill="hsl(35 40% 22%)" stroke="hsl(45 70% 50%)" strokeWidth="1" />
            <rect x="9" y="48" width="74" height="22" fill="hsl(38 60% 30%)" stroke="hsl(45 80% 55%)" strokeWidth="1" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={14 + i * 18} y="56" width="10" height="12" fill={["hsl(45 100% 60%)", "hsl(15 90% 55%)", "hsl(120 50% 45%)", "hsl(280 50% 60%)"][i]} />
            ))}
            {/* "NEW!" badge */}
            <g>
              <circle cx="0" cy="22" r="10" fill="hsl(120 60% 40%)" stroke="hsl(45 100% 75%)" strokeWidth="1.5" />
              <text x="0" y="25" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="7" fill="hsl(45 100% 95%)">NEW</text>
            </g>
          </g>

          {/* confetti around mini shop */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2;
            const cx = 300 + Math.cos(angle) * 60;
            const cy = 110 + Math.sin(angle) * 30;
            const colors = ["hsl(45 100% 60%)", "hsl(0 80% 55%)", "hsl(120 60% 50%)", "hsl(220 70% 55%)"];
            return (
              <motion.rect
                key={i}
                x={cx} y={cy} width="3.5" height="6" rx="1"
                fill={colors[i % colors.length]}
                animate={{ opacity: [0, 1, 0], rotate: [0, 180, 360], y: [cy, cy + 14, cy + 30] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 5.6, delay: 5.6 + i * 0.04 }}
              />
            );
          })}
        </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};

export default FranchiseDealAnimation;
