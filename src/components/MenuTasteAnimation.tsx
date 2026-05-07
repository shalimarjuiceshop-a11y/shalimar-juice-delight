import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LiveShopTimeBadge from "./LiveShopTimeBadge";

/**
 * Cinematic Shalimar Juice Shop scene.
 * - IST hour controls state:
 *    • 23:00 - 11:00 → CLOSED (shutter down, "CLOSED" sign, sleeping owner)
 *    • 11:00 - 19:00 → OPEN, day (sun)
 *    • 19:00 - 23:00 → OPEN, night (moon + stars)
 * - Inside (when open): pineapple-cutter boy → yellow mixer; apple-cutter boy → pink mixer; juice-maker pours into glass
 * - Hanging pineapples decorate the shop interior
 * - Outside: a small table with two customers sipping juice; one boy reads the menu
 */
const MenuTasteAnimation = () => {
  const [phase, setPhase] = useState<"day" | "night" | "closed">("day");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const istMinutes = now.getUTCHours() * 60 + now.getUTCMinutes() + 330;
      const totalMin = ((istMinutes % 1440) + 1440) % 1440;
      // Open: 11:30 AM (690) - 11:00 PM (1380). Closed otherwise.
      if (totalMin < 690 || totalMin >= 1380) setPhase("closed");
      else if (totalMin >= 19 * 60) setPhase("night");
      else setPhase("day");
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const isClosed = phase === "closed";
  const isNight = phase === "night";

  const skyGradient = isClosed
    ? "linear-gradient(180deg, hsl(230 55% 6%) 0%, hsl(245 50% 14%) 55%, hsl(30 30% 18%) 100%)"
    : isNight
    ? "linear-gradient(180deg, hsl(230 50% 10%) 0%, hsl(250 45% 18%) 55%, hsl(30 35% 22%) 100%)"
    : "linear-gradient(180deg, hsl(35 90% 60%) 0%, hsl(38 85% 50%) 45%, hsl(38 60% 30%) 100%)";

  return (
    <div
      className="relative w-full h-[260px] md:h-[340px] overflow-hidden rounded-2xl border border-primary/25 shadow-pineapple"
      style={{ background: skyGradient }}
      aria-label="Shalimar Juice shop animation"
    >
      <LiveShopTimeBadge />
      {/* Stars (night + closed) */}
      {(isNight || isClosed) &&
        Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${4 + (i * 7) % 36}%`,
              left: `${(i * 53) % 100}%`,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              background: "hsl(45 100% 92%)",
              boxShadow: "0 0 6px hsl(45 100% 80% / 0.8)",
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
          />
        ))}

      {/* Sun or Moon */}
      {!isClosed && !isNight && (
        <>
          <div className="absolute top-4 right-10 w-20 h-20 rounded-full blur-3xl opacity-80" style={{ background: "hsl(45 100% 65%)" }} />
          <motion.div
            className="absolute top-6 right-12 w-14 h-14 rounded-full"
            style={{
              background: "radial-gradient(circle at 40% 40%, hsl(50 100% 85%), hsl(40 100% 55%))",
              boxShadow: "0 0 40px hsl(45 100% 60% / 0.8)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      {(isNight || isClosed) && (
        <>
          <div className="absolute top-5 right-10 w-16 h-16 rounded-full blur-2xl opacity-70" style={{ background: "hsl(45 90% 80%)" }} />
          <motion.div
            className="absolute top-7 right-12 w-12 h-12 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, hsl(45 60% 96%), hsl(45 40% 80%))",
              boxShadow: "0 0 30px hsl(45 90% 80% / 0.6), inset -6px -4px 0 hsl(230 30% 60% / 0.35)",
            }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Skyline */}
      <svg viewBox="0 0 600 80" className="absolute left-0 right-0 w-full h-[60px]" style={{ top: "42%" }} preserveAspectRatio="none">
        <path
          d="M0,80 L0,55 L40,55 L50,40 L70,40 L80,30 L110,30 L120,45 L160,45 L170,35 L210,35 L220,50 L260,50 L275,38 L310,38 L320,28 L360,28 L370,42 L410,42 L420,35 L460,35 L475,48 L510,48 L520,38 L560,38 L575,50 L600,50 L600,80 Z"
          fill={isClosed ? "hsl(240 30% 10%)" : isNight ? "hsl(240 30% 14%)" : "hsl(30 30% 18%)"}
          opacity="0.85"
        />
      </svg>

      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[42px]"
        style={{
          background: isClosed
            ? "linear-gradient(180deg, hsl(30 22% 14%) 0%, hsl(30 22% 8%) 100%)"
            : isNight
            ? "linear-gradient(180deg, hsl(35 25% 18%) 0%, hsl(30 25% 10%) 100%)"
            : "linear-gradient(180deg, hsl(35 40% 30%) 0%, hsl(30 30% 18%) 100%)",
        }}
      />
      <div className="absolute bottom-[41px] left-0 right-0 h-[2px]" style={{ background: "hsl(45 80% 55%)", opacity: 0.7 }} />

      <svg viewBox="0 0 600 340" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="signGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 100% 62%)" />
            <stop offset="100%" stopColor="hsl(38 95% 48%)" />
          </linearGradient>
          <linearGradient id="shopWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(30 35% 22%)" />
            <stop offset="100%" stopColor="hsl(28 30% 14%)" />
          </linearGradient>
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(45 100% 80%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(45 100% 60%)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="shutterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(220 10% 28%)" />
            <stop offset="100%" stopColor="hsl(220 10% 14%)" />
          </linearGradient>
        </defs>

        {/* ============ SHOP ============ */}
        <g transform="translate(40, 60)">
          {/* Roof */}
          <rect x="0" y="0" width="320" height="14" fill="hsl(30 30% 12%)" />
          {/* Sign */}
          <rect x="6" y="14" width="308" height="36" rx="4" fill="url(#signGrad)" stroke="hsl(30 30% 12%)" strokeWidth="2" />
          <text x="160" y="40" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="22" fill="hsl(30 25% 12%)" letterSpacing="2">
            SHALIMAR JUICE
          </text>
          {/* Awning stripes */}
          <g>
            {Array.from({ length: 16 }).map((_, i) => (
              <polygon
                key={i}
                points={`${6 + i * 19.5},50 ${25 + i * 19.5},50 ${15.5 + i * 19.5},66`}
                fill={i % 2 === 0 ? "hsl(0 75% 50%)" : "hsl(45 100% 60%)"}
                stroke="hsl(30 30% 12%)"
                strokeWidth="0.6"
              />
            ))}
          </g>

          {/* Shop body */}
          <rect x="6" y="66" width="308" height="160" fill="url(#shopWall)" stroke="hsl(45 70% 45%)" strokeWidth="1.5" />
          {/* Interior wall */}
          <rect x="14" y="74" width="292" height="120" fill={isClosed ? "hsl(30 25% 10%)" : isNight ? "hsl(35 35% 22%)" : "hsl(38 50% 38%)"} />

          {/* ===== HANGING PINEAPPLES (decor) ===== */}
          {!isClosed && [40, 100, 160, 220, 280].map((cx, i) => (
            <motion.g
              key={`hp-${i}`}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
              style={{ transformOrigin: `${cx}px 74px` }}
            >
              <line x1={cx} y1="74" x2={cx} y2="86" stroke="hsl(0 0% 25%)" strokeWidth="0.6" />
              {/* leaves */}
              <path d={`M ${cx - 3} 86 L ${cx} 80 L ${cx + 3} 86 M ${cx - 1} 86 L ${cx} 78`}
                stroke="hsl(120 60% 35%)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              {/* fruit */}
              <ellipse cx={cx} cy={94} rx="5" ry="7" fill="hsl(45 100% 55%)" stroke="hsl(35 80% 35%)" strokeWidth="0.6" />
              <path d={`M ${cx - 4} 92 L ${cx + 4} 96 M ${cx - 4} 96 L ${cx + 4} 92`} stroke="hsl(35 70% 30%)" strokeWidth="0.4" />
            </motion.g>
          ))}

          {/* Hanging bulbs */}
          {[60, 130, 200, 270].map((cx, i) => (
            <g key={i}>
              <line x1={cx} y1="66" x2={cx} y2="78" stroke="hsl(0 0% 20%)" strokeWidth="0.6" />
              <circle cx={cx} cy="80" r="8" fill="url(#bulbGlow)" opacity={isClosed ? 0.2 : 1} />
              <motion.circle
                cx={cx}
                cy="80"
                r="2.5"
                fill={isClosed ? "hsl(45 30% 30%)" : "hsl(45 100% 75%)"}
                animate={isClosed ? {} : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
              />
            </g>
          ))}

          {/* ₹10 board */}
          <g transform="translate(20, 110)" opacity={isClosed ? 0.4 : 1}>
            <rect x="0" y="0" width="48" height="46" rx="4" fill="hsl(0 75% 48%)" stroke="hsl(45 100% 65%)" strokeWidth="2" />
            <text x="24" y="18" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="9" fill="hsl(45 100% 90%)">ONLY</text>
            <text x="24" y="38" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="18" fill="hsl(45 100% 90%)">₹10</text>
          </g>

          {/* MENU board */}
          <g transform="translate(244, 108)" opacity={isClosed ? 0.4 : 1}>
            <rect x="0" y="0" width="56" height="54" rx="3" fill="hsl(30 30% 10%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
            <text x="28" y="11" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="8" fill="hsl(45 100% 60%)">MENU</text>
            <text x="4" y="22" fontFamily="DM Sans" fontWeight="700" fontSize="6" fill="hsl(45 50% 92%)">Pineapple</text>
            <text x="52" y="22" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(45 100% 60%)">₹10</text>
            <text x="4" y="31" fontFamily="DM Sans" fontWeight="700" fontSize="6" fill="hsl(45 50% 92%)">Apple</text>
            <text x="52" y="31" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(45 100% 60%)">₹10</text>
            <text x="4" y="40" fontFamily="DM Sans" fontWeight="700" fontSize="6" fill="hsl(45 50% 92%)">Mango</text>
            <text x="52" y="40" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(45 100% 60%)">₹20</text>
            <text x="4" y="49" fontFamily="DM Sans" fontWeight="700" fontSize="6" fill="hsl(45 50% 92%)">Dry Fruit</text>
            <text x="52" y="49" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(45 100% 60%)">₹30</text>
          </g>

          {/* COUNTER */}
          <rect x="14" y="180" width="292" height="46" fill="hsl(30 35% 18%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
          <rect x="14" y="180" width="292" height="8" fill="hsl(45 70% 45%)" />

          {/* ===== When OPEN: characters & mixers ===== */}
          {!isClosed && (
            <>
              {/* ===== YELLOW MIXER (pineapple) — left ===== */}
              <g transform="translate(78, 152)">
                <rect x="0" y="26" width="26" height="14" rx="2" fill="hsl(45 90% 50%)" stroke="hsl(30 30% 10%)" strokeWidth="0.8" />
                <rect x="2" y="34" width="22" height="2" fill="hsl(0 0% 90%)" opacity="0.6" />
                <rect x="4" y="4" width="18" height="24" rx="2" fill="hsl(200 30% 90%)" opacity="0.55" stroke="hsl(0 0% 90%)" strokeWidth="0.6" />
                <motion.rect x="5" y="10" width="16" height="17" fill="hsl(45 100% 55%)"
                  animate={{ scaleY: [1, 1.04, 0.97, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ transformOrigin: "13px 27px" }} />
                <rect x="3" y="2" width="20" height="3" rx="1" fill="hsl(0 0% 25%)" />
                <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "13px 18px" }}>
                  <line x1="6" y1="18" x2="20" y2="18" stroke="hsl(0 0% 100% / 0.45)" strokeWidth="0.8" />
                  <line x1="13" y1="11" x2="13" y2="25" stroke="hsl(0 0% 100% / 0.25)" strokeWidth="0.6" />
                </motion.g>
                <motion.circle cx="22" cy="32" r="1.2" fill="hsl(0 90% 55%)" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} />
                {/* label */}
                <text x="13" y="48" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="5" fill="hsl(45 100% 70%)">PINEAPPLE</text>
              </g>

              {/* ===== PINK MIXER (apple) — center ===== */}
              <g transform="translate(140, 152)">
                <rect x="0" y="26" width="26" height="14" rx="2" fill="hsl(330 75% 60%)" stroke="hsl(30 30% 10%)" strokeWidth="0.8" />
                <rect x="2" y="34" width="22" height="2" fill="hsl(0 0% 90%)" opacity="0.6" />
                <rect x="4" y="4" width="18" height="24" rx="2" fill="hsl(200 30% 90%)" opacity="0.55" stroke="hsl(0 0% 90%)" strokeWidth="0.6" />
                <motion.rect x="5" y="10" width="16" height="17" fill="hsl(345 80% 65%)"
                  animate={{ scaleY: [1, 1.04, 0.97, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                  style={{ transformOrigin: "13px 27px" }} />
                <rect x="3" y="2" width="20" height="3" rx="1" fill="hsl(0 0% 25%)" />
                <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "13px 18px" }}>
                  <line x1="6" y1="18" x2="20" y2="18" stroke="hsl(0 0% 100% / 0.45)" strokeWidth="0.8" />
                </motion.g>
                <motion.circle cx="22" cy="32" r="1.2" fill="hsl(0 90% 55%)" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
                <text x="13" y="48" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="5" fill="hsl(330 90% 75%)">APPLE</text>
              </g>

              {/* ===== PINEAPPLE-CUTTER BOY — left, behind yellow mixer ===== */}
              <g transform="translate(40, 130)">
                {/* body */}
                <rect x="0" y="22" width="34" height="40" rx="6" fill="hsl(120 50% 38%)" stroke="hsl(30 30% 14%)" strokeWidth="0.8" />
                {/* head */}
                <circle cx="17" cy="14" r="11" fill="hsl(30 55% 76%)" />
                <path d="M 6 12 Q 6 4 17 4 Q 28 4 28 12 L 28 14 L 6 14 Z" fill="hsl(0 0% 95%)" />
                <circle cx="13" cy="16" r="1.4" fill="hsl(0 0% 10%)" />
                <circle cx="21" cy="16" r="1.4" fill="hsl(0 0% 10%)" />
                <path d="M 13 21 Q 17 23 21 21" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />

                {/* cutting board on counter */}
                <rect x="-8" y="50" width="48" height="4" rx="1" fill="hsl(30 35% 35%)" />

                {/* pineapple being cut */}
                <g transform="translate(-2, 42)">
                  <ellipse cx="6" cy="6" rx="6" ry="8" fill="hsl(45 100% 55%)" stroke="hsl(35 80% 35%)" strokeWidth="0.5" />
                  <path d="M 3 0 L 5 -5 M 6 0 L 6 -6 M 9 0 L 7 -5" stroke="hsl(120 60% 35%)" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* RIGHT arm with knife — chopping motion */}
                <motion.g
                  style={{ transformOrigin: "30px 30px" }}
                  animate={{ rotate: [-15, 25, -15] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="28" y="26" width="9" height="20" rx="3" fill="hsl(120 50% 38%)" />
                  <circle cx="32" cy="46" r="3.5" fill="hsl(30 55% 76%)" />
                  {/* knife */}
                  <rect x="34" y="44" width="2" height="10" fill="hsl(0 0% 25%)" />
                  <polygon points="30,52 40,52 38,58 32,58" fill="hsl(0 0% 88%)" stroke="hsl(0 0% 50%)" strokeWidth="0.4" />
                </motion.g>
                {/* LEFT arm holding pineapple */}
                <rect x="-3" y="28" width="8" height="18" rx="3" fill="hsl(120 50% 38%)" />
                <circle cx="1" cy="46" r="3.5" fill="hsl(30 55% 76%)" />

                {/* arc: yellow chunk flying into mixer */}
                <motion.circle
                  r="2.2"
                  fill="hsl(45 100% 55%)"
                  animate={{
                    cx: [10, 50, 90],
                    cy: [44, 20, 56],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              </g>

              {/* ===== APPLE-CUTTER BOY — center, behind pink mixer ===== */}
              <g transform="translate(108, 130)">
                <rect x="0" y="22" width="34" height="40" rx="6" fill="hsl(330 60% 50%)" stroke="hsl(30 30% 14%)" strokeWidth="0.8" />
                <circle cx="17" cy="14" r="11" fill="hsl(30 50% 78%)" />
                <path d="M 6 12 Q 6 4 17 4 Q 28 4 28 12 L 28 14 L 6 14 Z" fill="hsl(0 0% 95%)" />
                <circle cx="13" cy="16" r="1.4" fill="hsl(0 0% 10%)" />
                <circle cx="21" cy="16" r="1.4" fill="hsl(0 0% 10%)" />
                <path d="M 13 21 Q 17 23 21 21" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />

                <rect x="-8" y="50" width="48" height="4" rx="1" fill="hsl(30 35% 35%)" />

                {/* apple being cut */}
                <g transform="translate(-1, 44)">
                  <circle cx="6" cy="6" r="6" fill="hsl(355 75% 55%)" stroke="hsl(0 60% 35%)" strokeWidth="0.5" />
                  <path d="M 6 0 L 6 -3" stroke="hsl(120 60% 30%)" strokeWidth="1" strokeLinecap="round" />
                  <ellipse cx="8" cy="-2" rx="2" ry="1" fill="hsl(120 60% 40%)" />
                </g>

                <motion.g
                  style={{ transformOrigin: "30px 30px" }}
                  animate={{ rotate: [-15, 25, -15] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                >
                  <rect x="28" y="26" width="9" height="20" rx="3" fill="hsl(330 60% 50%)" />
                  <circle cx="32" cy="46" r="3.5" fill="hsl(30 50% 78%)" />
                  <rect x="34" y="44" width="2" height="10" fill="hsl(0 0% 25%)" />
                  <polygon points="30,52 40,52 38,58 32,58" fill="hsl(0 0% 88%)" stroke="hsl(0 0% 50%)" strokeWidth="0.4" />
                </motion.g>
                <rect x="-3" y="28" width="8" height="18" rx="3" fill="hsl(330 60% 50%)" />
                <circle cx="1" cy="46" r="3.5" fill="hsl(30 50% 78%)" />

                {/* pink chunk arc into mixer */}
                <motion.circle
                  r="2.2"
                  fill="hsl(345 80% 65%)"
                  animate={{
                    cx: [10, 50, 90],
                    cy: [44, 20, 56],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.35 }}
                />
              </g>

              {/* ===== JUICE-MAKER BOY — right, pouring into glass ===== */}
              <g transform="translate(232, 122)">
                <rect x="-2" y="40" width="40" height="44" rx="6" fill="hsl(45 100% 55%)" stroke="hsl(30 30% 15%)" strokeWidth="1" />
                <rect x="2" y="44" width="32" height="4" fill="hsl(0 75% 48%)" />
                <text x="18" y="70" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(30 25% 14%)">SHALIMAR</text>
                <circle cx="18" cy="22" r="14" fill="hsl(30 55% 76%)" />
                <path d="M 4 18 Q 4 6 18 6 Q 32 6 32 18 L 32 20 L 4 20 Z" fill="hsl(0 75% 48%)" />
                <rect x="3" y="19" width="30" height="3" fill="hsl(0 0% 95%)" />
                <circle cx="13" cy="24" r="1.6" fill="hsl(0 0% 10%)" />
                <circle cx="23" cy="24" r="1.6" fill="hsl(0 0% 10%)" />
                <path d="M 13 30 Q 18 33 23 30" stroke="hsl(0 0% 15%)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                {/* RIGHT arm — pouring */}
                <motion.g
                  style={{ transformOrigin: "0px 48px" }}
                  animate={{ rotate: [-12, -22, -12] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="-12" y="44" width="10" height="26" rx="3" fill="hsl(45 100% 55%)" />
                  <circle cx="-7" cy="70" r="4.5" fill="hsl(30 55% 76%)" />
                </motion.g>
                {/* LEFT arm holds glass */}
                <motion.g
                  style={{ transformOrigin: "38px 48px" }}
                  animate={{ rotate: [4, -8, 4] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="38" y="44" width="10" height="24" rx="3" fill="hsl(45 100% 55%)" />
                  <circle cx="43" cy="68" r="4.5" fill="hsl(30 55% 76%)" />
                  <rect x="38" y="56" width="10" height="14" rx="1" fill="hsl(45 30% 95%)" opacity="0.85" />
                  <rect x="39" y="60" width="8" height="9" fill="hsl(35 95% 55%)" />
                </motion.g>
              </g>
            </>
          )}

          {/* ===== When CLOSED: shutter & sleeping owner ===== */}
          {isClosed && (
            <>
              {/* shutter covering the whole front */}
              <rect x="14" y="74" width="292" height="106" fill="url(#shutterGrad)" stroke="hsl(0 0% 5%)" strokeWidth="1" />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="14" y1={80 + i * 7} x2="306" y2={80 + i * 7} stroke="hsl(0 0% 8%)" strokeWidth="0.6" opacity="0.7" />
              ))}
              {/* CLOSED sign */}
              <g transform="translate(120, 110)">
                <rect x="0" y="0" width="80" height="30" rx="3" fill="hsl(0 75% 45%)" stroke="hsl(45 100% 70%)" strokeWidth="2" />
                <text x="40" y="20" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="14" fill="hsl(45 100% 95%)" letterSpacing="3">CLOSED</text>
              </g>
              <text x="160" y="158" textAnchor="middle" fontFamily="DM Sans" fontWeight="700" fontSize="9" fill="hsl(45 60% 70%)">
                Open daily 11 AM – 11 PM
              </text>
              {/* sleeping Z's */}
              <motion.g
                animate={{ y: [0, -10, -20], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <text x="240" y="100" fontFamily="DM Sans" fontWeight="900" fontSize="14" fill="hsl(45 70% 75%)">Z</text>
              </motion.g>
              <motion.g
                animate={{ y: [0, -10, -20], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <text x="252" y="92" fontFamily="DM Sans" fontWeight="900" fontSize="11" fill="hsl(45 70% 75%)">z</text>
              </motion.g>
            </>
          )}
        </g>

        {/* ============ OUTSIDE: TABLE WITH 2 CUSTOMERS ============ */}
        {!isClosed && (
          <g transform="translate(395, 200)">
            {/* round table */}
            <ellipse cx="50" cy="56" rx="58" ry="9" fill="hsl(30 35% 18%)" stroke="hsl(45 80% 55%)" strokeWidth="1.2" />
            <ellipse cx="50" cy="54" rx="58" ry="8" fill="hsl(35 45% 30%)" />
            {/* table leg */}
            <rect x="46" y="56" width="8" height="22" fill="hsl(30 30% 14%)" />
            <ellipse cx="50" cy="80" rx="14" ry="2.5" fill="hsl(0 0% 0% / 0.4)" />

            {/* two glasses on table */}
            <g transform="translate(20, 40)">
              <path d="M 0 0 L 12 0 L 11 16 L 1 16 Z" fill="hsl(45 30% 95%)" stroke="hsl(45 40% 70%)" strokeWidth="0.5" />
              <path d="M 1 2 L 11 2 L 10 14 L 2 14 Z" fill="hsl(45 100% 55%)" />
              <rect x="9" y="-5" width="1.6" height="10" fill="hsl(0 75% 48%)" />
            </g>
            <g transform="translate(68, 42)">
              <path d="M 0 0 L 12 0 L 11 16 L 1 16 Z" fill="hsl(45 30% 95%)" stroke="hsl(45 40% 70%)" strokeWidth="0.5" />
              <path d="M 1 2 L 11 2 L 10 14 L 2 14 Z" fill="hsl(345 80% 65%)" />
              <rect x="9" y="-5" width="1.6" height="10" fill="hsl(0 75% 48%)" />
            </g>

            {/* CUSTOMER A — left side of table */}
            <motion.g
              animate={{ y: [0, -1.2, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* body */}
              <rect x="-30" y="14" width="26" height="34" rx="5" fill="hsl(210 70% 45%)" />
              {/* head */}
              <circle cx="-17" cy="6" r="11" fill="hsl(30 50% 78%)" />
              <path d="M -28 4 Q -28 -6 -17 -6 Q -6 -6 -6 4 Q -6 -1 -13 -3 Q -17 -5 -22 -3 Q -28 -1 -28 4 Z" fill="hsl(30 30% 18%)" />
              <circle cx="-21" cy="7" r="1.3" fill="hsl(0 0% 10%)" />
              <circle cx="-13" cy="7" r="1.3" fill="hsl(0 0% 10%)" />
              <path d="M -20 12 Q -17 14 -14 12" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />
              {/* arm with glass — sips */}
              <motion.g
                style={{ transformOrigin: "-4px 22px" }}
                animate={{ rotate: [10, -22, -22, 10, 10] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.35, 0.55, 0.7, 1] }}
              >
                <rect x="-8" y="20" width="8" height="20" rx="3" fill="hsl(210 70% 45%)" />
                <circle cx="-4" cy="40" r="3.5" fill="hsl(30 50% 78%)" />
              </motion.g>
            </motion.g>

            {/* CUSTOMER B — right side */}
            <motion.g
              animate={{ y: [0, -1.2, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <rect x="104" y="14" width="26" height="34" rx="5" fill="hsl(0 70% 50%)" />
              <circle cx="117" cy="6" r="11" fill="hsl(30 55% 76%)" />
              <path d="M 106 4 Q 106 -6 117 -6 Q 128 -6 128 4 Q 128 -1 121 -3 Q 117 -5 112 -3 Q 106 -1 106 4 Z" fill="hsl(25 40% 22%)" />
              <circle cx="113" cy="7" r="1.3" fill="hsl(0 0% 10%)" />
              <circle cx="121" cy="7" r="1.3" fill="hsl(0 0% 10%)" />
              <path d="M 114 12 Q 117 14 120 12" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />
              <motion.g
                style={{ transformOrigin: "108px 22px" }}
                animate={{ rotate: [-10, 22, 22, -10, -10] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.35, 0.55, 0.7, 1], delay: 0.4 }}
              >
                <rect x="104" y="20" width="8" height="20" rx="3" fill="hsl(0 70% 50%)" />
                <circle cx="108" cy="40" r="3.5" fill="hsl(30 55% 76%)" />
              </motion.g>
              {/* "Nice!" bubble */}
              <motion.g
                animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.7, 0.9, 1] }}
                style={{ transformOrigin: "150px -16px" }}
              >
                <ellipse cx="150" cy="-16" rx="24" ry="12" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 18%)" strokeWidth="1.5" />
                <text x="150" y="-12" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="11" fill="hsl(30 25% 14%)">Nice!</text>
                <path d="M 138 -6 L 134 2 L 142 -4 Z" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 18%)" strokeWidth="1.5" strokeLinejoin="round" />
              </motion.g>
            </motion.g>
          </g>
        )}
      </svg>

      {/* Status badge */}
      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/80 text-foreground border border-primary/30 backdrop-blur">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: isClosed ? "hsl(0 80% 55%)" : isNight ? "hsl(230 70% 70%)" : "hsl(45 100% 55%)",
          }}
        />
        {isClosed ? "Closed • Opens 11 AM" : isNight ? "Night • Live" : "Day • Live"}
      </div>
    </div>
  );
};

export default MenuTasteAnimation;
