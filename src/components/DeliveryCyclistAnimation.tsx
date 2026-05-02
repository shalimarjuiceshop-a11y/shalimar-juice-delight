import { motion } from "framer-motion";

/**
 * Professional SVG delivery cyclist animation.
 * Hand-crafted vector art (no AI imagery) — wheels spin, legs pedal,
 * cyclist gently bobs, scenery scrolls behind to suggest motion.
 * Designed to live as a slim "delivery banner" strip above the
 * Parties Order section header.
 */
const DeliveryCyclistAnimation = () => {
  return (
    <div className="relative w-full h-[140px] md:h-[180px] overflow-hidden rounded-2xl border border-primary/15"
         style={{ background: "linear-gradient(180deg, hsl(38 55% 16%) 0%, hsl(30 18% 12%) 100%)" }}>
      {/* Sun / warm glow */}
      <div className="absolute top-3 right-8 w-12 h-12 rounded-full blur-2xl opacity-60"
           style={{ background: "hsl(45 100% 60%)" }} />
      <div className="absolute top-4 right-10 w-7 h-7 rounded-full"
           style={{ background: "hsl(45 100% 70%)", boxShadow: "0 0 24px hsl(45 100% 60% / 0.6)" }} />

      {/* Scrolling skyline (parallax — distant) */}
      <motion.div
        className="absolute bottom-[42px] left-0 flex items-end gap-6 opacity-30"
        animate={{ x: [0, -400] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="w-8 h-10 rounded-t-sm" style={{ background: "hsl(38 25% 25%)" }} />
            <div className="w-6 h-14 rounded-t-sm" style={{ background: "hsl(38 25% 22%)" }} />
            <div className="w-10 h-8 rounded-t-md" style={{ background: "hsl(38 25% 28%)" }} />
            <div className="w-5 h-12 rounded-t-sm" style={{ background: "hsl(38 25% 24%)" }} />
          </div>
        ))}
      </motion.div>

      {/* Scrolling palm/tree silhouettes (mid layer) */}
      <motion.div
        className="absolute bottom-[40px] left-0 flex items-end gap-16 opacity-50"
        animate={{ x: [0, -600] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <svg key={i} width="34" height="46" viewBox="0 0 34 46" className="shrink-0">
            <rect x="15" y="20" width="4" height="26" fill="hsl(30 30% 18%)" rx="2" />
            <ellipse cx="17" cy="18" rx="14" ry="6" fill="hsl(120 35% 28%)" />
            <ellipse cx="11" cy="14" rx="8" ry="4" fill="hsl(120 40% 32%)" />
            <ellipse cx="23" cy="14" rx="8" ry="4" fill="hsl(120 40% 32%)" />
          </svg>
        ))}
      </motion.div>

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px]"
           style={{ background: "linear-gradient(180deg, hsl(30 20% 20%) 0%, hsl(30 20% 14%) 100%)" }} />

      {/* Road dashed center line — scrolls fast */}
      <motion.div
        className="absolute bottom-[18px] left-0 flex gap-5"
        animate={{ x: [0, -80] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="w-10 h-[3px] rounded-full shrink-0"
               style={{ background: "hsl(45 90% 60% / 0.7)" }} />
        ))}
      </motion.div>

      {/* CYCLIST — fixed horizontally, gently bobs vertically */}
      <motion.div
        className="absolute bottom-[28px] left-1/2 -translate-x-1/2"
        animate={{ y: [0, -2, 0, -1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="180" height="120" viewBox="0 0 180 120">
          <defs>
            <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(45 100% 60%)" />
              <stop offset="100%" stopColor="hsl(35 90% 45%)" />
            </linearGradient>
            <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="0">
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
              {/* spokes */}
              {[0, 30, 60, 90, 120, 150].map((a) => (
                <line key={a} x1="0" y1="0"
                      x2={18 * Math.cos((a * Math.PI) / 180)}
                      y2={18 * Math.sin((a * Math.PI) / 180)}
                      stroke="hsl(45 30% 70%)" strokeWidth="0.8" />
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
                <line key={a} x1="0" y1="0"
                      x2={18 * Math.cos((a * Math.PI) / 180)}
                      y2={18 * Math.sin((a * Math.PI) / 180)}
                      stroke="hsl(45 30% 70%)" strokeWidth="0.8" />
              ))}
              <circle r="2.5" fill="hsl(45 80% 60%)" />
            </motion.g>
          </g>

          {/* Bicycle frame */}
          {/* down tube */}
          <line x1="40" y1="90" x2="85" y2="62" stroke="url(#frameGrad)" strokeWidth="3.5" strokeLinecap="round" />
          {/* seat tube */}
          <line x1="85" y1="62" x2="78" y2="78" stroke="url(#frameGrad)" strokeWidth="3.5" strokeLinecap="round" />
          {/* chain stay */}
          <line x1="78" y1="78" x2="40" y2="90" stroke="url(#frameGrad)" strokeWidth="3" strokeLinecap="round" />
          {/* top tube */}
          <line x1="85" y1="62" x2="115" y2="58" stroke="url(#frameGrad)" strokeWidth="3.5" strokeLinecap="round" />
          {/* fork */}
          <line x1="115" y1="58" x2="130" y2="90" stroke="url(#frameGrad)" strokeWidth="3.5" strokeLinecap="round" />
          {/* handlebar */}
          <line x1="115" y1="58" x2="120" y2="48" stroke="hsl(30 15% 12%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="120" y1="48" x2="128" y2="50" stroke="hsl(30 15% 12%)" strokeWidth="2.5" strokeLinecap="round" />
          {/* seat */}
          <ellipse cx="83" cy="59" rx="6" ry="2" fill="hsl(30 15% 10%)" />

          {/* Pedal crank — rotates */}
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

          {/* RIDER */}
          {/* Body / torso — slight forward lean */}
          <path d="M 88 56 Q 96 42 110 50" stroke="hsl(220 60% 45%)" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Arm to handlebar */}
          <line x1="108" y1="50" x2="118" y2="50" stroke="hsl(28 60% 65%)" strokeWidth="3" strokeLinecap="round" />
          {/* Front leg — pedaling (subtle bob) */}
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

          {/* Head */}
          <circle cx="92" cy="36" r="6" fill="hsl(28 60% 65%)" />
          {/* Helmet */}
          <path d="M 86 35 Q 92 26 98 35 L 98 36 L 86 36 Z" fill="hsl(45 100% 50%)" stroke="hsl(35 90% 40%)" strokeWidth="0.8" />
          <line x1="86" y1="35" x2="98" y2="35" stroke="hsl(30 15% 10%)" strokeWidth="0.8" />

          {/* DELIVERY BOX on back rack */}
          <g transform="translate(48, 50)">
            {/* shadow */}
            <rect x="1" y="1" width="34" height="22" rx="2" fill="hsl(30 15% 6% / 0.5)" />
            {/* box */}
            <rect x="0" y="0" width="34" height="22" rx="2" fill="url(#boxGrad)" stroke="hsl(35 80% 35%)" strokeWidth="0.8" />
            {/* tape */}
            <line x1="17" y1="0" x2="17" y2="22" stroke="hsl(35 80% 35%)" strokeWidth="0.6" />
            <line x1="0" y1="11" x2="34" y2="11" stroke="hsl(35 80% 35%)" strokeWidth="0.6" />
            {/* SJS label */}
            <rect x="6" y="6" width="22" height="10" rx="1" fill="hsl(45 100% 96%)" />
            <text x="17" y="13.5" textAnchor="middle"
                  fontSize="7" fontWeight="800" fill="hsl(35 90% 35%)"
                  fontFamily="'DM Sans', system-ui, sans-serif">
              SHALIMAR
            </text>
          </g>

          {/* Box strap to bike */}
          <line x1="48" y1="72" x2="50" y2="78" stroke="hsl(30 15% 8%)" strokeWidth="1" />
          <line x1="80" y1="72" x2="78" y2="78" stroke="hsl(30 15% 8%)" strokeWidth="1" />

          {/* Motion lines behind cyclist */}
          <motion.g
            animate={{ opacity: [0.7, 0.2, 0.7], x: [0, -4, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="18" y1="55" x2="32" y2="55" stroke="hsl(45 90% 70%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="14" y1="65" x2="30" y2="65" stroke="hsl(45 90% 70%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
            <line x1="20" y1="75" x2="34" y2="75" stroke="hsl(45 90% 70%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          </motion.g>

          {/* Dust puffs near rear wheel */}
          <motion.g
            animate={{ opacity: [0, 0.5, 0], scale: [0.6, 1.1, 1.3], x: [0, -8, -16] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
          >
            <circle cx="22" cy="105" r="3" fill="hsl(45 30% 55% / 0.6)" />
            <circle cx="16" cy="103" r="2" fill="hsl(45 30% 55% / 0.5)" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Foreground caption pill */}
      <div className="absolute top-3 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border border-primary/30"
           style={{ background: "hsl(30 15% 8% / 0.6)" }}>
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase"
              style={{ color: "hsl(45 90% 75%)" }}>
          On-the-way • Fresh Delivery
        </span>
      </div>
    </div>
  );
};

export default DeliveryCyclistAnimation;
