import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import founder from "@/assets/founder-sameer.png.asset.json";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FounderSection = () => {
  return (
    <section className="relative py-14 md:py-20 bg-background overflow-hidden">
      {/* subtle gold ambient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-10 items-center justify-items-center md:justify-items-start">
          {/* Portrait — circular, gold ring, soft floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: smoothEase }}
            className="relative shrink-0"
          >
            {/* outer rotating gold conic ring */}
            <motion.div
              aria-hidden
              className="absolute -inset-3 rounded-full opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(var(--pineapple-gold)/0.0), hsl(var(--pineapple-gold)/0.55), hsl(var(--pineapple-gold)/0.0) 60%)",
                filter: "blur(6px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            />
            {/* static inner gold ring */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-primary/70 via-primary/20 to-primary/70" />
            {/* portrait */}
            <motion.div
              className="relative w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden ring-1 ring-border bg-muted shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={founder.url}
                alt="Sameer Ahmad — Founder of Shalimar Juice Shop, Amravati"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover scale-[1.02]"
              />
              {/* subtle bottom vignette for premium feel */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* signature gold badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: smoothEase }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-display text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg glow-gold whitespace-nowrap"
            >
              Est. Amravati
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: smoothEase, delay: 0.15 }}
            className="text-center md:text-left max-w-xl"
          >
            <Quote className="w-7 h-7 text-primary/60 mx-auto md:mx-0 mb-4" strokeWidth={1.4} />

            <p className="font-display text-lg md:text-xl lg:text-2xl font-medium leading-snug text-foreground mb-5">
              Building Amravati's most trusted juice brand —
              <span className="text-gradient-gold"> one fresh glass at a time.</span>
            </p>


            <div className="h-px w-16 bg-primary/40 mx-auto md:mx-0 mb-5" />

            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Sameer Ahmad
            </h3>
            <p className="font-body text-xs md:text-sm tracking-[0.18em] uppercase text-primary/80 mt-1 mb-4">
              Founder · Shalimar Juice Shop
            </p>

            <p className="font-body text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              For years, Sameer has crafted Amravati's most-loved juices, shakes & dry-fruit
              specials — now expanding through franchise, with new signature drinks on the way.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
