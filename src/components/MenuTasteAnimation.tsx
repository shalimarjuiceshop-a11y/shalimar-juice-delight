import { motion } from "framer-motion";

/**
 * Cute cartoon animation for the Menu page.
 * Two boys at a juice counter — one reads the menu board,
 * the other sips a fresh juice and gives a "Nice!" thumbs-up.
 * Pure hand-crafted SVG + Framer Motion. Loops forever.
 */
const MenuTasteAnimation = () => {
  return (
    <div
      className="relative w-full h-[180px] md:h-[220px] overflow-hidden rounded-2xl border border-primary/20 shadow-pineapple"
      style={{
        background:
          "linear-gradient(180deg, hsl(38 70% 22%) 0%, hsl(35 55% 28%) 60%, hsl(45 60% 40%) 100%)",
      }}
    >
      {/* Warm sun glow */}
      <div
        className="absolute top-3 right-8 w-14 h-14 rounded-full blur-2xl opacity-70"
        style={{ background: "hsl(45 100% 60%)" }}
      />
      <div
        className="absolute top-5 right-10 w-8 h-8 rounded-full"
        style={{ background: "hsl(45 100% 75%)", boxShadow: "0 0 28px hsl(45 100% 60% / 0.7)" }}
      />

      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[34px]"
        style={{ background: "linear-gradient(180deg, hsl(35 40% 30%) 0%, hsl(30 30% 18%) 100%)" }}
      />
      <div
        className="absolute bottom-[33px] left-0 right-0 h-[2px] opacity-60"
        style={{ background: "hsl(45 80% 55%)" }}
      />

      <svg
        viewBox="0 0 600 220"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ===== MENU BOARD (left) ===== */}
        <g transform="translate(60, 30)">
          {/* board frame */}
          <rect x="0" y="0" width="150" height="115" rx="8" fill="hsl(30 25% 14%)" stroke="hsl(45 80% 55%)" strokeWidth="2.5" />
          <rect x="6" y="6" width="138" height="103" rx="5" fill="hsl(30 30% 10%)" />
          {/* MENU title */}
          <text x="75" y="28" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontWeight="900" fontSize="16" fill="hsl(45 100% 60%)">MENU</text>
          <line x1="20" y1="36" x2="130" y2="36" stroke="hsl(45 80% 55%)" strokeWidth="1" opacity="0.5" />
          {/* items */}
          <text x="14" y="54" fontFamily="DM Sans" fontWeight="700" fontSize="10" fill="hsl(45 50% 90%)">Pineapple</text>
          <text x="136" y="54" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="10" fill="hsl(45 100% 60%)">₹10</text>
          <text x="14" y="70" fontFamily="DM Sans" fontWeight="700" fontSize="10" fill="hsl(45 50% 90%)">Mango Shake</text>
          <text x="136" y="70" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="10" fill="hsl(45 100% 60%)">₹20</text>
          <text x="14" y="86" fontFamily="DM Sans" fontWeight="700" fontSize="10" fill="hsl(45 50% 90%)">Dry Fruit</text>
          <text x="136" y="86" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="10" fill="hsl(45 100% 60%)">₹30</text>
          <text x="14" y="102" fontFamily="DM Sans" fontWeight="700" fontSize="10" fill="hsl(45 50% 90%)">Apple Juice</text>
          <text x="136" y="102" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="10" fill="hsl(45 100% 60%)">₹10</text>
        </g>

        {/* ===== BOY 1 — reading menu ===== */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* body */}
          <rect x="225" y="120" width="36" height="48" rx="8" fill="hsl(210 70% 45%)" />
          {/* arms */}
          <motion.g
            style={{ transformOrigin: "243px 130px" }}
            animate={{ rotate: [-8, 4, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="215" y="128" width="10" height="28" rx="4" fill="hsl(210 70% 45%)" />
            <circle cx="220" cy="156" r="5" fill="hsl(30 50% 75%)" />
          </motion.g>
          <rect x="261" y="128" width="10" height="28" rx="4" fill="hsl(210 70% 45%)" />
          <circle cx="266" cy="156" r="5" fill="hsl(30 50% 75%)" />
          {/* legs */}
          <rect x="228" y="166" width="12" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <rect x="246" y="166" width="12" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <ellipse cx="234" cy="190" rx="9" ry="3" fill="hsl(30 20% 10%)" />
          <ellipse cx="252" cy="190" rx="9" ry="3" fill="hsl(30 20% 10%)" />
          {/* head */}
          <circle cx="243" cy="105" r="18" fill="hsl(30 50% 78%)" />
          {/* hair */}
          <path d="M 226 100 Q 226 86 243 86 Q 260 86 260 100 Q 260 95 252 92 Q 243 88 234 92 Q 226 95 226 100 Z" fill="hsl(30 30% 18%)" />
          {/* eyes — looking at board (left) */}
          <circle cx="237" cy="106" r="2.2" fill="hsl(0 0% 10%)" />
          <circle cx="247" cy="106" r="2.2" fill="hsl(0 0% 10%)" />
          {/* mouth */}
          <path d="M 239 113 Q 243 116 247 113" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* thinking bubble */}
          <motion.g
            animate={{ opacity: [0, 1, 1, 0], y: [0, -3, -3, -6] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
          >
            <circle cx="270" cy="78" r="3" fill="hsl(45 60% 95%)" opacity="0.9" />
            <circle cx="278" cy="72" r="4" fill="hsl(45 60% 95%)" opacity="0.95" />
            <ellipse cx="298" cy="62" rx="22" ry="14" fill="hsl(45 60% 95%)" />
            <text x="298" y="66" textAnchor="middle" fontFamily="DM Sans" fontWeight="800" fontSize="11" fill="hsl(30 30% 18%)">Hmm…</text>
          </motion.g>
        </motion.g>

        {/* ===== COUNTER ===== */}
        <g transform="translate(360, 130)">
          <rect x="0" y="0" width="190" height="58" rx="6" fill="hsl(30 35% 22%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
          <rect x="0" y="0" width="190" height="10" rx="4" fill="hsl(45 70% 45%)" />
          {/* small juice glasses on counter */}
          <g transform="translate(20, -22)">
            <path d="M 0 0 L 14 0 L 12 22 L 2 22 Z" fill="hsl(45 100% 60%)" />
            <rect x="0" y="0" width="14" height="3" fill="hsl(45 100% 80%)" />
          </g>
          <g transform="translate(50, -22)">
            <path d="M 0 0 L 14 0 L 12 22 L 2 22 Z" fill="hsl(15 90% 55%)" />
            <rect x="0" y="0" width="14" height="3" fill="hsl(15 90% 75%)" />
          </g>
          <g transform="translate(80, -22)">
            <path d="M 0 0 L 14 0 L 12 22 L 2 22 Z" fill="hsl(120 50% 45%)" />
            <rect x="0" y="0" width="14" height="3" fill="hsl(120 50% 65%)" />
          </g>
        </g>

        {/* ===== BOY 2 — drinking juice + thumbs up "Nice!" ===== */}
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* body */}
          <rect x="455" y="118" width="38" height="50" rx="8" fill="hsl(0 70% 50%)" />
          {/* legs */}
          <rect x="458" y="166" width="13" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <rect x="478" y="166" width="13" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <ellipse cx="464" cy="190" rx="10" ry="3" fill="hsl(30 20% 10%)" />
          <ellipse cx="484" cy="190" rx="10" ry="3" fill="hsl(30 20% 10%)" />

          {/* head */}
          <circle cx="474" cy="103" r="19" fill="hsl(30 55% 76%)" />
          {/* hair */}
          <path d="M 456 99 Q 456 82 474 82 Q 492 82 492 99 Q 492 92 482 89 Q 474 86 466 89 Q 456 92 456 99 Z" fill="hsl(25 40% 22%)" />
          {/* eyes — happy closed during sip */}
          <motion.g
            animate={{ scaleY: [1, 0.2, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.6, 1], ease: "easeInOut" }}
            style={{ transformOrigin: "474px 103px" }}
          >
            <circle cx="468" cy="103" r="2.2" fill="hsl(0 0% 10%)" />
            <circle cx="480" cy="103" r="2.2" fill="hsl(0 0% 10%)" />
          </motion.g>
          {/* smile */}
          <path d="M 468 112 Q 474 117 480 112" stroke="hsl(0 0% 15%)" strokeWidth="1.6" fill="none" strokeLinecap="round" />

          {/* LEFT arm holding glass — raises to mouth */}
          <motion.g
            style={{ transformOrigin: "460px 130px" }}
            animate={{ rotate: [10, -28, -28, 10, 10] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.35, 0.55, 0.7, 1], ease: "easeInOut" }}
          >
            <rect x="448" y="128" width="10" height="30" rx="4" fill="hsl(0 70% 50%)" />
            <circle cx="453" cy="158" r="5" fill="hsl(30 55% 76%)" />
            {/* glass with juice */}
            <g transform="translate(440, 140)">
              <path d="M 0 0 L 18 0 L 16 26 L 2 26 Z" fill="hsl(45 30% 95%)" stroke="hsl(45 40% 70%)" strokeWidth="1" />
              <path d="M 1.5 4 L 16.5 4 L 15 24 L 3 24 Z" fill="hsl(35 95% 55%)" />
              {/* straw */}
              <rect x="13" y="-6" width="2.5" height="14" rx="1" fill="hsl(0 80% 55%)" />
            </g>
          </motion.g>

          {/* RIGHT arm — thumbs up */}
          <motion.g
            style={{ transformOrigin: "493px 130px" }}
            animate={{ rotate: [0, 0, -55, -55, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.65, 0.85, 1], ease: "easeInOut" }}
          >
            <rect x="493" y="128" width="10" height="28" rx="4" fill="hsl(0 70% 50%)" />
            {/* hand + thumb */}
            <circle cx="498" cy="156" r="5.5" fill="hsl(30 55% 76%)" />
            <rect x="500" y="148" width="3.5" height="8" rx="1.5" fill="hsl(30 55% 76%)" />
          </motion.g>

          {/* "Nice!" speech bubble */}
          <motion.g
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.7, 0.9, 1], ease: "easeOut" }}
            style={{ transformOrigin: "525px 70px" }}
          >
            <ellipse cx="525" cy="70" rx="30" ry="18" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 18%)" strokeWidth="2" />
            <path d="M 510 82 L 504 92 L 516 84 Z" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 18%)" strokeWidth="2" strokeLinejoin="round" />
            <text x="525" y="75" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="14" fill="hsl(30 25% 14%)">Nice!</text>
          </motion.g>
        </motion.g>

        {/* sparkles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={500 + i * 12}
            cy={90 - i * 8}
            r={1.6}
            fill="hsl(45 100% 75%)"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default MenuTasteAnimation;
