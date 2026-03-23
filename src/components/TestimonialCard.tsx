import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

const TestimonialCard = ({ name, text, rating, location }: TestimonialProps) => (
  <motion.div
    variants={scaleUp}
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
    className="card-premium p-6 md:p-8 flex flex-col gap-4"
  >
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-primary fill-primary" : "text-border"}
        />
      ))}
    </div>
    <p className="font-body text-sm text-muted-foreground leading-relaxed italic">
      "{text}"
    </p>
    <div className="mt-auto pt-2 border-t border-border/50">
      <p className="font-display text-sm font-bold text-foreground">{name}</p>
      {location && (
        <p className="font-body text-xs text-muted-foreground/70">{location}</p>
      )}
    </div>
  </motion.div>
);

export default TestimonialCard;
