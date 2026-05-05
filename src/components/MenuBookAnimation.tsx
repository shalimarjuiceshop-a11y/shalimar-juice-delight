import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium auto-flipping menu book.
 * - Fully responsive (works on mobile and desktop).
 * - Auto-flips every 5 seconds.
 * - Real Shalimar prices: Shakes ₹10, Juices ₹50, Dry Fruit ₹30.
 * - 3 pages, infinite loop with smooth page-curl transition.
 */
const PAGES = [
  {
    title: "SHAKES",
    tagline: "Creamy & Fresh",
    accent: "hsl(15 90% 55%)",
    items: [
      { name: "Pineapple Shake", price: "₹10" },
      { name: "Apple Shake", price: "₹10" },
      { name: "Mango Shake", price: "₹10" },
      { name: "Guava Shake", price: "₹10" },
    ],
  },
  {
    title: "JUICES",
    tagline: "100% Pure Fruit",
    accent: "hsl(45 100% 55%)",
    items: [
      { name: "Pineapple Juice", price: "₹50" },
      { name: "Apple Juice", price: "₹50" },
      { name: "Orange Juice", price: "₹50" },
      { name: "Mosambi Juice", price: "₹50" },
    ],
  },
  {
    title: "DRY FRUIT",
    tagline: "Rich & Premium",
    accent: "hsl(280 55% 60%)",
    items: [
      { name: "Badam Shake", price: "₹30" },
      { name: "Hot Milk Dry Fruit", price: "₹30" },
      { name: "Ice Cream Falooda", price: "₹30" },
      { name: "Ice Cream Lassi", price: "₹30" },
    ],
  },
];

const FLIP_MS = 5000;

const MenuBookAnimation = () => {
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPageIdx((p) => (p + 1) % PAGES.length), FLIP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] mx-auto select-none" aria-label="Auto-flipping menu book">
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(45 100% 55% / 0.35), transparent 70%)" }}
      />

      <svg viewBox="0 0 300 240" className="relative w-full h-auto block drop-shadow-2xl">
        <defs>
          <linearGradient id="bookCover2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(0 75% 38%)" />
            <stop offset="100%" stopColor="hsl(0 80% 26%)" />
          </linearGradient>
          <linearGradient id="pageBase2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 60% 96%)" />
            <stop offset="100%" stopColor="hsl(40 45% 88%)" />
          </linearGradient>
          <linearGradient id="pageShade2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(0 0% 0% / 0.18)" />
            <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
          </linearGradient>
          <filter id="bookShadow2" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Cover */}
        <g filter="url(#bookShadow2)">
          <rect x="20" y="30" width="260" height="190" rx="6" fill="url(#bookCover2)" />
          <rect x="148" y="30" width="4" height="190" fill="hsl(0 70% 18%)" />
          <path d="M 22 32 L 38 32 L 22 48 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
          <path d="M 278 32 L 262 32 L 278 48 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
          <path d="M 22 218 L 38 218 L 22 202 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
          <path d="M 278 218 L 262 218 L 278 202 Z" fill="hsl(45 90% 55%)" opacity="0.85" />
        </g>

        {/* Static pages base */}
        <rect x="28" y="40" width="118" height="170" rx="2" fill="url(#pageBase2)" />
        <rect x="154" y="40" width="118" height="170" rx="2" fill="url(#pageBase2)" />

        {/* Left page (always brand) */}
        <g>
          <text x="87" y="78" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="11"
            fill="hsl(0 75% 40%)" letterSpacing="2.5">SHALIMAR</text>
          <text x="87" y="108" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="20"
            fill="hsl(30 30% 16%)" letterSpacing="3">MENU</text>
          <line x1="55" y1="118" x2="119" y2="118" stroke="hsl(45 80% 45%)" strokeWidth="1.2" />
          {/* pineapple */}
          <g transform="translate(75, 132)">
            <ellipse cx="12" cy="22" rx="11" ry="14" fill="hsl(45 100% 55%)" />
            <path d="M 4 22 L 6 18 M 8 22 L 10 17 M 12 22 L 14 16 M 16 22 L 18 17 M 20 22 L 22 18"
              stroke="hsl(35 80% 35%)" strokeWidth="0.6" />
            <path d="M 8 8 L 10 2 M 12 8 L 12 1 M 16 8 L 14 2"
              stroke="hsl(120 60% 35%)" strokeWidth="2" strokeLinecap="round" />
          </g>
          <text x="87" y="190" textAnchor="middle" fontFamily="DM Sans" fontWeight="700"
            fontSize="6.5" fill="hsl(30 30% 30%)" letterSpacing="2">FRESH • DAILY</text>
        </g>

        {/* Right page (animated) */}
        <AnimatePresence mode="wait">
          <motion.g
            key={pageIdx}
            initial={{ opacity: 0, rotateY: -85 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 85 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "154px 125px", transformBox: "fill-box" }}
          >
            <rect x="154" y="40" width="118" height="170" rx="2" fill="url(#pageBase2)" />
            <rect x="154" y="40" width="118" height="170" fill="url(#pageShade2)" />

            {/* Page header */}
            <rect x="160" y="50" width="106" height="22" rx="3" fill={PAGES[pageIdx].accent} />
            <text x="213" y="65" textAnchor="middle" fontFamily="DM Sans" fontWeight="900"
              fontSize="11" fill="hsl(30 25% 12%)" letterSpacing="2">{PAGES[pageIdx].title}</text>

            <text x="213" y="82" textAnchor="middle" fontFamily="DM Sans" fontWeight="600"
              fontSize="6.5" fill="hsl(30 25% 38%)" letterSpacing="1">{PAGES[pageIdx].tagline}</text>

            {/* Items */}
            {PAGES[pageIdx].items.map((item, j) => (
              <g key={j} transform={`translate(165, ${98 + j * 22})`}>
                <circle cx="3" cy="6" r="2" fill={PAGES[pageIdx].accent} />
                <text x="10" y="9" fontFamily="DM Sans" fontWeight="700" fontSize="8.5"
                  fill="hsl(30 30% 18%)">{item.name}</text>
                <line x1="10" y1="13" x2="86" y2="13" stroke="hsl(30 20% 75%)" strokeWidth="0.4"
                  strokeDasharray="1.5 1.5" />
                <text x="100" y="9" textAnchor="end" fontFamily="DM Sans" fontWeight="900"
                  fontSize="10" fill={PAGES[pageIdx].accent}>{item.price}</text>
              </g>
            ))}

            {/* Page indicator dots */}
            <g transform="translate(213, 198)">
              {PAGES.map((_, i) => (
                <circle key={i} cx={(i - 1) * 8} cy="0" r={i === pageIdx ? 2.2 : 1.4}
                  fill={i === pageIdx ? PAGES[pageIdx].accent : "hsl(30 20% 60%)"} />
              ))}
            </g>
          </motion.g>
        </AnimatePresence>

        <line x1="150" y1="40" x2="150" y2="210" stroke="hsl(0 0% 0% / 0.25)" strokeWidth="0.6" />
      </svg>
    </div>
  );
};

export default MenuBookAnimation;
