import { motion } from "framer-motion";
import { Citrus, GlassWater, Grape, Snowflake, Store, Leaf, Flame, Sparkles } from "lucide-react";

const items = [
  { icon: Citrus, label: "Fresh Pineapple Juice", tint: "text-amber-400" },
  { icon: GlassWater, label: "Mango Shake", tint: "text-orange-400" },
  { icon: Grape, label: "Guava Juice", tint: "text-rose-400" },
  { icon: Snowflake, label: "Winter Special Milk", tint: "text-sky-300" },
  { icon: Store, label: "Franchise Available", tint: "text-emerald-400" },
  { icon: Leaf, label: "100% Natural", tint: "text-lime-400" },
  { icon: Flame, label: "Handcrafted Daily", tint: "text-red-400" },
  { icon: Sparkles, label: "Ice Cold & Fresh", tint: "text-cyan-300" },
];

const MarqueeBanner = () => (
  <div className="relative overflow-hidden py-3.5 bg-gradient-to-r from-primary/[0.04] via-primary/[0.07] to-primary/[0.04] border-y border-border/50">
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
    <motion.div
      className="flex gap-10 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map(({ icon: Icon, label, tint }, i) => (
        <div key={i} className="inline-flex items-center gap-2.5 shrink-0">
          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-foreground/[0.04] ring-1 ring-border/60 ${tint}`}>
            <Icon size={14} strokeWidth={2.25} />
          </span>
          <span className="font-body text-[13px] font-semibold tracking-wide text-foreground/80">
            {label}
          </span>
          <span className="ml-2 inline-block w-1 h-1 rounded-full bg-primary/40" />
        </div>
      ))}
    </motion.div>
  </div>
);

export default MarqueeBanner;
