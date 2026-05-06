import { motion } from "framer-motion";

/**
 * Cute "Photographer Cartoon" scene for the Gallery page.
 * A cartoon photographer stands in front of the Shalimar Juice shop and clicks
 * photos — camera flash + "CLICK!" + a polaroid prints out. Loops smoothly.
 */
const GalleryShopAnimation = () => {
  return (
    <div
      className="relative w-full max-w-2xl mx-auto h-[200px] md:h-[240px] overflow-hidden rounded-3xl border border-primary/25 shadow-pineapple"
      style={{
        background:
          "linear-gradient(180deg, hsl(35 85% 55%) 0%, hsl(38 70% 38%) 55%, hsl(30 35% 18%) 100%)",
      }}
      aria-label="Photographer clicks Shalimar Juice shop photos"
    >
      {/* sun glow */}
      <div className="absolute top-3 right-8 w-16 h-16 rounded-full blur-2xl opacity-70" style={{ background: "hsl(45 100% 65%)" }} />
      <motion.div
        className="absolute top-5 right-10 w-10 h-10 rounded-full"
        style={{ background: "radial-gradient(circle at 40% 40%, hsl(50 100% 90%), hsl(40 100% 55%))", boxShadow: "0 0 28px hsl(45 100% 60% / 0.7)" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px]" style={{ background: "linear-gradient(180deg, hsl(35 40% 28%) 0%, hsl(30 30% 14%) 100%)" }} />
      <div className="absolute bottom-[39px] left-0 right-0 h-[2px]" style={{ background: "hsl(45 80% 55%)", opacity: 0.7 }} />

      <svg viewBox="0 0 600 280" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="gAwn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 80% 52%)" />
            <stop offset="100%" stopColor="hsl(0 70% 42%)" />
          </linearGradient>
          <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(30 35% 24%)" />
            <stop offset="100%" stopColor="hsl(28 30% 14%)" />
          </linearGradient>
        </defs>

        {/* ===== SHALIMAR JUICE SHOP ===== */}
        <g transform="translate(220, 30)">
          {/* roof */}
          <rect x="0" y="0" width="280" height="12" fill="hsl(30 30% 12%)" />
          {/* sign */}
          <rect x="6" y="12" width="268" height="32" rx="3" fill="url(#gAwn)" stroke="hsl(45 100% 60%)" strokeWidth="2" />
          <text x="140" y="34" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="18" fill="hsl(45 100% 92%)" letterSpacing="2">
            SHALIMAR JUICE
          </text>
          {/* awning stripes */}
          <g>
            {Array.from({ length: 14 }).map((_, i) => (
              <polygon
                key={i}
                points={`${6 + i * 19.2},44 ${25 + i * 19.2},44 ${15.5 + i * 19.2},58`}
                fill={i % 2 === 0 ? "hsl(0 75% 50%)" : "hsl(45 100% 60%)"}
                stroke="hsl(30 30% 12%)"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* body */}
          <rect x="6" y="58" width="268" height="148" fill="url(#gWall)" stroke="hsl(45 70% 45%)" strokeWidth="1.5" />
          {/* window/counter */}
          <rect x="20" y="74" width="240" height="100" fill="hsl(38 55% 30%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />

          {/* glasses on counter */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(${36 + i * 36}, 132)`}>
              <path d="M 0 0 L 14 0 L 13 26 L 1 26 Z" fill={["hsl(45 100% 60%)", "hsl(15 90% 55%)", "hsl(120 50% 45%)", "hsl(280 55% 60%)", "hsl(345 80% 60%)", "hsl(45 100% 60%)"][i]} />
              <rect x="0" y="0" width="14" height="3" fill="hsl(45 100% 88%)" />
            </g>
          ))}

          {/* ₹10 board */}
          <g transform="translate(214, 64)">
            <rect x="0" y="0" width="48" height="34" rx="3" fill="hsl(0 80% 50%)" stroke="hsl(45 100% 75%)" strokeWidth="2" />
            <text x="24" y="14" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="8" fill="hsl(45 100% 95%)">ONLY</text>
            <text x="24" y="28" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="14" fill="hsl(45 100% 95%)">₹10</text>
          </g>

          {/* shopkeeper inside (smiling, waving) */}
          <g transform="translate(116, 100)">
            <circle cx="14" cy="14" r="11" fill="hsl(30 55% 76%)" />
            <path d="M 3 12 Q 3 4 14 4 Q 25 4 25 12 L 25 14 L 3 14 Z" fill="hsl(0 0% 95%)" />
            <circle cx="10" cy="16" r="1.3" fill="hsl(0 0% 10%)" />
            <circle cx="18" cy="16" r="1.3" fill="hsl(0 0% 10%)" />
            <path d="M 10 21 Q 14 23 18 21" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />
            <rect x="2" y="24" width="24" height="22" rx="4" fill="hsl(120 45% 35%)" />
            {/* waving arm */}
            <motion.g style={{ transformOrigin: "26px 28px" }} animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
              <rect x="24" y="26" width="6" height="14" rx="3" fill="hsl(120 45% 35%)" />
              <circle cx="27" cy="40" r="3" fill="hsl(30 55% 76%)" />
            </motion.g>
          </g>
        </g>

        {/* ===== PHOTOGRAPHER CARTOON ===== */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* legs */}
          <rect x="78" y="200" width="14" height="28" rx="3" fill="hsl(220 35% 22%)" />
          <rect x="98" y="200" width="14" height="28" rx="3" fill="hsl(220 35% 22%)" />
          <ellipse cx="85" cy="230" rx="11" ry="3" fill="hsl(0 0% 8%)" />
          <ellipse cx="105" cy="230" rx="11" ry="3" fill="hsl(0 0% 8%)" />
          {/* body */}
          <rect x="72" y="148" width="46" height="56" rx="6" fill="hsl(0 65% 45%)" stroke="hsl(30 30% 14%)" strokeWidth="0.8" />
          {/* "PRESS" tag */}
          <rect x="80" y="160" width="22" height="9" rx="2" fill="hsl(45 100% 60%)" />
          <text x="91" y="167" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(0 0% 10%)">PRESS</text>
          {/* head */}
          <circle cx="95" cy="132" r="16" fill="hsl(30 55% 76%)" />
          <path d="M 80 130 Q 80 116 95 116 Q 110 116 110 130 Q 110 124 103 121 Q 95 118 87 121 Q 80 124 80 130 Z" fill="hsl(30 28% 16%)" />
          {/* hat band */}
          <rect x="80" y="128" width="30" height="3" fill="hsl(0 0% 12%)" />
          {/* eyes (smile) — one eye behind viewfinder when shooting */}
          <circle cx="89" cy="133" r="1.8" fill="hsl(0 0% 10%)" />
          <circle cx="99" cy="133" r="1.8" fill="hsl(0 0% 10%)" />
          <path d="M 89 140 Q 95 144 101 140" stroke="hsl(0 0% 15%)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

          {/* strap */}
          <path d="M 78 152 Q 95 168 132 156" stroke="hsl(0 0% 12%)" strokeWidth="2" fill="none" />

          {/* arms holding camera (lift slightly while clicking) */}
          <motion.g
            animate={{ y: [0, -3, 0, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.35, 0.55, 1], ease: "easeInOut" }}
          >
            {/* left arm */}
            <rect x="108" y="156" width="22" height="9" rx="4" fill="hsl(0 65% 45%)" />
            {/* right arm */}
            <rect x="62" y="156" width="22" height="9" rx="4" fill="hsl(0 65% 45%)" />
            {/* camera body */}
            <rect x="118" y="146" width="44" height="28" rx="4" fill="hsl(0 0% 12%)" stroke="hsl(45 80% 55%)" strokeWidth="1" />
            <rect x="124" y="142" width="14" height="6" rx="1" fill="hsl(0 0% 18%)" />
            {/* lens */}
            <circle cx="140" cy="160" r="11" fill="hsl(0 0% 6%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
            <circle cx="140" cy="160" r="6" fill="hsl(220 60% 25%)" />
            <motion.circle
              cx="140" cy="160" r="3"
              fill="hsl(45 100% 70%)"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            {/* shutter button */}
            <circle cx="155" cy="142" r="2.5" fill="hsl(0 80% 55%)" />
            {/* flash bulb */}
            <rect x="148" y="138" width="6" height="4" rx="1" fill="hsl(45 100% 75%)" />
          </motion.g>
        </motion.g>

        {/* ===== FLASH BURST ===== */}
        <motion.g
          animate={{ opacity: [0, 0, 1, 0, 0], scale: [0.4, 0.4, 1.4, 1.6, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.4, 0.5, 0.6, 0.7], ease: "easeOut" }}
          style={{ transformOrigin: "151px 140px" }}
        >
          <circle cx="151" cy="140" r="20" fill="hsl(45 100% 85% / 0.7)" />
          <g stroke="hsl(45 100% 90%)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="151" y1="118" x2="151" y2="108" />
            <line x1="170" y1="125" x2="178" y2="118" />
            <line x1="174" y1="140" x2="184" y2="140" />
            <line x1="170" y1="155" x2="178" y2="162" />
            <line x1="132" y1="125" x2="124" y2="118" />
            <line x1="128" y1="140" x2="118" y2="140" />
          </g>
        </motion.g>

        {/* ===== CLICK! speech bubble ===== */}
        <motion.g
          animate={{ opacity: [0, 0, 1, 1, 0], y: [0, 0, -4, -6, -10], scale: [0.5, 0.5, 1, 1, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.45, 0.55, 0.85, 1], ease: "easeOut" }}
          style={{ transformOrigin: "60px 100px" }}
        >
          <ellipse cx="60" cy="104" rx="40" ry="18" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 14%)" strokeWidth="2" />
          <polygon points="78,118 92,128 84,114" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 14%)" strokeWidth="2" />
          <text x="60" y="111" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="16" fill="hsl(0 0% 10%)" letterSpacing="2">CLICK!</text>
        </motion.g>

        {/* ===== POLAROID PRINTING OUT ===== */}
        <motion.g
          animate={{
            opacity: [0, 0, 0, 1, 1, 0.8],
            y: [0, 0, 0, 0, 14, 26],
            rotate: [-6, -6, -6, -6, -3, 4],
          }}
          transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.55, 0.65, 0.7, 0.9, 1], ease: "easeOut" }}
          style={{ transformOrigin: "180px 200px" }}
        >
          <g transform="translate(160, 188)">
            <rect x="0" y="0" width="42" height="48" rx="2" fill="hsl(0 0% 96%)" stroke="hsl(0 0% 70%)" strokeWidth="0.6" />
            {/* tiny shop photo inside polaroid */}
            <rect x="3" y="3" width="36" height="32" fill="hsl(35 75% 50%)" />
            <rect x="6" y="8" width="30" height="6" fill="hsl(0 75% 48%)" />
            <text x="21" y="12.5" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="3" fill="hsl(45 100% 92%)">SHALIMAR</text>
            <rect x="6" y="16" width="30" height="16" fill="hsl(38 55% 30%)" />
            <circle cx="13" cy="24" r="2.5" fill="hsl(45 100% 60%)" />
            <circle cx="21" cy="24" r="2.5" fill="hsl(15 90% 55%)" />
            <circle cx="29" cy="24" r="2.5" fill="hsl(120 50% 45%)" />
            <text x="21" y="44" textAnchor="middle" fontFamily="DM Sans" fontWeight="800" fontSize="4" fill="hsl(0 0% 30%)">SHALIMAR ✦</text>
          </g>
        </motion.g>

        {/* sparkles */}
        {[0, 1, 2, 3].map((i) => {
          const cx = 360 + (i * 50);
          const cy = 50 + (i % 2) * 18;
          return (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r="1.8" fill="hsl(45 100% 80%)"
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 + i * 0.2 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default GalleryShopAnimation;
