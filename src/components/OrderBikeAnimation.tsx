import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scooterImg from "@/assets/delivery-scooter.png";

/**
 * Premium delivery scooter:
 *  Phase 1 (intro, once): rider enters from left, stops at center, waves & says "Hi!",
 *  Phase 2 (loop): rider drives across the road continuously left → right.
 */
const OrderBikeAnimation = () => {
  const [phase, setPhase] = useState<"intro-in" | "greet" | "loop">("intro-in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("greet"), 1500); // enter done
    const t2 = setTimeout(() => setPhase("loop"), 1500 + 2200); // greet done
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="relative mx-auto mb-4 w-full max-w-[320px] h-[120px] overflow-hidden rounded-lg"
      aria-hidden="true"
    >
      {/* Asphalt road */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[28px]"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 18%) 0%, hsl(0 0% 12%) 60%, hsl(0 0% 8%) 100%)",
        }}
      />
      <div
        className="absolute left-0 right-0 h-px"
        style={{ bottom: 28, background: "hsl(0 0% 30% / 0.6)" }}
      />
      {/* Lane dashes (always moving) */}
      <motion.div
        className="absolute left-0 right-0 flex gap-3"
        style={{ bottom: 12, height: 2 }}
        animate={{ x: [0, -28] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="block flex-shrink-0 rounded-sm"
            style={{ width: 14, height: 2, background: "hsl(45 95% 65% / 0.85)" }}
          />
        ))}
      </motion.div>

      {/* Horizon glow */}
      <div
        className="absolute left-0 right-0 top-0 h-[82px]"
        style={{
          background:
            "linear-gradient(180deg, hsl(35 60% 14% / 0.6) 0%, transparent 100%)",
        }}
      />

      {/* Scooter rider */}
      {phase !== "loop" ? (
        <motion.div
          className="absolute"
          style={{ bottom: 14, left: "50%" }}
          initial={{ x: "calc(-50% - 220px)" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Speech bubble */}
            <AnimatePresence>
              {phase === "greet" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: 4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 bg-background border border-primary/40 rounded-full px-2.5 py-0.5 shadow-md"
                >
                  <span className="font-display text-[11px] font-bold text-foreground whitespace-nowrap">
                    Hi! 👋
                  </span>
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-background border-r border-b border-primary/40"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.img
              src={scooterImg}
              alt=""
              width={1024}
              height={1024}
              loading="eager"
              className="block h-[82px] w-auto drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]"
              animate={phase === "greet" ? { y: [0, -2, 0] } : { y: [0, -1.5, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="absolute"
          style={{ bottom: 14, left: 0 }}
          initial={{ x: "-30%" }}
          animate={{ x: "calc(100vw + 200px)" }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <motion.img
            src={scooterImg}
            alt=""
            width={1024}
            height={1024}
            loading="eager"
            className="block h-[82px] w-auto drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]"
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default OrderBikeAnimation;
