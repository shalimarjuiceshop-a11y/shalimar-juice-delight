import { motion } from "framer-motion";

/**
 * Premium auto-flipping menu book animation.
 * Small, elegant, sits beside the "Our Menu" heading.
 * Pages turn automatically in a continuous loop, revealing different drinks.
 * Pure SVG + Framer Motion. Loops forever.
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
    accent: "hsl(45 100% 55%)",
  },
  {
    title: "SHAKES",
    items: [
      { name: "Mango", price: "₹20" },
      { name: "Banana", price: "₹20" },
      { name: "Strawberry", price: "₹20" },
      { name: "Chocolate", price: "₹20" },
    ],
    accent: "hsl(15 90% 55%)",
  },
  {
    title: "DRY FRUIT",
    items: [
      { name: "Almond", price: "₹30" },
      { name: "Pista", price: "₹30" },
      { name: "Kaju", price: "₹30" },
      { name: "Mixed", price: "₹30" },
    ],
    accent: "hsl(280 55% 60%)",
  },
  {
    title: "SPECIAL",
    items: [
      { name: "Pineapple Mix", price: "₹15" },
      { name: "Apple Cooler", price: "₹15" },
      { name: "Fruit Punch", price: "₹20" },
      { name: "Tropical", price: "₹25" },
    ],
    accent: "hsl(120 55% 45%)",
  },
];

const FLIP_DURATION = 3.2; // seconds per page

const MenuBookAnimation = () => {
  return (
    <div
      className="relative w-full max-w-[300px] mx-auto aspect-[5/4] select-none"
      aria-label="Auto-flipping menu book"
      style={{ perspective: "1400px" }}
    >
      {/* Soft glow under book */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(45 100% 55% / 0.35), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 300 240"
        className="absolute inset-0 w-full h-full drop-shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(0 75% 38%)" />
            <stop offset="100%" stopColor="hsl(0 80% 26%)" />
          </linearGradient>
          <linearGradient id="pageBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 60% 96%)" />
            <stop offset="100%" stopColor="hsl(40 45% 88%)" />
          </linearGradient>
          <linearGradient id="pageShade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(0 0% 0% / 0.18)" />
            <stop offset="40%" stopColor="hsl(0 0% 0% / 0.04)" />
            <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
          </linearGradient>
          <linearGradient id="leftPageShade" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="hsl(0 0% 0% / 0.18)" />
            <stop offset="40%" stopColor="hsl(0 0% 0% / 0.04)" />
            <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
          </linearGradient>
          <filter id="bookShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* ===== Book outer cover (back) ===== */}
        <g filter="url(#bookShadow)">
          <rect x="20" y="30" width="260" height="190" rx="6" fill="url(#bookCover)" />
          {/* spine */}
          <rect x="148" y="30" width="4" height="190" fill="hsl(0 70% 18%)" />
          {/* gold corners */}
          <path d="M 22 32 L 38 32 L 22 48 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
          <path d="M 278 32 L 262 32 L 278 48 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
          <path d="M 22 218 L 38 218 L 22 202 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
          <path d="M 278 218 L 262 218 L 278 202 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
        </g>

        {/* ===== Static page base (always visible underneath) ===== */}
        <rect x="28" y="40" width="118" height="170" rx="2" fill="url(#pageBase)" />
        <rect x="154" y="40" width="118" height="170" rx="2" fill="url(#pageBase)" />
        {/* page edge shading */}
        <rect x="28" y="40" width="118" height="170" fill="url(#leftPageShade)" />
        <rect x="154" y="40" width="118" height="170" fill="url(#pageShade)" />

        {/* ===== Static "MENU" branding on left page (always shown) ===== */}
        <g>
          <text
            x="87"
            y="80"
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontWeight="900"
            fontSize="11"
            fill="hsl(0 75% 40%)"
            letterSpacing="2.5"
          >
            SHALIMAR
          </text>
          <text
            x="87"
            y="112"
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontWeight="900"
            fontSize="22"
            fill="hsl(30 30% 16%)"
            letterSpacing="3"
          >
            MENU
          </text>
          <line x1="55" y1="122" x2="119" y2="122" stroke="hsl(45 80% 45%)" strokeWidth="1.2" />
          {/* tiny pineapple icon */}
          <g transform="translate(75, 138)">
            <ellipse cx="12" cy="22" rx="11" ry="14" fill="hsl(45 100% 55%)" />
            <path d="M 4 22 L 6 18 M 8 22 L 10 17 M 12 22 L 14 16 M 16 22 L 18 17 M 20 22 L 22 18"
              stroke="hsl(35 80% 35%)" strokeWidth="0.6" />
            <path d="M 8 8 L 10 2 M 12 8 L 12 1 M 16 8 L 14 2"
              stroke="hsl(120 60% 35%)" strokeWidth="2" strokeLinecap="round" />
          </g>
          <text x="87" y="195" textAnchor="middle" fontFamily="DM Sans" fontWeight="700"
            fontSize="7" fill="hsl(30 30% 30%)" letterSpacing="2">
            FRESH • DAILY • ₹10
          </text>
        </g>

        {/* ===== Right side: auto-flipping pages ===== */}
        {PAGES.map((page, i) => (
          <motion.g
            key={i}
            style={{ transformOrigin: "154px 125px", transformBox: "fill-box" }}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: [0, 0, -175, -175],
            }}
            transition={{
              duration: PAGES.length * FLIP_DURATION,
              times: [
                (i * FLIP_DURATION) / (PAGES.length * FLIP_DURATION),
                ((i + 0.85) * FLIP_DURATION) / (PAGES.length * FLIP_DURATION),
                ((i + 1) * FLIP_DURATION) / (PAGES.length * FLIP_DURATION),
                1,
              ],
              repeat: Infinity,
              ease: "easeInOut",
              delay: -i * FLIP_DURATION + PAGES.length * FLIP_DURATION,
            }}
          >
            <rect x="154" y="40" width="118" height="170" rx="2" fill="url(#pageBase)" />
            <rect x="154" y="40" width="118" height="170" fill="url(#pageShade)" />

            {/* Page header with accent */}
            <rect x="160" y="50" width="106" height="22" rx="3" fill={page.accent} opacity="0.95" />
            <text
              x="213"
              y="65"
              textAnchor="middle"
              fontFamily="DM Sans"
              fontWeight="900"
              fontSize="11"
              fill="hsl(30 25% 12%)"
              letterSpacing="2"
            >
              {page.title}
            </text>

            {/* Items */}
            {page.items.map((item, j) => (
              <g key={j} transform={`translate(165, ${88 + j * 22})`}>
                <circle cx="3" cy="6" r="2" fill={page.accent} />
                <text x="10" y="9" fontFamily="DM Sans" fontWeight="700" fontSize="9"
                  fill="hsl(30 30% 18%)">
                  {item.name}
                </text>
                <line x1="10" y1="13" x2="86" y2="13" stroke="hsl(30 20% 75%)" strokeWidth="0.4"
                  strokeDasharray="1.5 1.5" />
                <text x="100" y="9" textAnchor="end" fontFamily="DM Sans" fontWeight="900"
                  fontSize="10" fill={page.accent}>
                  {item.price}
                </text>
              </g>
            ))}

            {/* Page footer */}
            <text x="213" y="200" textAnchor="middle" fontFamily="DM Sans" fontWeight="700"
              fontSize="6" fill="hsl(30 30% 40%)" letterSpacing="1.5">
              SHALIMAR JUICE SHOP
            </text>
          </motion.g>
        ))}

        {/* Spine highlight */}
        <line x1="150" y1="40" x2="150" y2="210" stroke="hsl(0 0% 0% / 0.25)" strokeWidth="0.6" />
      </svg>
    </div>
  );
};

export default MenuBookAnimation;
