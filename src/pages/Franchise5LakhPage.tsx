import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertTriangle, Package, GraduationCap, Droplets, Shield, Wrench, RefreshCw } from "lucide-react";

type Lang = "hinglish" | "hindi";

const content = {
  hinglish: {
    back: "Back to Franchise Plans",
    title: "2 Year Franchise – ₹5 Lakh",
    subtitle: "Complete details about the 2-year franchise package.",
    trainingTitle: "Juice Training",
    trainingDesc: "Company will teach juice making.",
    trainingLabel: "Training juices:",
    trainingJuices: ["Pineapple", "Apple", "Mango", "Jamun"],
    trainingNote: "Company will give 4 juice liquids free first time.",
    itemsTitle: "Items From Company",
    itemsDesc: "Company will give these items:",
    items: [
      "5 Mixers",
      "Steel counter (2 × 5 feet)",
      "1 Ice machine",
      "1 Ice box",
      "24 Glasses",
      "3 Water buckets",
      "1 Juice machine",
    ],
    itemsNote: "These items will help to make original juice.",
    itemsDuration: "These items are given for 2 years.",
    liquidTitle: "Juice Liquid",
    liquidFree: "Company will give juice liquid free for 1 month.",
    liquidBuy: "After that you must buy juice liquid from company.",
    liquidPrice: "Price: ₹1000 for 1 liter.",
    rulesTitle: "Important Rules",
    rules: [
      "Franchise time is 2 years.",
      "Franchise money will not return.",
      "All work will follow company agreement.",
      "Without company permission, no new item can be added.",
    ],
    breakTitle: "If Item Breaks",
    breakDesc: "If any company item breaks, you must pay money to company.",
    afterTitle: "After 2 Years",
    afterLabel: "After 2 years:",
    afterPoints: ["All company items must be returned to company."],
    noteTitle: "Important Note",
    notePoints: [
      "If you want to keep company items, you must renew agreement.",
      "Only company juice method should be used.",
    ],
    cta: "Enquire Now on WhatsApp",
  },
  hindi: {
    back: "फ्रेंचाइज़ी योजनाओं पर वापस जाएं",
    title: "2 साल फ्रेंचाइज़ी – ₹5 लाख",
    subtitle: "2 साल के फ्रेंचाइज़ी पैकेज की पूरी जानकारी।",
    trainingTitle: "जूस ट्रेनिंग",
    trainingDesc: "कंपनी जूस बनाना सिखाएगी।",
    trainingLabel: "ट्रेनिंग जूस:",
    trainingJuices: ["अनानास", "सेब", "आम", "जामुन"],
    trainingNote: "कंपनी पहली बार 4 जूस लिक्विड मुफ्त देगी।",
    itemsTitle: "कंपनी से सामान",
    itemsDesc: "कंपनी ये सामान देगी:",
    items: [
      "5 मिक्सर",
      "स्टील काउंटर (2 × 5 फीट)",
      "1 बर्फ मशीन",
      "1 आइस बॉक्स",
      "24 गिलास",
      "3 पानी की बाल्टियाँ",
      "1 जूस मशीन",
    ],
    itemsNote: "ये सामान असली जूस बनाने में मदद करेगा।",
    itemsDuration: "ये सामान 2 साल के लिए दिया जाता है।",
    liquidTitle: "जूस लिक्विड",
    liquidFree: "कंपनी 1 महीने के लिए जूस लिक्विड मुफ्त देगी।",
    liquidBuy: "उसके बाद आपको कंपनी से जूस लिक्विड खरीदना होगा।",
    liquidPrice: "कीमत: ₹1000 प्रति 1 लीटर।",
    rulesTitle: "महत्वपूर्ण नियम",
    rules: [
      "फ्रेंचाइज़ी का समय 2 साल है।",
      "फ्रेंचाइज़ी की रकम वापस नहीं होगी।",
      "सारा काम कंपनी के एग्रीमेंट के अनुसार होगा।",
      "कंपनी की अनुमति के बिना कोई नया आइटम नहीं जोड़ा जा सकता।",
    ],
    breakTitle: "अगर सामान टूट जाए",
    breakDesc: "अगर कंपनी का कोई सामान टूट जाए तो आपको कंपनी को पैसे देने होंगे।",
    afterTitle: "2 साल के बाद",
    afterLabel: "2 साल के बाद:",
    afterPoints: ["कंपनी का सारा सामान कंपनी को वापस करना होगा।"],
    noteTitle: "महत्वपूर्ण सूचना",
    notePoints: [
      "अगर आप कंपनी का सामान रखना चाहते हैं तो एग्रीमेंट रिन्यू करना होगा।",
      "सिर्फ कंपनी का जूस बनाने का तरीका इस्तेमाल करना होगा।",
    ],
    cta: "WhatsApp पर पूछताछ करें",
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Franchise5LakhPage = () => {
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState<Lang>((searchParams.get("lang") as Lang) || "hinglish");
  const t = content[lang];

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-14 md:py-18 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-5">
            <Link to="/franchise" className="inline-flex items-center gap-2 font-body text-sm transition-colors hover:opacity-80" style={{ color: "hsl(45 30% 65%)" }}>
              <ArrowLeft size={16} /> {t.back}
            </Link>
            <div className="flex gap-1">
              {(["hinglish", "hindi"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-xs font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
                    lang === l
                      ? "bg-primary text-primary-foreground shadow-pineapple"
                      : "hover:bg-accent/10"
                  }`}
                  style={lang === l ? {} : { color: "hsl(45 30% 65%)" }}
                >
                  {l === "hinglish" ? "English" : "हिंदी"}
                </button>
              ))}
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t.title}
          </motion.h1>
          <p className="font-body text-base mt-2 text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 max-w-3xl space-y-6"
        >
          {/* Training */}
          <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap size={18} className="text-primary" />
              </div>
              {t.trainingTitle}
            </h2>
            <p className="font-body text-sm text-foreground mb-3">{t.trainingDesc}</p>
            <p className="font-body text-sm font-semibold text-foreground mb-2">{t.trainingLabel}</p>
            <ul className="space-y-2.5 mb-4">
              {t.trainingJuices.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-body text-sm text-foreground">
                  <Check size={15} className="text-secondary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="bg-muted/60 rounded-xl p-4">
              <p className="font-body text-sm text-foreground font-medium flex items-center gap-2"><Check size={15} className="text-secondary flex-shrink-0" /> {t.trainingNote}</p>
            </div>
          </motion.div>

          {/* Items */}
          <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package size={18} className="text-primary" />
              </div>
              {t.itemsTitle}
            </h2>
            <p className="font-body text-sm text-foreground mb-3">{t.itemsDesc}</p>
            <ul className="space-y-2.5 mb-4">
              {t.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-body text-sm text-foreground">
                  <Check size={15} className="text-secondary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-muted-foreground">{t.itemsNote}</p>
            <div className="bg-muted/60 rounded-xl p-4 mt-3">
              <p className="font-body text-sm text-foreground font-medium flex items-center gap-2"><Package size={15} className="text-primary flex-shrink-0" /> {t.itemsDuration}</p>
            </div>
          </motion.div>

          {/* Liquid */}
          <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets size={18} className="text-primary" />
              </div>
              {t.liquidTitle}
            </h2>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 font-body text-sm text-foreground"><Check size={15} className="text-secondary flex-shrink-0" /> {t.liquidFree}</li>
              <li className="font-body text-sm text-foreground pl-[27px]">{t.liquidBuy}</li>
              <li className="font-body text-sm text-foreground font-semibold pl-[27px]">{t.liquidPrice}</li>
            </ul>
          </motion.div>

          {/* Rules */}
          <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield size={18} className="text-primary" />
              </div>
              {t.rulesTitle}
            </h2>
            <ul className="space-y-2.5">
              {t.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                  <AlertTriangle size={15} className="text-pineapple-dark mt-0.5 flex-shrink-0" /> {rule}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Break */}
          <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench size={18} className="text-primary" />
              </div>
              {t.breakTitle}
            </h2>
            <p className="font-body text-sm text-foreground">{t.breakDesc}</p>
          </motion.div>

          {/* After 2 Years */}
          <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <RefreshCw size={18} className="text-primary" />
              </div>
              {t.afterTitle}
            </h2>
            <p className="font-body text-sm text-foreground mb-3">{t.afterLabel}</p>
            <ul className="space-y-2">
              {t.afterPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-pineapple-dark mt-1.5 flex-shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Important Note */}
          <motion.div variants={fadeUp} className="bg-destructive/5 rounded-2xl border border-destructive/20 p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-destructive" />
              </div>
              {t.noteTitle}
            </h2>
            <ul className="space-y-2.5">
              {t.notePoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center pt-4 pb-2">
            <a
              href="https://wa.me/919852779933?text=I%20am%20interested%20in%20the%205%20Lakh%20franchise%20plan"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-primary text-primary-foreground font-body text-sm font-semibold px-8 py-3.5 rounded-full hover:brightness-105 hover:scale-[1.02] transition-all shadow-pineapple"
            >
              {t.cta}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default Franchise5LakhPage;
