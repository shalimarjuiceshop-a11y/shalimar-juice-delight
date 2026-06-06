import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, MapPin } from "lucide-react";
import shopTour from "@/assets/shop-tour.mp4.asset.json";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ShopTourSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Pause when out of view to save bandwidth
  useEffect(() => {
    const el = sectionRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* ambient gold glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-primary/[0.05] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="font-body text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-primary/80 mb-3 block">
            — Inside Our Shop —
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            A Glimpse of <span className="text-gradient-gold">Shalimar Juice</span>
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            Step inside — see how every glass is crafted fresh, daily, with care.
          </p>
        </motion.div>

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: smoothEase }}
          className="relative group"
        >
          {/* rotating gold conic frame */}
          <motion.div
            aria-hidden
            className="absolute -inset-[2px] rounded-3xl opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, hsl(var(--pineapple-gold)/0), hsl(var(--pineapple-gold)/0.6), hsl(var(--pineapple-gold)/0) 55%)",
              filter: "blur(2px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          />

          <div className="relative rounded-3xl overflow-hidden ring-1 ring-border bg-black shadow-[0_30px_80px_-25px_rgba(0,0,0,0.6)]">
            {/* 9:16 portrait on mobile, 16:9 cinematic on desktop via aspect */}
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-black">
              <video
                ref={videoRef}
                src={shopTour.url}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />

              {/* top cinematic gradient + LIVE badge */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-black/55 backdrop-blur-md text-white text-[10px] font-body font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full ring-1 ring-white/15">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                  Shop Tour
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 bg-black/55 backdrop-blur-md text-white/90 text-[10px] font-body font-medium tracking-wider uppercase px-3 py-1.5 rounded-full ring-1 ring-white/15">
                  <MapPin size={11} /> Amravati
                </span>
              </div>

              {/* bottom gradient + controls */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="text-white">
                  <p className="font-display text-sm md:text-base font-semibold leading-tight">
                    Shalimar Juice Shop
                  </p>
                  <p className="font-body text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-white/70 mt-0.5">
                    Fresh · Daily · Since Day One
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white flex items-center justify-center ring-1 ring-white/20 transition"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-primary text-primary-foreground hover:brightness-110 flex items-center justify-center shadow-lg glow-gold transition"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-[1px]" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopTourSection;
