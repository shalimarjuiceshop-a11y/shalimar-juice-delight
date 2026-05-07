import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Tiny live-time badge for the shop animation.
 * Shows current IST time + OPEN/CLOSED dot.
 * Operating hours: 11:30 AM – 11:00 PM IST.
 */
const LiveShopTimeBadge = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const istMin = now.getUTCHours() * 60 + now.getUTCMinutes() + 330;
  const total = ((istMin % 1440) + 1440) % 1440;
  const isOpen = total >= 690 && total < 1380;

  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const s = now.getUTCSeconds();
  const h12 = ((h24 + 11) % 12) + 1;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const pad = (n: number) => n.toString().padStart(2, "0");
  const timeStr = `${pad(h12)}:${pad(m)}:${pad(s)} ${ampm}`;

  return (
    <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md bg-black/45 border border-white/10 shadow-lg">
      <motion.span
        className="relative flex w-2 h-2"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-60 blur-[2px]"
          style={{ background: isOpen ? "hsl(140 80% 55%)" : "hsl(0 80% 55%)" }}
        />
        <span
          className="relative w-2 h-2 rounded-full"
          style={{ background: isOpen ? "hsl(140 75% 50%)" : "hsl(0 75% 50%)" }}
        />
      </motion.span>
      <span
        className="font-display text-[9px] md:text-[10px] font-black tracking-wider"
        style={{ color: isOpen ? "hsl(140 70% 75%)" : "hsl(0 70% 78%)" }}
      >
        {isOpen ? "OPEN" : "CLOSED"}
      </span>
      <span className="text-white/30 text-[9px]">•</span>
      <span className="font-mono text-[9px] md:text-[10px] font-semibold text-white/85 tabular-nums">
        {timeStr}
      </span>
      <span className="text-white/30 text-[8px] md:text-[9px] font-semibold">IST</span>
    </div>
  );
};

export default LiveShopTimeBadge;
