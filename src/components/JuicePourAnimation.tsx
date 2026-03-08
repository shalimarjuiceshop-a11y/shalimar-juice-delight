import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import pineappleFruit from "@/assets/pineapple-fruit.png";

const JuicePourAnimation = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseX(x);
      setMouseY(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center min-h-[420px] md:min-h-[540px] select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Deep ambient glow layers */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "90%",
          height: "90%",
          background:
            "radial-gradient(circle, hsl(var(--pineapple-gold) / 0.12) 0%, hsl(var(--pineapple-gold) / 0.04) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary glow - offset for depth */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(circle, hsl(42 100% 55% / 0.15) 0%, transparent 60%)",
          transform: "translate(10%, 10%)",
        }}
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Cinematic light rays */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = -30 + i * 15;
        return (
          <motion.div
            key={`ray-${i}`}
            className="absolute pointer-events-none"
            style={{
              width: 2,
              height: "120%",
              background: `linear-gradient(180deg, transparent, hsl(var(--pineapple-gold) / ${0.03 + i * 0.01}), transparent)`,
              transformOrigin: "center center",
              rotate: `${angle}deg`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Floating golden particles */}
      {Array.from({ length: 12 }, (_, i) => {
        const size = 2 + (i % 4) * 1.5;
        const xPos = 15 + (i * 7) % 70;
        const yStart = 20 + (i * 11) % 60;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              left: `${xPos}%`,
              top: `${yStart}%`,
              background: `hsl(var(--pineapple-gold) / ${0.3 + (i % 3) * 0.15})`,
              boxShadow: `0 0 ${size * 2}px hsl(var(--pineapple-gold) / 0.3)`,
            }}
            animate={{
              y: [0, -30 - (i % 4) * 10, 0],
              x: [0, (i % 2 === 0 ? 8 : -8), 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Main 3D pineapple container */}
      <motion.div
        className="relative z-10"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 8, 0, -8, 0],
          rotateX: [-2, 2, -2],
          y: [0, -15, 0],
        }}
        transition={{
          rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{
          scale: 1.05,
          rotateY: mouseX * 15,
          rotateX: -mouseY * 10,
          transition: { duration: 0.3 },
        }}
      >
        {/* Pineapple image with cinematic shadow */}
        <motion.img
          src={pineappleFruit}
          alt="Fresh Pineapple - 3D View"
          className="w-52 md:w-68 lg:w-80"
          initial={{ opacity: 0, scale: 0.7, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            filter:
              "drop-shadow(0 30px 50px hsl(var(--pineapple-gold) / 0.3)) drop-shadow(0 10px 20px hsl(30 10% 15% / 0.15))",
          }}
        />

        {/* Specular highlight overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 0% 100% / 0.15) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.05) 100%)",
            mixBlendMode: "overlay",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Dynamic shadow underneath */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "12%",
          width: "45%",
          height: 20,
          background:
            "radial-gradient(ellipse, hsl(30 10% 15% / 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 5,
        }}
        animate={{
          scaleX: [1, 0.85, 1],
          scaleY: [1, 0.7, 1],
          opacity: [0.4, 0.25, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default JuicePourAnimation;
