import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn, Instagram, Play, ExternalLink } from "lucide-react";
import shopPhoto1 from "@/assets/shop-photo-1.png";
import shopPhoto2 from "@/assets/shop-photo-2.png";
import shopPhoto3 from "@/assets/shop-photo-3.png";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};

const photos = [
  { src: shopPhoto1, alt: "Shalimar Juice Shop - Main Counter", caption: "Our Shop" },
  { src: shopPhoto2, alt: "Shalimar Juice Shop - Team & Fresh Juices", caption: "Our Team at Work" },
  { src: shopPhoto3, alt: "Shalimar Juice Shop - Fresh Juice Counter", caption: "Fresh Juice Counter" },
];

const instagramReels = [
  "https://www.instagram.com/reel/DVmkM40jLBH/",
];

const reelVideos = [
  { title: "Pineapple Juice Making", thumbnail: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&h=700&fit=crop", url: "https://www.instagram.com/shalimarjuiceshop/" },
  { title: "Fresh Apple Shake", thumbnail: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=700&fit=crop", url: "https://www.instagram.com/shalimarjuiceshop/" },
  { title: "Mango Season Special", thumbnail: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=700&fit=crop", url: "https://www.instagram.com/shalimarjuiceshop/" },
  { title: "Dry Fruit Milk Recipe", thumbnail: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=700&fit=crop", url: "https://www.instagram.com/shalimarjuiceshop/" },
];

const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, []);

  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goPrev() : goNext();
    }
    setTouchStart(null);
  };

  // Keyboard support
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  }, [goNext, goPrev]);

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-accent/30 text-header-muted bg-primary/10"
            >
              <Camera size={13} /> Our Shop
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-header-light">
              Photo <span className="text-gradient-gold">Gallery</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-3 max-w-md mx-auto text-header-muted">
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
                onClick={() => openLightbox(i)}
                className="group card-premium overflow-hidden transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Zoom overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-card/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ZoomIn size={20} className="text-foreground" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="font-display text-sm font-bold text-foreground">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Video Reels Section */}
      <section className="py-14 md:py-20 bg-muted/40 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-4 bg-primary/10 text-primary">
              <Play size={12} /> Watch & Enjoy
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Juice <span className="text-gradient-gold">Reels</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              Watch how we make fresh juices — real fruits, real taste!
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto"
          >
            {reelVideos.map((reel, i) => (
              <motion.a
                key={i}
                variants={fadeUp}
                href={reel.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative card-premium overflow-hidden aspect-[9/16] cursor-pointer"
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent flex flex-col items-center justify-end p-3">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Play size={20} className="text-primary-foreground ml-0.5" fill="currentColor" />
                    </motion.div>
                  </div>
                  <p className="font-display text-xs font-bold text-white text-center leading-tight drop-shadow-lg">
                    {reel.title}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-14 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 text-pink-600">
              <Instagram size={12} /> Follow Us
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              On <span className="text-gradient-gold">Instagram</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              Follow @shalimarjuiceshop for daily updates, offers & behind-the-scenes!
            </motion.p>
          </motion.div>

          {/* Instagram Reel Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="flex flex-col items-center gap-8 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full justify-items-center">
              {instagramReels.map((reelUrl, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="card-premium overflow-hidden w-full max-w-[350px]"
                >
                  <iframe
                    src={`${reelUrl}embed`}
                    className="w-full border-0"
                    style={{ minHeight: "520px" }}
                    loading="lazy"
                    allowTransparency
                    title={`Instagram reel ${i + 1}`}
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA Card */}
            <a
              href="https://www.instagram.com/shalimarjuiceshop/"
              target="_blank"
              rel="noreferrer"
              className="group card-premium block overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-xl"
            >
              <div className="p-6 md:p-8 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Instagram size={28} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-foreground">@shalimarjuiceshop</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Follow for daily specials & behind-the-scenes! 🍍🥤
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-body text-sm font-bold group-hover:gap-3 transition-all duration-300">
                  Visit our Instagram <ExternalLink size={14} />
                </div>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href="https://www.instagram.com/shalimarjuiceshop/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-body text-sm font-bold px-7 py-3.5 rounded-full hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              <Instagram size={18} /> Follow @shalimarjuiceshop <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center font-body text-sm text-muted-foreground pb-12"
      >
        More content coming soon! 📸🎬
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={(el) => el?.focus()}
            style={{ outline: "none" }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "hsl(30 15% 6% / 0.92)", backdropFilter: "blur(20px)" }}
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-cream" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
              <span className="font-body text-xs font-semibold px-3 py-1.5 rounded-full bg-muted/20 text-cream">
                {lightboxIndex + 1} / {photos.length}
              </span>
            </div>

            {/* Prev button */}
            <button
              onClick={goPrev}
              className="absolute left-3 md:left-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/20 hover:bg-muted/40 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={24} className="text-cream" />
            </button>

            {/* Next button */}
            <button
              onClick={goNext}
              className="absolute right-3 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/20 hover:bg-muted/40 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={24} className="text-cream" />
            </button>

            {/* Image */}
            <div
              className="relative z-40 w-full max-w-4xl px-12 md:px-20"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9, x: 60 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -60 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                  className="text-center"
                >
                  <img
                    src={photos[lightboxIndex].src}
                    alt={photos[lightboxIndex].alt}
                    className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-base font-bold mt-4 text-cream"
                  >
                    {photos[lightboxIndex].caption}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default GalleryPage;
