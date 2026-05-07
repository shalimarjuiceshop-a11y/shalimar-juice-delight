import { motion } from "framer-motion";

/**
 * Cinematic party-order banner: a tall premium glass slowly fills
 * with milk while real-looking dry fruits (almonds, pistachios, cashews,
 * saffron strands) drift down and settle inside.
 *
 * Realistic SVG shading — not cartoonish. Pure SVG + Framer Motion.
 * Glass shape is preserved across the animation (only contents update).
 */
const PartyJuiceGlassAnimation = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-primary/25 shadow-2xl"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, hsl(40 50% 22%) 0%, hsl(30 25% 10%) 60%, hsl(28 30% 6%) 100%)",
      }}
    >
      {/* Soft grain overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative grid md:grid-cols-2 gap-6 items-center px-6 md:px-10 py-8 md:py-10">
        {/* ============ LEFT: Copy ============ */}
        <div className="text-center md:text-left order-2 md:order-1">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/40"
            style={{ background: "hsl(45 100% 51% / 0.1)", color: "hsl(45 100% 78%)" }}
          >
            ✦ Premium Crafted
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl font-black mt-3 leading-tight"
            style={{ color: "hsl(45 100% 96%)" }}
          >
            Book a <span className="text-gradient-gold">Juice Glass</span>
            <br className="hidden md:block" /> for Your Party
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-sm md:text-base mt-3 max-w-md mx-auto md:mx-0 leading-relaxed"
            style={{ color: "hsl(45 30% 75%)" }}
          >
            Real almonds, pistachios, cashews & saffron — slow-poured into every glass. Live counter setup at your venue.
          </motion.p>
        </div>

        {/* ============ RIGHT: Glass scene ============ */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-[220px] h-[300px] md:w-[260px] md:h-[340px]">
            {/* Falling dry fruits BEHIND glass for depth */}
            <FallingFruitsField />

            <svg
              viewBox="0 0 200 280"
              className="absolute inset-0 w-full h-full drop-shadow-2xl"
            >
              <defs>
                {/* Glass body subtle reflective gradient */}
                <linearGradient id="pjg_glass" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(0 0% 100% / 0.18)" />
                  <stop offset="20%" stopColor="hsl(0 0% 100% / 0.04)" />
                  <stop offset="50%" stopColor="hsl(0 0% 100% / 0.02)" />
                  <stop offset="80%" stopColor="hsl(0 0% 100% / 0.04)" />
                  <stop offset="100%" stopColor="hsl(0 0% 100% / 0.18)" />
                </linearGradient>
                {/* Milk gradient – realistic */}
                <linearGradient id="pjg_milk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(45 60% 98%)" />
                  <stop offset="40%" stopColor="hsl(40 50% 94%)" />
                  <stop offset="100%" stopColor="hsl(35 35% 82%)" />
                </linearGradient>
                <radialGradient id="pjg_milkTop" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(45 60% 98%)" />
                  <stop offset="100%" stopColor="hsl(38 40% 88%)" />
                </radialGradient>

                {/* Almond gradient */}
                <radialGradient id="pjg_almond" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="hsl(30 60% 78%)" />
                  <stop offset="60%" stopColor="hsl(28 50% 60%)" />
                  <stop offset="100%" stopColor="hsl(25 50% 38%)" />
                </radialGradient>
                {/* Pistachio gradient */}
                <radialGradient id="pjg_pista" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="hsl(80 55% 70%)" />
                  <stop offset="60%" stopColor="hsl(85 50% 50%)" />
                  <stop offset="100%" stopColor="hsl(95 45% 30%)" />
                </radialGradient>
                {/* Cashew gradient */}
                <radialGradient id="pjg_cashew" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="hsl(45 70% 90%)" />
                  <stop offset="60%" stopColor="hsl(40 55% 75%)" />
                  <stop offset="100%" stopColor="hsl(35 45% 55%)" />
                </radialGradient>

                {/* Soft shadow under glass */}
                <radialGradient id="pjg_shadow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(0 0% 0% / 0.55)" />
                  <stop offset="100%" stopColor="hsl(0 0% 0% / 0)" />
                </radialGradient>

                {/* Clip to keep contents inside glass curve */}
                <clipPath id="pjg_clip">
                  <path d="M 50 50 L 56 230 Q 56 240 70 242 L 130 242 Q 144 240 144 230 L 150 50 Z" />
                </clipPath>
              </defs>

              {/* Ground shadow */}
              <ellipse cx="100" cy="258" rx="60" ry="6" fill="url(#pjg_shadow)" />

              {/* ===== Glass back wall (subtle highlight) ===== */}
              <path
                d="M 50 50 L 56 230 Q 56 242 72 244 L 128 244 Q 144 242 144 230 L 150 50 Z"
                fill="hsl(200 15% 90% / 0.04)"
                stroke="hsl(200 30% 85% / 0.55)"
                strokeWidth="1.4"
              />

              {/* ===== Milk filling (slow rise) ===== */}
              <g clipPath="url(#pjg_clip)">
                <motion.g
                  initial={{ y: 200 }}
                  animate={{ y: [200, 60, 60, 200] }}
                  transition={{
                    duration: 9,
                    times: [0, 0.45, 0.85, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <rect x="40" y="40" width="120" height="220" fill="url(#pjg_milk)" />
                  {/* surface highlight */}
                  <ellipse cx="100" cy="42" rx="48" ry="5" fill="url(#pjg_milkTop)" opacity="0.95" />
                  {/* gentle ripple */}
                  <motion.ellipse
                    cx="100" cy="44" rx="42" ry="2"
                    fill="hsl(45 50% 96%)" opacity="0.55"
                    animate={{ rx: [42, 46, 42] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.g>

                {/* Settled fruits at bottom (revealed as milk fills) */}
                <SettledFruits />

                {/* Falling fruits INSIDE the glass — slow drift */}
                <FallingFruitInside delay={0.4} x={78} variant="almond" />
                <FallingFruitInside delay={1.6} x={108} variant="pista" />
                <FallingFruitInside delay={2.8} x={92} variant="cashew" />
                <FallingFruitInside delay={4.0} x={118} variant="almond" />
                <FallingFruitInside delay={5.2} x={84} variant="pista" />
                <FallingFruitInside delay={6.4} x={100} variant="saffron" />
              </g>

              {/* ===== Glass front shading + rim ===== */}
              <path
                d="M 50 50 L 56 230 Q 56 242 72 244 L 128 244 Q 144 242 144 230 L 150 50 Z"
                fill="url(#pjg_glass)"
                stroke="hsl(200 30% 92% / 0.85)"
                strokeWidth="1.8"
              />
              {/* Glass rim ellipse */}
              <ellipse cx="100" cy="50" rx="50" ry="6" fill="none"
                stroke="hsl(200 30% 95% / 0.9)" strokeWidth="1.5" />
              <ellipse cx="100" cy="50" rx="50" ry="6" fill="hsl(0 0% 0% / 0.18)" />
              <ellipse cx="100" cy="49" rx="48" ry="4" fill="none"
                stroke="hsl(0 0% 100% / 0.5)" strokeWidth="0.6" />

              {/* Side highlights */}
              <path d="M 60 60 L 64 220" stroke="hsl(0 0% 100% / 0.5)" strokeWidth="2" strokeLinecap="round" />
              <path d="M 138 80 L 134 200" stroke="hsl(0 0% 100% / 0.18)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>

            {/* Floating saffron strands above glass */}
            <SaffronStrands />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   Sub-components
   ============================================================ */

const FallingFruitsField = () => {
  // Background pre-glass falling, very subtle for depth
  const items = [
    { left: "8%", delay: 0, type: "almond" },
    { left: "18%", delay: 1.2, type: "pista" },
    { left: "82%", delay: 0.6, type: "cashew" },
    { left: "92%", delay: 2.4, type: "almond" },
    { left: "5%", delay: 3.6, type: "saffron" },
    { left: "88%", delay: 4.2, type: "pista" },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: it.left, top: -20 }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0%", "320%"],
            opacity: [0, 0.55, 0.55, 0],
            rotate: [0, 240],
          }}
          transition={{
            duration: 6 + (i % 3),
            repeat: Infinity,
            delay: it.delay,
            ease: "easeIn",
          }}
        >
          <MiniFruitSVG type={it.type as any} size={10} />
        </motion.div>
      ))}
    </div>
  );
};

