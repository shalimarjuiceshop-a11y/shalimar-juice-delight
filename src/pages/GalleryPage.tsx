import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import shopPhoto1 from "@/assets/shop-photo-1.png";
import shopPhoto2 from "@/assets/shop-photo-2.png";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const photos = [
  { src: shopPhoto1, alt: "Shalimar Juice Shop - Main Counter", caption: "Our Shop" },
  { src: shopPhoto2, alt: "Shalimar Juice Shop - Team & Fresh Juices", caption: "Our Team at Work" },
];

const GalleryPage = () => {
  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-accent/30"
              style={{ color: "hsl(45 60% 70%)", background: "hsl(45 100% 50% / 0.08)" }}
            >
              <Camera size={13} /> Our Shop
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "hsl(45 100% 96%)" }}>
              Photo <span className="text-gradient-gold">Gallery</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-3 max-w-md mx-auto" style={{ color: "hsl(45 30% 70%)" }}>
              A glimpse of Shalimar Juice Shop & our fresh preparations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group card-premium overflow-hidden transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-display text-sm font-bold text-foreground">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* More photos coming */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-body text-sm text-muted-foreground mt-10"
          >
            More photos coming soon! 📸
          </motion.p>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
