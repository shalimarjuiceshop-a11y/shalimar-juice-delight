import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, AlertTriangle, Building2, GraduationCap, Package, Lock, ArrowRight } from "lucide-react";

type Lang = "hinglish" | "hindi";

const content = {
  hinglish: {
    title: "Franchise Opportunity",
    subtitle: "Start your own Shalimar Juice shop with our affordable franchise plans.",
    pricing: "Franchise Pricing",
    facilities: "What You Get",
    training: "Training Includes",
    rules: "Important Rules",
    refill: "After first month, refill cost:",
    firstMonth: "First month liquid provided FREE!",
    shopSize: "Shop size must be at least 100 feet.",
    agreement: "Franchise agreement is required.",
    nonRefundable: "Franchise payment is non-refundable.",
    staffHiring: "Staff hiring is the responsibility of the shop owner.",
    nameRule: "Company name cannot be used after leaving the franchise.",
    facilityItems: [
      "Juice making training",
      "3 juice mixers",
      "24 glasses + 5 jugs",
      "Water bucket and storage",
      "Ice crushing machine",
    ],
    trainingItems: ["Pineapple juice", "Apple juice", "Mango juice"],
    viewDetails: "View Details",
    comingSoon: "Coming Soon",
  },
  hindi: {
    title: "फ्रेंचाइज़ी अवसर",
    subtitle: "हमारी किफायती फ्रेंचाइज़ी योजनाओं के साथ अपनी खुद की शालीमार जूस शॉप शुरू करें।",
    pricing: "फ्रेंचाइज़ी मूल्य",
    facilities: "आपको क्या मिलेगा",
    training: "ट्रेनिंग में शामिल",
    rules: "महत्वपूर्ण नियम",
    refill: "पहले महीने के बाद, रिफिल की कीमत:",
    firstMonth: "पहले महीने का लिक्विड मुफ्त!",
    shopSize: "दुकान का आकार कम से कम 100 फीट होना चाहिए।",
    agreement: "फ्रेंचाइज़ी एग्रीमेंट जरूरी है।",
    nonRefundable: "फ्रेंचाइज़ी भुगतान वापस नहीं होगा।",
    staffHiring: "स्टाफ की भर्ती दुकान मालिक की जिम्मेदारी है।",
    nameRule: "फ्रेंचाइज़ी छोड़ने के बाद कंपनी का नाम इस्तेमाल नहीं किया जा सकता।",
    facilityItems: [
      "जूस बनाने की ट्रेनिंग",
      "3 जूस मिक्सर",
      "24 गिलास + 5 जग",
      "पानी बाल्टी और स्टोरेज",
      "बर्फ कुचलने की मशीन",
    ],
    trainingItems: ["अनानास जूस", "सेब जूस", "आम जूस"],
    viewDetails: "विवरण देखें",
    comingSoon: "जल्द आ रहा है",
  },
};

const plans = [
  { duration: "1 Year", price: "₹3 Lakh", durationHi: "1 साल", priceHi: "₹3 लाख", link: "/franchise/3-lakh" },
  { duration: "2 Years", price: "₹5 Lakh", durationHi: "2 साल", priceHi: "₹5 लाख", popular: true, link: "/franchise/5-lakh" },
  { duration: "3 Years", price: "₹7 Lakh", durationHi: "3 साल", priceHi: "₹7 लाख", link: "/franchise/7-lakh" },
  { duration: "5 Years", price: "₹10 Lakh", durationHi: "5 साल", priceHi: "₹10 लाख", link: "/franchise/10-lakh" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FranchisePage = () => {
  const [lang, setLang] = useState<Lang>("hinglish");
  const t = content[lang];

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {(["hinglish", "hindi"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`font-body text-xs font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
                  lang === l
                    ? "bg-primary text-primary-foreground shadow-pineapple"
                    : "text-header-accent hover:bg-accent/10"
                }`}
              >
                {l === "hinglish" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-header-light">
              {t.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-3 max-w-lg mx-auto text-header-muted">
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-10 text-foreground"
          >
            {t.pricing}
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {plans.map((plan, i) => {
              const CardWrapper = plan.link ? Link : "div";
              const wrapperProps = plan.link ? { to: plan.link } : {};

              return (
                <motion.div key={i} variants={fadeUp}>
                  <CardWrapper
                    {...(wrapperProps as any)}
                    className={`block bg-card rounded-2xl border border-border p-7 text-center relative transition-all duration-300 hover:shadow-pineapple hover:border-primary/30 hover:-translate-y-1 cursor-pointer ${plan.popular ? "ring-2 ring-primary" : ""}`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-body font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="w-11 h-11 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {lang === "hindi" ? plan.durationHi : plan.duration}
                    </h3>
                    <p className="font-display text-3xl font-extrabold text-gradient-gold mt-2 mb-3">
                      {lang === "hindi" ? plan.priceHi : plan.price}
                    </p>
                    {plan.link && (
                      <span className="inline-flex items-center gap-1 font-body text-xs font-semibold text-primary">
                        {t.viewDetails} <ArrowRight size={13} />
                      </span>
                    )}
                  </CardWrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Facilities & Training */}
      <section className="py-14 bg-muted/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border border-border p-7"
            >
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package size={18} className="text-primary" />
                </div>
                {t.facilities}
              </h2>
              <ul className="space-y-3">
                {t.facilityItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                    <Check size={15} className="text-secondary mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 bg-muted/60 rounded-xl p-4">
                <p className="font-body text-sm text-foreground font-medium flex items-center gap-2"><Check size={15} className="text-secondary flex-shrink-0" /> {t.firstMonth}</p>
                <p className="font-body text-xs text-muted-foreground mt-1.5">{t.refill} <strong>₹1000</strong></p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-card rounded-2xl border border-border p-7"
            >
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-primary" />
                </div>
                {t.training}
              </h2>
              <ul className="space-y-3">
                {t.trainingItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                    <Check size={15} className="text-secondary mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground inline-flex items-center gap-2.5">
              <AlertTriangle size={20} className="text-pineapple-dark" /> {t.rules}
            </h2>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {[t.shopSize, t.agreement, t.nonRefundable, t.staffHiring, t.nameRule].map((rule, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display text-xs font-bold text-primary">{i + 1}</span>
                </span>
                <p className="font-body text-sm text-foreground">{rule}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FranchisePage;
