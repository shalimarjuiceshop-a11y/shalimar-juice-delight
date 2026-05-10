import { motion } from "framer-motion";
import shopPhoto1 from "@/assets/shop-photo-1.png";
import shopPhoto2 from "@/assets/shop-photo-2.png";
import shopPhoto3 from "@/assets/shop-photo-3.png";
import galleryPineapple from "@/assets/gallery-pineapple.jpeg";
import galleryMango from "@/assets/gallery-mango.jpeg";
import galleryApple from "@/assets/gallery-apple.jpeg";
import galleryOrange from "@/assets/gallery-orange.png";
import galleryGuava from "@/assets/gallery-guava.jpeg";
import galleryFalooda from "@/assets/gallery-falooda.jpeg";

/**
 * Premium Gallery Header — minimal, classy, fully transparent.
 * A continuous marquee of real shop photos with soft edge fades.
 * No harsh borders, no sprocket holes — pure editorial look.
 */

const reel = [
  shopPhoto1,
  galleryPineapple,
  shopPhoto2,
  galleryMango,
  shopPhoto3,
  galleryApple,
  galleryOrange,
  galleryGuava,
  galleryFalooda,
];

const GalleryShopAnimation = () => {
  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      aria-label="Shalimar Juice photo reel"
    >
      {/* soft glow halo behind strip */}
      <div
        className="pointer-events-none absolute -inset-x-8 top-1/2 -translate-y-1/2 h-32 blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--pineapple-gold) / 0.35), transparent 70%)",
        }}
      />

      {/* The marquee row */}
      <div className="relative h-[180px] md:h-[220px] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center gap-4 md:gap-6 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...reel, ...reel].map((src, i) => (
            <motion.div
              key={i}
              className="relative h-[160px] md:h-[200px] w-[140px] md:w-[170px] rounded-2xl overflow-hidden flex-shrink-0 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.55)] ring-1 ring-primary/25"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* edge fades — blend perfectly into header bg */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(to right, hsl(35 40% 28%) 0%, hsl(35 40% 28% / 0.85) 40%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(to left, hsl(35 40% 28%) 0%, hsl(35 40% 28% / 0.85) 40%, transparent 100%)",
          }}
        />
      </div>

      {/* hairline accent under the strip */}
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
};

export default GalleryShopAnimation;
