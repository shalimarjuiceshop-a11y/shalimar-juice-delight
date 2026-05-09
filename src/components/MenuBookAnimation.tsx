import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { drinks, categories, type DrinkCategory } from "@/data/menuData";

/**
 * Classic auto-flipping mini menu book.
 * On click → opens a full-screen interactive digital book where the user can
 * manually flip pages and read real prices. Close button shrinks it back to its
 * fixed position (using shared layoutId for a smooth morph).
 */

// ---------- Pages built from real menu data ----------
type BookPage = {
  title: string;
  subtitle: string;
  accent: string;
  items: { name: string; price: number }[];
};

const accentByCat: Record<DrinkCategory, string> = {
  shakes: "hsl(45 100% 58%)",
  juices: "hsl(38 95% 55%)",
  dryfruit: "hsl(30 80% 50%)",
};

const buildBookPages = (): BookPage[] =>
  categories.map((c) => ({
    title: c.label.toUpperCase(),
    subtitle: `Starting ${c.price}`,
    accent: accentByCat[c.key],
    items: drinks
      .filter((d) => d.category === c.key)
      .map((d) => ({ name: d.name, price: d.price })),
  }));

const PAGES = buildBookPages();

// Mini auto-flip timing
const FLIP_BURST = 3;
const PAUSE = 5;
const CYCLE = FLIP_BURST + PAUSE;
const PER_PAGE = FLIP_BURST / PAGES.length;

