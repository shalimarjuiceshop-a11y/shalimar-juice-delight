import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Perfect Complex, Jamil Colony, Front of Mohammadia Masjid, Walgaon Road, Amravati, Maharashtra – 444601" },
  { icon: Phone, label: "Phone", value: "+91 98527 79933", href: "tel:+919852779933" },
  { icon: Mail, label: "Email", value: "shalimarjuiceshop@gmail.com", href: "mailto:shalimarjuiceshop@gmail.com" },
  { icon: Clock, label: "Timings", value: "Mon – Sun: 8:00 AM – 10:00 PM" },
];

const ContactPage = () => {
  return (
    <main className="pt-20 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
            Get in Touch
          </motion.span>
          <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Contact <span className="text-gradient-gold">Us</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-md mx-auto">
            Humse miliye ya call karein — hum hamesha aapki seva mein hain!
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card-premium p-5 flex items-start gap-4 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-foreground mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://wa.me/919852779933"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-6 py-3 rounded-full hover:brightness-105 transition-all glow-gold-soft btn-glow"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/shalimarjuiceshop/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border font-body text-sm font-semibold px-6 py-3 rounded-full text-foreground hover:bg-muted/50 transition-all"
              >
                <Instagram size={16} /> Instagram
              </a>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="rounded-2xl overflow-hidden border border-border shadow-sm"
          >
            <iframe
              title="Shalimar Juice Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0!2d77.78!3d20.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU1JzQ4LjAiTiA3N8KwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              className="w-full h-full min-h-[360px] md:min-h-[480px]"
              loading="lazy"
              style={{ border: 0 }}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