const MiniFruitSVG = ({ type, size = 12 }: { type: "almond" | "pista" | "cashew" | "saffron"; size?: number }) => {
  if (type === "almond") {
    return (
      <svg width={size * 1.4} height={size * 2} viewBox="0 0 14 20">
        <ellipse cx="7" cy="10" rx="5" ry="9" fill="url(#pjg_almond)" stroke="hsl(25 50% 30%)" strokeWidth="0.4" />
        <ellipse cx="5.5" cy="6" rx="1.5" ry="3" fill="hsl(35 60% 88%)" opacity="0.55" />
      </svg>
    );
  }
  if (type === "pista") {
    return (
      <svg width={size * 1.6} height={size * 1.4} viewBox="0 0 16 14">
        <ellipse cx="8" cy="7" rx="7" ry="5.5" fill="url(#pjg_pista)" stroke="hsl(95 50% 22%)" strokeWidth="0.4" />
        <path d="M 4 5 Q 8 8 12 5" stroke="hsl(95 60% 30%)" strokeWidth="0.5" fill="none" />
        <ellipse cx="6" cy="5" rx="1.5" ry="2" fill="hsl(80 55% 80%)" opacity="0.55" />
      </svg>
    );
  }
  if (type === "cashew") {
    return (
      <svg width={size * 2} height={size * 1.4} viewBox="0 0 20 14">
        <path d="M 3 7 Q 4 1 10 2 Q 16 3 17 7 Q 16 12 10 12 Q 5 12 3 7 Z"
          fill="url(#pjg_cashew)" stroke="hsl(35 45% 45%)" strokeWidth="0.4" />
        <ellipse cx="7" cy="5" rx="2" ry="1.5" fill="hsl(45 70% 92%)" opacity="0.6" />
      </svg>
    );
  }
  // saffron strand
  return (
    <svg width={size * 0.8} height={size * 1.6} viewBox="0 0 8 16">
      <path d="M 4 1 Q 2 6 4 10 Q 6 13 4 15"
        stroke="hsl(15 90% 50%)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 4 2 Q 3 6 4 9" stroke="hsl(25 95% 60%)" strokeWidth="0.5" fill="none" />
    </svg>
  );
};

