import { motion } from "framer-motion";
import ShopLocator from "@/components/ShopLocator";
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

        {/* Two Forms Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          <PartyOrderForm />
          <FranchiseInquiryForm />
        </div>
      </div>

      {/* Shop Locator Component */}
      <ShopLocator />
    </main>
  );
};

export default ContactPage;
