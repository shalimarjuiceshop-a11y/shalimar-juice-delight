import { motion } from "framer-motion";

/**
 * Popping flat-style animation: Shalimar party juice counter storefront.
 * Inspired by Shutterstock 4K popping flat bakery storefront — adapted to party juice context.
 * Elements pop-in sequentially: ground → building → awning stripes → sign → windows → door
 * → juice glasses on counter → balloons → confetti burst → "LIVE COUNTER" badge pulse.
 */

const ease = [0.34, 1.56, 0.64, 1] as [number, number, number, number]; // back.out — popping feel

const pop = (delay = 0) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.55, delay, ease },
});

const popUp = (delay = 0) => ({
  initial: { y: 30, opacity: 0, scale: 0.6 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay, ease },
});

const PartyStorefrontAnimation = () => {
  return (
    <div
      className="relative w-full max-w-[520px] mx-auto aspect-[5/4] select-none"
      aria-label="Shalimar party juice counter storefront popping animation"
    >
      {/* soft ambient glow */}
      <div
        className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(45 100% 55% / 0.25), transparent 70%)",
        }}
      />

      <svg viewBox="0 0 500 400" className="relative w-full h-full">
        <defs>
          <linearGradient id="ps_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(28 35% 16%)" />
            <stop offset="100%" stopColor="hsl(30 25% 11%)" />
          </linearGradient>
          <linearGradient id="ps_wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(40 25% 92%)" />
            <stop offset="100%" stopColor="hsl(38 30% 82%)" />
          </linearGradient>
          <linearGradient id="ps_awning_a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 100% 60%)" />
            <stop offset="100%" stopColor="hsl(38 95% 48%)" />
          </linearGradient>
          <linearGradient id="ps_awning_b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(15 80% 45%)" />
            <stop offset="100%" stopColor="hsl(10 75% 35%)" />
          </linearGradient>
          <linearGradient id="ps_juice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 100% 70%)" />
            <stop offset="100%" stopColor="hsl(35 95% 50%)" />
          </linearGradient>
          <linearGradient id="ps_door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(28 60% 30%)" />
            <stop offset="100%" stopColor="hsl(28 55% 20%)" />
          </linearGradient>
          <radialGradient id="ps_window">
            <stop offset="0%" stopColor="hsl(45 100% 75%)" />
            <stop offset="100%" stopColor="hsl(38 90% 50%)" />
          </radialGradient>
        </defs>

        {/* sky / backdrop */}
        <rect width="500" height="400" fill="url(#ps_sky)" rx="20" />

        {/* tiny stars / sparkles in sky */}
        {[
          [60, 50], [120, 35], [200, 60], [340, 40], [430, 65], [460, 30],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`star-${i}`}
            cx={cx}
            cy={cy}
            r={1.5}
            fill="hsl(45 100% 80%)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 1] }}
            transition={{
              duration: 2.4,
              delay: 1.6 + i * 0.12,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* ground */}
        <motion.rect
          x="0"
          y="340"
          width="500"
          height="60"
          fill="hsl(30 25% 14%)"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "0 400px" }}
        />
        <motion.line
          x1="0" y1="340" x2="500" y2="340"
          stroke="hsl(45 80% 50%)" strokeWidth="1.5" strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* MAIN BUILDING — pops up from ground */}
        <motion.g
          {...popUp(0.25)}
          style={{ transformOrigin: "250px 340px", transformBox: "fill-box" }}
        >
          {/* wall */}
          <rect x="80" y="140" width="340" height="200" fill="url(#ps_wall)" rx="4" />
          {/* roof outline */}
          <rect x="76" y="138" width="348" height="6" fill="hsl(28 60% 25%)" rx="2" />
        </motion.g>

        {/* AWNING with alternating stripes — pops with bounce */}
        <motion.g {...pop(0.7)} style={{ transformOrigin: "250px 140px", transformBox: "fill-box" }}>
          {/* awning base */}
          <path d="M 70 140 L 430 140 L 410 195 L 90 195 Z" fill="url(#ps_awning_a)" />
          {/* stripes */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path
              key={i}
              d={`M ${90 + i * 40} 140 L ${110 + i * 40} 140 L ${100 + i * 40} 195 L ${80 + i * 40} 195 Z`}
              fill={i % 2 === 0 ? "url(#ps_awning_b)" : "none"}
              opacity={0.95}
            />
          ))}
          {/* scalloped edge */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <circle key={`s-${i}`} cx={95 + i * 40} cy={195} r={9} fill="url(#ps_awning_a)" />
          ))}
        </motion.g>

        {/* SIGN BOARD — pops with rotation */}
        <motion.g
          initial={{ scale: 0, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0, ease }}
          style={{ transformOrigin: "250px 115px", transformBox: "fill-box" }}
        >
          <rect x="135" y="95" width="230" height="42" rx="6" fill="hsl(30 35% 16%)" stroke="hsl(45 100% 55%)" strokeWidth="2" />
          <text
            x="250" y="123"
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontWeight="900"
            fontSize="20"
            fill="hsl(45 100% 60%)"
            letterSpacing="3"
          >
            SHALIMAR
          </text>
          {/* corner studs */}
          {[[140, 100], [360, 100], [140, 132], [360, 132]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.5} fill="hsl(45 100% 70%)" />
          ))}
        </motion.g>

        {/* WINDOWS — pop with stagger */}
        {[
          { x: 110, y: 215, delay: 1.2 },
          { x: 340, y: 215, delay: 1.35 },
        ].map((w, i) => (
          <motion.g key={i} {...pop(w.delay)} style={{ transformOrigin: `${w.x + 25}px ${w.y + 30}px`, transformBox: "fill-box" }}>
            <rect x={w.x} y={w.y} width="50" height="60" rx="4" fill="url(#ps_window)" stroke="hsl(28 50% 25%)" strokeWidth="2.5" />
            <line x1={w.x + 25} y1={w.y} x2={w.x + 25} y2={w.y + 60} stroke="hsl(28 50% 25%)" strokeWidth="2" />
            <line x1={w.x} y1={w.y + 30} x2={w.x + 50} y2={w.y + 30} stroke="hsl(28 50% 25%)" strokeWidth="2" />
          </motion.g>
        ))}

        {/* COUNTER (the live juice counter) — slides up */}
        <motion.g
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 1.5, ease }}
        >
          <rect x="180" y="265" width="140" height="75" rx="3" fill="hsl(45 60% 50%)" />
          <rect x="180" y="265" width="140" height="10" fill="hsl(30 60% 25%)" />
          <text x="250" y="312" textAnchor="middle" fontFamily="DM Sans" fontWeight="800" fontSize="9" fill="hsl(30 25% 12%)" letterSpacing="2">
            LIVE JUICE COUNTER
          </text>
          <text x="250" y="328" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="13" fill="hsl(15 80% 35%)" letterSpacing="1.5">
            ₹10 ONLY
          </text>
        </motion.g>

        {/* JUICE GLASSES on counter — pop sequentially */}
        {[
          { x: 195, delay: 1.75, color: "url(#ps_juice)" },
          { x: 232, delay: 1.85, color: "hsl(15 85% 55%)" },
          { x: 269, delay: 1.95, color: "hsl(120 50% 45%)" },
          { x: 306, delay: 2.05, color: "url(#ps_juice)" },
        ].map((g, i) => (
          <motion.g key={`glass-${i}`} {...pop(g.delay)} style={{ transformOrigin: `${g.x + 7}px 268px`, transformBox: "fill-box" }}>
            {/* glass */}
            <path d={`M ${g.x} 248 L ${g.x + 14} 248 L ${g.x + 12} 268 L ${g.x + 2} 268 Z`} fill="hsl(0 0% 100% / 0.25)" stroke="hsl(0 0% 100% / 0.5)" strokeWidth="0.6" />
            {/* juice fill */}
            <path d={`M ${g.x + 1} 252 L ${g.x + 13} 252 L ${g.x + 12} 267 L ${g.x + 2} 267 Z`} fill={g.color} />
            {/* straw */}
            <line x1={g.x + 9} y1={244} x2={g.x + 11} y2={258} stroke="hsl(45 100% 65%)" strokeWidth="1.2" strokeLinecap="round" />
          </motion.g>
        ))}

        {/* DOOR */}
        <motion.g {...popUp(1.4)} style={{ transformOrigin: "250px 340px", transformBox: "fill-box" }}>
          <rect x="232" y="200" width="36" height="65" rx="3" fill="url(#ps_door)" />
          <circle cx="261" cy="232" r="1.8" fill="hsl(45 100% 60%)" />
        </motion.g>

        {/* BALLOONS — float in */}
        {[
          { x: 60, color: "hsl(15 85% 55%)", delay: 2.1 },
          { x: 30, color: "hsl(45 100% 55%)", delay: 2.2 },
          { x: 460, color: "hsl(330 70% 60%)", delay: 2.15 },
          { x: 480, color: "hsl(200 70% 55%)", delay: 2.3 },
        ].map((b, i) => (
          <motion.g
            key={`bal-${i}`}
            initial={{ y: 60, opacity: 0, scale: 0 }}
            animate={{ y: [60, 0, -8, 0], opacity: 1, scale: 1 }}
            transition={{
              y: { duration: 3.5, delay: b.delay, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
              opacity: { duration: 0.4, delay: b.delay },
              scale: { duration: 0.5, delay: b.delay, ease },
            }}
          >
            <ellipse cx={b.x} cy={170} rx={11} ry={14} fill={b.color} />
            <path d={`M ${b.x} 184 L ${b.x - 1} 188 L ${b.x + 1} 188 Z`} fill={b.color} />
            <line x1={b.x} y1={188} x2={b.x + (i % 2 === 0 ? 2 : -2)} y2={235} stroke="hsl(45 30% 60%)" strokeWidth="0.8" />
            <ellipse cx={b.x - 3} cy={166} rx={2} ry={3} fill="hsl(0 0% 100% / 0.4)" />
          </motion.g>
        ))}

        {/* CONFETTI burst — appears after everything */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const r = 70 + (i % 3) * 12;
          const x = 250 + Math.cos(angle) * r;
          const y = 130 + Math.sin(angle) * r * 0.6;
          const colors = ["hsl(45 100% 60%)", "hsl(15 85% 55%)", "hsl(330 70% 60%)", "hsl(200 70% 55%)", "hsl(120 60% 50%)"];
          return (
            <motion.rect
              key={`conf-${i}`}
              x={x}
              y={y}
              width={5}
              height={8}
              fill={colors[i % colors.length]}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.2, 1, 1, 0],
                opacity: [0, 1, 1, 0.8, 0],
                rotate: [0, 180, 360],
                y: [y, y + 30],
              }}
              transition={{
                duration: 2.2,
                delay: 2.4 + i * 0.04,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* "LIVE" pulsing dot badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.6, ease }}
        >
          <rect x="380" y="155" width="50" height="20" rx="10" fill="hsl(0 75% 50%)" />
          <motion.circle
            cx={390} cy={165} r={3} fill="hsl(45 100% 90%)"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x={399} y={169} fontFamily="DM Sans" fontWeight="900" fontSize="9" fill="hsl(45 100% 95%)" letterSpacing="1.5">
            LIVE
          </text>
        </motion.g>
      </svg>
    </div>
  );
};

export default PartyStorefrontAnimation;
