import { motion } from "framer-motion";

/**
 * Shalimar Juice Shop scene animation.
 * A boy cycles from the left toward the Shalimar Juice shop on the right
 * (with a "₹10" board and a small crowd of customers), pauses at the shop
 * to buy juice, then cycles back — looping endlessly.
 *
 * Pure hand-crafted SVG + Framer Motion (no AI imagery).
 */

const LOOP = 14; // total loop seconds
// Timeline (fractions of LOOP):
//   0.00 - 0.35  ride right toward shop
//   0.35 - 0.55  stopped at shop (buying juice)
//   0.55 - 0.90  ride left back home
//   0.90 - 1.00  brief pause off-screen, then loop
const k = (t: number) => t; // keyframe helper

const DeliveryCyclistAnimation = () => {
  return (
    <div
      className="relative w-full h-[160px] md:h-[200px] overflow-hidden rounded-2xl border border-primary/15"
      style={{ background: "linear-gradient(180deg, hsl(38 55% 16%) 0%, hsl(30 18% 12%) 100%)" }}
    >
      {/* Sun / warm glow */}
      <div
        className="absolute top-3 left-8 w-12 h-12 rounded-full blur-2xl opacity-60"
        style={{ background: "hsl(45 100% 60%)" }}
      />
      <div
        className="absolute top-4 left-10 w-7 h-7 rounded-full"
        style={{ background: "hsl(45 100% 70%)", boxShadow: "0 0 24px hsl(45 100% 60% / 0.6)" }}
      />

      {/* Distant skyline (subtle, static) */}
      <div className="absolute bottom-[42px] left-0 right-0 flex items-end gap-6 opacity-25 px-4">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="w-6 h-8 rounded-t-sm" style={{ background: "hsl(38 25% 25%)" }} />
            <div className="w-4 h-12 rounded-t-sm" style={{ background: "hsl(38 25% 22%)" }} />
            <div className="w-7 h-6 rounded-t-md" style={{ background: "hsl(38 25% 28%)" }} />
          </div>
        ))}
      </div>

      {/* Road */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40px]"
        style={{ background: "linear-gradient(180deg, hsl(30 20% 20%) 0%, hsl(30 20% 14%) 100%)" }}
      />
      {/* Static dashed center line */}
      <div className="absolute bottom-[18px] left-0 right-0 flex gap-5 px-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-[3px] rounded-full shrink-0"
            style={{ background: "hsl(45 90% 60% / 0.55)" }}
          />
        ))}
      </div>

      {/* ============ SHALIMAR JUICE SHOP (right side) ============ */}
      <div className="absolute bottom-[40px] right-[3%] md:right-[5%]">
        <svg width="170" height="140" viewBox="0 0 170 140">
          <defs>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(15 75% 45%)" />
              <stop offset="100%" stopColor="hsl(15 70% 32%)" />
            </linearGradient>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(35 45% 88%)" />
              <stop offset="100%" stopColor="hsl(35 35% 75%)" />
            </linearGradient>
            <linearGradient id="boardGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(45 100% 55%)" />
              <stop offset="100%" stopColor="hsl(38 95% 45%)" />
            </linearGradient>
            <linearGradient id="rsBoard" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 80% 55%)" />
              <stop offset="100%" stopColor="hsl(0 75% 42%)" />
            </linearGradient>
          </defs>

          {/* Shop body */}
          <rect x="20" y="55" width="130" height="65" fill="url(#wallGrad)" stroke="hsl(30 30% 25%)" strokeWidth="0.8" />
          {/* Roof / awning */}
          <polygon points="14,55 156,55 146,40 24,40" fill="url(#roofGrad)" stroke="hsl(15 70% 25%)" strokeWidth="0.8" />
          {/* Awning stripes */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1={24 + i * 22}
              y1="40"
              x2={14 + i * 22}
              y2="55"
              stroke="hsl(35 45% 88%)"
              strokeWidth="1.2"
              opacity="0.55"
            />
          ))}

          {/* Shop name board (yellow) */}
          <rect x="18" y="22" width="134" height="18" rx="2" fill="url(#boardGrad)" stroke="hsl(35 80% 32%)" strokeWidth="0.8" />
          <text
            x="85"
            y="34.5"
            textAnchor="middle"
            fontSize="10"
            fontWeight="900"
            fill="hsl(15 80% 25%)"
            fontFamily="'DM Sans', system-ui, sans-serif"
            letterSpacing="0.5"
          >
            SHALIMAR JUICE
          </text>

          {/* ₹10 small red board hanging on left */}
          <line x1="28" y1="40" x2="28" y2="48" stroke="hsl(30 30% 20%)" strokeWidth="0.8" />
          <rect x="14" y="48" width="28" height="18" rx="2" fill="url(#rsBoard)" stroke="hsl(0 75% 25%)" strokeWidth="0.8" />
          <text
            x="28"
            y="61"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="hsl(45 100% 96%)"
            fontFamily="'DM Sans', system-ui, sans-serif"
          >
            ₹10
          </text>

          {/* Counter / opening */}
          <rect x="40" y="68" width="90" height="40" fill="hsl(30 25% 18%)" />
          {/* Counter top */}
          <rect x="38" y="86" width="94" height="6" fill="hsl(35 50% 65%)" stroke="hsl(30 30% 30%)" strokeWidth="0.6" />

          {/* Juice glasses on counter */}
          <g>
            <rect x="50" y="76" width="6" height="10" rx="1" fill="hsl(45 95% 60%)" stroke="hsl(35 60% 35%)" strokeWidth="0.5" />
            <rect x="60" y="74" width="6" height="12" rx="1" fill="hsl(35 95% 55%)" stroke="hsl(25 60% 35%)" strokeWidth="0.5" />
            <rect x="70" y="76" width="6" height="10" rx="1" fill="hsl(45 95% 60%)" stroke="hsl(35 60% 35%)" strokeWidth="0.5" />
            <rect x="80" y="73" width="6" height="13" rx="1" fill="hsl(15 85% 55%)" stroke="hsl(15 60% 30%)" strokeWidth="0.5" />
            <rect x="90" y="76" width="6" height="10" rx="1" fill="hsl(45 95% 60%)" stroke="hsl(35 60% 35%)" strokeWidth="0.5" />
            <rect x="100" y="74" width="6" height="12" rx="1" fill="hsl(120 50% 50%)" stroke="hsl(120 40% 25%)" strokeWidth="0.5" />
            <rect x="110" y="76" width="6" height="10" rx="1" fill="hsl(45 95% 60%)" stroke="hsl(35 60% 35%)" strokeWidth="0.5" />
          </g>

          {/* Shopkeeper behind counter */}
          <g>
            {/* head */}
            <circle cx="85" cy="72" r="5" fill="hsl(28 60% 65%)" />
            {/* cap */}
            <path d="M 80 71 Q 85 65 90 71 L 90 72 L 80 72 Z" fill="hsl(45 100% 50%)" stroke="hsl(35 90% 40%)" strokeWidth="0.5" />
            {/* torso */}
            <rect x="80" y="77" width="10" height="10" rx="1" fill="hsl(0 60% 45%)" />
            {/* arm pouring */}
            <motion.g
              animate={{ rotate: [0, -12, 0, -8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "82px 80px" }}
            >
              <line x1="82" y1="80" x2="76" y2="84" stroke="hsl(28 60% 65%)" strokeWidth="2.2" strokeLinecap="round" />
            </motion.g>
          </g>

          {/* Shop base shadow */}
          <ellipse cx="85" cy="122" rx="80" ry="3" fill="hsl(30 15% 6% / 0.35)" />
        </svg>
      </div>

      {/* ============ CROWD in front of shop ============ */}
      <div className="absolute bottom-[40px] right-[14%] md:right-[16%] flex items-end gap-1">
        {/* Customer 1 — slight bobbing */}
        <motion.svg
          width="22" height="42" viewBox="0 0 22 42"
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="11" cy="8" r="5" fill="hsl(28 60% 65%)" />
          <rect x="6" y="13" width="10" height="16" rx="2" fill="hsl(220 55% 50%)" />
          <line x1="8" y1="29" x2="7" y2="40" stroke="hsl(30 15% 18%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="29" x2="15" y2="40" stroke="hsl(30 15% 18%)" strokeWidth="2.5" strokeLinecap="round" />
          {/* glass in hand */}
          <rect x="14" y="18" width="4" height="6" rx="0.5" fill="hsl(45 95% 60%)" stroke="hsl(35 60% 35%)" strokeWidth="0.4" />
        </motion.svg>

        {/* Customer 2 (woman with dupatta) */}
        <motion.svg
          width="22" height="44" viewBox="0 0 22 44"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <circle cx="11" cy="8" r="5" fill="hsl(28 60% 68%)" />
          {/* hair */}
          <path d="M 6 8 Q 11 2 16 8" fill="hsl(20 25% 15%)" />
          <path d="M 6 13 Q 11 11 16 13 L 17 30 L 5 30 Z" fill="hsl(330 60% 55%)" />
          <line x1="8" y1="30" x2="7" y2="42" stroke="hsl(30 15% 18%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="30" x2="15" y2="42" stroke="hsl(30 15% 18%)" strokeWidth="2.5" strokeLinecap="round" />
        </motion.svg>

        {/* Customer 3 (boy) */}
        <motion.svg
          width="20" height="38" viewBox="0 0 20 38"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <circle cx="10" cy="7" r="4.5" fill="hsl(28 60% 65%)" />
          <rect x="6" y="11.5" width="8" height="14" rx="2" fill="hsl(120 40% 40%)" />
          <line x1="7" y1="25" x2="6" y2="36" stroke="hsl(30 15% 18%)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="13" y1="25" x2="14" y2="36" stroke="hsl(30 15% 18%)" strokeWidth="2.2" strokeLinecap="round" />
        </motion.svg>

        {/* Customer 4 */}
        <motion.svg
          width="22" height="42" viewBox="0 0 22 42"
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <circle cx="11" cy="8" r="5" fill="hsl(28 60% 60%)" />
          <rect x="6" y="13" width="10" height="16" rx="2" fill="hsl(45 80% 50%)" />
          <line x1="8" y1="29" x2="7" y2="40" stroke="hsl(30 15% 18%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="29" x2="15" y2="40" stroke="hsl(30 15% 18%)" strokeWidth="2.5" strokeLinecap="round" />
        </motion.svg>
      </div>

      {/* ============ CYCLIST — moves left↔right and flips ============ */}
      <motion.div
        className="absolute bottom-[28px]"
        style={{ left: 0 }}
        animate={{
          // left position as percentages of container width
          left: ["-12%", "55%", "55%", "-12%", "-12%"],
        }}
        transition={{
          duration: LOOP,
          times: [k(0), k(0.35), k(0.55), k(0.9), k(1)],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Flip horizontally on the way back */}
        <motion.div
          animate={{ scaleX: [1, 1, 1, -1, -1, 1] }}
          transition={{
            duration: LOOP,
            times: [0, 0.34, 0.55, 0.56, 0.9, 0.91],
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "90px 60px" }}
        >
          {/* Subtle bobbing while moving (suppressed at shop is fine — looks natural) */}
          <motion.div
            animate={{ y: [0, -2, 0, -1, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
          >
            <CyclistSVG />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Foreground caption pill */}
      <div
        className="absolute top-3 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border border-primary/30"
        style={{ background: "hsl(30 15% 8% / 0.6)" }}
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span
          className="text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase"
          style={{ color: "hsl(45 90% 75%)" }}
        >
          Fresh Juice • Just ₹10
        </span>
      </div>
    </div>
  );
};

/** Boy on a bicycle — same vector style as before, no delivery box. */
const CyclistSVG = () => (
  <svg width="180" height="120" viewBox="0 0 180 120">
    <defs>
      <linearGradient id="frameGrad2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(45 100% 55%)" />
        <stop offset="100%" stopColor="hsl(35 90% 50%)" />
      </linearGradient>
    </defs>

    {/* Rear wheel */}
    <g transform="translate(40, 90)">
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "0px 0px" }}
      >
        <circle r="18" fill="none" stroke="hsl(30 15% 8%)" strokeWidth="3.5" />
        <circle r="18" fill="none" stroke="hsl(30 20% 25%)" strokeWidth="1" />
        {[0, 30, 60, 90, 120, 150].map((a) => (
          <line
            key={a}
            x1="0"
            y1="0"
            x2={18 * Math.cos((a * Math.PI) / 180)}
            y2={18 * Math.sin((a * Math.PI) / 180)}
            stroke="hsl(45 30% 70%)"
            strokeWidth="0.8"
          />
        ))}
        <circle r="2.5" fill="hsl(45 80% 60%)" />
      </motion.g>
    </g>

    {/* Front wheel */}
    <g transform="translate(130, 90)">
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "0px 0px" }}
      >
        <circle r="18" fill="none" stroke="hsl(30 15% 8%)" strokeWidth="3.5" />
        <circle r="18" fill="none" stroke="hsl(30 20% 25%)" strokeWidth="1" />
        {[0, 30, 60, 90, 120, 150].map((a) => (
          <line
            key={a}
            x1="0"
            y1="0"
            x2={18 * Math.cos((a * Math.PI) / 180)}
            y2={18 * Math.sin((a * Math.PI) / 180)}
            stroke="hsl(45 30% 70%)"
            strokeWidth="0.8"
          />
        ))}
        <circle r="2.5" fill="hsl(45 80% 60%)" />
      </motion.g>
    </g>

    {/* Frame */}
    <line x1="40" y1="90" x2="85" y2="62" stroke="url(#frameGrad2)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="85" y1="62" x2="78" y2="78" stroke="url(#frameGrad2)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="78" y1="78" x2="40" y2="90" stroke="url(#frameGrad2)" strokeWidth="3" strokeLinecap="round" />
    <line x1="85" y1="62" x2="115" y2="58" stroke="url(#frameGrad2)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="115" y1="58" x2="130" y2="90" stroke="url(#frameGrad2)" strokeWidth="3.5" strokeLinecap="round" />
    {/* handlebar */}
    <line x1="115" y1="58" x2="120" y2="48" stroke="hsl(30 15% 12%)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="120" y1="48" x2="128" y2="50" stroke="hsl(30 15% 12%)" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="83" cy="59" rx="6" ry="2" fill="hsl(30 15% 10%)" />

    {/* Pedal crank */}
    <motion.g
      transform="translate(78, 78)"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "0px 0px" }}
    >
      <circle r="3" fill="hsl(45 80% 50%)" stroke="hsl(30 15% 10%)" strokeWidth="0.8" />
      <line x1="0" y1="0" x2="9" y2="0" stroke="hsl(30 15% 10%)" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="0" x2="-9" y2="0" stroke="hsl(30 15% 10%)" strokeWidth="2" strokeLinecap="round" />
      <rect x="7" y="-2.5" width="5" height="2" rx="0.5" fill="hsl(30 15% 8%)" />
      <rect x="-12" y="0.5" width="5" height="2" rx="0.5" fill="hsl(30 15% 8%)" />
    </motion.g>

    {/* Rider torso */}
    <path d="M 88 56 Q 96 42 110 50" stroke="hsl(220 60% 45%)" strokeWidth="9" strokeLinecap="round" fill="none" />
    {/* Arm */}
    <line x1="108" y1="50" x2="118" y2="50" stroke="hsl(28 60% 65%)" strokeWidth="3" strokeLinecap="round" />
    {/* Front leg */}
    <motion.g
      animate={{ rotate: [0, 18, 0, -18, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "88px 58px" }}
    >
      <line x1="88" y1="58" x2="82" y2="74" stroke="hsl(220 60% 45%)" strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="74" x2="80" y2="80" stroke="hsl(28 60% 65%)" strokeWidth="3.5" strokeLinecap="round" />
    </motion.g>
    {/* Back leg */}
    <motion.g
      animate={{ rotate: [0, -18, 0, 18, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "88px 58px" }}
    >
      <line x1="88" y1="58" x2="76" y2="72" stroke="hsl(220 60% 40%)" strokeWidth="4" strokeLinecap="round" />
      <line x1="76" y1="72" x2="74" y2="78" stroke="hsl(28 60% 60%)" strokeWidth="3.5" strokeLinecap="round" />
    </motion.g>

    {/* Head + helmet */}
    <circle cx="92" cy="36" r="6" fill="hsl(28 60% 65%)" />
    <path
      d="M 86 35 Q 92 26 98 35 L 98 36 L 86 36 Z"
      fill="hsl(45 100% 50%)"
      stroke="hsl(35 90% 40%)"
      strokeWidth="0.8"
    />
    <line x1="86" y1="35" x2="98" y2="35" stroke="hsl(30 15% 10%)" strokeWidth="0.8" />

    {/* Dust puffs near rear wheel */}
    <motion.g
      animate={{ opacity: [0, 0.5, 0], scale: [0.6, 1.1, 1.3], x: [0, -8, -16] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
    >
      <circle cx="22" cy="105" r="3" fill="hsl(45 30% 55% / 0.6)" />
      <circle cx="16" cy="103" r="2" fill="hsl(45 30% 55% / 0.5)" />
    </motion.g>
  </svg>
);

export default DeliveryCyclistAnimation;