const FallingFruitInside = ({
  delay,
  x,
  variant,
}: {
  delay: number;
  x: number;
  variant: "almond" | "pista" | "cashew" | "saffron";
}) => {
  // SVG-coordinate falling piece inside the glass
  const Piece = () => {
    if (variant === "almond")
      return <ellipse cx="0" cy="0" rx="3.2" ry="6" fill="url(#pjg_almond)" stroke="hsl(25 50% 30%)" strokeWidth="0.4" />;
    if (variant === "pista")
      return <ellipse cx="0" cy="0" rx="4" ry="3" fill="url(#pjg_pista)" stroke="hsl(95 50% 22%)" strokeWidth="0.4" />;
    if (variant === "cashew")
      return (
        <path d="M -6 0 Q -5 -4 0 -3 Q 5 -3 6 0 Q 5 4 0 4 Q -5 4 -6 0 Z"
          fill="url(#pjg_cashew)" stroke="hsl(35 45% 45%)" strokeWidth="0.4" />
      );
    return (
      <path d="M 0 -6 Q -2 -2 0 2 Q 2 5 0 8"
        stroke="hsl(15 90% 50%)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    );
  };

  return (
    <motion.g
      initial={{ y: 30, opacity: 0, rotate: 0 }}
      animate={{
        y: [30, 230],
        opacity: [0, 1, 1, 0.95],
        rotate: [0, 180],
      }}
      transition={{
        duration: 4.5,
        delay,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      }}
    >
      <g transform={`translate(${x}, 0)`}>
        <Piece />
      </g>
    </motion.g>
  );
};

const SettledFruits = () => (
  <g transform="translate(0, 232)">
    {/* a small mound of settled dry fruits at the glass bottom */}
    <ellipse cx="78" cy="2" rx="3.2" ry="5" fill="url(#pjg_almond)" stroke="hsl(25 50% 30%)" strokeWidth="0.4" transform="rotate(-15 78 2)" />
    <ellipse cx="92" cy="4" rx="4" ry="3" fill="url(#pjg_pista)" stroke="hsl(95 50% 22%)" strokeWidth="0.4" />
    <path d="M 100 0 Q 101 -4 106 -3 Q 111 -3 112 0 Q 111 4 106 4 Q 101 4 100 0 Z"
      fill="url(#pjg_cashew)" stroke="hsl(35 45% 45%)" strokeWidth="0.4" />
    <ellipse cx="118" cy="3" rx="3" ry="5" fill="url(#pjg_almond)" stroke="hsl(25 50% 30%)" strokeWidth="0.4" transform="rotate(20 118 3)" />
    <path d="M 84 -2 Q 83 -6 84 -8" stroke="hsl(15 90% 50%)" strokeWidth="1" strokeLinecap="round" fill="none" />
    <path d="M 124 -2 Q 125 -5 124 -8" stroke="hsl(15 90% 50%)" strokeWidth="1" strokeLinecap="round" fill="none" />
  </g>
);

const SaffronStrands = () => (
  <div className="absolute -top-2 left-0 right-0 h-10 pointer-events-none">
    {[20, 45, 60, 80].map((leftPct, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: `${leftPct}%`, top: 0 }}
        animate={{ y: [0, 6, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
      >
        <MiniFruitSVG type="saffron" size={9} />
      </motion.div>
    ))}
  </div>
);

export default PartyJuiceGlassAnimation;
