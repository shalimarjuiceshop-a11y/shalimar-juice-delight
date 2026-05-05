import { motion } from "framer-motion";

/**
 * Cartoon photographer animation for Gallery page.
 * Photographer arrives on scooter, sets up tripod, takes photo,
 * thumbnail flies up and reveals as the gallery's first photo.
 * Loops forever.
 */
const GalleryPhotographerAnimation = () => {
  return (
    <div
      className="relative w-full max-w-[420px] mx-auto h-[150px] overflow-hidden rounded-2xl border border-primary/25"
      style={{ background: "linear-gradient(180deg, hsl(35 70% 38%) 0%, hsl(30 50% 22%) 100%)" }}
      aria-label="Photographer cartoon animation"
    >
      {/* sun */}
      <div className="absolute top-3 right-6 w-7 h-7 rounded-full"
        style={{ background: "hsl(45 100% 70%)", boxShadow: "0 0 18px hsl(45 100% 60% / 0.7)" }} />

      <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 border border-primary/30 backdrop-blur">
        <motion.span className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />
        Capturing memories
      </div>

      <svg viewBox="0 0 420 150" className="absolute inset-0 w-full h-full">
        {/* ground */}
        <rect x="0" y="125" width="420" height="25" fill="hsl(30 35% 18%)" />
        <line x1="0" y1="125" x2="420" y2="125" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />

        {/* shop background */}
        <rect x="240" y="40" width="160" height="85" fill="hsl(35 40% 25%)" stroke="hsl(45 70% 50%)" strokeWidth="1" />
        <rect x="244" y="44" width="152" height="14" fill="hsl(0 75% 45%)" />
        <text x="320" y="54" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="8" fill="hsl(45 100% 90%)">SHALIMAR JUICE</text>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M ${260 + i * 30} 80 L ${275 + i * 30} 80 L ${273 + i * 30} 110 L ${262 + i * 30} 110 Z`}
            fill={["hsl(45 100% 60%)", "hsl(15 90% 55%)", "hsl(280 50% 60%)", "hsl(120 50% 45%)"][i]} />
        ))}

        {/* Scooter arrival 0-2s */}
        <motion.g
          initial={{ x: -100 }}
          animate={{ x: [-100, 60, 60, 60, 60, -150, -100] }}
          transition={{ duration: 12, repeat: Infinity, times: [0, 0.15, 0.3, 0.7, 0.85, 0.95, 1], ease: "easeInOut" }}>
          {/* scooter */}
          <motion.circle cx="20" cy="115" r="7" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1"
            animate={{ rotate: 360 }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "20px 115px" }} />
          <motion.circle cx="60" cy="115" r="7" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 30%)" strokeWidth="1"
            animate={{ rotate: 360 }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "60px 115px" }} />
          <path d="M 20 110 L 40 95 L 60 110" stroke="hsl(45 100% 55%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="35" y="92" width="14" height="5" rx="2" fill="hsl(30 30% 14%)" />
          {/* photographer body */}
          <rect x="32" y="68" width="20" height="26" rx="4" fill="hsl(220 60% 35%)" />
          <circle cx="42" cy="60" r="7" fill="hsl(30 55% 76%)" />
          <path d="M 35 58 Q 35 50 42 50 Q 49 50 49 58 L 49 60 L 35 60 Z" fill="hsl(0 0% 15%)" />
          <circle cx="40" cy="62" r="0.9" fill="hsl(0 0% 10%)" />
          <circle cx="44" cy="62" r="0.9" fill="hsl(0 0% 10%)" />
          {/* camera bag */}
          <rect x="48" y="74" width="10" height="10" rx="1.5" fill="hsl(0 0% 15%)" />
          <circle cx="53" cy="79" r="2.5" fill="hsl(45 100% 60%)" />
        </motion.g>

        {/* Setup phase: tripod + camera (appears 2-7s) */}
        <motion.g
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, times: [0, 0.18, 0.25, 0.7, 0.78, 1] }}>
          {/* tripod */}
          <line x1="120" y1="125" x2="105" y2="95" stroke="hsl(0 0% 25%)" strokeWidth="2" />
          <line x1="120" y1="125" x2="135" y2="95" stroke="hsl(0 0% 25%)" strokeWidth="2" />
          <line x1="120" y1="125" x2="120" y2="95" stroke="hsl(0 0% 25%)" strokeWidth="2" />
          {/* camera */}
          <rect x="105" y="78" width="32" height="20" rx="2" fill="hsl(0 0% 12%)" stroke="hsl(45 100% 60%)" strokeWidth="1" />
          <circle cx="121" cy="88" r="6" fill="hsl(0 0% 5%)" stroke="hsl(0 0% 50%)" strokeWidth="1.5" />
          <circle cx="121" cy="88" r="3" fill="hsl(200 60% 30%)" />
          {/* photographer behind */}
          <g transform="translate(140, 80)">
            <circle cx="6" cy="0" r="6" fill="hsl(30 55% 76%)" />
            <path d="M 0 -2 Q 0 -10 6 -10 Q 12 -10 12 -2 L 0 -2 Z" fill="hsl(0 0% 15%)" />
            <rect x="0" y="6" width="12" height="20" rx="3" fill="hsl(220 60% 35%)" />
          </g>
          {/* FLASH */}
          <motion.circle cx="121" cy="88" r="20" fill="hsl(0 0% 100%)"
            animate={{ opacity: [0, 0, 0, 0, 0.9, 0, 0] }}
            transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.45, 0.5, 0.52, 0.6, 1] }} />
        </motion.g>

        {/* Glass on table being shot */}
        <g transform="translate(180, 100)">
          <rect x="-10" y="22" width="40" height="3" fill="hsl(30 30% 18%)" />
          <path d="M 4 0 L 16 0 L 14 22 L 6 22 Z" fill="hsl(45 100% 60%)" stroke="hsl(0 0% 95%)" strokeWidth="0.6" />
        </g>

        {/* Photo thumbnail flies up to gallery */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 0, 0, 0, 1, 1, 0],
            x: [121, 121, 121, 121, 121, 200, 360, 360],
            y: [88, 88, 88, 88, 88, 80, 50, 50],
            scale: [1, 1, 1, 1, 1, 1.5, 2.5, 2.5],
          }}
          transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.5, 0.55, 0.6, 0.7, 0.85, 1] }}>
          <rect x="-12" y="-9" width="24" height="18" fill="hsl(45 100% 60%)" stroke="hsl(0 0% 95%)" strokeWidth="1" />
        </motion.g>

        {/* Thumbs up */}
        <motion.g
          animate={{ opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity, times: [0, 0.5, 0.75, 0.78, 0.8, 0.82, 0.85, 0.95, 1] }}>
          <text x="155" y="74" fontSize="20">👍</text>
        </motion.g>
      </svg>
    </div>
  );
};

export default GalleryPhotographerAnimation;
