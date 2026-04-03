import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, AlertTriangle, Building2, GraduationCap, Package, ArrowRight, ClipboardList, Truck, Eye, Shield } from "lucide-react";

type Lang = "hinglish" | "hindi";

const content = {
  hinglish: {
    title: "Franchise Opportunity",
    subtitle: "Start your own Shalimar Juice shop with our affordable franchise plans.",
    pricing: "Franchise Packages",
    facilities: "What You Get",
    training: "Training Includes",
    allRulesTitle: "All Important Rules & Notes",
    refill: "After first month, refill cost:",
    firstMonth: "First month liquid provided FREE!",
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
    allRules: [
      { icon: Eye, text: "After your franchise goes live, a company representative will visit your shop once every month or every 1-2 months.", label: "Company Visits" },
      { icon: Shield, text: "All campers (large water cans) sold at your shop will be of the company's brand only.", label: "Brand Campers" },
      { icon: ClipboardList, text: "All profit from selling campers will be 100% yours (the franchisee's).", label: "Your Profit" },
      { icon: Package, text: "Maintenance and care of the campers is your responsibility.", label: "Maintenance" },
      { icon: AlertTriangle, text: "All company rules must be strictly followed.", label: "Follow Rules" },
      { icon: ClipboardList, text: "We accept orders for weddings and parties.", label: "Party Orders" },
      { icon: Truck, text: "Any carting/transport charges for order delivery will be paid directly by the customer.", label: "Transport Charges" },
      { icon: AlertTriangle, text: "Shop size must be at least 100 feet.", label: "Shop Size" },
      { icon: ClipboardList, text: "Franchise agreement is required.", label: "Agreement" },
      { icon: AlertTriangle, text: "Franchise payment is non-refundable.", label: "Non-Refundable" },
      { icon: Shield, text: "Staff hiring is the responsibility of the shop owner.", label: "Staff" },
      { icon: AlertTriangle, text: "Company name cannot be used after leaving the franchise.", label: "Name Usage" },
    ],
  },
  hindi: {
    title: "फ्रेंचाइज़ी अवसर",
    subtitle: "हमारी किफायती फ्रेंचाइज़ी योजनाओं के साथ अपनी खुद की शालीमार जूस शॉप शुरू करें।",
    pricing: "फ्रेंचाइज़ी पैकेज",
    facilities: "आपको क्या मिलेगा",
    training: "ट्रेनिंग में शामिल",
    allRulesTitle: "सभी महत्वपूर्ण नियम और नोट्स",
    refill: "पहले महीने के बाद, रिफिल की कीमत:",
    firstMonth: "पहले महीने का लिक्विड मुफ्त!",
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
    allRules: [
      { icon: Eye, text: "हमारी फ्रेंचाइजी लाइव होने के बाद, कंपनी का कोई भी एक व्यक्ति हर महीने या 1-2 महीने में एक बार आपकी शॉप पर विजिट करेगा।", label: "कंपनी विज़िट" },
      { icon: Shield, text: "आपकी शॉप पर जो भी कैम्पर (पानी के बड़े केन) बिकेंगे, वह कंपनी के ब्रांड के ही होंगे।", label: "ब्रांड कैम्पर" },
      { icon: ClipboardList, text: "कैम्पर बेचने पर जो भी मुनाफा होगा, वह पूरा फ्रेंचाइजी लेने वाले (आपका) ही होगा।", label: "आपका मुनाफा" },
      { icon: Package, text: "कैम्पर के रखरखाव या उससे जुड़ी चीजों का ध्यान रखना होगा।", label: "रखरखाव" },
      { icon: AlertTriangle, text: "कंपनी के हर नियम का पालन करना जरूरी है।", label: "नियमों का पालन" },
      { icon: ClipboardList, text: "हमारे यहाँ शादी और पार्टी के लिए ऑर्डर लिए जाते हैं।", label: "पार्टी ऑर्डर" },
      { icon: Truck, text: "ऑर्डर की डिलीवरी के लिए जो भी कार्टिंग चार्ज लगेगा, वह सीधा ग्राहक को ही देना होगा।", label: "ट्रांसपोर्ट" },
      { icon: AlertTriangle, text: "दुकान का आकार कम से कम 100 फीट होना चाहिए।", label: "दुकान का आकार" },
      { icon: ClipboardList, text: "फ्रेंचाइज़ी एग्रीमेंट जरूरी है।", label: "एग्रीमेंट" },
      { icon: AlertTriangle, text: "फ्रेंचाइज़ी भुगतान वापस नहीं होगा।", label: "नॉन-रिफंडेबल" },
      { icon: Shield, text: "स्टाफ की भर्ती दुकान मालिक की जिम्मेदारी है।", label: "स्टाफ" },
      { icon: AlertTriangle, text: "फ्रेंचाइज़ी छोड़ने के बाद कंपनी का नाम इस्तेमाल नहीं किया जा सकता।", label: "नाम का उपयोग" },
    ],
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

      {/* 1. Franchise Packages — FIRST */}
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

      {/* 2. What You Get + Training — side by side */}
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

      {/* 3. All Important Rules & Notes — MERGED */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-destructive/10 text-destructive mb-4">
              <AlertTriangle size={12} /> Important
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {t.allRulesTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {t.allRules.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-card rounded-2xl border border-border p-5 md:p-6 flex items-start gap-4 hover:border-primary/30 hover:shadow-pineapple transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-display text-xs font-bold text-primary mb-1 block">{rule.label}</span>
                    <p className="font-body text-sm md:text-base text-foreground leading-relaxed">{rule.text}</p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-display text-[11px] font-bold text-muted-foreground">{i + 1}</span>
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FranchisePage;
