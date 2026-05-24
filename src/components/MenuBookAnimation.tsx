import { motion } from "framer-motion";

/**
 * Compact, classic auto-flipping menu book.
 * Cycle: 3 page flips over 3s → pause 5s → repeat.
 * Brand-matched warm charcoal + amber/gold palette.
 */
const PAGES = [
  {
    title: "JUICES",
    items: [
      { name: "Pineapple", price: "₹10" },
      { name: "Orange", price: "₹10" },
      { name: "Apple", price: "₹10" },
      { name: "Mosambi", price: "₹10" },
    ],
    accent: "hsl(45 100% 58%)",
  },
  {
    title: "SHAKES",
    items: [
      { name: "Mango", price: "₹20" },
      { name: "Banana", price: "₹20" },
      { name: "Strawberry", price: "₹20" },
      { name: "Chocolate", price: "₹20" },
    ],
    accent: "hsl(38 95% 55%)",
  },
  {
    title: "DRY FRUIT",
    items: [
      { name: "Almond", price: "₹30" },
      { name: "Pista", price: "₹30" },
      { name: "Kaju", price: "₹30" },
      { name: "Mixed", price: "₹30" },
    ],
    accent: "hsl(30 80% 50%)",
  },
];

const FLIP_BURST = 3;   // total seconds for all flips
const PAUSE = 5;        // idle seconds between bursts
const CYCLE = FLIP_BURST + PAUSE;
const PER_PAGE = FLIP_BURST / PAGES.length; // 1s per page

const MenuBookAnimation = () => {
  return (
    <div
      className="relative w-[120px] sm:w-[140px] md:w-[160px] aspect-[5/4] select-none shrink-0"
      aria-label="Auto-flipping mini menu book"
      style={{ perspective: "1200px" }}
    >
      <div
        className="absolute -inset-3 rounded-2xl blur-2xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(45 100% 55% / 0.35), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 300 240"
        className="absolute inset-0 w-full h-full drop-shadow-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          {/* Warm charcoal cover with amber edge — matches site theme */}
          <linearGradient id="mb_cover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(30 35% 18%)" />
            <stop offset="100%" stopColor="hsl(28 30% 10%)" />
          </linearGradient>
          <linearGradient id="mb_page" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 60% 96%)" />
            <stop offset="100%" stopColor="hsl(40 45% 88%)" />
          </linearGradient>
          <linearGradient id="mb_shadeR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(0 0% 0% / 0.18)" />
            <stop offset="40%" stopColor="hsl(0 0% 0% / 0.04)" />
            <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
          </linearGradient>
          <linearGradient id="mb_shadeL" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="hsl(0 0% 0% / 0.18)" />
            <stop offset="40%" stopColor="hsl(0 0% 0% / 0.04)" />
            <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
          </linearGradient>
          <filter id="mb_shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Cover */}
        <g filter="url(#mb_shadow)">
          <rect x="20" y="30" width="260" height="190" rx="6" fill="url(#mb_cover)" />
          {/* gold trim */}
          <rect x="20" y="30" width="260" height="190" rx="6" fill="none"
            stroke="hsl(45 90% 55%)" strokeWidth="1.2" opacity="0.85" />
          <rect x="148" y="30" width="4" height="190" fill="hsl(45 80% 45%)" opacity="0.8" />
          {/* gold corners */}
          <path d="M 22 32 L 38 32 L 22 48 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
          <path d="M 278 32 L 262 32 L 278 48 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
          <path d="M 22 218 L 38 218 L 22 202 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
          <path d="M 278 218 L 262 218 L 278 202 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
        </g>

        {/* Static base pages */}
        <rect x="28" y="40" width="118" height="170" rx="2" fill="url(#mb_page)" />
        <rect x="154" y="40" width="118" height="170" rx="2" fill="url(#mb_page)" />
        <rect x="28" y="40" width="118" height="170" fill="url(#mb_shadeL)" />
        <rect x="154" y="40" width="118" height="170" fill="url(#mb_shadeR)" />

        {/* Static left brand page */}
        <g>
          <text x="87" y="78" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="11"
            fill="hsl(30 60% 35%)" letterSpacing="2.5">SHALIMAR</text>
          <text x="87" y="112" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="22"
            fill="hsl(30 30% 16%)" letterSpacing="3">MENU</text>
          <line x1="55" y1="122" x2="119" y2="122" stroke="hsl(45 80% 45%)" strokeWidth="1.2" />
          <g transform="translate(75, 138)">
            <ellipse cx="12" cy="22" rx="11" ry="14" fill="hsl(45 100% 55%)" />
            <path d="M 4 22 L 6 18 M 8 22 L 10 17 M 12 22 L 14 16 M 16 22 L 18 17 M 20 22 L 22 18"
              stroke="hsl(35 80% 35%)" strokeWidth="0.6" />
            <path d="M 8 8 L 10 2 M 12 8 L 12 1 M 16 8 L 14 2"
              stroke="hsl(120 60% 35%)" strokeWidth="2" strokeLinecap="round" />
          </g>
          <text x="87" y="195" textAnchor="middle" fontFamily="DM Sans" fontWeight="700"
            fontSize="7" fill="hsl(30 30% 30%)" letterSpacing="2">FRESH • DAILY • ₹10</text>
        </g>

        {/* Flipping pages — burst then pause */}
        {PAGES.map((page, i) => {
          const flipStart = i * PER_PAGE;       // when this page begins flipping (sec)
          const flipEnd = (i + 1) * PER_PAGE;   // when flip completes
          const t1 = flipStart / CYCLE;
          const t2 = flipEnd / CYCLE;
          return (
            <motion.g
              key={i}
              style={{ transformOrigin: "154px 125px", transformBox: "fill-box" }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: [0, 0, -178, -178, 0] }}
              transition={{
                duration: CYCLE,
                times: [0, t1, t2, 0.999, 1],
                repeat: Infinity,
                ease: "easeInOut",
                // stagger so pages flip sequentially within the burst
                delay: -i * PER_PAGE + CYCLE * (PAGES.length - 1 - i) / PAGES.length === 0 ? 0 : 0,
              }}
            >
              <rect x="154" y="40" width="118" height="170" rx="2" fill="url(#mb_page)" />
              <rect x="154" y="40" width="118" height="170" fill="url(#mb_shadeR)" />

              <rect x="160" y="50" width="106" height="22" rx="3" fill={page.accent} opacity="0.95" />
              <text x="213" y="65" textAnchor="middle" fontFamily="DM Sans" fontWeight="900"
                fontSize="11" fill="hsl(30 25% 12%)" letterSpacing="2">{page.title}</text>

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

              <text x="213" y="200" textAnchor="middle" fontFamily="DM Sans" fontWeight="700"
                fontSize="6" fill="hsl(30 30% 40%)" letterSpacing="1.5">SHALIMAR JUICE SHOP</text>
            </motion.g>
          );
        })}

        <line x1="150" y1="40" x2="150" y2="210" stroke="hsl(0 0% 0% / 0.25)" strokeWidth="0.6" />
      </svg>
    </div>
  );
};

export default MenuBookAnimation;
