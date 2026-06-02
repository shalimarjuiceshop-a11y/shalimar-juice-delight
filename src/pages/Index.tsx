import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Citrus, GlassWater, Store, Snowflake } from "lucide-react";
import JuicePourAnimation from "@/components/JuicePourAnimation";
import MarqueeBanner from "@/components/MarqueeBanner";
import TestimonialCard from "@/components/TestimonialCard";
import PartiesOrderSection from "@/components/PartiesOrderSection";
import Typewriter from "@/components/Typewriter";
import hotMilk from "@/assets/hot-milk.png";
import hotMilkKadhai from "@/assets/hot-milk-kadhai.png";
import freshnessVideo from "@/assets/freshness-hero.mp4.asset.json";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: smoothEase } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: smoothEase } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: smoothEase } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } },
};

const testimonials = [
  { name: "Sajid Ahmad", text: "Best pineapple juice I've ever had! The taste is so fresh and natural. I come here every week.", rating: 5, location: "Amravati" },
  { name: "Rizwan Khan", text: "Winter Special milk with dry fruits is amazing. My whole family loves it!", rating: 5, location: "Amravati" },
  { name: "Shaikh Sohel", text: "Been coming here since childhood. The quality never dropped. Truly the best juice shop.", rating: 5, location: "Amravati" },
];



