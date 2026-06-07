import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialProps {
  name: string;
  text: string;
  rating: number;
  location?: string;
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const TestimonialCard = ({ name, text, rating, location }: TestimonialProps) => (
  <motion.div
    variants={scaleUp}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
    className="relative card-premium p-6 md:p-7 flex flex-col gap-4 h-full overflow-hidden group"
  >
    {/* Editorial quote glyph */}
    <Quote
      aria-hidden="true"
      size={88}
      strokeWidth={1}
      className="absolute -top-3 -right-3 text-primary/[0.06] rotate-180 pointer-events-none"
    />

    <div className="flex items-center justify-between relative">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={15}
            className={i < rating ? "text-primary fill-primary" : "text-border"}
          />
        ))}
      </div>
      <span className="font-body text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/60">
        Verified
      </span>
    </div>

    <p className="font-body text-[15px] text-foreground/85 leading-relaxed relative">
      &ldquo;{text}&rdquo;
    </p>

    <div className="mt-auto pt-4 border-t border-border/40 flex items-center gap-3 relative">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[hsl(38_95%_48%)] text-primary-foreground font-display text-sm font-black ring-1 ring-primary/30 shadow-[0_4px_12px_-4px_hsl(45_100%_50%/0.5)]">
        {initials(name)}
      </div>
      <div className="min-w-0">
        <p className="font-display text-sm font-bold text-foreground truncate">{name}</p>
        {location && (
          <p className="font-body text-xs text-muted-foreground/70 truncate">{location}</p>
        )}
      </div>
    </div>
  </motion.div>
);

export default TestimonialCard;
