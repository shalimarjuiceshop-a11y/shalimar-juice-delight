import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

const JuicePourAnimation = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    const runSequence = async () => {
      while (true) {
        await controls.start("phase1");
        await controls.start("phase2");
        await controls.start("phase3");
        await controls.start("phase4");
        await controls.start("phase5");
        await new Promise((r) => setTimeout(r, 2500));
        controls.set("initial");
      }
    };
    runSequence();
  }, [controls]);

  // Slice positions for natural stacking
  const sliceData = [
    { delay: 0, yEnd: 80 },
    { delay: 0.25, yEnd: 66 },
    { delay: 0.5, yEnd: 52 },
    { delay: 0.75, yEnd: 38 },
    { delay: 1.0, yEnd: 24 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[420px] md:min-h-[540px] overflow-hidden select-none">

      {/* Soft ambient glow behind everything */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80%",
          height: "80%",
          background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ═══ WOODEN CUTTING BOARD ═══ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "65%",
          maxWidth: 280,
          height: 18,
          background: "linear-gradient(180deg, hsl(28 45% 52%) 0%, hsl(25 40% 38%) 60%, hsl(22 35% 30%) 100%)",
          borderRadius: 6,
          bottom: "28%",
          zIndex: 4,
          boxShadow: "0 6px 20px hsl(25 30% 15% / 0.5), inset 0 1px 0 hsl(30 50% 65% / 0.3)",
        }}
        variants={{
          initial: { opacity: 0, scaleX: 0.7 },
          phase1: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } },
          phase4: { opacity: 0.3, y: 20, transition: { duration: 0.6, delay: 0.3 } },
          phase5: { opacity: 0 },
        }}
        animate={controls}
      >
        {/* Wood grain lines */}
        {[20, 40, 60, 80].map((left) => (
          <div
            key={left}
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `${left}%`,
              width: 1,
              height: "60%",
              background: "hsl(25 30% 30% / 0.3)",
              borderRadius: 1,
            }}
          />
        ))}
      </motion.div>

      {/* ═══ PHASE 1: PINEAPPLE DROPS ONTO BOARD ═══ */}
      <motion.div
        className="absolute"
        style={{ zIndex: 10, bottom: "30%" }}
        variants={{
          initial: { opacity: 0, y: -200, scale: 0.6, rotate: -15 },
          phase1: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1], // spring bounce
            },
          },
          phase2: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.3, delay: 0.1 },
          },
        }}
        animate={controls}
      >
        <img
          src={pineappleFruit}
          alt="Fresh Pineapple"
          className="w-28 md:w-36 drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 8px 16px hsl(var(--pineapple-gold) / 0.3))" }}
        />
        {/* Landing impact ring */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: 60,
            height: 8,
            background: "radial-gradient(ellipse, hsl(var(--pineapple-gold) / 0.2), transparent)",
          }}
          variants={{
            initial: { scale: 0, opacity: 0 },
            phase1: {
              scale: [0, 1.5, 1],
              opacity: [0, 0.6, 0.3],
              transition: { duration: 0.5, delay: 0.9 },
            },
            phase2: { opacity: 0 },
          }}
          animate={controls}
        />
      </motion.div>

      {/* ═══ PHASE 2: KNIFE COMES DOWN & SLICES ═══ */}
      {/* Knife blade - realistic triangular shape */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 25,
          bottom: "30%",
          width: 6,
          height: 120,
          background: "linear-gradient(180deg, hsl(0 0% 75%) 0%, hsl(0 0% 92%) 40%, hsl(0 0% 85%) 100%)",
          borderRadius: "2px 2px 1px 1px",
          boxShadow: "2px 0 6px hsl(0 0% 0% / 0.2), -1px 0 4px hsl(0 0% 100% / 0.3)",
          transformOrigin: "bottom center",
        }}
        variants={{
          initial: { opacity: 0, y: -180, scaleY: 0.5 },
          phase1: { opacity: 0, y: -180 },
          phase2: {
            opacity: [0, 1, 1, 1, 1, 1, 0.8, 0],
            y: [-180, -60, 10, -80, 0, -70, -10, -200],
            transition: {
              duration: 3.5,
              times: [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 1],
              ease: "easeInOut",
            },
          },
        }}
        animate={controls}
      >
        {/* Knife handle */}
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          style={{
            width: 14,
            height: 32,
            background: "linear-gradient(180deg, hsl(25 50% 25%), hsl(25 40% 35%))",
            borderRadius: 3,
            boxShadow: "inset 0 1px 2px hsl(0 0% 100% / 0.1)",
          }}
        />
        {/* Blade edge highlight */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: 1,
            background: "linear-gradient(180deg, transparent, hsl(0 0% 100% / 0.6), transparent)",
          }}
        />
      </motion.div>

      {/* Cutting impact flashes */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`impact-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 40,
            height: 6,
            bottom: `${31 + i * 0.5}%`,
            background: "radial-gradient(ellipse, hsl(var(--pineapple-gold) / 0.5), transparent)",
            zIndex: 24,
          }}
          variants={{
            initial: { opacity: 0, scaleX: 0 },
            phase2: {
              opacity: [0, 0, 0.8, 0, 0, 0.8, 0, 0, 0.7, 0],
              scaleX: [0, 0, 1.5, 0, 0, 1.3, 0, 0, 1.2, 0],
              transition: {
                duration: 3.5,
                times: [0, 0.2 + i * 0.01, 0.25 + i * 0.01, 0.3, 0.45 + i * 0.01, 0.5 + i * 0.01, 0.55, 0.7 + i * 0.01, 0.75 + i * 0.01, 0.8],
              },
            },
          }}
          animate={controls}
        />
      ))}

      {/* ═══ PINEAPPLE SLICES APPEARING & STACKING ═══ */}
      {sliceData.map((slice, i) => (
        <motion.div
          key={`slice-${i}`}
          className="absolute pointer-events-none"
          style={{
            zIndex: 12 + i,
            bottom: "30%",
          }}
          variants={{
            initial: { opacity: 0, y: -20, scale: 0.3 },
            phase1: { opacity: 0 },
            phase2: {
              opacity: 1,
              y: slice.yEnd * -1,
              scale: 1,
              rotate: -2 + i * 1.5,
              transition: {
                duration: 0.5,
                delay: 0.2 + slice.delay * 2.2,
                ease: [0.34, 1.56, 0.64, 1], // bounce
              },
            },
            phase3: {
              y: 60,
              opacity: 0.6,
              scale: 0.7,
              rotate: 0,
              transition: { duration: 0.8, delay: i * 0.06, ease: "easeIn" },
            },
            phase4: {
              opacity: 0,
              y: 120,
              scale: 0.2,
              transition: { duration: 0.4, delay: i * 0.04 },
            },
          }}
          animate={controls}
        >
          <img
            src={pineappleSlices}
            alt=""
            className="w-14 md:w-18 drop-shadow-lg"
            style={{ filter: `drop-shadow(0 ${2 + i}px ${4 + i * 2}px hsl(var(--pineapple-gold) / 0.25))` }}
          />
        </motion.div>
      ))}

      {/* Juice droplets spraying during each cut */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = ((i / 12) * Math.PI * 1.6) - Math.PI * 0.3; // spread upward arc
        const dist = 25 + (i % 4) * 18;
        const size = 3 + (i % 3) * 2;
        return (
          <motion.div
            key={`drop-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              background: `hsl(var(--pineapple-gold) / ${0.55 + (i % 3) * 0.15})`,
              bottom: "32%",
              zIndex: 23,
            }}
            variants={{
              initial: { opacity: 0, x: 0, y: 0, scale: 0 },
              phase1: { opacity: 0 },
              phase2: {
                opacity: [0, 0, 0.9, 0.6, 0],
                x: [0, 0, Math.cos(angle) * dist * 0.6, Math.cos(angle) * dist, Math.cos(angle) * dist * 1.1],
                y: [0, 0, Math.sin(angle) * dist * 0.6 - 10, Math.sin(angle) * dist, Math.sin(angle) * dist + 30],
                scale: [0, 0, 1, 0.7, 0],
                transition: {
                  duration: 3.5,
                  times: [0, 0.15 + (i % 3) * 0.15, 0.25 + (i % 3) * 0.15, 0.4 + (i % 3) * 0.1, 0.6 + (i % 3) * 0.08],
                  ease: "easeOut",
                },
              },
            }}
            animate={controls}
          />
        );
      })}

      {/* ═══ PHASE 3: JUICE STREAMS FLOWING DOWN ═══ */}
      {/* Main golden juice stream */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 10,
          bottom: "10%",
          height: "22%",
          background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.85), hsl(var(--pineapple-gold) / 0.6), hsl(var(--pineapple-gold) / 0.15))",
          borderRadius: 8,
          zIndex: 18,
          filter: "blur(0.5px)",
          transformOrigin: "top center",
        }}
        variants={{
          initial: { opacity: 0, scaleY: 0 },
          phase3: {
            opacity: [0, 0.9, 1, 0.8],
            scaleY: [0, 0.4, 1, 1.1],
            transition: { duration: 1.5, ease: "easeOut" },
          },
          phase4: {
            opacity: [0.8, 0.5, 0],
            scaleY: [1, 0.6, 0],
            transition: { duration: 1.0, ease: "easeIn" },
          },
        }}
        animate={controls}
      />

      {/* Side drips */}
      {[-7, 7].map((offset, i) => (
        <motion.div
          key={`drip-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 4,
            bottom: "14%",
            height: "15%",
            background: "linear-gradient(to bottom, hsl(var(--pineapple-gold) / 0.6), transparent)",
            borderRadius: 4,
            left: `calc(50% + ${offset}px)`,
            zIndex: 17,
            filter: "blur(0.5px)",
            transformOrigin: "top center",
          }}
          variants={{
            initial: { opacity: 0, scaleY: 0 },
            phase3: {
              opacity: [0, 0.7, 0.5],
              scaleY: [0, 0.6, 1],
              transition: { duration: 1.5, delay: 0.2 + i * 0.15, ease: "easeOut" },
            },
            phase4: {
              opacity: 0,
              scaleY: 0,
              transition: { duration: 0.6, delay: 0.1 },
            },
          }}
          animate={controls}
        />
      ))}

      {/* ═══ PHASE 4: GLASS RISES & FILLS WITH JUICE ═══ */}
      <motion.div
        className="relative"
        style={{ zIndex: 28 }}
        variants={{
          initial: { opacity: 0, y: 250, scale: 0.8 },
          phase3: {
            opacity: 1,
            y: 60,
            scale: 0.95,
            transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          },
          phase4: {
            y: 20,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
          },
          phase5: {
            y: 15,
            transition: { duration: 0.3 },
          },
        }}
        animate={controls}
      >
        <motion.img
          src={pineappleJuiceGlass}
          alt="Fresh Pineapple Juice"
          className="w-28 md:w-40 lg:w-44"
          style={{ filter: "drop-shadow(0 10px 25px hsl(var(--pineapple-gold) / 0.25))" }}
        />

        {/* Juice filling inside glass - rises from bottom */}
        <motion.div
          className="absolute bottom-[8%] left-[18%] right-[18%] rounded-b-md overflow-hidden pointer-events-none"
          style={{
            transformOrigin: "bottom",
            zIndex: 29,
            height: "68%",
            background: "linear-gradient(to top, hsl(var(--pineapple-gold) / 0.45), hsl(var(--pineapple-gold) / 0.2), transparent)",
            mixBlendMode: "overlay",
          }}
          variants={{
            initial: { scaleY: 0, opacity: 0 },
            phase3: {
              scaleY: 0.2,
              opacity: 0.3,
              transition: { duration: 0.8, delay: 0.5 },
            },
            phase4: {
              scaleY: [0.2, 0.5, 0.8, 1],
              opacity: [0.3, 0.6, 0.8, 0.95],
              transition: { duration: 1.8, ease: "easeOut" },
            },
          }}
          animate={controls}
        />

        {/* Rising bubbles inside glass */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 2 + (i % 3) * 2,
              height: 2 + (i % 3) * 2,
              background: `hsl(0 0% 100% / ${0.35 + i * 0.05})`,
              left: `${25 + i * 10}%`,
              bottom: `${15 + i * 5}%`,
              zIndex: 30,
            }}
            variants={{
              initial: { opacity: 0, y: 0 },
              phase4: {
                opacity: [0, 0.8, 0.6, 0],
                y: [0, -12, -28, -45],
                scale: [0.5, 1, 1.1, 0.3],
                transition: {
                  duration: 1.8,
                  delay: 0.4 + i * 0.2,
                  ease: "easeOut",
                },
              },
            }}
            animate={controls}
          />
        ))}

        {/* Glass golden glow aura */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.2) 0%, transparent 65%)",
          }}
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            phase4: {
              opacity: [0, 0.5, 0.8],
              scale: [0.9, 1.2, 1.5],
              transition: { duration: 1.5, delay: 0.5 },
            },
            phase5: {
              opacity: 1,
              scale: 1.6,
              transition: { duration: 0.5 },
            },
          }}
          animate={controls}
        />
      </motion.div>

      {/* ═══ PHASE 5: "JUST ₹10" BADGE ═══ */}
      <motion.div
        className="absolute bottom-4 md:bottom-8"
        style={{ zIndex: 40 }}
        variants={{
          initial: { scale: 0, opacity: 0, y: 30 },
          phase5: {
            scale: [0, 1.2, 0.95, 1.05, 1],
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            },
          },
        }}
        animate={controls}
      >
        <div className="bg-primary text-primary-foreground rounded-full px-8 py-3 md:px-10 md:py-4 shadow-pineapple relative overflow-hidden">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-wide">JUST ₹10</span>
          {/* Shine sweep across badge */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.3) 50%, transparent 100%)",
            }}
            variants={{
              initial: { x: "-100%" },
              phase5: {
                x: ["100%", "-100%", "100%"],
                transition: { duration: 2, delay: 0.5, ease: "easeInOut" },
              },
            }}
            animate={controls}
          />
        </div>
      </motion.div>

      {/* Celebration sparkles on price reveal */}
      {Array.from({ length: 8 }, (_, i) => {
        const sparkAngle = (i / 8) * Math.PI * 2;
        const sparkDist = 60 + (i % 3) * 25;
        return (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 3 + (i % 2) * 2,
              height: 3 + (i % 2) * 2,
              background: "hsl(var(--pineapple-gold))",
              boxShadow: "0 0 6px 2px hsl(var(--pineapple-gold) / 0.5)",
              bottom: "10%",
              zIndex: 38,
            }}
            variants={{
              initial: { opacity: 0, x: 0, y: 0, scale: 0 },
              phase5: {
                opacity: [0, 1, 0.7, 0],
                x: [0, Math.cos(sparkAngle) * sparkDist * 0.5, Math.cos(sparkAngle) * sparkDist, Math.cos(sparkAngle) * sparkDist * 1.2],
                y: [0, Math.sin(sparkAngle) * sparkDist * 0.5, Math.sin(sparkAngle) * sparkDist, Math.sin(sparkAngle) * sparkDist + 15],
                scale: [0, 1.3, 1, 0],
                transition: {
                  duration: 1.0,
                  delay: 0.3 + i * 0.06,
                  ease: "easeOut",
                },
              },
            }}
            animate={controls}
          />
        );
      })}
    </div>
  );
};

export default JuicePourAnimation;
