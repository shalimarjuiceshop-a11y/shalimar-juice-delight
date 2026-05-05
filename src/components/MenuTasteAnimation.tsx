import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * "A Day at Shalimar Juice" — Pixar-style 6-scene looping story.
 * Scenes auto-cycle every ~7 seconds:
 *   1. Sunrise — sky lightens, owner opens shutter, lights flicker on
 *   2. Prep    — worker brings fruits, juicer starts, glasses arrange
 *   3. First Customer — walks in, orders, sips, "Mmm!"
 *   4. Peak Hours — busy crowd, queue, multiple workers
 *   5. Evening — pink sky, last customer waves goodbye
 *   6. Closing — lights off, shutter down, moon, stars, "See you tomorrow"
 * Then loops forever.
 *
 * IST sharp open-time enforcement: between 11 PM and 11 AM the scene
 * locks to "closed" instead of cycling. Updates every 30 s and aligns
 * to the next minute so 11:00 AM kicks in within 30 s of sharp.
 */

type Scene = "sunrise" | "prep" | "firstCustomer" | "peak" | "evening" | "closing";
const SCENE_ORDER: Scene[] = ["sunrise", "prep", "firstCustomer", "peak", "evening", "closing"];
const SCENE_DURATION = 6500;

const skyFor: Record<Scene, string> = {
  sunrise: "linear-gradient(180deg, hsl(20 80% 30%) 0%, hsl(35 90% 55%) 50%, hsl(45 95% 70%) 100%)",
  prep: "linear-gradient(180deg, hsl(40 90% 60%) 0%, hsl(45 95% 70%) 100%)",
  firstCustomer: "linear-gradient(180deg, hsl(200 60% 70%) 0%, hsl(45 90% 70%) 100%)",
  peak: "linear-gradient(180deg, hsl(195 70% 65%) 0%, hsl(45 85% 65%) 100%)",
  evening: "linear-gradient(180deg, hsl(280 50% 35%) 0%, hsl(15 80% 55%) 60%, hsl(35 70% 45%) 100%)",
  closing: "linear-gradient(180deg, hsl(230 55% 8%) 0%, hsl(245 50% 16%) 100%)",
};

