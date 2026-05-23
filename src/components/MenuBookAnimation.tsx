import { motion } from "framer-motion";

/**
 * Auto-flipping menu book where the ENTIRE spread changes per flip.
 * Each flipping sheet covers both pages, so users clearly see the whole page change.
 */
const PAGES = [
  {
    title: "FRESH JUICES",
    tagline: "Daily Pressed",
    items: [
      { name: "Pineapple", price: "₹10" },
      { name: "Orange", price: "₹10" },
      { name: "Apple", price: "₹10" },
      { name: "Mosambi", price: "₹10" },
    ],
    accent: "hsl(45 100% 58%)",
    icon: "🍍",
  },
  {
    title: "CREAMY SHAKES",
    tagline: "Thick & Rich",
    items: [
      { name: "Mango", price: "₹20" },
      { name: "Banana", price: "₹20" },
      { name: "Strawberry", price: "₹20" },
      { name: "Chocolate", price: "₹20" },
    ],
    accent: "hsl(38 95% 55%)",
    icon: "🥤",
  },
  {
    title: "DRY FRUIT SPECIAL",
    tagline: "Energy Packed",
    items: [
      { name: "Almond", price: "₹30" },
      { name: "Pista", price: "₹30" },
      { name: "Kaju", price: "₹30" },
      { name: "Mixed", price: "₹30" },
    ],
    accent: "hsl(30 80% 50%)",
    icon: "🥜",
  },
];

const FLIP_DURATION = 1.4;
const HOLD = 2.2;
const CYCLE_PER_PAGE = FLIP_DURATION + HOLD;
const TOTAL_CYCLE = CYCLE_PER_PAGE * PAGES.length;

const MenuBookAnimation = () => {
  return (
    <div
      className="relative w-[120px] sm:w-[140px] md:w-[160px] aspect-[5/4] select-none shrink-0"
      aria-label="Auto-flipping menu book"
      style={{ perspective: "1400px" }}
    >
      <div
        className="absolute -inset-3 rounded-2xl blur-2xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(45 100% 55% / 0.4), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 300 240"
        className="absolute inset-0 w-full h-full drop-shadow-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          <linearGradient id="mb_cover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(30 35% 18%)" />
            <stop offset="100%" stopColor="hsl(28 30% 10%)" />
          </linearGradient>
          <linearGradient id="mb_page" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 60% 96%)" />
            <stop offset="100%" stopColor="hsl(40 45% 88%)" />
          </linearGradient>
          <linearGradient id="mb_shadeR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(0 0% 0% / 0.22)" />
            <stop offset="50%" stopColor="hsl(0 0% 0% / 0.04)" />
            <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
          </linearGradient>
          <filter id="mb_shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Cover */}
        <g filter="url(#mb_shadow)">
          <rect x="20" y="30" width="260" height="190" rx="6" fill="url(#mb_cover)" />
          <rect x="20" y="30" width="260" height="190" rx="6" fill="none"
            stroke="hsl(45 90% 55%)" strokeWidth="1.2" opacity="0.85" />
          <path d="M 22 32 L 38 32 L 22 48 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
          <path d="M 278 32 L 262 32 L 278 48 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
          <path d="M 22 218 L 38 218 L 22 202 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
          <path d="M 278 218 L 262 218 L 278 202 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
        </g>

        {/* Base full spread */}
        <rect x="28" y="40" width="244" height="170" rx="2" fill="url(#mb_page)" />

        {/* Flipping full spreads — entire page changes */}
        {PAGES.map((page, i) => {
          const flipStart = i * CYCLE_PER_PAGE;
          const flipMid = flipStart + FLIP_DURATION / 2;
          const flipEnd = flipStart + FLIP_DURATION;
          const t1 = flipStart / TOTAL_CYCLE;
          const t2 = flipMid / TOTAL_CYCLE;
          const t3 = flipEnd / TOTAL_CYCLE;
          return (
            <motion.g
              key={i}
              style={{ transformOrigin: "150px 125px", transformBox: "fill-box" }}
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: [0, 0, -90, -180, -180],
                opacity: [1, 1, 1, 0, 0],
              }}
              transition={{
                duration: TOTAL_CYCLE,
                times: [0, t1, t2, t3, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Full spread page */}
              <rect x="28" y="40" width="244" height="170" rx="2" fill="url(#mb_page)" />

              {/* Decorative left half */}
              <g>
                <rect x="34" y="50" width="106" height="34" rx="4" fill={page.accent} opacity="0.95" />
                <text x="87" y="68" textAnchor="middle" fontFamily="DM Sans" fontWeight="900"
                  fontSize="9" fill="hsl(30 25% 12%)" letterSpacing="1.5">{page.tagline}</text>
                <text x="87" y="80" textAnchor="middle" fontFamily="DM Sans" fontWeight="900"
                  fontSize="7" fill="hsl(30 25% 12%)" letterSpacing="2">SHALIMAR</text>
                <text x="87" y="130" textAnchor="middle" fontSize="44">{page.icon}</text>
                <line x1="50" y1="155" x2="124" y2="155" stroke={page.accent} strokeWidth="1.5" />
                <text x="87" y="175" textAnchor="middle" fontFamily="DM Sans" fontWeight="700"
                  fontSize="7" fill="hsl(30 30% 30%)" letterSpacing="1.5">SINCE 1985</text>
                <text x="87" y="195" textAnchor="middle" fontFamily="DM Sans" fontWeight="800"
                  fontSize="6" fill={page.accent} letterSpacing="2">FRESH • PURE</text>
              </g>

              {/* Right half — menu list */}
              <g>
                <rect x="160" y="50" width="106" height="22" rx="3" fill={page.accent} opacity="0.95" />
                <text x="213" y="65" textAnchor="middle" fontFamily="DM Sans" fontWeight="900"
                  fontSize="9" fill="hsl(30 25% 12%)" letterSpacing="1.5">{page.title}</text>

                {page.items.map((item, j) => (
                  <g key={j} transform={`translate(165, ${88 + j * 22})`}>
                    <circle cx="3" cy="6" r="2" fill={page.accent} />
                    <text x="10" y="9" fontFamily="DM Sans" fontWeight="700" fontSize="9"
                      fill="hsl(30 30% 18%)">{item.name}</text>
                    <line x1="10" y1="13" x2="86" y2="13" stroke="hsl(30 20% 75%)" strokeWidth="0.4"
                      strokeDasharray="1.5 1.5" />
                    <text x="100" y="9" textAnchor="end" fontFamily="DM Sans" fontWeight="900"
                      fontSize="10" fill={page.accent}>{item.price}</text>
                  </g>
                ))}
              </g>

              {/* Page fold shading on flip */}
              <rect x="150" y="40" width="122" height="170" fill="url(#mb_shadeR)" />
            </motion.g>
          );
        })}

        {/* Center spine */}
        <line x1="150" y1="40" x2="150" y2="210" stroke="hsl(0 0% 0% / 0.3)" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

export default MenuBookAnimation;
