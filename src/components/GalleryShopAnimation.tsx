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
      <div className="relative h-[150px] md:h-[180px] overflow-hidden">
        <motion.div
          className="absolute inset-y-2 left-0 flex items-center gap-4 md:gap-5 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...reel, ...reel].map((src, i) => (
            <motion.div
              key={i}
              className="relative h-full aspect-[4/5] rounded-2xl overflow-hidden flex-shrink-0 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-primary/15"
              whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* subtle vignette for cohesion */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* edge fades — blend perfectly into header bg */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--shop-dark)), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(to left, hsl(var(--shop-dark)), transparent)",
          }}
        />
      </div>

      {/* hairline accent under the strip */}
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
};

export default GalleryShopAnimation;