const MenuTasteAnimation = () => {
  const [scene, setScene] = useState<Scene>("sunrise");
  const [forcedClosed, setForcedClosed] = useState(false);

  // IST gating — sharp 11 AM open
  useEffect(() => {
    const check = () => {
      const istHour = new Date().getUTCHours() + 5.5;
      const h = ((istHour % 24) + 24) % 24;
      setForcedClosed(h >= 23 || h < 11);
    };
    check();
    // align first tick to top of next minute, then check every 30 s
    const now = new Date();
    const msToMin = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeout = setTimeout(() => {
      check();
      const id = setInterval(check, 30_000);
      // store on window-less closure:
      (timeout as any)._id = id;
    }, msToMin);
    return () => {
      clearTimeout(timeout);
      if ((timeout as any)._id) clearInterval((timeout as any)._id);
    };
  }, []);

  // Scene cycling
  useEffect(() => {
    if (forcedClosed) {
      setScene("closing");
      return;
    }
    const id = setInterval(() => {
      setScene((s) => SCENE_ORDER[(SCENE_ORDER.indexOf(s) + 1) % SCENE_ORDER.length]);
    }, SCENE_DURATION);
    return () => clearInterval(id);
  }, [forcedClosed]);

  const isClosed = scene === "closing";
  const isDark = scene === "closing" || scene === "evening";
  const lightsOn = !isClosed;
  const shutterDown = isClosed;

  return (
    <div
      className="relative w-full h-[280px] md:h-[360px] overflow-hidden rounded-2xl border border-primary/25 shadow-pineapple"
      aria-label="A Day at Shalimar Juice — story animation"
    >
      {/* Animated sky */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`sky-${scene}`}
          className="absolute inset-0"
          style={{ background: skyFor[scene] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Sun (rises during sunrise → prep, sets during evening) */}
      {!isClosed && (
        <motion.div
          className="absolute w-14 h-14 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 40%, hsl(50 100% 88%), hsl(40 100% 58%))",
            boxShadow: "0 0 40px hsl(45 100% 60% / 0.8)",
          }}
          animate={{
            top: scene === "sunrise" ? ["70%", "12%"] : scene === "evening" ? ["12%", "70%"] : "12%",
            right: scene === "evening" ? ["10%", "5%"] : "10%",
            opacity: scene === "evening" ? [1, 0.4] : 1,
          }}
          transition={{ duration: SCENE_DURATION / 1000, ease: "easeInOut" }}
        />
      )}

      {/* Moon + stars (closing) */}
      {isClosed && (
        <>
          <motion.div
            className="absolute top-6 right-12 w-12 h-12 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, hsl(45 60% 96%), hsl(45 40% 80%))",
              boxShadow: "0 0 30px hsl(45 90% 80% / 0.6)",
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          />
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${4 + (i * 7) % 38}%`,
                left: `${(i * 53) % 100}%`,
                width: 2, height: 2,
                background: "hsl(45 100% 92%)",
                boxShadow: "0 0 6px hsl(45 100% 80% / 0.8)",
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </>
      )}

      {/* Bird flying across (transitions) */}
      {!isClosed && (
        <motion.svg
          className="absolute"
          width="20" height="14"
          viewBox="0 0 20 14"
          style={{ top: "18%" }}
          animate={{ x: ["-30px", "110%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 1 }}
        >
          <motion.path d="M 0 7 Q 5 0 10 7 Q 15 0 20 7"
            stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            animate={{ d: ["M 0 7 Q 5 0 10 7 Q 15 0 20 7", "M 0 7 Q 5 12 10 7 Q 15 12 20 7"] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
        </motion.svg>
      )}

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[44px]"
        style={{
          background: isDark
            ? "linear-gradient(180deg, hsl(30 22% 14%) 0%, hsl(30 22% 8%) 100%)"
            : "linear-gradient(180deg, hsl(35 40% 32%) 0%, hsl(30 30% 18%) 100%)",
        }}
      />
      <div className="absolute bottom-[43px] left-0 right-0 h-[2px]" style={{ background: "hsl(45 80% 55%)", opacity: 0.7 }} />

      {/* Cat outside shop (always visible during open scenes) */}
      {!isClosed && (
        <motion.div
          className="absolute"
          style={{ left: "8%", bottom: "44px" }}
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="36" height="28" viewBox="0 0 36 28">
            <ellipse cx="18" cy="22" rx="12" ry="5" fill="hsl(30 35% 35%)" />
            <circle cx="11" cy="14" r="6" fill="hsl(30 35% 35%)" />
            <path d="M 6 10 L 8 5 L 11 10 Z" fill="hsl(30 35% 35%)" />
            <path d="M 11 10 L 14 5 L 16 10 Z" fill="hsl(30 35% 35%)" />
            <circle cx="9" cy="14" r="0.8" fill="hsl(45 100% 80%)" />
            <circle cx="13" cy="14" r="0.8" fill="hsl(45 100% 80%)" />
            <path d="M 28 22 Q 34 20 32 12" stroke="hsl(30 35% 35%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Main shop SVG */}
      <svg viewBox="0 0 600 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="signGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 100% 62%)" />
            <stop offset="100%" stopColor="hsl(38 95% 48%)" />
          </linearGradient>
          <linearGradient id="shopWall2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(30 35% 22%)" />
            <stop offset="100%" stopColor="hsl(28 30% 14%)" />
          </linearGradient>
          <radialGradient id="bulbGlow2">
            <stop offset="0%" stopColor="hsl(45 100% 80%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(45 100% 60%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shop building */}
        <g transform="translate(140, 70)">
          {/* roof */}
          <rect x="0" y="0" width="320" height="14" fill="hsl(30 30% 12%)" />
          {/* sign */}
          <rect x="6" y="14" width="308" height="36" rx="4" fill="url(#signGrad2)" stroke="hsl(30 30% 12%)" strokeWidth="2" />
          <text x="160" y="40" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="22"
            fill="hsl(30 25% 12%)" letterSpacing="2">SHALIMAR JUICE</text>

          {/* Awning */}
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon key={i}
              points={`${6 + i * 19.5},50 ${25 + i * 19.5},50 ${15.5 + i * 19.5},66`}
              fill={i % 2 === 0 ? "hsl(0 75% 50%)" : "hsl(45 100% 60%)"}
              stroke="hsl(30 30% 12%)" strokeWidth="0.6" />
          ))}

          {/* Body */}
          <rect x="6" y="66" width="308" height="160" fill="url(#shopWall2)" stroke="hsl(45 70% 45%)" strokeWidth="1.5" />
          <rect x="14" y="74" width="292" height="120" fill={isDark ? "hsl(30 30% 14%)" : "hsl(38 50% 38%)"} />

          {/* Hanging bulbs (flicker on during sunrise) */}
          {[60, 130, 200, 270].map((cx, i) => (
            <g key={i}>
              <line x1={cx} y1="66" x2={cx} y2="78" stroke="hsl(0 0% 20%)" strokeWidth="0.6" />
              <circle cx={cx} cy="80" r="8" fill="url(#bulbGlow2)" opacity={lightsOn ? 1 : 0.15} />
              <motion.circle
                cx={cx} cy="80" r="2.5"
                fill={lightsOn ? "hsl(45 100% 75%)" : "hsl(45 30% 30%)"}
                animate={lightsOn ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
              />
            </g>
          ))}

          {/* ₹10 board */}
          <g transform="translate(20, 110)" opacity={lightsOn ? 1 : 0.4}>
            <rect x="0" y="0" width="48" height="46" rx="4" fill="hsl(0 75% 48%)" stroke="hsl(45 100% 65%)" strokeWidth="2" />
            <text x="24" y="18" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="9" fill="hsl(45 100% 90%)">ONLY</text>
            <text x="24" y="38" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="18" fill="hsl(45 100% 90%)">₹10</text>
          </g>

          {/* MENU board */}
          <g transform="translate(244, 108)" opacity={lightsOn ? 1 : 0.4}>
            <rect x="0" y="0" width="56" height="54" rx="3" fill="hsl(30 30% 10%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
            <text x="28" y="11" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="8" fill="hsl(45 100% 60%)">MENU</text>
            {[
              ["Pineapple", "₹10"], ["Apple", "₹10"], ["Orange", "₹50"], ["Dry Fruit", "₹30"],
            ].map(([n, p], i) => (
              <g key={n}>
                <text x="4" y={22 + i * 9} fontFamily="DM Sans" fontWeight="700" fontSize="6" fill="hsl(45 50% 92%)">{n}</text>
                <text x="52" y={22 + i * 9} textAnchor="end" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(45 100% 60%)">{p}</text>
              </g>
            ))}
          </g>

          {/* Counter */}
          <rect x="14" y="180" width="292" height="46" fill="hsl(30 35% 18%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
          <rect x="14" y="180" width="292" height="8" fill="hsl(45 70% 45%)" />

          {/* Glasses on counter (line up during prep) */}
          {scene !== "sunrise" && !isClosed && [40, 70, 100, 220, 250, 280].map((cx, i) => (
            <motion.g key={i}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}>
              <path d={`M ${cx - 5} 188 L ${cx + 5} 188 L ${cx + 4} 200 L ${cx - 4} 200 Z`}
                fill={["hsl(45 100% 60%)", "hsl(15 90% 55%)", "hsl(120 50% 45%)", "hsl(280 50% 60%)", "hsl(45 100% 60%)", "hsl(15 90% 55%)"][i]} />
              <rect x={cx - 5} y="188" width="10" height="2" fill="hsl(0 0% 95%)" />
            </motion.g>
          ))}

          {/* WORKER 1 — main juice maker (center, behind counter) */}
          {!isClosed && (
            <g transform="translate(160, 130)">
              <rect x="0" y="22" width="34" height="40" rx="6" fill="hsl(0 75% 48%)" stroke="hsl(30 30% 14%)" strokeWidth="0.8" />
              <circle cx="17" cy="14" r="11" fill="hsl(30 55% 76%)" />
              <path d="M 6 12 Q 6 4 17 4 Q 28 4 28 12 L 28 14 L 6 14 Z" fill="hsl(0 0% 95%)" />
              <circle cx="13" cy="16" r="1.4" fill="hsl(0 0% 10%)" />
              <circle cx="21" cy="16" r="1.4" fill="hsl(0 0% 10%)" />
              <path d="M 13 21 Q 17 23 21 21" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />
              {/* arm pouring */}
              <motion.g style={{ transformOrigin: "30px 30px" }}
                animate={{ rotate: scene === "peak" ? [-10, 30, -10] : [-5, 15, -5] }}
                transition={{ duration: scene === "peak" ? 0.5 : 1.2, repeat: Infinity }}>
                <rect x="28" y="26" width="9" height="20" rx="3" fill="hsl(0 75% 48%)" />
                <circle cx="32" cy="46" r="3.5" fill="hsl(30 55% 76%)" />
              </motion.g>
              <rect x="-3" y="28" width="8" height="18" rx="3" fill="hsl(0 75% 48%)" />
            </g>
          )}

          {/* WORKER 2 — helper arranging glasses (appears in prep) */}
          {(scene === "prep" || scene === "peak") && (
            <motion.g transform="translate(220, 130)"
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <rect x="0" y="22" width="32" height="40" rx="6" fill="hsl(120 45% 38%)" />
              <circle cx="16" cy="14" r="10" fill="hsl(30 50% 78%)" />
              <path d="M 6 12 Q 6 4 16 4 Q 26 4 26 12 L 26 14 L 6 14 Z" fill="hsl(0 0% 95%)" />
              <circle cx="12" cy="16" r="1.2" fill="hsl(0 0% 10%)" />
              <circle cx="20" cy="16" r="1.2" fill="hsl(0 0% 10%)" />
              <motion.g style={{ transformOrigin: "0px 30px" }}
                animate={{ rotate: [10, -20, 10] }}
                transition={{ duration: 1, repeat: Infinity }}>
                <rect x="-3" y="26" width="8" height="20" rx="3" fill="hsl(120 45% 38%)" />
              </motion.g>
            </motion.g>
          )}

          {/* OWNER opens shutter (sunrise) */}
          {scene === "sunrise" && (
            <motion.g transform="translate(280, 145)"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <rect x="0" y="22" width="28" height="40" rx="5" fill="hsl(220 35% 30%)" />
              <circle cx="14" cy="14" r="10" fill="hsl(30 55% 76%)" />
              <circle cx="11" cy="16" r="1.2" fill="hsl(0 0% 10%)" />
              <circle cx="17" cy="16" r="1.2" fill="hsl(0 0% 10%)" />
              <path d="M 11 21 Q 14 23 17 21" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" strokeLinecap="round" />
              {/* hand up to shutter */}
              <motion.rect x="16" y="-2" width="6" height="24" rx="3" fill="hsl(220 35% 30%)"
                animate={{ rotate: [0, -25, 0] }} style={{ transformOrigin: "16px 24px" }}
                transition={{ duration: 2, repeat: Infinity }} />
            </motion.g>
          )}
        </g>

        {/* SHUTTER (closes during closing scene) */}
        <AnimatePresence>
          {shutterDown && (
            <motion.g
              key="shutter"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              style={{ transformOrigin: "300px 144px" }}
            >
              <rect x="146" y="144" width="308" height="116" fill="hsl(220 12% 22%)" stroke="hsl(220 12% 8%)" strokeWidth="1.5" />
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="146" y1={148 + i * 8} x2="454" y2={148 + i * 8}
                  stroke="hsl(220 10% 14%)" strokeWidth="1.5" />
              ))}
              {/* CLOSED sign */}
              <g transform="translate(260, 190)">
                <rect x="0" y="0" width="80" height="36" rx="4" fill="hsl(0 75% 45%)" stroke="hsl(45 100% 70%)" strokeWidth="2" />
                <text x="40" y="22" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="14"
                  fill="hsl(45 100% 95%)" letterSpacing="3">CLOSED</text>
              </g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* CUSTOMERS (scene-specific) */}
        {/* First customer (firstCustomer scene) — walks in from left, sips */}
        <AnimatePresence>
          {scene === "firstCustomer" && (
            <motion.g key="c1"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 1.2 }}>
              <g transform="translate(110, 270)">
                <rect x="0" y="22" width="24" height="36" rx="5" fill="hsl(200 60% 45%)" />
                <circle cx="12" cy="14" r="9" fill="hsl(30 55% 76%)" />
                <circle cx="9" cy="15" r="1.2" fill="hsl(0 0% 10%)" />
                <circle cx="15" cy="15" r="1.2" fill="hsl(0 0% 10%)" />
                <path d="M 9 19 Q 12 22 15 19" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" />
                {/* glass */}
                <path d="M 22 28 L 30 28 L 29 40 L 23 40 Z" fill="hsl(45 100% 60%)" />
              </g>
              {/* speech */}
              <motion.g
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.6] }}
                transition={{ duration: 4, times: [0, 0.3, 0.8, 1] }}>
                <ellipse cx="160" cy="260" rx="32" ry="14" fill="hsl(0 0% 100%)" stroke="hsl(0 0% 15%)" strokeWidth="1.5" />
                <path d="M 140 270 L 134 280 L 148 274" fill="hsl(0 0% 100%)" stroke="hsl(0 0% 15%)" strokeWidth="1.5" />
                <text x="160" y="265" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="13" fill="hsl(120 60% 30%)">Mmm! 😋</text>
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Peak hours: queue of 3 customers */}
        <AnimatePresence>
          {scene === "peak" && (
            <motion.g key="peak" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[80, 130, 180].map((x, i) => (
                <motion.g key={i} transform={`translate(${x}, 280)`}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}>
                  <rect x="0" y="22" width="22" height="34" rx="5" fill={["hsl(15 70% 50%)", "hsl(280 50% 50%)", "hsl(120 45% 40%)"][i]} />
                  <circle cx="11" cy="14" r="9" fill="hsl(30 55% 76%)" />
                  <circle cx="8" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
                  <circle cx="14" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
                </motion.g>
              ))}
              {/* table couple right */}
              {[440, 480].map((x, i) => (
                <g key={x} transform={`translate(${x}, 280)`}>
                  <rect x="0" y="22" width="22" height="34" rx="5" fill={i === 0 ? "hsl(330 60% 55%)" : "hsl(220 60% 45%)"} />
                  <circle cx="11" cy="14" r="9" fill="hsl(30 50% 78%)" />
                  <circle cx="8" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
                  <circle cx="14" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
                  <path d="M 8 19 Q 11 21 14 19" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" />
                </g>
              ))}
              {/* table */}
              <rect x="430" y="320" width="80" height="6" fill="hsl(30 30% 22%)" />
              <rect x="436" y="326" width="3" height="14" fill="hsl(30 30% 18%)" />
              <rect x="500" y="326" width="3" height="14" fill="hsl(30 30% 18%)" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Evening — last customer waves goodbye */}
        <AnimatePresence>
          {scene === "evening" && (
            <motion.g key="evening"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 60, opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5 }}>
              <g transform="translate(440, 270)">
                <rect x="0" y="22" width="24" height="36" rx="5" fill="hsl(35 70% 45%)" />
                <circle cx="12" cy="14" r="9" fill="hsl(30 55% 76%)" />
                <circle cx="9" cy="15" r="1.2" fill="hsl(0 0% 10%)" />
                <circle cx="15" cy="15" r="1.2" fill="hsl(0 0% 10%)" />
                <path d="M 9 19 Q 12 21 15 19" stroke="hsl(0 0% 15%)" strokeWidth="1" fill="none" />
                {/* waving hand */}
                <motion.g style={{ transformOrigin: "24px 28px" }}
                  animate={{ rotate: [-30, 30, -30] }}
                  transition={{ duration: 0.6, repeat: Infinity }}>
                  <rect x="22" y="22" width="6" height="14" rx="3" fill="hsl(35 70% 45%)" />
                </motion.g>
              </g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Closing message */}
        <AnimatePresence>
          {isClosed && (
            <motion.g key="bye"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}>
              <text x="300" y="335" textAnchor="middle" fontFamily="DM Sans" fontWeight="900"
                fontSize="14" fill="hsl(45 100% 80%)" letterSpacing="2">See you tomorrow! 🌙</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Scene label badge */}
      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 text-foreground border border-primary/30 backdrop-blur">
        <motion.span className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />
        {isClosed ? "Closed" : scene === "sunrise" ? "Sunrise"
          : scene === "prep" ? "Prep Time"
          : scene === "firstCustomer" ? "First Customer"
          : scene === "peak" ? "Peak Hours"
          : "Evening"}
      </div>
    </div>
  );
};

export default MenuTasteAnimation;
