import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, AlertTriangle, Building2, GraduationCap, Package, ArrowRight, ClipboardList, Truck, Eye, Shield, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import shopPhoto1 from "@/assets/shop-photo-1.png";
import shopPhoto2 from "@/assets/shop-photo-2.png";
import shopPhoto3 from "@/assets/shop-photo-3.png";
import winterSpecial from "@/assets/winter-special.png";

type Lang = "hinglish" | "hindi";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const shopPhotos = [
  { src: shopPhoto1, alt: "Shalimar Juice Shop - Main Counter" },
  { src: shopPhoto2, alt: "Shalimar Juice Shop - Team & Fresh Juices" },
  { src: shopPhoto3, alt: "Shalimar Juice Shop - Fresh Juice Counter" },
  { src: winterSpecial, alt: "Winter Special Kullad Drink" },
];

const content = {
  hinglish: {
    title: "Franchise Opportunity",
    subtitle: "Start your own Shalimar Juice shop with our affordable franchise plans.",
    pricing: "Franchise Packages",
    setupTitle: "Your Setup Will Look Like This",
    setupSubtitle: "Premium shop setup with everything you need to start serving fresh juices from day one.",
    allRulesTitle: "Everything You Get & Important Rules",
    viewDetails: "View Details",
    allRules: [
      { icon: Package, text: "Juice making training", label: "Training Provided", type: "facility" },
      { icon: Package, text: "3 juice mixers", label: "Juice Mixers", type: "facility" },
      { icon: Package, text: "24 glasses + 5 jugs", label: "Glasses & Jugs", type: "facility" },
      { icon: Package, text: "Water bucket and storage", label: "Storage", type: "facility" },
      { icon: Package, text: "Ice crushing machine", label: "Ice Machine", type: "facility" },
      { icon: GraduationCap, text: "Training: Pineapple juice, Apple juice, Mango juice", label: "Juice Training", type: "facility" },
      { icon: Check, text: "First month liquid provided FREE!", label: "Free First Month", type: "facility" },
      { icon: Package, text: "After first month, refill cost: ₹1000", label: "Refill Cost", type: "facility" },
      { icon: Eye, text: "After your franchise goes live, a company representative will visit your shop once every month or every 1-2 months.", label: "Company Visits", type: "rule" },
      { icon: Shield, text: "All campers (large water cans) sold at your shop will be of the company's brand only.", label: "Brand Campers", type: "rule" },
      { icon: ClipboardList, text: "All profit from selling campers will be 100% yours (the franchisee's).", label: "Your Profit", type: "rule" },
      { icon: Package, text: "Maintenance and care of the campers is your responsibility.", label: "Maintenance", type: "rule" },
      { icon: AlertTriangle, text: "All company rules must be strictly followed.", label: "Follow Rules", type: "rule" },
      { icon: ClipboardList, text: "We accept orders for weddings and parties.", label: "Party Orders", type: "rule" },
      { icon: Truck, text: "Any carting/transport charges for order delivery will be paid directly by the customer.", label: "Transport Charges", type: "rule" },
      { icon: AlertTriangle, text: "Shop size must be at least 100 feet.", label: "Shop Size", type: "rule" },
      { icon: ClipboardList, text: "Franchise agreement is required.", label: "Agreement", type: "rule" },
      { icon: AlertTriangle, text: "Franchise payment is non-refundable.", label: "Non-Refundable", type: "rule" },
      { icon: Shield, text: "Staff hiring is the responsibility of the shop owner.", label: "Staff", type: "rule" },
      { icon: AlertTriangle, text: "Company name cannot be used after leaving the franchise.", label: "Name Usage", type: "rule" },
    ],
  },
  hindi: {
    title: "फ्रेंचाइज़ी अवसर",
    subtitle: "हमारी किफायती फ्रेंचाइज़ी योजनाओं के साथ अपनी खुद की शालीमार जूस शॉप शुरू करें।",
    pricing: "फ्रेंचाइज़ी पैकेज",
    setupTitle: "आपका सेटअप ऐसा होगा",
    setupSubtitle: "प्रीमियम शॉप सेटअप — पहले दिन से ही ताज़ा जूस सर्व करने के लिए सब कुछ तैयार।",
    allRulesTitle: "आपको क्या मिलेगा और महत्वपूर्ण नियम",
    viewDetails: "विवरण देखें",
    allRules: [
      { icon: Package, text: "जूस बनाने की ट्रेनिंग", label: "ट्रेनिंग", type: "facility" },
      { icon: Package, text: "3 जूस मिक्सर", label: "जूस मिक्सर", type: "facility" },
      { icon: Package, text: "24 गिलास + 5 जग", label: "गिलास और जग", type: "facility" },
      { icon: Package, text: "पानी बाल्टी और स्टोरेज", label: "स्टोरेज", type: "facility" },
      { icon: Package, text: "बर्फ कुचलने की मशीन", label: "बर्फ मशीन", type: "facility" },
      { icon: GraduationCap, text: "ट्रेनिंग: अनानास जूस, सेब जूस, आम जूस", label: "जूस ट्रेनिंग", type: "facility" },
      { icon: Check, text: "पहले महीने का लिक्विड मुफ्त!", label: "पहला महीना मुफ्त", type: "facility" },
      { icon: Package, text: "पहले महीने के बाद, रिफिल की कीमत: ₹1000", label: "रिफिल कीमत", type: "facility" },
      { icon: Eye, text: "हमारी फ्रेंचाइजी लाइव होने के बाद, कंपनी का कोई भी एक व्यक्ति हर महीने या 1-2 महीने में एक बार आपकी शॉप पर विजिट करेगा।", label: "कंपनी विज़िट", type: "rule" },
      { icon: Shield, text: "आपकी शॉप पर जो भी कैम्पर (पानी के बड़े केन) बिकेंगे, वह कंपनी के ब्रांड के ही होंगे।", label: "ब्रांड कैम्पर", type: "rule" },
      { icon: ClipboardList, text: "कैम्पर बेचने पर जो भी मुनाफा होगा, वह पूरा फ्रेंचाइजी लेने वाले (आपका) ही होगा।", label: "आपका मुनाफा", type: "rule" },
      { icon: Package, text: "कैम्पर के रखरखाव या उससे जुड़ी चीजों का ध्यान रखना होगा।", label: "रखरखाव", type: "rule" },
      { icon: AlertTriangle, text: "कंपनी के हर नियम का पालन करना जरूरी है।", label: "नियमों का पालन", type: "rule" },
      { icon: ClipboardList, text: "हमारे यहाँ शादी और पार्टी के लिए ऑर्डर लिए जाते हैं।", label: "पार्टी ऑर्डर", type: "rule" },
      { icon: Truck, text: "ऑर्डर की डिलीवरी के लिए जो भी कार्टिंग चार्ज लगेगा, वह सीधा ग्राहक को ही देना होगा।", label: "ट्रांसपोर्ट", type: "rule" },
      { icon: AlertTriangle, text: "दुकान का आकार कम से कम 100 फीट होना चाहिए।", label: "दुकान का आकार", type: "rule" },
      { icon: ClipboardList, text: "फ्रेंचाइज़ी एग्रीमेंट जरूरी है।", label: "एग्रीमेंट", type: "rule" },
      { icon: AlertTriangle, text: "फ्रेंचाइज़ी भुगतान वापस नहीं होगा।", label: "नॉन-रिफंडेबल", type: "rule" },
      { icon: Shield, text: "स्टाफ की भर्ती दुकान मालिक की जिम्मेदारी है।", label: "स्टाफ", type: "rule" },
      { icon: AlertTriangle, text: "फ्रेंचाइज़ी छोड़ने के बाद कंपनी का नाम इस्तेमाल नहीं किया जा सकता।", label: "नाम का उपयोग", type: "rule" },
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = content[lang];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % shopPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % shopPhotos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + shopPhotos.length) % shopPhotos.length);
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center gap-1 mb-8">
            {(["hinglish", "hindi"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`font-body text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300 ${
                  lang === l
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l === "hinglish" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="font-body text-xs font-semibold text-primary">Trusted Franchise Model</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              {t.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Franchise Packages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
              <Building2 size={12} /> Investment Plans
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t.pricing}
            </h2>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto"
          >
            {plans.map((plan, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link
                  to={plan.link}
                  className={`group block bg-card rounded-2xl border p-8 text-center relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    plan.popular
                      ? "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-body font-bold uppercase tracking-wider px-5 py-1 rounded-full shadow-md">
                      <Star size={10} className="inline mr-1" />Popular
                    </span>
                  )}
                  <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                    plan.popular ? "bg-primary/20" : "bg-primary/10 group-hover:bg-primary/20"
                  }`}>
                    <Building2 className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
                    {lang === "hindi" ? plan.durationHi : plan.duration}
                  </h3>
                  <p className="font-display text-3xl md:text-4xl font-extrabold text-gradient-gold mb-4">
                    {lang === "hindi" ? plan.priceHi : plan.price}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                    {t.viewDetails} <ArrowRight size={13} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shop Setup Photo Carousel */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-secondary/10 text-secondary mb-4">
              <Sparkles size={12} /> Real Shop Photos
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t.setupTitle}
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-lg mx-auto">
              {t.setupSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Main carousel */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 border border-border">
              <div className="aspect-[16/10] relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={shopPhotos[currentSlide].src}
                    alt={shopPhotos[currentSlide].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: smoothEase }}
                  />
                </AnimatePresence>
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/40 to-transparent" />
                {/* Slide counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {shopPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentSlide ? "w-8 bg-primary" : "w-1.5 bg-background/60 hover:bg-background/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Nav buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg"
              >
                <ChevronLeft size={18} className="text-foreground" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg"
              >
                <ChevronRight size={18} className="text-foreground" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex justify-center gap-3 mt-5">
              {shopPhotos.map((photo, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToSlide(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    i === currentSlide
                      ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/20"
                      : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Rules + Facilities Merged */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-destructive/10 text-destructive mb-4">
              <AlertTriangle size={12} /> Important
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {t.allRulesTitle}
            </h2>
          </motion.div>

          {/* Facility items */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Package size={16} className="text-secondary" />
              </div>
              {lang === "hindi" ? "आपको क्या मिलेगा" : "What You Get"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {t.allRules.filter(r => r.type === "facility").map((rule, i) => {
                const Icon = rule.icon;
                return (
                  <motion.div
                    key={`f-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 hover:border-secondary/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-secondary" />
                    </div>
                    <div>
                      <span className="font-display text-xs font-bold text-secondary block">{rule.label}</span>
                      <p className="font-body text-sm text-foreground">{rule.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest">Rules & Notes</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Rules */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {t.allRules.filter(r => r.type === "rule").map((rule, i) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={`r-${i}`}
                  variants={fadeUp}
                  className="bg-card rounded-2xl border border-border p-5 md:p-6 flex items-start gap-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
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
