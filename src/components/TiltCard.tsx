import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glareColor?: string;
}

const TiltCard = ({ children, className = "", onClick, glareColor = "hsl(45 100% 80% / 0.15)" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 16;
    const rotateY = (x - 0.5) * 16;
    setTilt({ rotateX, rotateY });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.25 });
  };

  const handleLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`relative cursor-pointer ${className}`}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${glareColor}, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
