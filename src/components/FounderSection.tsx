import { motion } from "framer-motion";
import founder from "@/assets/founder-sameer.png.asset.json";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FounderSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-[auto,1fr] gap-10 md:gap-14 items-center justify-items-center md:justify-items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="relative shrink-0"
          >
            <div className="relative w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden ring-1 ring-border bg-muted shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)]">
              <img
                src={founder.url}
                alt="Sameer Ahmad — Founder, Shalimar Juice Shop, Amravati"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            {/* hairline gold underline */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-px w-16 bg-primary/60" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: smoothEase, delay: 0.1 }}
            className="text-center md:text-left max-w-md"
          >
            <p className="font-body text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-primary/80 mb-4">
              Founder
            </p>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
              Sameer Ahmad
            </h3>
            <p className="font-body text-xs md:text-sm text-muted-foreground mt-1 mb-5">
              Shalimar Juice Shop · Amravati
            </p>

            <p className="font-body text-sm md:text-[15px] text-foreground/80 leading-relaxed">
              Building Amravati's most-loved juice brand — one fresh glass at a time.
              From a single counter to a growing franchise network, every shop carries
              the same standard of quality, hygiene and taste.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
