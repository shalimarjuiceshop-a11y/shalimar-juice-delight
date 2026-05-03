import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cinematic Shalimar Juice Shop scene.
 * - Inside: a juice-maker boy operating 3 colorful mixers
 * - Outside: one boy reads the menu board, another sips juice & gives a "Nice!" thumbs-up
 * - Sky changes between day (sun) and night (moon + stars) based on IST hour
 * Pure SVG + Framer Motion. Loops forever, no images.
 */
const MenuTasteAnimation = () => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const update = () => {
      // IST hour
      const istHour = new Date().getUTCHours() + 5.5;
      const h = ((istHour % 24) + 24) % 24;
      setIsNight(h < 6 || h >= 19);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const skyGradient = isNight
    ? "linear-gradient(180deg, hsl(230 50% 8%) 0%, hsl(250 45% 16%) 55%, hsl(30 35% 22%) 100%)"
    : "linear-gradient(180deg, hsl(35 90% 60%) 0%, hsl(38 85% 50%) 45%, hsl(38 60% 30%) 100%)";

  return (
    <div
      className="relative w-full h-[260px] md:h-[340px] overflow-hidden rounded-2xl border border-primary/25 shadow-pineapple"
      style={{ background: skyGradient }}
      aria-label="Shalimar Juice shop animation"
    >
      {/* Stars (night) */}
      {isNight &&
        Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${5 + (i * 7) % 35}%`,
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
      {isNight ? (
        <>
          <div
            className="absolute top-5 right-10 w-16 h-16 rounded-full blur-2xl opacity-70"
            style={{ background: "hsl(45 90% 80%)" }}
          />
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
      ) : (
        <>
          <div
            className="absolute top-4 right-10 w-20 h-20 rounded-full blur-3xl opacity-80"
            style={{ background: "hsl(45 100% 65%)" }}
          />
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

      {/* Distant skyline silhouette */}
      <svg
        viewBox="0 0 600 80"
        className="absolute left-0 right-0 w-full h-[60px]"
        style={{ top: "42%" }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 L0,55 L40,55 L50,40 L70,40 L80,30 L110,30 L120,45 L160,45 L170,35 L210,35 L220,50 L260,50 L275,38 L310,38 L320,28 L360,28 L370,42 L410,42 L420,35 L460,35 L475,48 L510,48 L520,38 L560,38 L575,50 L600,50 L600,80 Z"
          fill={isNight ? "hsl(240 30% 14%)" : "hsl(30 30% 18%)"}
          opacity="0.85"
        />
      </svg>

      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[42px]"
        style={{
          background: isNight
            ? "linear-gradient(180deg, hsl(35 25% 18%) 0%, hsl(30 25% 10%) 100%)"
            : "linear-gradient(180deg, hsl(35 40% 30%) 0%, hsl(30 30% 18%) 100%)",
        }}
      />
      <div
        className="absolute bottom-[41px] left-0 right-0 h-[2px]"
        style={{ background: "hsl(45 80% 55%)", opacity: 0.7 }}
      />

      <svg
        viewBox="0 0 600 340"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
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
        </defs>

        {/* ============================================================
            SHALIMAR JUICE SHOP (center-left) — open-front view
        ============================================================ */}
        <g transform="translate(40, 60)">
          {/* Roof / awning back */}
          <rect x="0" y="0" width="320" height="14" fill="hsl(30 30% 12%)" />
          {/* Sign board */}
          <rect x="6" y="14" width="308" height="36" rx="4" fill="url(#signGrad)" stroke="hsl(30 30% 12%)" strokeWidth="2" />
          <text
            x="160"
            y="40"
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontWeight="900"
            fontSize="22"
            fill="hsl(30 25% 12%)"
            letterSpacing="2"
          >
            SHALIMAR JUICE
          </text>
          {/* Striped awning */}
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

          {/* Shop body / interior */}
          <rect x="6" y="66" width="308" height="160" fill="url(#shopWall)" stroke="hsl(45 70% 45%)" strokeWidth="1.5" />
          {/* Interior back wall lighter */}
          <rect x="14" y="74" width="292" height="120" fill={isNight ? "hsl(35 35% 22%)" : "hsl(38 50% 38%)"} />

          {/* Hanging bulbs */}
          {[60, 130, 200, 270].map((cx, i) => (
            <g key={i}>
              <line x1={cx} y1="66" x2={cx} y2="82" stroke="hsl(0 0% 20%)" strokeWidth="0.8" />
              <circle cx={cx} cy="86" r="9" fill="url(#bulbGlow)" />
              <motion.circle
                cx={cx}
                cy="86"
                r="3"
                fill="hsl(45 100% 75%)"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
              />
            </g>
          ))}

          {/* ₹10 board */}
          <g transform="translate(20, 90)">
            <rect x="0" y="0" width="60" height="56" rx="4" fill="hsl(0 75% 48%)" stroke="hsl(45 100% 65%)" strokeWidth="2" />
            <text x="30" y="22" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="11" fill="hsl(45 100% 90%)">ONLY</text>
            <text x="30" y="46" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="22" fill="hsl(45 100% 90%)">₹10</text>
          </g>

          {/* MENU board on wall */}
          <g transform="translate(232, 88)">
            <rect x="0" y="0" width="64" height="60" rx="3" fill="hsl(30 30% 10%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
            <text x="32" y="13" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="9" fill="hsl(45 100% 60%)">MENU</text>
            <line x1="6" y1="17" x2="58" y2="17" stroke="hsl(45 80% 55%)" strokeWidth="0.6" opacity="0.5" />
            <text x="5" y="27" fontFamily="DM Sans" fontWeight="700" fontSize="6.5" fill="hsl(45 50% 92%)">Pineapple</text>
            <text x="59" y="27" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6.5" fill="hsl(45 100% 60%)">₹10</text>
            <text x="5" y="36" fontFamily="DM Sans" fontWeight="700" fontSize="6.5" fill="hsl(45 50% 92%)">Mango</text>
            <text x="59" y="36" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6.5" fill="hsl(45 100% 60%)">₹20</text>
            <text x="5" y="45" fontFamily="DM Sans" fontWeight="700" fontSize="6.5" fill="hsl(45 50% 92%)">Dry Fruit</text>
            <text x="59" y="45" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6.5" fill="hsl(45 100% 60%)">₹30</text>
            <text x="5" y="54" fontFamily="DM Sans" fontWeight="700" fontSize="6.5" fill="hsl(45 50% 92%)">Apple</text>
            <text x="59" y="54" textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6.5" fill="hsl(45 100% 60%)">₹10</text>
          </g>

          {/* COUNTER */}
          <rect x="14" y="180" width="292" height="46" fill="hsl(30 35% 18%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
          <rect x="14" y="180" width="292" height="8" fill="hsl(45 70% 45%)" />

          {/* ===== 3 MIXERS on the counter (different colors) ===== */}
          {[
            { x: 96, base: "hsl(15 85% 50%)", juice: "hsl(15 90% 55%)", delay: 0 },
            { x: 138, base: "hsl(120 50% 38%)", juice: "hsl(120 55% 50%)", delay: 0.3 },
            { x: 180, base: "hsl(280 55% 45%)", juice: "hsl(280 60% 60%)", delay: 0.6 },
          ].map((m, i) => (
            <g key={i} transform={`translate(${m.x}, 142)`}>
              {/* base */}
              <rect x="0" y="26" width="26" height="14" rx="2" fill={m.base} stroke="hsl(30 30% 10%)" strokeWidth="0.8" />
              <rect x="2" y="34" width="22" height="2" fill="hsl(0 0% 90%)" opacity="0.6" />
              {/* jar */}
              <rect x="4" y="4" width="18" height="24" rx="2" fill="hsl(200 30% 90%)" opacity="0.55" stroke="hsl(0 0% 90%)" strokeWidth="0.6" />
              {/* juice level — wobbling */}
              <motion.rect
                x="5"
                y="10"
                width="16"
                height="17"
                fill={m.juice}
                animate={{ scaleY: [1, 1.04, 0.97, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: m.delay }}
                style={{ transformOrigin: "13px 27px" }}
              />
              {/* lid */}
              <rect x="3" y="2" width="20" height="3" rx="1" fill="hsl(0 0% 25%)" />
              {/* spinning blur lines on jar */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "13px 18px" }}
              >
                <line x1="6" y1="18" x2="20" y2="18" stroke="hsl(0 0% 100% / 0.45)" strokeWidth="0.8" />
                <line x1="13" y1="11" x2="13" y2="25" stroke="hsl(0 0% 100% / 0.25)" strokeWidth="0.6" />
              </motion.g>
              {/* power light */}
              <motion.circle
                cx="22" cy="32" r="1.2"
                fill="hsl(0 90% 55%)"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: m.delay }}
              />
            </g>
          ))}

          {/* ===== JUICE-MAKER BOY (inside, behind counter) ===== */}
          <g transform="translate(238, 110)">
            {/* body — apron */}
            <rect x="-2" y="40" width="40" height="44" rx="6" fill="hsl(45 100% 55%)" stroke="hsl(30 30% 15%)" strokeWidth="1" />
            <rect x="2" y="44" width="32" height="4" fill="hsl(0 75% 48%)" />
            <text x="18" y="70" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(30 25% 14%)">SHALIMAR</text>
            {/* head */}
            <circle cx="18" cy="22" r="14" fill="hsl(30 55% 76%)" />
            {/* cap */}
            <path d="M 4 18 Q 4 6 18 6 Q 32 6 32 18 L 32 20 L 4 20 Z" fill="hsl(0 75% 48%)" />
            <rect x="3" y="19" width="30" height="3" fill="hsl(0 0% 95%)" />
            {/* eyes */}
            <circle cx="13" cy="24" r="1.6" fill="hsl(0 0% 10%)" />
            <circle cx="23" cy="24" r="1.6" fill="hsl(0 0% 10%)" />
            {/* smile */}
            <path d="M 13 30 Q 18 33 23 30" stroke="hsl(0 0% 15%)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            {/* RIGHT arm — operating mixer (bobs up/down on switch) */}
            <motion.g
              style={{ transformOrigin: "0px 48px" }}
              animate={{ rotate: [-12, -22, -12] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="-12" y="44" width="10" height="26" rx="3" fill="hsl(45 100% 55%)" />
              <circle cx="-7" cy="70" r="4.5" fill="hsl(30 55% 76%)" />
            </motion.g>
            {/* LEFT arm — holds glass to fill */}
            <motion.g
              style={{ transformOrigin: "38px 48px" }}
              animate={{ rotate: [4, -8, 4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="38" y="44" width="10" height="24" rx="3" fill="hsl(45 100% 55%)" />
              <circle cx="43" cy="68" r="4.5" fill="hsl(30 55% 76%)" />
              {/* small glass */}
              <rect x="38" y="56" width="10" height="14" rx="1" fill="hsl(45 30% 95%)" opacity="0.85" />
              <rect x="39" y="60" width="8" height="9" fill="hsl(35 95% 55%)" />
            </motion.g>
          </g>

          {/* Falling juice droplets from middle mixer */}
          {[0, 0.4, 0.8].map((d, i) => (
            <motion.circle
              key={i}
              cx={151}
              cy={186}
              r={1.6}
              fill="hsl(120 55% 50%)"
              animate={{ cy: [186, 196], opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: d }}
            />
          ))}
        </g>

        {/* ============================================================
            OUTSIDE — CUSTOMERS
        ============================================================ */}

        {/* BOY 1 — reading menu, standing right of shop */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* body */}
          <rect x="395" y="220" width="34" height="46" rx="7" fill="hsl(210 70% 45%)" />
          {/* legs */}
          <rect x="398" y="264" width="12" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <rect x="415" y="264" width="12" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <ellipse cx="404" cy="288" rx="9" ry="3" fill="hsl(30 20% 8%)" />
          <ellipse cx="421" cy="288" rx="9" ry="3" fill="hsl(30 20% 8%)" />
          {/* arm pointing toward menu */}
          <motion.g
            style={{ transformOrigin: "395px 232px" }}
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="385" y="228" width="10" height="26" rx="4" fill="hsl(210 70% 45%)" />
            <circle cx="390" cy="254" r="5" fill="hsl(30 50% 76%)" />
          </motion.g>
          <rect x="429" y="228" width="10" height="26" rx="4" fill="hsl(210 70% 45%)" />
          <circle cx="434" cy="254" r="5" fill="hsl(30 50% 76%)" />
          {/* head */}
          <circle cx="412" cy="208" r="17" fill="hsl(30 50% 78%)" />
          <path d="M 396 204 Q 396 190 412 190 Q 428 190 428 204 Q 428 199 420 196 Q 412 192 404 196 Q 396 199 396 204 Z" fill="hsl(30 30% 18%)" />
          <circle cx="406" cy="210" r="2" fill="hsl(0 0% 10%)" />
          <circle cx="416" cy="210" r="2" fill="hsl(0 0% 10%)" />
          <path d="M 408 217 Q 412 220 416 217" stroke="hsl(0 0% 15%)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* "Hmm…" bubble */}
          <motion.g
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
          >
            <ellipse cx="445" cy="178" rx="22" ry="13" fill="hsl(45 60% 95%)" />
            <text x="445" y="183" textAnchor="middle" fontFamily="DM Sans" fontWeight="800" fontSize="11" fill="hsl(30 30% 18%)">Hmm…</text>
            <circle cx="430" cy="192" r="2.5" fill="hsl(45 60% 95%)" />
            <circle cx="425" cy="198" r="1.6" fill="hsl(45 60% 95%)" />
          </motion.g>
        </motion.g>

        {/* BOY 2 — sipping juice + thumbs up */}
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* body */}
          <rect x="500" y="218" width="36" height="48" rx="7" fill="hsl(0 70% 50%)" />
          {/* legs */}
          <rect x="503" y="264" width="12" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <rect x="521" y="264" width="12" height="22" rx="3" fill="hsl(220 30% 25%)" />
          <ellipse cx="509" cy="288" rx="9" ry="3" fill="hsl(30 20% 8%)" />
          <ellipse cx="527" cy="288" rx="9" ry="3" fill="hsl(30 20% 8%)" />
          {/* head */}
          <circle cx="518" cy="206" r="18" fill="hsl(30 55% 76%)" />
          <path d="M 501 202 Q 501 186 518 186 Q 535 186 535 202 Q 535 195 526 192 Q 518 188 510 192 Q 501 195 501 202 Z" fill="hsl(25 40% 22%)" />
          <motion.g
            animate={{ scaleY: [1, 0.2, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.6, 1] }}
            style={{ transformOrigin: "518px 206px" }}
          >
            <circle cx="512" cy="206" r="2" fill="hsl(0 0% 10%)" />
            <circle cx="524" cy="206" r="2" fill="hsl(0 0% 10%)" />
          </motion.g>
          <path d="M 512 215 Q 518 219 524 215" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* LEFT arm with glass */}
          <motion.g
            style={{ transformOrigin: "504px 230px" }}
            animate={{ rotate: [10, -28, -28, 10, 10] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.35, 0.55, 0.7, 1], ease: "easeInOut" }}
          >
            <rect x="492" y="228" width="10" height="30" rx="4" fill="hsl(0 70% 50%)" />
            <circle cx="497" cy="258" r="5" fill="hsl(30 55% 76%)" />
            <g transform="translate(484, 240)">
              <path d="M 0 0 L 18 0 L 16 26 L 2 26 Z" fill="hsl(45 30% 95%)" stroke="hsl(45 40% 70%)" strokeWidth="1" />
              <path d="M 1.5 4 L 16.5 4 L 15 24 L 3 24 Z" fill="hsl(35 95% 55%)" />
              <rect x="13" y="-6" width="2.5" height="14" rx="1" fill="hsl(0 80% 55%)" />
            </g>
          </motion.g>
          {/* RIGHT arm — thumbs up */}
          <motion.g
            style={{ transformOrigin: "536px 230px" }}
            animate={{ rotate: [0, 0, -55, -55, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.65, 0.85, 1], ease: "easeInOut" }}
          >
            <rect x="536" y="228" width="10" height="28" rx="4" fill="hsl(0 70% 50%)" />
            <circle cx="541" cy="256" r="5.5" fill="hsl(30 55% 76%)" />
            <rect x="543" y="248" width="3.5" height="8" rx="1.5" fill="hsl(30 55% 76%)" />
          </motion.g>
          {/* "Nice!" bubble */}
          <motion.g
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.7, 0.9, 1], ease: "easeOut" }}
            style={{ transformOrigin: "560px 170px" }}
          >
            <ellipse cx="560" cy="170" rx="30" ry="17" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 18%)" strokeWidth="2" />
            <path d="M 545 182 L 539 192 L 551 184 Z" fill="hsl(45 100% 60%)" stroke="hsl(30 30% 18%)" strokeWidth="2" strokeLinejoin="round" />
            <text x="560" y="175" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="14" fill="hsl(30 25% 14%)">Nice!</text>
          </motion.g>
        </motion.g>

        {/* sparkles around drinker */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={540 + i * 10}
            cy={195 - i * 7}
            r={1.6}
            fill="hsl(45 100% 80%)"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>

      {/* Day/Night badge */}
      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/80 text-foreground border border-primary/30 backdrop-blur">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: isNight ? "hsl(230 70% 70%)" : "hsl(45 100% 55%)" }}
        />
        {isNight ? "Night" : "Day"} • Live
      </div>
    </div>
  );
};

export default MenuTasteAnimation;
