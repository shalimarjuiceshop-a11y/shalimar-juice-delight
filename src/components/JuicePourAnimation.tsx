import { motion } from "framer-motion";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

const JuicePourAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px]">
      {/* Soft radial glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating pineapple slices - subtle */}
      {[
        { x: -100, y: -60, rotate: -20, delay: 0 },
        { x: 110, y: -40, rotate: 25, delay: 0.3 },
        { x: -70, y: 70, rotate: -35, delay: 0.6 },
      ].map((slice, i) => (
        <motion.img
          key={`slice-${i}`}
          src={pineappleSlices}
          alt=""
          className="absolute w-10 md:w-14 opacity-60 pointer-events-none"
          style={{ zIndex: 5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            x: slice.x,
            y: slice.y,
            rotate: slice.rotate,
            opacity: 0.5,
            scale: 1,
          }}
          transition={{ duration: 1, delay: slice.delay + 0.5, ease: "easeOut" }}
        />
      ))}

      {/* Main juice glass */}
      <motion.div
        className="relative"
        style={{ zIndex: 20 }}
        initial={{ y: 30, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice"
          className="w-40 md:w-52 lg:w-60 drop-shadow-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle glow behind glass */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.25) 0%, transparent 60%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.3 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </motion.div>

      {/* Price badge */}
      <motion.div
        className="absolute bottom-6 right-6 md:bottom-10 md:right-14 bg-primary text-primary-foreground rounded-full w-18 h-18 md:w-20 md:h-20 flex flex-col items-center justify-center shadow-pineapple"
        style={{ zIndex: 30 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.15, 1], opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: "backOut" }}
      >
        <span className="font-body text-xs font-medium">Starting</span>
        <span className="font-display text-xl font-bold block">₹10</span>
      </motion.div>
    </div>
  );
};

export default JuicePourAnimation;
