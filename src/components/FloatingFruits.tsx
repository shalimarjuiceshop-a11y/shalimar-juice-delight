import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

const FloatingFruits = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top-right pineapple */}
      <motion.img
        src={pineappleFruit}
        alt=""
        className="absolute -top-10 -right-10 w-32 md:w-48 opacity-[0.06]"
        style={{ y: y1, rotate: rotate1 }}
      />
      
      {/* Bottom-left slices */}
      <motion.img
        src={pineappleSlices}
        alt=""
        className="absolute bottom-20 -left-8 w-28 md:w-40 opacity-[0.05]"
        style={{ y: y2, rotate: rotate2 }}
      />
      
      {/* Mid-right small fruit */}
      <motion.img
        src={pineappleFruit}
        alt=""
        className="absolute top-1/2 -right-6 w-20 md:w-28 opacity-[0.04]"
        style={{ y: y3, rotate: rotate1 }}
      />

      {/* Floating golden particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingFruits;
