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
 * Edge-to-edge cinematic photo marquee.
 * Sharp, official, no blur. Subtle edge fades blend into header bg.
 */

const reel = [
  { src: shopPhoto1, label: "Our Shop" },
  { src: galleryPineapple, label: "Pineapple ₹10" },
  { src: shopPhoto2, label: "Our Team" },
  { src: galleryMango, label: "Mango ₹10" },
  { src: shopPhoto3, label: "Fresh Counter" },
  { src: galleryApple, label: "Apple ₹10" },
  { src: galleryOrange, label: "Orange ₹50" },
  { src: galleryGuava, label: "Guava ₹10" },
  { src: galleryFalooda, label: "Falooda ₹30" },
];

const GalleryShopAnimation = () => {
  return (
    <div
      className="relative w-full overflow-hidden"
      aria-label="Shalimar Juice photo reel"
    >
      {/* Hairline accent above */}
      <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-5" />

      <div className="relative h-[200px] md:h-[240px]">
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center gap-3 md:gap-4 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...reel, ...reel].map((item, i) => (
            <div
              key={i}
              className="relative h-[180px] md:h-[220px] w-[150px] md:w-[180px] rounded-xl overflow-hidden flex-shrink-0 bg-shop-dark ring-1 ring-primary/15 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.7)]"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover block"
                loading="eager"
                decoding="async"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
                <p className="font-display text-[11px] md:text-xs font-bold text-cream tracking-tight truncate">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Edge fades blend into header bg */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 z-10"
          style={{ background: "linear-gradient(to right, hsl(var(--page-header)) 0%, transparent 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 z-10"
          style={{ background: "linear-gradient(to left, hsl(var(--page-header)) 0%, transparent 100%)" }}
        />
      </div>
    </div>
  );
};

export default GalleryShopAnimation;
