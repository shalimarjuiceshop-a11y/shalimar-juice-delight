import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(45 100% 60%) 0%, hsl(38 95% 50%) 50%, hsl(45 100% 60%) 100%)",
        boxShadow:
          "0 0 10px hsl(45 100% 55% / 0.6), 0 0 20px hsl(45 100% 55% / 0.4)",
      }}
    />
  );
};

export default ScrollProgressBar;
