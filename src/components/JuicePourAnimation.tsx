import { motion } from "framer-motion";
import pineappleFruit from "@/assets/pineapple-fruit.png";

const JuicePourAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[420px] md:min-h-[540px] select-none">
      {/* Soft ambient glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "70%",
          height: "70%",
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pineapple fruit - gentle float */}
      <motion.img
        src={pineappleFruit}
        alt="Fresh Pineapple"
        className="w-48 md:w-64 lg:w-72 drop-shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: [0, -12, 0], 
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
        }}
        style={{
          filter: "drop-shadow(0 20px 40px hsl(var(--pineapple-gold) / 0.2))",
        }}
      />
    </div>
  );
};

export default JuicePourAnimation;
