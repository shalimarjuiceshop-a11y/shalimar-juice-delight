import { motion } from "framer-motion";

const items = [
  "🍍 Fresh Pineapple Juice",
  "🥤 Mango Shake",
  "🍇 Guava Juice",
  "❄️ Winter Special Milk",
  "🏪 Franchise Available",
  "💛 Fresh Daily",
  "🧊 Ice Cold Fresh",
];

const MarqueeBanner = () => (
  <div className="relative overflow-hidden py-4 bg-primary/5 border-y border-border/50">
    <motion.div
      className="flex gap-12 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="font-body text-sm font-medium text-muted-foreground/80 tracking-wide"
        >
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

export default MarqueeBanner;