// ---------- Shared SVG defs ----------
const Defs = ({ idPrefix }: { idPrefix: string }) => (
  <defs>
    <linearGradient id={`${idPrefix}_cover`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="hsl(30 35% 18%)" />
      <stop offset="100%" stopColor="hsl(28 30% 10%)" />
    </linearGradient>
    <linearGradient id={`${idPrefix}_page`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(45 60% 96%)" />
      <stop offset="100%" stopColor="hsl(40 45% 88%)" />
    </linearGradient>
    <linearGradient id={`${idPrefix}_shadeR`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="hsl(0 0% 0% / 0.18)" />
      <stop offset="40%" stopColor="hsl(0 0% 0% / 0.04)" />
      <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
    </linearGradient>
    <linearGradient id={`${idPrefix}_shadeL`} x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stopColor="hsl(0 0% 0% / 0.18)" />
      <stop offset="40%" stopColor="hsl(0 0% 0% / 0.04)" />
      <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
    </linearGradient>
    <filter id={`${idPrefix}_shadow`} x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
    </filter>
  </defs>
);

// ---------- Static brand left page (used in both modes) ----------
const BrandLeftPage = ({
  pageGrad,
  shadeL,
}: {
  pageGrad: string;
  shadeL: string;
}) => (
  <g>
    <rect x="28" y="40" width="118" height="170" rx="2" fill={`url(#${pageGrad})`} />
    <rect x="28" y="40" width="118" height="170" fill={`url(#${shadeL})`} />
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
      fontSize="7" fill="hsl(30 30% 30%)" letterSpacing="2">FRESH • DAILY</text>
  </g>
);

// ---------- Cover (book closed) ----------
const BookCover = ({ idPrefix }: { idPrefix: string }) => (
  <g filter={`url(#${idPrefix}_shadow)`}>
    <rect x="20" y="30" width="260" height="190" rx="6" fill={`url(#${idPrefix}_cover)`} />
    <rect x="20" y="30" width="260" height="190" rx="6" fill="none"
      stroke="hsl(45 90% 55%)" strokeWidth="1.2" opacity="0.85" />
    <rect x="148" y="30" width="4" height="190" fill="hsl(45 80% 45%)" opacity="0.8" />
    <path d="M 22 32 L 38 32 L 22 48 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
    <path d="M 278 32 L 262 32 L 278 48 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
    <path d="M 22 218 L 38 218 L 22 202 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
    <path d="M 278 218 L 262 218 L 278 202 Z" fill="hsl(45 95% 58%)" opacity="0.95" />
  </g>
);

// ---------- Right page content (variable item count) ----------
const RightPageContent = ({
  page,
  pageGrad,
  shadeR,
}: {
  page: BookPage;
  pageGrad: string;
  shadeR: string;
}) => {
  // Scale row height to fit any number of items in the same vertical space (40 → 200 = 160px)
  const rows = page.items.length;
  const rowH = Math.min(22, 150 / Math.max(rows, 1));
  return (
    <>
      <rect x="154" y="40" width="118" height="170" rx="2" fill={`url(#${pageGrad})`} />
      <rect x="154" y="40" width="118" height="170" fill={`url(#${shadeR})`} />

      <rect x="160" y="50" width="106" height="22" rx="3" fill={page.accent} opacity="0.95" />
      <text x="213" y="65" textAnchor="middle" fontFamily="DM Sans" fontWeight="900"
        fontSize="11" fill="hsl(30 25% 12%)" letterSpacing="2">{page.title}</text>

      {page.items.map((item, j) => {
        const fontSize = rows > 4 ? 8 : 9;
        const priceSize = rows > 4 ? 9 : 10;
        return (
          <g key={j} transform={`translate(165, ${82 + j * rowH})`}>
            <circle cx="3" cy="6" r="2" fill={page.accent} />
            <text x="10" y="9" fontFamily="DM Sans" fontWeight="700" fontSize={fontSize}
              fill="hsl(30 30% 18%)">{item.name}</text>
            <line x1="10" y1="13" x2="80" y2="13" stroke="hsl(30 20% 75%)" strokeWidth="0.4"
              strokeDasharray="1.5 1.5" />
            <text x="100" y="9" textAnchor="end" fontFamily="DM Sans" fontWeight="900"
              fontSize={priceSize} fill={page.accent}>₹{item.price}</text>
          </g>
        );
      })}

      <text x="213" y="200" textAnchor="middle" fontFamily="DM Sans" fontWeight="700"
        fontSize="6" fill="hsl(30 30% 40%)" letterSpacing="1.5">SHALIMAR JUICE SHOP</text>
    </>
  );
};

// ---------- MINI auto-flipping book (preview, clickable) ----------
const MiniBook = ({ onOpen }: { onOpen: () => void }) => {
  const idPrefix = "mb";
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label="Open interactive menu book"
      className="relative w-[120px] sm:w-[140px] md:w-[160px] aspect-[5/4] select-none shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl group"
      style={{ perspective: "1200px" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
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
        <Defs idPrefix={idPrefix} />
        <BookCover idPrefix={idPrefix} />
        <BrandLeftPage pageGrad={`${idPrefix}_page`} shadeL={`${idPrefix}_shadeL`} />
        <rect x="154" y="40" width="118" height="170" rx="2" fill={`url(#${idPrefix}_page)`} />
        <rect x="154" y="40" width="118" height="170" fill={`url(#${idPrefix}_shadeR)`} />

        {PAGES.map((page, i) => {
          const flipStart = i * PER_PAGE;
          const flipEnd = (i + 1) * PER_PAGE;
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
              }}
            >
              <RightPageContent page={page} pageGrad={`${idPrefix}_page`} shadeR={`${idPrefix}_shadeR`} />
            </motion.g>
          );
        })}

        <line x1="150" y1="40" x2="150" y2="210" stroke="hsl(0 0% 0% / 0.25)" strokeWidth="0.6" />
      </svg>

      {/* "Tap to open" hint */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <BookOpen size={10} /> Tap to open
      </div>
    </motion.button>
  );
};

// ---------- LARGE interactive book (manual flip) ----------
const LargeBook = ({ onClose }: { onClose: () => void }) => {
  const idPrefix = "mbL";
  // pageIndex: 0 = cover/brand spread; 1..PAGES.length = brand+page i (we use a simple right-page advance)
  // For a real book feel: pageIndex = current right-page being shown (0..PAGES.length-1).
  const [pageIndex, setPageIndex] = useState(0);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  const goNext = () => {
    if (flipping || pageIndex >= PAGES.length - 1) return;
    setPendingIndex(pageIndex + 1);
    setFlipping("next");
  };
  const goPrev = () => {
    if (flipping || pageIndex <= 0) return;
    setPendingIndex(pageIndex - 1);
    setFlipping("prev");
  };

  // Esc to close + arrow keys to flip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, flipping]);

  const currentPage = PAGES[pageIndex];
  const nextPage = pendingIndex !== null ? PAGES[pendingIndex] : null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Close button */}
      <motion.button
        onClick={onClose}
        aria-label="Close menu book"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl glow-gold"
      >
        <X size={22} strokeWidth={2.5} />
      </motion.button>

      {/* Page counter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-[110] px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 backdrop-blur-sm"
      >
        <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-primary">
          {pageIndex + 1} / {PAGES.length} • {currentPage.title}
        </span>
      </motion.div>

      {/* Book container */}
      <motion.div
        layoutId="menu-book-shared"
        className="relative w-full max-w-[640px] aspect-[5/4] z-[105]"
        style={{ perspective: "2400px" }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
      >
        <div
          className="absolute -inset-8 rounded-[2rem] blur-3xl opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(45 100% 55% / 0.4), transparent 70%)",
          }}
        />

        <svg
          viewBox="0 0 300 240"
          className="absolute inset-0 w-full h-full drop-shadow-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Defs idPrefix={idPrefix} />
          <BookCover idPrefix={idPrefix} />
          <BrandLeftPage pageGrad={`${idPrefix}_page`} shadeL={`${idPrefix}_shadeL`} />

          {/* Static current right page (sits underneath flipping page) */}
          <g key={`static-${pageIndex}`}>
            <RightPageContent
              page={currentPage}
              pageGrad={`${idPrefix}_page`}
              shadeR={`${idPrefix}_shadeR`}
            />
          </g>

          {/* Animated flipping page on top */}
          <AnimatePresence
            onExitComplete={() => {
              if (pendingIndex !== null) setPageIndex(pendingIndex);
              setPendingIndex(null);
              setFlipping(null);
            }}
          >
            {flipping && nextPage && (
              <motion.g
                key={`flip-${pendingIndex}-${flipping}`}
                style={{ transformOrigin: "154px 125px", transformBox: "fill-box" }}
                initial={{ rotateY: flipping === "next" ? 0 : -178 }}
                animate={{ rotateY: flipping === "next" ? -178 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
              >
                <RightPageContent
                  page={flipping === "next" ? currentPage : nextPage}
                  pageGrad={`${idPrefix}_page`}
                  shadeR={`${idPrefix}_shadeR`}
                />
              </motion.g>
            )}
          </AnimatePresence>

          <line x1="150" y1="40" x2="150" y2="210" stroke="hsl(0 0% 0% / 0.25)" strokeWidth="0.6" />
        </svg>

        {/* Click zones over right page for tap-to-flip */}
        <button
          aria-label="Previous page"
          onClick={goPrev}
          disabled={pageIndex === 0 || !!flipping}
          className="absolute top-[16%] left-[10%] w-[35%] h-[70%] cursor-pointer disabled:cursor-default focus:outline-none"
        />
        <button
          aria-label="Next page"
          onClick={goNext}
          disabled={pageIndex >= PAGES.length - 1 || !!flipping}
          className="absolute top-[16%] right-[10%] w-[35%] h-[70%] cursor-pointer disabled:cursor-default focus:outline-none"
        />
      </motion.div>

      {/* Prev / Next floating arrows */}
      <motion.button
        onClick={goPrev}
        disabled={pageIndex === 0 || !!flipping}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: pageIndex === 0 ? 0.3 : 1, x: 0 }}
        whileHover={pageIndex > 0 ? { scale: 1.1, x: -4 } : {}}
        whileTap={pageIndex > 0 ? { scale: 0.92 } : {}}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-card border border-primary/40 text-primary flex items-center justify-center shadow-xl disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={22} />
      </motion.button>
      <motion.button
        onClick={goNext}
        disabled={pageIndex >= PAGES.length - 1 || !!flipping}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: pageIndex >= PAGES.length - 1 ? 0.3 : 1, x: 0 }}
        whileHover={pageIndex < PAGES.length - 1 ? { scale: 1.1, x: 4 } : {}}
        whileTap={pageIndex < PAGES.length - 1 ? { scale: 0.92 } : {}}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-card border border-primary/40 text-primary flex items-center justify-center shadow-xl disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={22} />
      </motion.button>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] font-body text-xs text-muted-foreground/80 text-center px-4"
      >
        Tap pages or use arrow keys to flip • Esc to close
      </motion.p>
    </motion.div>
  );
};

// ---------- Public component ----------
const MenuBookAnimation = () => {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <MiniBook onOpen={() => setOpen(true)} />
      <AnimatePresence>{open && <LargeBook onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
};

export default MenuBookAnimation;
