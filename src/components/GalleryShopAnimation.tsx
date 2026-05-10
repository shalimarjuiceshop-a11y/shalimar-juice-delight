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
 * Swiggy-grade Gallery Header — crisp marquee of real photos.
 * No blur, no halo, no overlays. Sharp edges, tight spacing.
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
      className="relative w-full max-w-5xl mx-auto"
      aria-label="Shalimar Juice photo reel"
    >
      <div className="relative h-[200px] md:h-[240px] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center gap-3 md:gap-4 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...reel, ...reel].map((item, i) => (
            <motion.div
              key={i}
              className="relative h-[180px] md:h-[220px] w-[150px] md:w-[180px] rounded-xl overflow-hidden flex-shrink-0 bg-shop-dark shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]"
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover block"
                loading="eager"
                decoding="async"
                draggable={false}
              />
              {/* caption */}
              <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <p className="font-display text-[11px] md:text-xs font-bold text-cream tracking-tight">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryShopAnimation;
