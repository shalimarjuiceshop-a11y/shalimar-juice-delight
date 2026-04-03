import { motion } from "framer-motion";
import { useMemo } from "react";

const MapWalkingAnimation = () => {
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= 11 && hour < 23;

  // Path points for walking animation (SVG coordinates)
  const pathPoints = useMemo(() => ({
    // Man walks from left along a road to the shop
    x: [20, 60, 110, 160, 210, 250, 280],
    y: [140, 125, 115, 110, 108, 106, 100],
  }), []);

  if (!isOpen) {
    return (
      <div className="relative w-full h-[180px] md:h-[220px] rounded-2xl overflow-hidden bg-muted/30 border border-border flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl block mb-2">🌙</span>
          <p className="font-body text-xs text-muted-foreground font-medium">Shop is closed now</p>
          <p className="font-body text-[10px] text-muted-foreground/60">Opens at 11:00 AM</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[180px] md:h-[220px] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/30 dark:to-green-900/20 border border-border">
      <svg viewBox="0 0 340 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 80%, 85%)" />
            <stop offset="100%" stopColor="hsl(130, 40%, 88%)" />
          </linearGradient>
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(220, 10%, 65%)" />
            <stop offset="100%" stopColor="hsl(220, 10%, 55%)" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="340" height="200" fill="url(#skyGrad)" />

        {/* Ground */}
        <rect x="0" y="145" width="340" height="55" fill="hsl(130, 30%, 75%)" rx="0" />

        {/* Road */}
        <path d="M 0 140 Q 80 125 170 120 Q 260 115 340 110" fill="none" stroke="url(#roadGrad)" strokeWidth="22" strokeLinecap="round" />
        {/* Road center line (blue path) */}
        <motion.path
          d="M 0 140 Q 80 125 170 120 Q 260 115 340 110"
          fill="none"
          stroke="hsl(220, 80%, 60%)"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -28 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Trees */}
        {[40, 100, 180].map((x, i) => (
          <g key={i}>
            <rect x={x - 2} y={75 + i * 3} width="4" height="18" fill="hsl(25, 50%, 40%)" rx="1" />
            <circle cx={x} cy={72 + i * 3} r="12" fill="hsl(130, 45%, 45%)" />
            <circle cx={x - 5} cy={76 + i * 3} r="8" fill="hsl(130, 40%, 50%)" />
            <circle cx={x + 5} cy={76 + i * 3} r="8" fill="hsl(130, 40%, 50%)" />
          </g>
        ))}

        {/* Shalimar Shop Building */}
        <g>
          {/* Building */}
          <rect x="260" y="55" width="60" height="50" fill="hsl(45, 90%, 65%)" rx="4" stroke="hsl(35, 70%, 45%)" strokeWidth="1.5" />
          {/* Roof */}
          <polygon points="255,55 290,35 325,55" fill="hsl(15, 60%, 50%)" stroke="hsl(15, 50%, 40%)" strokeWidth="1" />
          {/* Door */}
          <rect x="280" y="80" width="16" height="25" fill="hsl(25, 60%, 35%)" rx="2" />
          {/* Window */}
          <rect x="266" y="68" width="10" height="10" fill="hsl(200, 60%, 80%)" rx="1" stroke="hsl(35, 70%, 45%)" strokeWidth="0.8" />
          {/* Sign */}
          <rect x="263" y="56" width="54" height="10" fill="hsl(35, 80%, 40%)" rx="2" />
          <text x="290" y="64" textAnchor="middle" fill="hsl(45, 100%, 95%)" fontSize="5" fontWeight="bold" fontFamily="sans-serif">SHALIMAR</text>
          {/* Pineapple icon on top */}
          <text x="290" y="32" textAnchor="middle" fontSize="12">🍍</text>
          {/* Open sign glow */}
          <motion.circle
            cx="290"
            cy="90"
            r="3"
            fill="hsl(130, 70%, 50%)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>

        {/* Walking Man - Cartoon style */}
        <motion.g
          animate={{
            x: pathPoints.x,
            y: pathPoints.y.map(y => y - 140),
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
          }}
        >
          {/* Body */}
          <circle cx="0" cy="-18" r="6" fill="hsl(30, 60%, 60%)" /> {/* Head */}
          <rect x="-4" y="-12" width="8" height="14" fill="hsl(210, 70%, 55%)" rx="3" /> {/* Shirt */}
          {/* Legs - animated walking */}
          <motion.line
            x1="-2" y1="2" x2="-5" y2="12"
            stroke="hsl(220, 30%, 35%)" strokeWidth="2.5" strokeLinecap="round"
            animate={{ x2: [-5, -1, -5] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          <motion.line
            x1="2" y1="2" x2="5" y2="12"
            stroke="hsl(220, 30%, 35%)" strokeWidth="2.5" strokeLinecap="round"
            animate={{ x2: [5, 1, 5] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
          />
          {/* Arms */}
          <motion.line
            x1="-4" y1="-8" x2="-9" y2="-1"
            stroke="hsl(30, 60%, 60%)" strokeWidth="2" strokeLinecap="round"
            animate={{ x2: [-9, -5, -9] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
          />
          <motion.line
            x1="4" y1="-8" x2="9" y2="-1"
            stroke="hsl(30, 60%, 60%)" strokeWidth="2" strokeLinecap="round"
            animate={{ x2: [9, 5, 9] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          {/* Juice glass in hand */}
          <motion.g
            animate={{ x: [9, 5, 9] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            <rect x="7" y="-4" width="5" height="7" fill="hsl(45, 90%, 60%)" rx="1" />
            <text x="9.5" y="1" textAnchor="middle" fontSize="4">🥤</text>
          </motion.g>
          {/* Happy face */}
          <circle cx="-2" cy="-20" r="1" fill="hsl(0, 0%, 20%)" /> {/* Left eye */}
          <circle cx="2" cy="-20" r="1" fill="hsl(0, 0%, 20%)" /> {/* Right eye */}
          <path d="M -2 -16 Q 0 -14 2 -16" fill="none" stroke="hsl(0, 0%, 20%)" strokeWidth="0.8" /> {/* Smile */}
        </motion.g>

        {/* Location pin at shop */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 290 45 L 290 50" stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" />
          <circle cx="290" cy="42" r="4" fill="hsl(0, 70%, 55%)" />
          <circle cx="290" cy="42" r="2" fill="hsl(0, 0%, 100%)" />
        </motion.g>

        {/* Clouds */}
        <motion.g animate={{ x: [0, 15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
          <ellipse cx="70" cy="25" rx="20" ry="8" fill="white" opacity="0.7" />
          <ellipse cx="60" cy="22" rx="14" ry="7" fill="white" opacity="0.6" />
        </motion.g>
        <motion.g animate={{ x: [0, -10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
          <ellipse cx="200" cy="18" rx="18" ry="7" fill="white" opacity="0.5" />
          <ellipse cx="212" cy="15" rx="12" ry="6" fill="white" opacity="0.4" />
        </motion.g>
      </svg>

      {/* Label */}
      <div className="absolute bottom-2 left-3">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border text-[10px] font-body font-semibold text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-status-open animate-pulse" />
          Walking to Shalimar Shop...
        </span>
      </div>
    </div>
  );
};

export default MapWalkingAnimation;
