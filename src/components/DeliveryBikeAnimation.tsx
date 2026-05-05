import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * "The Juice Journey" — Order page animation.
 * 4-scene loop:
 *   1. Shop — worker juices fruit, fills glass, packs SJS box
 *   2. Bike departs — delivery boy starts bike
 *   3. Obstacles — speed breaker, stray dog, rain
 *   4. Delivery — building, customer catches box, sips, "Ahhh!"
 */

type Scene = "shop" | "depart" | "obstacles" | "deliver";
const SCENES: Scene[] = ["shop", "depart", "obstacles", "deliver"];
const DUR = 5500;

const DeliveryBikeAnimation = () => {
  const [scene, setScene] = useState<Scene>("shop");

  useEffect(() => {
    const id = setInterval(() => setScene((s) => SCENES[(SCENES.indexOf(s) + 1) % SCENES.length]), DUR);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full max-w-[300px] mx-auto h-[140px] overflow-hidden rounded-2xl border border-primary/25"
      style={{ background: "linear-gradient(180deg, hsl(38 70% 28%) 0%, hsl(35 50% 22%) 60%, hsl(30 35% 16%) 100%)" }}
      aria-label="Juice journey from shop to customer"
    >
      <div className="absolute top-2 right-3 w-5 h-5 rounded-full"
        style={{ background: "hsl(45 100% 70%)", boxShadow: "0 0 14px hsl(45 100% 60% / 0.7)" }} />

      <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-background/70 border border-primary/30 backdrop-blur">
        <motion.span className="w-1 h-1 rounded-full bg-primary" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} />
        {scene === "shop" ? "Preparing" : scene === "depart" ? "Departing" : scene === "obstacles" ? "On the way" : "Delivered!"}
      </div>

      <svg viewBox="0 0 300 140" className="absolute inset-0 w-full h-full">
        {/* road */}
        <rect x="0" y="115" width="300" height="25" fill="hsl(0 0% 12%)" />
        <motion.g animate={{ x: [-30, 0] }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x={i * 20} y="125" width="10" height="2" fill="hsl(45 100% 70%)" />
          ))}
        </motion.g>

        <AnimatePresence mode="wait">
          {/* SCENE 1: SHOP */}
          {scene === "shop" && (
            <motion.g key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* shop facade */}
              <rect x="40" y="20" width="220" height="14" fill="hsl(0 75% 45%)" />
              <text x="150" y="30" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="9" fill="hsl(45 100% 90%)">SHALIMAR JUICE</text>
              <rect x="40" y="34" width="220" height="80" fill="hsl(35 40% 22%)" stroke="hsl(45 80% 55%)" strokeWidth="1" />
              {/* counter */}
              <rect x="50" y="90" width="200" height="8" fill="hsl(30 30% 14%)" />

              {/* Worker */}
              <g transform="translate(110, 50)">
                <rect x="0" y="22" width="22" height="28" rx="4" fill="hsl(0 75% 48%)" />
                <circle cx="11" cy="12" r="8" fill="hsl(30 55% 76%)" />
                <path d="M 4 10 Q 4 4 11 4 Q 18 4 18 10 L 18 12 L 4 12 Z" fill="hsl(0 0% 95%)" />
                <circle cx="9" cy="13" r="1" fill="hsl(0 0% 10%)" />
                <circle cx="13" cy="13" r="1" fill="hsl(0 0% 10%)" />
                {/* arm pouring */}
                <motion.g style={{ transformOrigin: "20px 28px" }}
                  animate={{ rotate: [-10, 25, -10] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <rect x="18" y="26" width="6" height="14" rx="2" fill="hsl(0 75% 48%)" />
                </motion.g>
              </g>
              {/* juicer */}
              <g transform="translate(150, 70)">
                <rect x="0" y="0" width="22" height="22" rx="2" fill="hsl(45 90% 55%)" />
                <motion.rect x="3" y="4" width="16" height="14" fill="hsl(45 100% 60%)"
                  animate={{ scaleY: [1, 1.05, 0.95, 1] }} style={{ transformOrigin: "11px 18px" }}
                  transition={{ duration: 0.4, repeat: Infinity }} />
              </g>
              {/* glass filling */}
              <g transform="translate(180, 90)">
                <path d="M 0 0 L 14 0 L 13 18 L 1 18 Z" fill="none" stroke="hsl(0 0% 95%)" strokeWidth="1" />
                <motion.rect x="1" y="18" width="12" height="0" fill="hsl(45 100% 55%)"
                  animate={{ y: [18, 4], height: [0, 14] }} transition={{ duration: 2, repeat: Infinity }}
                />
              </g>
              {/* SJS box */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1], y: [10, 0, 0] }}
                transition={{ duration: 4, times: [0, 0.6, 1] }}>
                <g transform="translate(210, 90)">
                  <rect x="0" y="0" width="24" height="20" rx="2" fill="hsl(0 75% 48%)" stroke="hsl(45 100% 60%)" strokeWidth="1" />
                  <text x="12" y="13" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="7" fill="hsl(45 100% 90%)">SJS</text>
                </g>
              </motion.g>
            </motion.g>
          )}

          {/* SCENE 2: DEPART */}
          {scene === "depart" && (
            <motion.g key="dep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <rect x="20" y="40" width="100" height="70" fill="hsl(35 40% 22%)" stroke="hsl(45 80% 55%)" strokeWidth="1" />
              <text x="70" y="55" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="8" fill="hsl(45 100% 80%)">SHALIMAR</text>
              {/* bike + boy starting */}
              <motion.g
                initial={{ x: 100 }}
                animate={{ x: [100, 250] }}
                transition={{ duration: 4, ease: "easeIn" }}>
                <BikeBoy />
                {/* exhaust */}
                <motion.g
                  animate={{ opacity: [0.8, 0, 0.8], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity }}>
                  <circle cx="-6" cy="48" r="4" fill="hsl(0 0% 80% / 0.5)" />
                </motion.g>
              </motion.g>
            </motion.g>
          )}

          {/* SCENE 3: OBSTACLES */}
          {scene === "obstacles" && (
            <motion.g key="obs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* rain */}
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.line key={i}
                  x1={(i * 22) % 300} y1={-10} x2={(i * 22) % 300 - 4} y2={6}
                  stroke="hsl(200 80% 70%)" strokeWidth="1.2" strokeLinecap="round"
                  animate={{ y1: [-10, 110], y2: [6, 126] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }} />
              ))}
              {/* speed breaker */}
              <rect x="80" y="113" width="30" height="4" rx="2" fill="hsl(45 100% 60%)" />
              {/* stray dog chasing */}
              <motion.g animate={{ x: [-30, 280] }} transition={{ duration: 4, ease: "linear" }}>
                <ellipse cx="0" cy="105" rx="10" ry="4" fill="hsl(30 35% 35%)" />
                <circle cx="-7" cy="100" r="4" fill="hsl(30 35% 35%)" />
              </motion.g>
              {/* bike jumping */}
              <motion.g
                animate={{ x: [0, 280], y: [70, 70, 60, 70, 70] }}
                transition={{ duration: 4, ease: "linear", times: [0, 0.3, 0.4, 0.5, 1] }}>
                <BikeBoy />
              </motion.g>
            </motion.g>
          )}

          {/* SCENE 4: DELIVER */}
          {scene === "deliver" && (
            <motion.g key="del" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* building */}
              <rect x="160" y="20" width="120" height="95" fill="hsl(35 30% 28%)" stroke="hsl(45 80% 55%)" strokeWidth="1" />
              {[30, 50, 70, 90].map((y) => (
                <g key={y}>
                  <rect x="170" y={y} width="20" height="12" fill="hsl(200 50% 60%)" stroke="hsl(0 0% 15%)" strokeWidth="0.5" />
                  <rect x="200" y={y} width="20" height="12" fill="hsl(200 50% 60%)" stroke="hsl(0 0% 15%)" strokeWidth="0.5" />
                  <rect x="230" y={y} width="20" height="12" fill="hsl(200 50% 60%)" stroke="hsl(0 0% 15%)" strokeWidth="0.5" />
                </g>
              ))}
              {/* customer at balcony catches box */}
              <g transform="translate(225, 32)">
                <rect x="0" y="0" width="20" height="2" fill="hsl(0 0% 25%)" />
                <circle cx="10" cy="-6" r="5" fill="hsl(30 55% 76%)" />
                <circle cx="8" cy="-6" r="0.7" fill="hsl(0 0% 10%)" />
                <circle cx="12" cy="-6" r="0.7" fill="hsl(0 0% 10%)" />
              </g>
              {/* Box flying up */}
              <motion.g
                animate={{ x: [80, 220], y: [80, 30] }}
                transition={{ duration: 1.5, ease: "easeOut" }}>
                <rect x="0" y="0" width="14" height="12" rx="1" fill="hsl(0 75% 48%)" stroke="hsl(45 100% 60%)" strokeWidth="0.6" />
                <text x="7" y="8" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="5" fill="hsl(45 100% 90%)">SJS</text>
              </motion.g>
              {/* Bike */}
              <g transform="translate(60, 70)"><BikeBoy /></g>
              {/* Ahhh! reaction */}
              <motion.g
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: [0, 0, 1, 1], y: [4, 4, 0, 0] }}
                transition={{ duration: 4, times: [0, 0.4, 0.5, 1] }}>
                <ellipse cx="245" cy="14" rx="32" ry="11" fill="hsl(0 0% 100%)" stroke="hsl(0 0% 15%)" strokeWidth="1" />
                <text x="245" y="18" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="9" fill="hsl(120 60% 30%)">Ahhh! 😍</text>
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