const Index = () => {
  return (
    <main className="overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen bg-gradient-animated flex items-center pt-16">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="text-center lg:text-left">

            <motion.h1
              variants={fadeUp}
              className="font-display text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-header-light break-words"
            >
              Fresh <span className="text-gradient-gold">Pineapple Juice</span>
              <br />
              for a Healthy Life
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed text-header-muted/90"
            >
              Experience the taste of real, natural pineapple goodness — made fresh daily at Shalimar Juice Shop.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start items-stretch sm:items-center">
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-7 py-3.5 rounded-full hover:brightness-105 hover:scale-[1.02] transition-all duration-300 glow-gold btn-glow w-full sm:w-auto sm:min-w-[180px]"
              >
                Explore Menu
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/franchise"
                className="group inline-flex items-center justify-center gap-2 border border-header-accent/40 font-body text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-accent/10 hover:border-header-accent/60 text-header-light w-full sm:w-auto sm:min-w-[180px]"
              >
                Get Franchise <Handshake size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" animate="show" className="relative flex justify-center items-center">
            <JuicePourAnimation />
          </motion.div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <MarqueeBanner />

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 md:py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="font-body text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
              Why Choose Us
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Why Choose <span className="text-gradient-gold">Shalimar Juice</span>?
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { icon: Citrus, title: "100% Fresh Fruits", desc: "We use only fresh, handpicked fruits every single day. No artificial flavors ever." },
              { icon: GlassWater, title: "Made Fresh Daily", desc: "Every glass is prepared fresh when you order. Zero preservatives, zero compromise." },
              { icon: Store, title: "Franchise Available", desc: "Start your own Shalimar Juice shop with our affordable franchise plans across India." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                className="card-premium p-8 text-center transition-all duration-300 group h-full flex flex-col"
              >

                <motion.div
                  className="w-12 h-12 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300"
                  whileHover={{ rotate: 6, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-display text-base font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ WINTER SPECIAL ═══ */}
      <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="text-center md:text-left"
            >
              <motion.span variants={slideInLeft} className="inline-flex items-center gap-1.5 text-[11px] font-body font-medium tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 bg-primary/10 text-pineapple-dark">
                <Snowflake size={13} /> Winter Special
              </motion.span>
              <motion.h2 variants={slideInLeft} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-foreground leading-[1.1]">
                Special for <span className="text-gradient-gold">Winter</span>
              </motion.h2>
              <motion.p variants={slideInLeft} className="font-display text-lg md:text-xl font-semibold mb-2 text-foreground/80 min-h-[1.5em]">
                <Typewriter text="Milk with Dry Fruits" speed={95} pause={2400} />
              </motion.p>
              <motion.p variants={slideInLeft} className="font-body text-sm md:text-base text-muted-foreground mb-2 leading-relaxed">
                Warm kulhad milk topped with almonds, cashews, pistachios & saffron — the perfect winter warmer.
              </motion.p>
              <motion.p variants={slideInLeft} className="font-body text-xs text-muted-foreground/60 mb-6">
                Made fresh with real dry fruits. Served hot in a traditional kulhad.
              </motion.p>
              <motion.span
                variants={scaleUp}
                className="inline-block bg-primary text-primary-foreground font-display text-xl md:text-2xl font-bold px-8 py-3 rounded-full glow-gold"
              >
                Only ₹30
              </motion.span>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="flex justify-center"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-3xl" />

                {/* Professional cinematic steam — realistic SVG turbulence wisps rising from kulhad */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-30"
                  style={{ top: "-15%", width: "65%", height: "40%" }}
                >
                  <svg
                    viewBox="0 0 200 240"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                    style={{ overflow: "visible" }}
                  >
                    <defs>
                      <filter id="steamTurb" x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.018 0.04" numOctaves="2" seed="3">
                          <animate attributeName="baseFrequency" dur="22s" values="0.018 0.04;0.024 0.048;0.018 0.04" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" scale="20" />
                        <feGaussianBlur stdDeviation="3" />
                      </filter>
                      <radialGradient id="steamGrad" cx="50%" cy="80%" r="60%">
                        <stop offset="0%" stopColor="hsl(50 100% 78%)" stopOpacity="1" />
                        <stop offset="45%" stopColor="hsl(48 95% 75%)" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="hsl(46 90% 72%)" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {[
                      { delay: 0,   x: 100, dur: 9.0 },
                      { delay: 2.2, x: 86,  dur: 9.6 },
                      { delay: 4.4, x: 114, dur: 9.2 },
                      { delay: 6.6, x: 94,  dur: 9.8 },
                    ].map((s, i) => (
                      <motion.ellipse
                        key={i}
                        cx={s.x}
                        cy="220"
                        rx="22"
                        ry="34"
                        fill="url(#steamGrad)"
                        filter="url(#steamTurb)"
                        initial={{ opacity: 0 }}
                        animate={{
                          cy: [220, 110],
                          rx: [14, 30],
                          ry: [22, 48],
                          opacity: [0, 1, 0.85, 0],
                        }}
                        transition={{
                          duration: s.dur,
                          delay: s.delay,
                          repeat: Infinity,
                          ease: [0.4, 0, 0.2, 1],
                          times: [0, 0.25, 0.7, 1],
                        }}
                      />
                    ))}
                  </svg>
                </div>


                <WinterImageSwitcher />

              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PARTIES ORDER ═══ */}
      <PartiesOrderSection />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 md:py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="font-body text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              What People <span className="text-gradient-gold">Say</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28 bg-gradient-animated overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-header-light mb-4 leading-[1.1]">
              Ready to Taste the <span className="text-gradient-gold">Freshness</span>?
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg text-header-muted/90 mb-10 max-w-lg mx-auto">
              Visit Shalimar Juice Shop today or explore our franchise opportunities to start your own journey.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-stretch sm:items-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-7 py-3.5 rounded-full hover:brightness-105 hover:scale-[1.02] transition-all duration-300 glow-gold btn-glow w-full sm:w-auto sm:min-w-[200px]"
              >
                Visit Us Today
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/franchise"
                className="inline-flex items-center justify-center gap-2 border border-header-accent/40 font-body text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-accent/10 hover:border-header-accent/60 text-header-light w-full sm:w-auto sm:min-w-[200px]"
              >
                Franchise Plans <Handshake size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const WINTER_IMAGES = [
  { src: hotMilk, alt: "Hot Energy Milk with Dry Fruits in Kulhad" },
  { src: hotMilkKadhai, alt: "Steaming Kadhai of Dry Fruit Milk" },
];

const HOLD_MS = 5000;   // fully show each image for 5s
const FADE_MS = 1400;   // smooth 1.4s crossfade

const WinterImageSwitcher = () => {
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload both images so the swap never shows a blank/loading frame
  useEffect(() => {
    let loaded = 0;
    WINTER_IMAGES.forEach(({ src }) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded === WINTER_IMAGES.length) setReady(true);
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % WINTER_IMAGES.length),
      HOLD_MS + FADE_MS,
    );
    return () => clearInterval(t);
  }, [ready]);

  return (
    <div className="relative w-60 md:w-72 lg:w-80 aspect-square z-10">
      {WINTER_IMAGES.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full rounded-2xl shadow-xl object-contain transition-opacity ease-in-out"
          style={{
            opacity: ready && i === idx ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {WINTER_IMAGES.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all ease-out"
            style={{
              width: i === idx ? 24 : 6,
              background:
                i === idx ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.3)",
              transitionDuration: `${FADE_MS}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};


export default Index;
