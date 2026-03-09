import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const openingHours = [
  { day: "Mon – Thu", time: "8:00 AM – 10:00 PM", isOpen: true },
  { day: "Fri – Sun", time: "8:00 AM – 11:00 PM", isOpen: true },
];

const ShopLocator = () => {
  // Check if currently open (rough estimate)
  const now = new Date();
  const hour = now.getHours();
  const isCurrentlyOpen = hour >= 8 && hour < 22;

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.span variants={fadeUp} className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
            Visit Us
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Find Our <span className="text-gradient-gold">Shop</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Left: Info Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="space-y-4 md:space-y-5"
          >
            {/* Status Badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isCurrentlyOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className={`font-body text-sm font-semibold ${isCurrentlyOpen ? 'text-green-600' : 'text-red-500'}`}>
                {isCurrentlyOpen ? 'Open Now' : 'Closed Now'}
              </span>
            </motion.div>

            {/* Address Card */}
            <motion.div
              variants={fadeUp}
              className="card-premium p-5 md:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-bold text-foreground mb-1">Location</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Perfect Complex, Jamil Colony,<br />
                    Front of Mohammadia Masjid,<br />
                    Walgaon Road, Amravati,<br />
                    Maharashtra – 444601
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              variants={fadeUp}
              className="card-premium p-5 md:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-foreground mb-3">Opening Hours</h3>
                  <div className="space-y-2">
                    {openingHours.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-body text-sm text-muted-foreground">{item.day}</span>
                        <span className="font-body text-sm font-medium text-foreground">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={fadeUp}
              className="card-premium p-5 md:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-foreground mb-0.5">Call Us</h3>
                  <a href="tel:+919852779933" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    +91 98527 79933
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://www.google.com/maps/dir//Perfect+Complex+Jamil+Colony+Walgaon+Road+Amravati+Maharashtra+444601"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-6 py-3.5 rounded-full hover:brightness-105 transition-all glow-gold-soft btn-glow"
              >
                <Navigation size={16} /> Get Directions
              </a>
              <a
                href="https://www.google.com/maps/place/Jamil+Colony,+Amravati"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border font-body text-sm font-semibold px-6 py-3.5 rounded-full text-foreground hover:bg-muted/50 transition-all"
              >
                <ExternalLink size={16} /> View on Maps
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-full min-h-[350px] md:min-h-[480px]">
              <iframe
                title="Shalimar Juice Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0!2d77.78!3d20.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU1JzQ4LjAiTiA3N8KwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                className="w-full h-full min-h-[350px] md:min-h-[480px]"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
            {/* Decorative gradient behind map */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopLocator;
