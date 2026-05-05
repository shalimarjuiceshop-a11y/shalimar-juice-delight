import { motion } from "framer-motion";

/**
 * Big party-event scene for the PartyOrder page.
 * Decorated event hall with stage lights, bunting, garden plants,
 * Shalimar juice stall (2 team members + mixers + pineapple/apple),
 * 8 customer cartoons enjoying juice & walking around. Loops forever.
 */
const PartyEventAnimation = () => {
  return (
    <div
      className="relative w-full max-w-3xl mx-auto h-[260px] md:h-[340px] overflow-hidden rounded-2xl border border-primary/25 shadow-pineapple"
      style={{ background: "linear-gradient(180deg, hsl(280 55% 25%) 0%, hsl(320 45% 30%) 50%, hsl(35 50% 30%) 100%)" }}
      aria-label="Shalimar juice serving at a party event"
    >
      {/* twinkly fairy lights along ceiling */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            top: `${4 + Math.sin(i * 0.6) * 6}%`,
            left: `${(i / 30) * 100}%`,
            width: 4, height: 4,
            background: ["hsl(45 100% 70%)", "hsl(0 80% 65%)", "hsl(280 80% 70%)", "hsl(120 60% 60%)"][i % 4],
            boxShadow: `0 0 8px ${["hsl(45 100% 70%)", "hsl(0 80% 65%)", "hsl(280 80% 70%)", "hsl(120 60% 60%)"][i % 4]}`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5 + (i % 3), repeat: Infinity, delay: i * 0.08 }}
        />
      ))}

      <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 border border-primary/30 backdrop-blur">
        <motion.span className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />
        Live event • Shalimar serving
      </div>

      <svg viewBox="0 0 700 340" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* hall floor */}
        <rect x="0" y="270" width="700" height="70" fill="hsl(30 30% 22%)" />
        <line x1="0" y1="270" x2="700" y2="270" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />

        {/* hall back wall - decoration banners */}
        {[80, 220, 360, 500, 620].map((cx, i) => (
          <g key={cx}>
            <line x1={cx - 30} y1="40" x2={cx + 30} y2="50" stroke="hsl(45 100% 70%)" strokeWidth="0.6" />
            {[-20, 0, 20].map((dx) => (
              <polygon key={dx} points={`${cx + dx},48 ${cx + dx + 6},48 ${cx + dx + 3},58`}
                fill={["hsl(0 75% 55%)", "hsl(45 100% 60%)", "hsl(120 60% 50%)", "hsl(280 60% 60%)"][i % 4]} />
            ))}
          </g>
        ))}

        {/* stage banner */}
        <g transform="translate(220, 60)">
          <rect x="0" y="0" width="260" height="38" rx="6" fill="hsl(45 100% 55%)" stroke="hsl(0 75% 40%)" strokeWidth="2" />
          <text x="130" y="25" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="16" fill="hsl(0 75% 35%)" letterSpacing="2">SHALIMAR JUICE TEAM</text>
        </g>

        {/* garden plants */}
        {[20, 660].map((cx) => (
          <g key={cx} transform={`translate(${cx}, 230)`}>
            <rect x="-10" y="20" width="20" height="20" fill="hsl(30 35% 20%)" />
            <ellipse cx="0" cy="14" rx="14" ry="14" fill="hsl(120 50% 35%)" />
            <ellipse cx="-8" cy="6" rx="8" ry="10" fill="hsl(120 55% 40%)" />
            <ellipse cx="8" cy="6" rx="8" ry="10" fill="hsl(120 55% 40%)" />
          </g>
        ))}

        {/* ===== JUICE STALL (center) ===== */}
        <g transform="translate(260, 130)">
          {/* roof */}
          <polygon points="-10,30 90,30 100,60 -20,60" fill="hsl(0 75% 45%)" />
          {Array.from({ length: 7 }).map((_, i) => (
            <polygon key={i} points={`${-15 + i * 18},60 ${-5 + i * 18},60 ${-10 + i * 18},72`}
              fill={i % 2 === 0 ? "hsl(45 100% 60%)" : "hsl(0 75% 50%)"} />
          ))}
          {/* sign */}
          <rect x="-10" y="34" width="100" height="20" fill="hsl(45 100% 55%)" stroke="hsl(0 75% 40%)" strokeWidth="1.5" />
          <text x="40" y="48" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="9" fill="hsl(0 75% 35%)">SHALIMAR ₹10</text>
          {/* counter */}
          <rect x="-30" y="100" width="140" height="20" fill="hsl(30 35% 22%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
          <rect x="-30" y="100" width="140" height="5" fill="hsl(45 70% 45%)" />

          {/* mixers */}
          <g transform="translate(-20, 70)">
            <rect x="0" y="20" width="18" height="10" rx="2" fill="hsl(45 90% 50%)" />
            <rect x="3" y="2" width="12" height="20" rx="2" fill="hsl(45 100% 60%)" stroke="hsl(0 0% 90%)" strokeWidth="0.5" />
            <motion.rect x="3" y="2" width="12" height="20" fill="hsl(45 100% 70%)"
              animate={{ scaleY: [1, 1.05, 0.95, 1] }} style={{ transformOrigin: "9px 22px" }}
              transition={{ duration: 0.4, repeat: Infinity }} />
          </g>
          <g transform="translate(20, 70)">
            <rect x="0" y="20" width="18" height="10" rx="2" fill="hsl(330 75% 60%)" />
            <rect x="3" y="2" width="12" height="20" rx="2" fill="hsl(345 80% 65%)" stroke="hsl(0 0% 90%)" strokeWidth="0.5" />
            <motion.rect x="3" y="2" width="12" height="20" fill="hsl(345 80% 75%)"
              animate={{ scaleY: [1, 1.05, 0.95, 1] }} style={{ transformOrigin: "9px 22px" }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }} />
          </g>
          <g transform="translate(60, 70)">
            <rect x="0" y="20" width="18" height="10" rx="2" fill="hsl(120 60% 45%)" />
            <rect x="3" y="2" width="12" height="20" rx="2" fill="hsl(120 60% 55%)" stroke="hsl(0 0% 90%)" strokeWidth="0.5" />
          </g>

          {/* pineapple + apple on counter */}
          <g transform="translate(-22, 88)">
            <ellipse cx="5" cy="6" rx="5" ry="7" fill="hsl(45 100% 55%)" stroke="hsl(35 80% 35%)" strokeWidth="0.4" />
            <path d="M 3 0 L 5 -4 M 6 0 L 6 -5 M 8 0 L 8 -4" stroke="hsl(120 60% 35%)" strokeWidth="1" strokeLinecap="round" />
          </g>
          <g transform="translate(95, 90)">
            <circle cx="5" cy="5" r="5" fill="hsl(355 75% 55%)" stroke="hsl(0 60% 35%)" strokeWidth="0.4" />
            <path d="M 5 0 L 5 -2" stroke="hsl(120 60% 30%)" strokeWidth="0.8" />
          </g>

          {/* TEAM MEMBER 1 */}
          <g transform="translate(0, 85)">
            <rect x="0" y="22" width="22" height="28" rx="4" fill="hsl(0 75% 48%)" />
            <circle cx="11" cy="12" r="8" fill="hsl(30 55% 76%)" />
            <path d="M 4 10 Q 4 4 11 4 Q 18 4 18 10 L 18 12 L 4 12 Z" fill="hsl(0 0% 95%)" />
            <circle cx="9" cy="13" r="0.9" fill="hsl(0 0% 10%)" />
            <circle cx="13" cy="13" r="0.9" fill="hsl(0 0% 10%)" />
            <motion.g style={{ transformOrigin: "20px 28px" }}
              animate={{ rotate: [-10, 25, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <rect x="18" y="26" width="6" height="14" rx="2" fill="hsl(0 75% 48%)" />
            </motion.g>
          </g>
          {/* TEAM MEMBER 2 */}
          <g transform="translate(50, 85)">
            <rect x="0" y="22" width="22" height="28" rx="4" fill="hsl(120 50% 38%)" />
            <circle cx="11" cy="12" r="8" fill="hsl(30 55% 76%)" />
            <path d="M 4 10 Q 4 4 11 4 Q 18 4 18 10 L 18 12 L 4 12 Z" fill="hsl(0 0% 95%)" />
            <circle cx="9" cy="13" r="0.9" fill="hsl(0 0% 10%)" />
            <circle cx="13" cy="13" r="0.9" fill="hsl(0 0% 10%)" />
            <motion.g style={{ transformOrigin: "0px 28px" }}
              animate={{ rotate: [10, -25, 10] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}>
              <rect x="-3" y="26" width="6" height="14" rx="2" fill="hsl(120 50% 38%)" />
            </motion.g>
          </g>
        </g>

        {/* ===== 8 GUESTS — distributed around the hall ===== */}
        {[
          { x: 60, y: 240, c: "hsl(15 70% 50%)", drink: "hsl(45 100% 60%)" },
          { x: 110, y: 245, c: "hsl(280 50% 50%)", drink: "hsl(15 90% 55%)" },
          { x: 170, y: 240, c: "hsl(220 60% 45%)", drink: "hsl(120 50% 45%)" },
          { x: 220, y: 245, c: "hsl(330 60% 55%)", drink: "hsl(45 100% 60%)" },
          { x: 470, y: 245, c: "hsl(190 60% 45%)", drink: "hsl(280 50% 60%)" },
          { x: 520, y: 240, c: "hsl(35 70% 45%)", drink: "hsl(45 100% 60%)" },
          { x: 580, y: 245, c: "hsl(120 45% 40%)", drink: "hsl(15 90% 55%)" },
          { x: 630, y: 240, c: "hsl(0 70% 50%)", drink: "hsl(45 100% 60%)" },
        ].map((g, i) => (
          <motion.g key={i} transform={`translate(${g.x}, ${g.y})`}
            animate={{ y: [g.y - 1, g.y + 1, g.y - 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }}>
            <rect x="0" y="22" width="22" height="34" rx="5" fill={g.c} />
            <circle cx="11" cy="14" r="9" fill="hsl(30 55% 76%)" />
            <circle cx="8" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
            <circle cx="14" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
            <path d="M 8 19 Q 11 21 14 19" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* glass */}
            <path d="M 22 30 L 30 30 L 29 42 L 23 42 Z" fill={g.drink} stroke="hsl(0 0% 95%)" strokeWidth="0.4" />
            {/* tiny "Yum" bubble */}
            {i % 3 === 0 && (
              <motion.g
                animate={{ opacity: [0, 1, 1, 0], y: [0, -3, -3, -6] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}>
                <ellipse cx="11" cy="-4" rx="14" ry="6" fill="hsl(0 0% 100%)" stroke="hsl(0 0% 15%)" strokeWidth="0.6" />
                <text x="11" y="-2" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(120 60% 30%)">Yum!</text>
              </motion.g>
            )}
          </motion.g>
        ))}

        {/* Walking guest going to stall */}
        <motion.g
          animate={{ x: [-30, 250], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
          <rect x="0" y="22" width="22" height="34" rx="5" fill="hsl(45 80% 45%)" />
          <circle cx="11" cy="14" r="9" fill="hsl(30 55% 76%)" />
          <circle cx="8" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
          <circle cx="14" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
          <motion.rect x="2" y="56" width="6" height="10" fill="hsl(220 30% 18%)"
            animate={{ scaleY: [1, 0.7, 1] }} style={{ transformOrigin: "5px 56px" }}
            transition={{ duration: 0.4, repeat: Infinity }} />
          <motion.rect x="14" y="56" width="6" height="10" fill="hsl(220 30% 18%)"
            animate={{ scaleY: [0.7, 1, 0.7] }} style={{ transformOrigin: "17px 56px" }}
            transition={{ duration: 0.4, repeat: Infinity }} />
        </motion.g>
      </svg>
    </div>
  );
};

export default PartyEventAnimation;
