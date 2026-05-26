import { motion } from "framer-motion";
import scooterImg from "@/assets/delivery-scooter.png";

/**
 * Premium 3D delivery scooter that rides in from the left,
 * pauses at center ~4s, then rides off right. Realistic asphalt road.
 */
const OrderBikeAnimation = () => {
  const TOTAL = 8;
  const tEnter = 1.4 / TOTAL;
  const tHoldEnd = (1.4 + 4) / TOTAL;
  const tExit = (1.4 + 4 + 1.4) / TOTAL;

  return (
    <div
      className="relative mx-auto mb-4 w-full max-w-[320px] h-[110px] overflow-hidden rounded-lg"
      aria-hidden="true"
    >
      {/* Asphalt road */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[28px]"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 18%) 0%, hsl(0 0% 12%) 60%, hsl(0 0% 8%) 100%)",
        }}
      />
      {/* Road top edge highlight */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{ bottom: 28, background: "hsl(0 0% 30% / 0.6)" }}
      />
      {/* Center dashed lane */}
      <motion.div
        className="absolute left-0 right-0 flex gap-3"
        style={{ bottom: 12, height: 2 }}
        animate={{ x: [0, -28] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="block flex-shrink-0 rounded-sm"
            style={{ width: 14, height: 2, background: "hsl(45 95% 65% / 0.85)" }}
          />
        ))}
      </motion.div>

      {/* Subtle horizon glow */}
      <div
        className="absolute left-0 right-0 top-0 h-[82px]"
        style={{
          background:
            "linear-gradient(180deg, hsl(35 60% 14% / 0.6) 0%, transparent 100%)",
        }}
      />

      {/* Scooter rider — animated across full container width, perfectly centered at hold */}
      <motion.div
        className="absolute"
        style={{ bottom: 14, left: "50%" }}
        animate={{
          x: ["calc(-50% - 200px)", "-50%", "-50%", "calc(50vw + 200px)", "calc(50vw + 200px)"],
        }}
        transition={{
          duration: TOTAL,
          times: [0, tEnter, tHoldEnd, tExit, 1],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.img
          src={scooterImg}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="block h-[82px] w-auto drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]"
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

    </div>
  );
};

export default OrderBikeAnimation;
