import { motion } from "framer-motion";
import ShopLocator from "@/components/ShopLocator";
import MapWalkingAnimation from "@/components/MapWalkingAnimation";
import PartyOrderForm from "@/components/PartyOrderForm";
import FranchiseInquiryForm from "@/components/FranchiseInquiryForm";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const ContactPage = () => {
  return (
    <main className="pt-20 bg-background min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-accent/30 text-header-muted bg-primary/10">
              Get in Touch
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-header-light">
              Contact <span className="text-gradient-gold-shine">Us</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-3 max-w-md mx-auto text-header-muted">
              Humse miliye ya call karein — hum hamesha aapki seva mein hain!
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl pt-12 md:pt-16 pb-16">
        {/* Two Forms Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          <PartyOrderForm />
          <FranchiseInquiryForm />
        </div>
        {/* Animated Map */}
        <div className="mb-16">
          <MapWalkingAnimation />
        </div>
      </div>

      {/* Shop Locator Component */}
      <ShopLocator />
    </main>
  );
};

export default ContactPage;
