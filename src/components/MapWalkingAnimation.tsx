import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";



const MapWalkingAnimation = () => {
  const [isShopOpen, setIsShopOpen] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      // IST = UTC + 5:30
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const istHours = utcHours + 5 + Math.floor((utcMinutes + 30) / 60);
      const istHour = istHours % 24;
      // Shop open 11 AM to 11 PM IST
      setIsShopOpen(istHour >= 11 && istHour < 23);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isShopOpen) {
    return (
      <div className="relative w-full h-[200px] md:h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 to-slate-900 border border-border flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
          {/* Night sky */}
          <rect x="0" y="0" width="400" height="200" fill="hsl(230, 40%, 12%)" />
          {/* Stars */}
          {[
            [40, 25], [90, 45], [150, 15], [200, 38], [260, 20], [310, 50], [370, 30],
            [55, 60], [130, 55], [220, 65], [340, 15], [180, 30], [75, 35],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={Math.random() * 1.2 + 0.5}
              fill="white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
          {/* Moon */}
          <circle cx="340" cy="40" r="18" fill="hsl(45, 60%, 85%)" />
          <circle cx="348" cy="35" r="14" fill="hsl(230, 40%, 12%)" />
          {/* Ground */}
          <rect x="0" y="155" width="400" height="45" fill="hsl(220, 20%, 18%)" />
          {/* Road */}
          <rect x="0" y="130" width="400" height="28" fill="hsl(220, 15%, 22%)" rx="2" />
          {/* Shop (dark/closed) */}
          <g>
            <rect x="300" y="68" width="70" height="62" fill="hsl(35, 30%, 25%)" rx="4" stroke="hsl(35, 20%, 18%)" strokeWidth="1.5" />
            <polygon points="293,68 335,42 377,68" fill="hsl(15, 25%, 22%)" />
            <rect x="325" y="100" width="18" height="30" fill="hsl(25, 25%, 16%)" rx="3" />
            <rect x="303" y="69" width="64" height="12" fill="hsl(35, 25%, 18%)" rx="2" />
            <text x="335" y="79" textAnchor="middle" fill="hsl(45, 30%, 45%)" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">SHALIMAR</text>
            {/* Closed sign */}
            <rect x="315" y="90" width="40" height="10" fill="hsl(0, 60%, 40%)" rx="2" />
            <text x="335" y="97.5" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">CLOSED</text>
          </g>
          {/* ZZZ sleeping */}
          <motion.text
            x="350" y="58" fontSize="10" fill="hsl(45, 30%, 55%)" fontWeight="bold"
            animate={{ opacity: [0, 1, 0], y: [58, 48, 38] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Z
          </motion.text>
          <motion.text
            x="360" y="48" fontSize="8" fill="hsl(45, 30%, 45%)" fontWeight="bold"
            animate={{ opacity: [0, 1, 0], y: [48, 38, 28] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            z
          </motion.text>
          <motion.text
            x="368" y="38" fontSize="6" fill="hsl(45, 30%, 35%)" fontWeight="bold"
            animate={{ opacity: [0, 1, 0], y: [38, 28, 18] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            z
          </motion.text>
        </svg>
        {/* Label */}
        <div className="absolute bottom-2 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-[10px] font-body font-semibold text-foreground">
            <Moon size={11} className="text-primary" />
            Good Night 🌙 Reopen at 11 AM
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[200px] md:h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/30 dark:to-green-900/20 border border-border">
      <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 80%, 85%)" />
            <stop offset="100%" stopColor="hsl(130, 40%, 88%)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="400" height="200" fill="url(#skyGrad)" />
        <rect x="0" y="155" width="400" height="45" fill="hsl(130, 30%, 72%)" />
        {[30, 80, 140, 200, 280, 350].map((x, i) => (
          <g key={`grass-${i}`}>
            <line x1={x} y1={155} x2={x - 2} y2={149} stroke="hsl(130, 40%, 55%)" strokeWidth="1.5" />
            <line x1={x + 3} y1={155} x2={x + 4} y2={148} stroke="hsl(130, 35%, 50%)" strokeWidth="1.5" />
          </g>
        ))}
        <rect x="0" y="130" width="400" height="28" fill="hsl(220, 8%, 55%)" rx="2" />
        <rect x="0" y="131" width="400" height="2" fill="hsl(220, 8%, 45%)" />
        <motion.line x1="0" y1="144" x2="400" y2="144" stroke="hsl(50, 90%, 60%)" strokeWidth="2" strokeDasharray="12 8" initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -40 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        {[50, 130, 230].map((x, i) => (
          <g key={`tree-${i}`}>
            <rect x={x - 2.5} y={90 + i * 4} width="5" height="20" fill="hsl(25, 50%, 38%)" rx="2" />
            <circle cx={x} cy={85 + i * 4} r="14" fill="hsl(130, 45%, 42%)" />
            <circle cx={x - 7} cy={90 + i * 4} r="9" fill="hsl(130, 40%, 48%)" />
            <circle cx={x + 7} cy={90 + i * 4} r="9" fill="hsl(130, 40%, 48%)" />
          </g>
        ))}
        <g>
          <rect x="300" y="68" width="70" height="62" fill="hsl(45, 85%, 65%)" rx="4" stroke="hsl(35, 65%, 42%)" strokeWidth="1.5" />
          <polygon points="293,68 335,42 377,68" fill="hsl(15, 55%, 48%)" stroke="hsl(15, 45%, 38%)" strokeWidth="1" />
          <rect x="325" y="100" width="18" height="30" fill="hsl(25, 55%, 32%)" rx="3" />
          <circle cx="340" cy="116" r="1.5" fill="hsl(45, 80%, 60%)" />
          <rect x="306" y="82" width="14" height="12" fill="hsl(200, 60%, 80%)" rx="2" stroke="hsl(35, 65%, 42%)" strokeWidth="1" />
          <line x1="313" y1="82" x2="313" y2="94" stroke="hsl(35, 65%, 42%)" strokeWidth="0.8" />
          <line x1="306" y1="88" x2="320" y2="88" stroke="hsl(35, 65%, 42%)" strokeWidth="0.8" />
          <rect x="350" y="82" width="14" height="12" fill="hsl(200, 60%, 80%)" rx="2" stroke="hsl(35, 65%, 42%)" strokeWidth="1" />
          <rect x="303" y="69" width="64" height="12" fill="hsl(35, 75%, 35%)" rx="2" />
          <text x="335" y="79" textAnchor="middle" fill="hsl(45, 100%, 92%)" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">SHALIMAR</text>
          <text x="335" y="40" textAnchor="middle" fontSize="14">🍍</text>
          <motion.circle cx="335" cy="110" r="3.5" fill="hsl(130, 70%, 50%)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </g>
        <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M 335 55 Q 335 48 335 52" stroke="hsl(0, 70%, 50%)" strokeWidth="2" />
          <circle cx="335" cy="48" r="5" fill="hsl(0, 70%, 50%)" />
          <circle cx="335" cy="48" r="2.5" fill="white" />
        </motion.g>
        {/* Real walker on the road — proper feet motion, loops with pauses */}
        <motion.g
          animate={{ x: [40, 280, 280, 40, 40] }}
          transition={{
            duration: 18,
            times: [0, 0.36, 0.5, 0.86, 1],
            ease: ["easeInOut", "linear", "easeInOut", "linear"],
            repeat: Infinity,
          }}
        >
          <motion.g
            animate={{ scaleX: [1, 1, -1, -1, 1] }}
            transition={{ duration: 18, times: [0, 0.42, 0.44, 0.92, 0.94], repeat: Infinity }}
            style={{ transformOrigin: "0px 144px", transformBox: "fill-box" } as React.CSSProperties}
          >
            {/* contact shadow on road */}
            <motion.ellipse
              cx="0" cy="156" rx="11" ry="2.2" fill="black" opacity="0.28"
              animate={{ rx: [11, 9, 11] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* body group with subtle vertical bob */}
            <motion.g
              animate={{ y: [0, -1.2, 0, -1.2, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* legs (behind body) */}
              <motion.g
                animate={{ rotate: [22, -22, 22] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "0px 138px", transformBox: "fill-box" } as React.CSSProperties}
              >
                <rect x="-2.2" y="138" width="4.4" height="14" rx="1.5" fill="hsl(218, 35%, 28%)" />
                <ellipse cx="2" cy="153" rx="4" ry="1.8" fill="hsl(28, 55%, 35%)" />
              </motion.g>
              <motion.g
                animate={{ rotate: [-22, 22, -22] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "0px 138px", transformBox: "fill-box" } as React.CSSProperties}
              >
                <rect x="-2.2" y="138" width="4.4" height="14" rx="1.5" fill="hsl(218, 40%, 22%)" />
                <ellipse cx="-2" cy="153" rx="4" ry="1.8" fill="hsl(28, 60%, 28%)" />
              </motion.g>
              {/* torso (teal jacket) */}
              <rect x="-6" y="120" width="12" height="20" rx="3.5" fill="hsl(178, 35%, 32%)" />
              {/* shirt v-neck patch */}
              <path d="M -3 120 L 0 126 L 3 120 Z" fill="hsl(95, 30%, 70%)" />
              {/* backpack */}
              <rect x="-9" y="121" width="5" height="13" rx="2" fill="hsl(8, 55%, 48%)" />
              {/* arms */}
              <motion.g
                animate={{ rotate: [-18, 18, -18] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "0px 122px", transformBox: "fill-box" } as React.CSSProperties}
              >
                <rect x="3.5" y="122" width="3" height="12" rx="1.5" fill="hsl(178, 35%, 32%)" />
                <circle cx="5" cy="135" r="1.6" fill="hsl(28, 55%, 70%)" />
              </motion.g>
              <motion.g
                animate={{ rotate: [18, -18, 18] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "0px 122px", transformBox: "fill-box" } as React.CSSProperties}
              >
                <rect x="-6.5" y="122" width="3" height="12" rx="1.5" fill="hsl(178, 38%, 28%)" />
                <circle cx="-5" cy="135" r="1.6" fill="hsl(28, 55%, 70%)" />
              </motion.g>
              {/* head */}
              <circle cx="0" cy="114" r="5.2" fill="hsl(28, 55%, 72%)" />
              {/* hair */}
              <path d="M -5 112 Q -3 107 0 108 Q 3 106 5 111 Q 4 109 2 110 Q 0 109 -2 110 Q -4 110 -5 112 Z" fill="hsl(20, 45%, 22%)" />
              {/* eye */}
              <circle cx="1.6" cy="114" r="0.7" fill="hsl(0,0%,10%)" />
              {/* smile */}
              <path d="M 0.5 116 Q 1.8 117 3 116" stroke="hsl(0,0%,15%)" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            </motion.g>
          </motion.g>
        </motion.g>


        <motion.g animate={{ x: [0, 20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}>
          <ellipse cx="80" cy="22" rx="22" ry="9" fill="white" opacity="0.7" />
          <ellipse cx="68" cy="18" rx="15" ry="8" fill="white" opacity="0.6" />
          <ellipse cx="90" cy="19" rx="12" ry="6" fill="white" opacity="0.5" />
        </motion.g>
        <motion.g animate={{ x: [0, -15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}>
          <ellipse cx="240" cy="16" rx="20" ry="8" fill="white" opacity="0.5" />
          <ellipse cx="255" cy="13" rx="14" ry="7" fill="white" opacity="0.4" />
        </motion.g>
        <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "370px 25px" }}>
          <circle cx="370" cy="25" r="12" fill="hsl(45, 100%, 65%)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line key={angle} x1={370 + 15 * Math.cos(angle * Math.PI / 180)} y1={25 + 15 * Math.sin(angle * Math.PI / 180)} x2={370 + 19 * Math.cos(angle * Math.PI / 180)} y2={25 + 19 * Math.sin(angle * Math.PI / 180)} stroke="hsl(45, 100%, 65%)" strokeWidth="2" strokeLinecap="round" />
          ))}
        </motion.g>
      </svg>





      <div className="absolute bottom-2 left-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-[10px] font-body font-semibold text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          Walking to Shalimar 🍍
        </span>
      </div>
    </div>
  );
};

export default MapWalkingAnimation;
