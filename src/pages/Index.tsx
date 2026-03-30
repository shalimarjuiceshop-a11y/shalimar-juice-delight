import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Citrus, GlassWater, Store, Snowflake } from "lucide-react";
import JuicePourAnimation from "@/components/JuicePourAnimation";
import MarqueeBanner from "@/components/MarqueeBanner";
import TestimonialCard from "@/components/TestimonialCard";
import PartiesOrderSection from "@/components/PartiesOrderSection";
import hotMilk from "@/assets/hot-milk.png";

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
  { name: "Rahul Sharma", text: "Best pineapple juice I've ever had! The taste is incredibly fresh and natural. I visit every week.", rating: 5, location: "Amravati" },
  { name: "Priya Deshmukh", text: "Winter Special milk with dry fruits is absolutely divine. My whole family loves it!", rating: 5, location: "Amravati" },
  { name: "Ahmed Khan", text: "Been coming here since childhood. The quality has never dropped. Truly a legacy of taste.", rating: 5, location: "Amravati" },
];

const Index = () => {
  return (
    <main className="overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen bg-gradient-animated flex items-center pt-16">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.span
              variants={fadeUp}
              className="inline-block font-body text-[11px] font-medium tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-6 border border-accent/20 text-header-muted bg-primary/8"
            >
              Since Generations
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-header-light"
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

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-7 py-3.5 rounded-full hover:brightness-105 hover:scale-[1.02] transition-all duration-300 glow-gold btn-glow"
              >
                Explore Menu
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/franchise"
                className="group inline-flex items-center gap-2 border border-header-accent/40 font-body text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-accent/10 hover:border-header-accent/60 text-header-light"
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
                className="card-premium p-8 text-center transition-all duration-300 group"
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
              <motion.p variants={slideInLeft} className="font-display text-lg md:text-xl font-semibold mb-2 text-foreground/80">
                Milk with Dry Fruits
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
                <img
                  src={hotMilk}
                  alt="Hot Energy Milk with Dry Fruits in Kulhad"
                  className="relative w-60 md:w-72 lg:w-80 rounded-2xl shadow-xl object-cover"
                />
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
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-7 py-3.5 rounded-full hover:brightness-105 hover:scale-[1.02] transition-all duration-300 glow-gold btn-glow"
              >
                Visit Us Today
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 border border-header-accent/40 font-body text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-accent/10 hover:border-header-accent/60 text-header-light"
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

export default Index;
