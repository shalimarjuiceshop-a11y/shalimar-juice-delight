import { motion } from "framer-motion";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

const JuicePourAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
      {/* Soft radial glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.12) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Step 1: Whole pineapple appears at top */}
      <motion.img
        src={pineappleFruit}
        alt="Pineapple"
        className="absolute w-28 md:w-36 drop-shadow-lg"
        style={{ zIndex: 10, top: "5%" }}
        initial={{ opacity: 0, y: -60, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-60, 0, 0, 0], scale: [0.8, 1, 1, 0.8] }}
        transition={{ duration: 3, times: [0, 0.2, 0.5, 0.7], ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
      />

      {/* Step 2: Pineapple slices fly out (cutting effect) */}
      {[
        { x: -80, y: -20, rotate: -30, delay: 1.2 },
        { x: 80, y: -10, rotate: 25, delay: 1.4 },
        { x: -40, y: 30, rotate: -15, delay: 1.6 },
        { x: 50, y: 40, rotate: 20, delay: 1.5 },
      ].map((slice, i) => (
        <motion.img
          key={`slice-${i}`}
          src={pineappleSlices}
          alt=""
          className="absolute w-8 md:w-11 pointer-events-none"
          style={{ zIndex: 15 }}
          initial={{ opacity: 0, x: 0, y: -20, scale: 0.3, rotate: 0 }}
          animate={{
            opacity: [0, 0, 0.8, 0.6, 0],
            x: [0, 0, slice.x * 0.5, slice.x, slice.x],
            y: [-20, -20, slice.y * 0.5, slice.y, slice.y + 40],
            scale: [0.3, 0.3, 0.9, 1, 0.7],
            rotate: [0, 0, slice.rotate * 0.5, slice.rotate, slice.rotate + 10],
          }}
          transition={{
            duration: 3,
            times: [0, 0.15, 0.35, 0.55, 0.75],
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 4,
          }}
        />
      ))}

      {/* Step 3: Small glass rises from bottom */}
      <motion.div
        className="relative"
        style={{ zIndex: 20 }}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: [200, 200, 20, 20, 20, 20], opacity: [0, 0, 1, 1, 1, 1] }}
        transition={{ duration: 7, times: [0, 0.25, 0.45, 0.6, 0.85, 1], ease: "easeOut", repeat: Infinity, repeatDelay: 0 }}
      >
        <motion.img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice"
          className="w-32 md:w-44 lg:w-48 drop-shadow-xl"
        />

        {/* Step 4: Juice fill effect - golden overlay rising inside glass */}
        <motion.div
          className="absolute bottom-[10%] left-[15%] right-[15%] rounded-b-lg overflow-hidden"
          style={{
            zIndex: 21,
            height: "60%",
            background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.35), hsl(var(--pineapple-gold) / 0.1))",
            mixBlendMode: "overlay",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 0, 0, 0, 1, 1] }}
          transition={{ duration: 7, times: [0, 0.25, 0.4, 0.45, 0.65, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 0 }}
          style={{ transformOrigin: "bottom", zIndex: 21, height: "60%", background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.35), hsl(var(--pineapple-gold) / 0.1))", mixBlendMode: "overlay" as const }}
        />

        {/* Subtle glow behind glass */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.2) 0%, transparent 60%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0, 0, 1, 1], scale: [0.8, 0.8, 0.8, 1.3, 1.3] }}
          transition={{ duration: 7, times: [0, 0.25, 0.4, 0.55, 1], repeat: Infinity, repeatDelay: 0 }}
        />
      </motion.div>

      {/* Step 5: "Just ₹10" text appears */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 bg-primary text-primary-foreground rounded-full px-6 py-3 md:px-8 md:py-4 shadow-pineapple"
        style={{ zIndex: 30 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 0, 0, 0, 0, 1.15, 1], opacity: [0, 0, 0, 0, 0, 1, 1] }}
        transition={{ duration: 7, times: [0, 0.2, 0.4, 0.55, 0.7, 0.82, 0.9], ease: "backOut", repeat: Infinity, repeatDelay: 0 }}
      >
        <span className="font-display text-xl md:text-2xl font-bold">Just ₹10</span>
      </motion.div>
    </div>
  );
};

export default JuicePourAnimation;