const BikeBoy = () => (
  <g>
    {/* delivery box */}
    <rect x="20" y="20" width="20" height="18" rx="2" fill="hsl(0 75% 48%)" stroke="hsl(30 30% 12%)" strokeWidth="0.8" />
    <text x="30" y="32" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="6" fill="hsl(45 100% 90%)">SJS</text>
    {/* frame */}
    <path d="M 25 50 L 50 38 L 70 50" stroke="hsl(0 75% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="48" y="34" width="18" height="6" rx="2" fill="hsl(30 30% 14%)" />
    <circle cx="74" cy="38" r="3" fill="hsl(45 100% 75%)" />
    {/* boy */}
    <circle cx="50" cy="14" r="6" fill="hsl(30 55% 76%)" />
    <path d="M 44 12 Q 44 6 50 6 Q 56 6 56 12 L 56 14 L 44 14 Z" fill="hsl(0 75% 38%)" />
    <rect x="42" y="20" width="16" height="18" rx="3" fill="hsl(0 75% 48%)" />
    {/* wheels */}
    <motion.circle cx="22" cy="54" r="8" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1"
      animate={{ rotate: 360 }} transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "22px 54px" }} />
    <motion.circle cx="74" cy="54" r="8" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1"
      animate={{ rotate: 360 }} transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "74px 54px" }} />
  </g>
);

export default DeliveryBikeAnimation;
