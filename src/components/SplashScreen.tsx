import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sjsLogo from "@/assets/sjs-logo.jpeg";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-animated"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          {/* Glowing orbs */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(45 100% 50% / 0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={phase >= 0 ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative z-10"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(45 100% 50% / 0.3) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <img
                src={sjsLogo}
                alt="Shalimar Juice Shop"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-2xl ring-4 ring-primary/30 relative z-10"
              />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
            animate={phase >= 1 ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-6 text-center"
          >
            <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight" style={{ color: "hsl(45 100% 96%)" }}>
              Shalimar <span className="text-gradient-gold">Juice</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-body text-sm mt-2 tracking-[0.15em] uppercase"
              style={{ color: "hsl(45 40% 60%)" }}
            >
              Since Generations
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
            className="relative z-10 mt-8 w-48 h-1 rounded-full overflow-hidden"
            style={{ background: "hsl(45 30% 20%)" }}
          >
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: "0%" }}
              animate={phase >= 2 ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
