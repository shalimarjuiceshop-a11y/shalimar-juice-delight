import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

const JuicePourAnimation = () => {
  const [stage, setStage] = useState(0);
  // 0: pineapple appears, 1: pineapple cuts/slices fly, 2: juice pours, 3: glass fills, 4: final reveal

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1200),
      setTimeout(() => setStage(2), 2400),
      setTimeout(() => setStage(3), 3600),
      setTimeout(() => setStage(4), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Juice droplets
  const droplets = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 120,
    y: Math.random() * -80 - 20,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.5,
  }));

  // Splash particles
  const splashParticles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    angle: (i / 16) * 360,
    distance: 40 + Math.random() * 60,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] md:min-h-[500px]">
      {/* Radial glow background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.2) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stage 0-1: Whole pineapple fruit enters and "cuts" */}
      <AnimatePresence>
        {stage < 2 && (
          <motion.img
            src={pineappleFruit}
            alt="Pineapple"
            className="absolute z-20 w-40 md:w-56"
            initial={{ y: -200, rotate: -30, opacity: 0, scale: 0.5 }}
            animate={
              stage === 0
                ? { y: 0, rotate: 0, opacity: 1, scale: 1 }
                : { y: 0, rotate: 15, opacity: 0, scale: 1.3 }
            }
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Stage 1+: Pineapple slices fly out */}
      {stage >= 1 && (
        <>
          {[
            { x: -120, y: -80, rotate: -45, delay: 0 },
            { x: 130, y: -60, rotate: 30, delay: 0.1 },
            { x: -90, y: 60, rotate: -20, delay: 0.2 },
            { x: 110, y: 80, rotate: 50, delay: 0.15 },
            { x: -50, y: -120, rotate: -60, delay: 0.25 },
            { x: 60, y: 110, rotate: 40, delay: 0.3 },
          ].map((slice, i) => (
            <motion.img
              key={`slice-${i}`}
              src={pineappleSlices}
              alt=""
              className="absolute z-30 w-12 md:w-16 opacity-90 pointer-events-none"
              initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.3 }}
              animate={{
                x: slice.x,
                y: slice.y,
                rotate: slice.rotate,
                opacity: stage >= 4 ? 0.6 : 0.9,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: slice.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Stage 2+: Juice pour stream */}
      {stage >= 2 && (
        <motion.div
          className="absolute z-15 top-[10%] left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main juice stream */}
          <motion.div
            className="relative w-4 md:w-5 mx-auto rounded-full overflow-hidden"
            style={{
              background: "linear-gradient(180deg, hsl(var(--pineapple-gold) / 0.9), hsl(var(--primary)))",
            }}
            initial={{ height: 0 }}
            animate={{ height: stage >= 3 ? 0 : 200 }}
            transition={{
              height: {
                duration: stage >= 3 ? 0.8 : 1.2,
                ease: "easeInOut",
              },
            }}
          >
            {/* Shimmer effect on stream */}
            <motion.div
              className="absolute inset-0 w-full"
              style={{
                background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 100% / 0.4) 50%, transparent 100%)",
              }}
              animate={{ y: [-50, 200] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Juice droplets falling */}
          {droplets.map((d) => (
            <motion.div
              key={`drop-${d.id}`}
              className="absolute rounded-full"
              style={{
                width: d.size,
                height: d.size,
                background: "hsl(var(--pineapple-gold))",
                left: `calc(50% + ${d.x / 3}px)`,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, 180, 220],
                opacity: [0, 1, 0],
                x: [0, d.x * 0.3],
              }}
              transition={{
                duration: 1.2,
                delay: d.delay + 0.3,
                repeat: stage < 3 ? Infinity : 0,
                repeatDelay: 0.5,
                ease: "easeIn",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Stage 3+: Splash effect around the glass */}
      {stage >= 3 && (
        <>
          {splashParticles.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            return (
              <motion.div
                key={`splash-${p.id}`}
                className="absolute z-25 rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: `hsl(var(--pineapple-gold) / ${0.6 + Math.random() * 0.4})`,
                  left: "50%",
                  top: "55%",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(rad) * p.distance,
                  y: Math.sin(rad) * p.distance,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Splash ring */}
          <motion.div
            className="absolute z-20 rounded-full border-2"
            style={{
              borderColor: "hsl(var(--pineapple-gold) / 0.5)",
              left: "50%",
              top: "55%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </>
      )}

      {/* Glass - appears and fills up */}
      <motion.div
        className="relative z-30"
        initial={{ y: 100, opacity: 0, scale: 0.5 }}
        animate={{
          y: stage >= 2 ? 0 : 100,
          opacity: stage >= 2 ? 1 : 0,
          scale: stage >= 2 ? 1 : 0.5,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glass fill level overlay */}
        <div className="relative">
          <motion.img
            src={pineappleJuiceGlass}
            alt="Pineapple Juice Glass"
            className="relative z-10 w-64 md:w-80 lg:w-[380px] drop-shadow-2xl"
            animate={
              stage >= 4
                ? { y: [0, -6, 0] }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glass glow effect when filled */}
          {stage >= 3 && (
            <motion.div
              className="absolute inset-0 z-0 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.3) 0%, transparent 60%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 1 }}
            />
          )}
        </div>
      </motion.div>

      {/* Stage 4: Final sparkles around glass */}
      {stage >= 4 && (
        <>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * 360;
            const rad = (angle * Math.PI) / 180;
            const dist = 140 + Math.random() * 40;
            return (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute z-40"
                style={{
                  left: `calc(50% + ${Math.cos(rad) * dist}px)`,
                  top: `calc(50% + ${Math.sin(rad) * dist}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <span className="text-lg">✨</span>
              </motion.div>
            );
          })}

          {/* Floating ice cubes */}
          {["❄️", "🧊", "❄️"].map((ice, i) => (
            <motion.span
              key={`ice-${i}`}
              className="absolute z-35 text-2xl pointer-events-none"
              style={{
                left: `${30 + i * 20}%`,
                top: `${60 + i * 10}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              {ice}
            </motion.span>
          ))}
        </>
      )}

      {/* Price badge - appears at final stage */}
      <motion.div
        className="absolute bottom-4 right-4 md:bottom-8 md:right-12 bg-primary text-primary-foreground rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-pineapple z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          stage >= 4
            ? { scale: [0, 1.2, 1], opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-body text-xs font-medium">Starting</span>
          <span className="font-display text-xl font-bold block">₹10</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JuicePourAnimation;
