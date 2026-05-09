import { motion } from "framer-motion";

/**
 * PartyCounterPopAnimation
 * Small, classy "pop-up flat animation" of a Shalimar live juice counter
 * being assembled piece-by-piece — visually reinforces what the user is booking.
 * Inspired by the bakery storefront pop-up reference, brand colors only.
 */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const pop = (delay: number, y = 14) => ({
  hidden: { opacity: 0, y, scale: 0.6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease, delay },
  },
});

const PartyCounterPopAnimation = () => {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-5">
          <span className="inline-block font-body text-[10px] font-bold tracking-[0.22em] uppercase text-primary/80">
            What You're Booking
          </span>
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground mt-1">
            Your Live Juice Counter, <span className="text-gradient-gold">Set Up Fresh</span>
          </h3>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mx-auto rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden"
          style={{ aspectRatio: "16 / 9", maxWidth: 520 }}
        >
          {/* Soft warm glow backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 90%, hsl(var(--primary) / 0.18), transparent 65%)",
            }}
          />

          <svg
            viewBox="0 0 320 180"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {/* Ground line */}
            <motion.line
              x1="20"
              y1="148"
              x2="300"
              y2="148"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeDasharray="2 4"
              variants={pop(0.05, 0)}
            />

            {/* Banner / signboard */}
            <motion.g variants={pop(0.15, -10)}>
              <rect
                x="80"
                y="22"
                width="160"
                height="26"
                rx="6"
                fill="hsl(var(--primary))"
              />
              <text
                x="160"
                y="40"
                textAnchor="middle"
                fontFamily="DM Sans, sans-serif"
                fontWeight="800"
                fontSize="11"
                fill="hsl(var(--primary-foreground))"
                letterSpacing="1.2"
              >
                SHALIMAR JUICE
              </text>
              {/* String to counter */}
              <line x1="100" y1="48" x2="100" y2="78" stroke="hsl(var(--border))" strokeWidth="0.8" />
              <line x1="220" y1="48" x2="220" y2="78" stroke="hsl(var(--border))" strokeWidth="0.8" />
            </motion.g>

            {/* Counter top */}
            <motion.g variants={pop(0.35)}>
              <rect x="60" y="108" width="200" height="10" rx="2" fill="hsl(var(--pineapple-dark))" />
              <rect x="60" y="118" width="200" height="30" rx="3" fill="hsl(38 50% 28%)" />
              {/* Counter front pattern */}
              <rect x="72" y="126" width="40" height="14" rx="2" fill="hsl(38 60% 22%)" />
              <rect x="140" y="126" width="40" height="14" rx="2" fill="hsl(38 60% 22%)" />
              <rect x="208" y="126" width="40" height="14" rx="2" fill="hsl(38 60% 22%)" />
            </motion.g>

            {/* Big juice jar (center) */}
            <motion.g variants={pop(0.55)}>
              <rect x="146" y="74" width="28" height="34" rx="3" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1" />
              {/* Juice fill */}
              <motion.rect
                x="146"
                y="74"
                width="28"
                height="34"
                rx="3"
                fill="hsl(var(--primary))"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0.75 }}
                transition={{ duration: 0.7, ease, delay: 0.95 }}
                style={{ transformOrigin: "160px 108px" }}
              />
              {/* Lid */}
              <rect x="143" y="70" width="34" height="6" rx="2" fill="hsl(var(--pineapple-dark))" />
              {/* Tap */}
              <rect x="174" y="96" width="6" height="3" fill="hsl(var(--pineapple-dark))" />
            </motion.g>

            {/* Glass left */}
            <motion.g variants={pop(0.7)}>
              <path
                d="M96 92 L112 92 L110 108 L98 108 Z"
                fill="hsl(var(--primary) / 0.2)"
                stroke="hsl(var(--primary))"
                strokeWidth="0.8"
              />
              <motion.path
                d="M97 100 L111 100 L110 108 L98 108 Z"
                fill="hsl(var(--primary))"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              />
            </motion.g>

            {/* Glass right */}
            <motion.g variants={pop(0.8)}>
              <path
                d="M208 92 L224 92 L222 108 L210 108 Z"
                fill="hsl(var(--primary) / 0.2)"
                stroke="hsl(var(--primary))"
                strokeWidth="0.8"
              />
              <motion.path
                d="M209 100 L223 100 L222 108 L210 108 Z"
                fill="hsl(var(--primary))"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              />
            </motion.g>

            {/* Pineapple decoration */}
            <motion.g variants={pop(0.9)}>
              <ellipse cx="76" cy="100" rx="6" ry="8" fill="hsl(var(--primary))" />
              <path d="M73 92 L76 86 L79 92 Z" fill="hsl(var(--leaf-green))" />
            </motion.g>
            <motion.g variants={pop(0.95)}>
              <ellipse cx="244" cy="100" rx="6" ry="8" fill="hsl(var(--primary))" />
              <path d="M241 92 L244 86 L247 92 Z" fill="hsl(var(--leaf-green))" />
            </motion.g>

            {/* Sparkles */}
            {[
              { x: 60, y: 60, d: 1.0 },
              { x: 260, y: 56, d: 1.15 },
              { x: 160, y: 58, d: 1.25 },
            ].map((s, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.6] }}
                transition={{ delay: s.d, duration: 1.4, repeat: Infinity, repeatDelay: 2.2, ease }}
              >
                <path
                  d={`M${s.x} ${s.y - 4} L${s.x + 1} ${s.y - 1} L${s.x + 4} ${s.y} L${s.x + 1} ${s.y + 1} L${s.x} ${s.y + 4} L${s.x - 1} ${s.y + 1} L${s.x - 4} ${s.y} L${s.x - 1} ${s.y - 1} Z`}
                  fill="hsl(var(--primary))"
                />
              </motion.g>
            ))}
          </svg>
        </motion.div>

        <p className="text-center font-body text-[11px] text-muted-foreground mt-4">
          Counter, jars, glasses & fresh juice — delivered & set up at your venue.
        </p>
      </div>
    </section>
  );
};

export default PartyCounterPopAnimation;
