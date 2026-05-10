import { motion } from "framer-motion";
import shopPhoto1 from "@/assets/shop-photo-1.png";
import shopPhoto2 from "@/assets/shop-photo-2.png";
import shopPhoto3 from "@/assets/shop-photo-3.png";
import galleryPineapple from "@/assets/gallery-pineapple.jpeg";
import galleryMango from "@/assets/gallery-mango.jpeg";
import galleryApple from "@/assets/gallery-apple.jpeg";
import galleryOrange from "@/assets/gallery-orange.png";

/**
 * Cinematic Gallery Header Animation
 * - Transparent background that blends into the page header section.
 * - Continuous horizontal film-strip of real shop photos (marquee).
 * - Three floating polaroids with subtle tilt + drift (classy, premium).
 * - Pure CSS marquee + Framer Motion for the polaroids.
 */

const reel = [
  shopPhoto1,
  galleryPineapple,
  shopPhoto2,
  galleryMango,
  shopPhoto3,
  galleryApple,
  galleryOrange,
];

const FilmStrip = () => (
  <div className="relative h-[110px] md:h-[130px] overflow-hidden rounded-xl border border-primary/20 bg-shop-dark/40 backdrop-blur-sm">
    {/* sprocket holes top */}
    <div className="absolute top-0 left-0 right-0 h-3 flex items-center gap-2 px-2 bg-shop-dark/80 z-10">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="w-3 h-1.5 rounded-sm bg-background/15" />
      ))}
    </div>
    {/* sprocket holes bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-3 flex items-center gap-2 px-2 bg-shop-dark/80 z-10">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="w-3 h-1.5 rounded-sm bg-background/15" />
      ))}
    </div>

    {/* moving strip */}
    <motion.div
      className="absolute top-3 bottom-3 left-0 flex gap-3 px-3 will-change-transform"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
    >
      {[...reel, ...reel].map((src, i) => (
        <div
          key={i}
          className="relative h-full aspect-[4/3] rounded-md overflow-hidden border border-primary/30 shadow-md flex-shrink-0"
        >
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-shop-dark/40 to-transparent" />
        </div>
      ))}
    </motion.div>

    {/* edge fades to blend with section */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[hsl(var(--shop-dark))] to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[hsl(var(--shop-dark))] to-transparent z-10" />
  </div>
);

const Polaroid = ({
  src,
  caption,
  rotate,
  className,
  delay = 0,
}: {
  src: string;
  caption: string;
  rotate: number;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute hidden md:block bg-cream p-2 pb-6 rounded-sm shadow-2xl ${className ?? ""}`}
    style={{ rotate: `${rotate}deg` }}
    initial={{ opacity: 0, y: 30, scale: 0.85 }}
    animate={{
      opacity: 1,
      y: [0, -6, 0],
      scale: 1,
    }}
    transition={{
      opacity: { duration: 0.8, delay },
      scale: { duration: 0.8, delay },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
    }}
    whileHover={{ scale: 1.06, rotate: rotate * 0.4, transition: { duration: 0.3 } }}
  >
    <div className="w-[110px] h-[90px] overflow-hidden">
      <img src={src} alt={caption} className="w-full h-full object-cover" loading="lazy" />
    </div>
    <p className="text-center font-display text-[10px] font-bold text-shop-dark mt-1 tracking-wide">
      {caption}
    </p>
  </motion.div>
);

const GalleryShopAnimation = () => {
  return (
    <div
      className="relative w-full max-w-3xl mx-auto"
      aria-label="Shalimar Juice photo reel and polaroid memories"
    >
      {/* Floating polaroids on the sides (desktop only) */}
      <Polaroid
        src={shopPhoto1}
        caption="OUR SHOP"
        rotate={-9}
        className="-left-6 -top-6 z-20"
        delay={0.2}
      />
      <Polaroid
        src={galleryPineapple}
        caption="₹10 SHAKE"
        rotate={8}
        className="-right-6 -top-4 z-20"
        delay={0.5}
      />
      <Polaroid
        src={shopPhoto2}
        caption="OUR TEAM"
        rotate={-6}
        className="-right-10 -bottom-10 z-20"
        delay={0.8}
      />

      {/* Main film strip */}
      <FilmStrip />

      {/* tiny sparkles overlay */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/70 pointer-events-none"
          style={{
            left: `${15 + i * 18}%`,
            top: i % 2 === 0 ? "-8px" : "auto",
            bottom: i % 2 === 1 ? "-8px" : "auto",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
};

export default GalleryShopAnimation;
