import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Franchise story — 4-scene cinematic loop:
 *   1. Meeting — two businessmen at office desk with documents
 *   2. Signing — pen signs paper, golden ink, "DEAL SEALED" stamp
 *   3. Celebration — handshake + confetti + fireworks
 *   4. Grand opening — new shop, ribbon cutting, "YOUR EMPIRE STARTS HERE"
 */

type Scene = "meeting" | "signing" | "celebration" | "opening";
const SCENES: Scene[] = ["meeting", "signing", "celebration", "opening"];
const DUR = 5500;

const FranchiseDealAnimation = () => {
  const [scene, setScene] = useState<Scene>("meeting");

  useEffect(() => {
    const id = setInterval(() => {
      setScene((s) => SCENES[(SCENES.indexOf(s) + 1) % SCENES.length]);
    }, DUR);
    return () => clearInterval(id);
  }, []);

  const bg = scene === "meeting" ? "linear-gradient(180deg, hsl(230 40% 18%) 0%, hsl(220 35% 25%) 100%)"
    : scene === "signing" ? "linear-gradient(180deg, hsl(220 30% 22%) 0%, hsl(35 50% 35%) 100%)"
    : scene === "celebration" ? "linear-gradient(180deg, hsl(280 60% 35%) 0%, hsl(35 80% 50%) 100%)"
    : "linear-gradient(180deg, hsl(200 70% 55%) 0%, hsl(45 90% 65%) 100%)";

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[220px] md:h-[280px] overflow-hidden rounded-2xl border border-primary/25 shadow-pineapple">
      <AnimatePresence mode="sync">
        <motion.div key={`bg-${scene}`} className="absolute inset-0" style={{ background: bg }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} />
      </AnimatePresence>

      {/* Scene badge */}
      <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 border border-primary/30 backdrop-blur">
        <motion.span className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />
        {scene === "meeting" ? "The Meeting" : scene === "signing" ? "The Signing" : scene === "celebration" ? "Celebration!" : "Grand Opening"}
      </div>

      <svg viewBox="0 0 600 280" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* ===== SCENE 1: MEETING ===== */}
        <AnimatePresence>
          {scene === "meeting" && (
            <motion.g key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* office window */}
              <rect x="40" y="20" width="520" height="80" fill="hsl(220 50% 12%)" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
              {Array.from({ length: 30 }).map((_, i) => (
                <circle key={i} cx={50 + (i * 20) % 500} cy={30 + ((i * 7) % 60)} r="1" fill="hsl(45 100% 80%)" opacity="0.7" />
              ))}
              {/* table */}
              <rect x="80" y="180" width="440" height="14" fill="hsl(30 35% 22%)" />
              <rect x="100" y="194" width="6" height="60" fill="hsl(30 30% 16%)" />
              <rect x="494" y="194" width="6" height="60" fill="hsl(30 30% 16%)" />

              {/* documents */}
              <motion.rect x="240" y="170" width="60" height="14" fill="hsl(0 0% 95%)"
                animate={{ x: [240, 320] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} />
              <line x1="248" y1="174" x2="290" y2="174" stroke="hsl(0 0% 60%)" strokeWidth="0.5" />
              <line x1="248" y1="178" x2="290" y2="178" stroke="hsl(0 0% 60%)" strokeWidth="0.5" />

              {/* juice glass */}
              <path d="M 380 168 L 396 168 L 394 184 L 382 184 Z" fill="hsl(45 100% 60%)" stroke="hsl(0 0% 95%)" strokeWidth="0.6" />

              {/* Businessman 1 left */}
              <g transform="translate(120, 110)">
                <rect x="0" y="50" width="40" height="50" rx="6" fill="hsl(220 35% 22%)" />
                <polygon points="14,50 20,62 26,50" fill="hsl(0 0% 96%)" />
                <polygon points="17,54 23,54 22,72 18,72" fill="hsl(0 80% 50%)" />
                <circle cx="20" cy="36" r="14" fill="hsl(30 55% 78%)" />
                <path d="M 6 34 Q 6 22 20 22 Q 34 22 34 34 L 6 34 Z" fill="hsl(30 25% 16%)" />
                <circle cx="15" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                <circle cx="25" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                <path d="M 15 44 Q 20 47 25 44" stroke="hsl(0 0% 15%)" strokeWidth="1.2" fill="none" />
              </g>

              {/* Businessman 2 right */}
              <g transform="translate(440, 110)">
                <rect x="0" y="50" width="40" height="50" rx="6" fill="hsl(35 50% 35%)" />
                <polygon points="14,50 20,62 26,50" fill="hsl(0 0% 96%)" />
                <polygon points="17,54 23,54 22,72 18,72" fill="hsl(220 70% 45%)" />
                <circle cx="20" cy="36" r="14" fill="hsl(30 60% 72%)" />
                <path d="M 6 34 Q 6 22 20 22 Q 34 22 34 34 L 6 34 Z" fill="hsl(20 35% 18%)" />
                <circle cx="15" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                <circle cx="25" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                {/* pen — held up suspensefully */}
                <motion.g style={{ transformOrigin: "0px 70px" }}
                  animate={{ rotate: [0, -30, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <rect x="-12" y="60" width="14" height="3" fill="hsl(220 70% 30%)" />
                  <polygon points="-12,60 -16,61.5 -12,63" fill="hsl(45 100% 60%)" />
                </motion.g>
              </g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ===== SCENE 2: SIGNING ===== */}
        <AnimatePresence>
          {scene === "signing" && (
            <motion.g key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* big paper */}
              <rect x="120" y="80" width="360" height="160" rx="6" fill="hsl(45 80% 96%)" stroke="hsl(30 30% 50%)" strokeWidth="1.5" />
              <text x="300" y="110" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="18" fill="hsl(0 75% 40%)" letterSpacing="2">FRANCHISE AGREEMENT</text>
              {[140, 150, 160, 170].map((y, i) => (
                <line key={i} x1="150" y1={y + 10} x2="450" y2={y + 10} stroke="hsl(30 20% 65%)" strokeWidth="0.8" />
              ))}
              {/* golden signature animating */}
              <motion.path
                d="M 200 210 Q 230 180 260 215 Q 290 195 330 210 Q 360 200 400 215"
                stroke="hsl(45 100% 50%)" strokeWidth="3" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 4px hsl(45 100% 60%))" }}
              />
              {/* pen following */}
              <motion.g
                animate={{ x: [200, 230, 260, 290, 330, 360, 400], y: [210, 180, 215, 195, 210, 200, 215] }}
                transition={{ duration: 3, ease: "easeInOut" }}>
                <line x1="0" y1="0" x2="-20" y2="-20" stroke="hsl(220 70% 30%)" strokeWidth="3" strokeLinecap="round" />
                <polygon points="0,0 -4,-2 -2,-6" fill="hsl(45 100% 60%)" />
              </motion.g>
              {/* DEAL SEALED stamp */}
              <motion.g
                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1], rotate: [-20, -8, -8] }}
                transition={{ delay: 3.2, duration: 0.8, times: [0, 0.5, 1] }}
                style={{ transformOrigin: "300px 175px" }}>
                <ellipse cx="380" cy="150" rx="60" ry="22" fill="none" stroke="hsl(0 80% 50%)" strokeWidth="3" />
                <text x="380" y="156" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="16" fill="hsl(0 80% 50%)" letterSpacing="2">DEAL SEALED</text>
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ===== SCENE 3: CELEBRATION ===== */}
        <AnimatePresence>
          {scene === "celebration" && (
            <motion.g key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* fireworks */}
              {[100, 300, 500].map((cx, i) => (
                <motion.g key={cx}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}>
                  {Array.from({ length: 8 }).map((_, k) => {
                    const a = (k / 8) * Math.PI * 2;
                    return (
                      <line key={k} x1={cx} y1={50} x2={cx + Math.cos(a) * 22} y2={50 + Math.sin(a) * 22}
                        stroke={["hsl(45 100% 70%)", "hsl(0 80% 60%)", "hsl(280 70% 65%)"][i]} strokeWidth="2" strokeLinecap="round" />
                    );
                  })}
                </motion.g>
              ))}

              {/* confetti */}
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.rect key={i}
                  x={(i * 23) % 600} y={-10} width="6" height="10"
                  fill={["hsl(45 100% 60%)", "hsl(0 80% 55%)", "hsl(120 60% 50%)", "hsl(280 60% 60%)"][i % 4]}
                  animate={{ y: [-10, 280], rotate: [0, 360] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i * 0.1) % 2 }}
                />
              ))}

              {/* Two men shaking hands */}
              <g transform="translate(200, 130)">
                <rect x="0" y="50" width="40" height="50" rx="6" fill="hsl(220 35% 22%)" />
                <circle cx="20" cy="36" r="14" fill="hsl(30 55% 78%)" />
                <path d="M 6 34 Q 6 22 20 22 Q 34 22 34 34 L 6 34 Z" fill="hsl(30 25% 16%)" />
                <circle cx="15" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                <circle cx="25" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                <path d="M 15 44 Q 20 48 25 44" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" />
                <motion.rect x="35" y="55" width="50" height="9" rx="4" fill="hsl(220 35% 22%)"
                  animate={{ y: [55, 53, 55] }} transition={{ duration: 0.5, repeat: Infinity }} />
              </g>
              <g transform="translate(360, 130)">
                <rect x="0" y="50" width="40" height="50" rx="6" fill="hsl(35 50% 35%)" />
                <circle cx="20" cy="36" r="14" fill="hsl(30 60% 72%)" />
                <path d="M 6 34 Q 6 22 20 22 Q 34 22 34 34 L 6 34 Z" fill="hsl(20 35% 18%)" />
                <circle cx="15" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                <circle cx="25" cy="38" r="1.5" fill="hsl(0 0% 10%)" />
                <path d="M 15 44 Q 20 48 25 44" stroke="hsl(0 0% 15%)" strokeWidth="1.5" fill="none" />
                <motion.rect x="-45" y="55" width="50" height="9" rx="4" fill="hsl(35 50% 35%)"
                  animate={{ y: [55, 53, 55] }} transition={{ duration: 0.5, repeat: Infinity }} />
              </g>
              {/* clinking glasses */}
              <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ transformOrigin: "260px 200px" }}>
                <path d="M 250 200 L 270 200 L 268 220 L 252 220 Z" fill="hsl(45 100% 60%)" stroke="hsl(45 100% 80%)" strokeWidth="1" />
              </motion.g>
              <motion.g animate={{ rotate: [5, -5, 5] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ transformOrigin: "340px 200px" }}>
                <path d="M 330 200 L 350 200 L 348 220 L 332 220 Z" fill="hsl(15 80% 55%)" stroke="hsl(45 100% 80%)" strokeWidth="1" />
              </motion.g>

              {/* "Let's Go!" bubble */}
              <motion.g
                animate={{ y: [0, -6, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}>
                <ellipse cx="300" cy="100" rx="50" ry="18" fill="hsl(0 0% 100%)" stroke="hsl(0 0% 15%)" strokeWidth="1.5" />
                <text x="300" y="106" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="14" fill="hsl(120 60% 30%)">Let's Go! 🎉</text>
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ===== SCENE 4: GRAND OPENING ===== */}
        <AnimatePresence>
          {scene === "opening" && (
            <motion.g key="o" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* sky text */}
              <motion.text x="300" y="40" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="18" fill="hsl(0 75% 40%)" letterSpacing="2"
                initial={{ y: 60, opacity: 0 }} animate={{ y: 40, opacity: 1 }} transition={{ duration: 1 }}>
                YOUR EMPIRE STARTS HERE
              </motion.text>

              {/* New shop */}
              <g transform="translate(140, 70)">
                <rect x="0" y="0" width="320" height="14" fill="hsl(30 30% 12%)" />
                <rect x="6" y="14" width="308" height="32" rx="3" fill="hsl(45 100% 55%)" stroke="hsl(30 30% 12%)" strokeWidth="2" />
                <text x="160" y="36" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="18" fill="hsl(30 25% 12%)" letterSpacing="2">SHALIMAR JUICE</text>
                <rect x="6" y="46" width="308" height="120" fill="hsl(35 40% 25%)" stroke="hsl(45 70% 50%)" strokeWidth="1.5" />
                <rect x="20" y="60" width="280" height="80" fill="hsl(38 60% 35%)" />
                <text x="160" y="105" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="22" fill="hsl(45 100% 70%)">GRAND OPENING</text>
              </g>

              {/* Ribbon being cut */}
              <motion.line x1="150" y1="180" x2="460" y2="180"
                stroke="hsl(0 80% 50%)" strokeWidth="6" strokeLinecap="round"
                initial={{ pathLength: 1 }}
                animate={{ pathLength: [1, 1, 0] }}
                transition={{ duration: 4, times: [0, 0.5, 0.6] }} />
              {/* scissors */}
              <motion.g
                animate={{ x: [-100, 200], rotate: [0, -15, 0] }}
                transition={{ duration: 3, ease: "easeInOut" }}>
                <g transform="translate(290, 175)">
                  <circle cx="-6" cy="-4" r="5" fill="none" stroke="hsl(0 0% 30%)" strokeWidth="2" />
                  <circle cx="-6" cy="4" r="5" fill="none" stroke="hsl(0 0% 30%)" strokeWidth="2" />
                  <line x1="-2" y1="-2" x2="20" y2="0" stroke="hsl(0 0% 80%)" strokeWidth="2" />
                  <line x1="-2" y1="2" x2="20" y2="0" stroke="hsl(0 0% 80%)" strokeWidth="2" />
                </g>
              </motion.g>

              {/* Customers walking in */}
              {[200, 260, 340, 400].map((x, i) => (
                <motion.g key={x} transform={`translate(${x}, 210)`}
                  initial={{ opacity: 0, x: x - 40 }}
                  animate={{ opacity: 1, x }}
                  transition={{ delay: 2 + i * 0.3, duration: 1 }}>
                  <rect x="0" y="22" width="22" height="34" rx="5" fill={["hsl(15 70% 50%)", "hsl(280 50% 50%)", "hsl(120 45% 40%)", "hsl(220 60% 45%)"][i]} />
                  <circle cx="11" cy="14" r="9" fill="hsl(30 55% 76%)" />
                  <circle cx="8" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
                  <circle cx="14" cy="15" r="1.1" fill="hsl(0 0% 10%)" />
                </motion.g>
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default FranchiseDealAnimation;
