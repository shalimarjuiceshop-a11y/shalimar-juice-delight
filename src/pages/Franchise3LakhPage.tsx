import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertTriangle, Package, GraduationCap, Droplets, Shield } from "lucide-react";

type Lang = "hinglish" | "hindi";

const content = {
  hinglish: {
    back: "Back to Franchise Plans",
    title: "1 Year Franchise – ₹3 Lakh",
    subtitle: "Complete details about the 1-year franchise package.",
    trainingTitle: "Training",
    trainingDesc: "Company will teach juice making.",
    trainingLabel: "Training juices:",
    trainingJuices: ["Pineapple", "Apple", "Mango"],
    trainingNote: "Company will give 3 juice liquids free for the first time.",
    itemsTitle: "Items From Company",
    itemsDesc: "Company will give these items:",
    items: [
      "1 Steel Counter (2 × 4 feet)",
      "3 Juice Mixers",
      "24 Glasses",
      "5 Jugs",
      "3 Water Buckets",
      "1 Ice Box",
      "1 Small Ice Machine",
    ],
    itemsNote: "These items will help to make original juice.",
    liquidTitle: "Juice Liquid",
    liquidFree: "Company will give juice liquid free for 1 month.",
    liquidBuy: "After that you must buy liquid from company.",
    liquidPrice: "Price: ₹1000 for 1 liter.",
    rulesTitle: "Important Rules",
    rules: [
      "Without company permission, no new item can be added.",
      "Franchise will work with company rules.",
    ],
    noteTitle: "Important Note",
    noteLeaveLabel: "If you want to leave franchise before 1 year:",
    noteLeavePoints: [
      "All company items must be returned.",
      "Franchise money will not return.",
    ],
    noteAfterLabel: "After leaving franchise:",
    noteAfterPoints: [
      "You cannot use company name or logo.",
      "If you use it, legal action can happen.",
    ],
    cta: "Enquire Now on WhatsApp",
  },
  hindi: {
    back: "फ्रेंचाइज़ी योजनाओं पर वापस जाएं",
    title: "1 साल फ्रेंचाइज़ी – ₹3 लाख",
    subtitle: "1 साल के फ्रेंचाइज़ी पैकेज की पूरी जानकारी।",
    trainingTitle: "ट्रेनिंग",
    trainingDesc: "कंपनी जूस बनाना सिखाएगी।",
    trainingLabel: "ट्रेनिंग जूस:",
    trainingJuices: ["अनानास", "सेब", "आम"],
    trainingNote: "कंपनी पहली बार 3 जूस लिक्विड मुफ्त देगी।",
    itemsTitle: "कंपनी से सामान",
    itemsDesc: "कंपनी ये सामान देगी:",
    items: [
      "1 स्टील काउंटर (2 × 4 फीट)",
      "3 जूस मिक्सर",
      "24 गिलास",
      "5 जग",
      "3 पानी की बाल्टियाँ",
      "1 आइस बॉक्स",
      "1 छोटी बर्फ मशीन",
    ],
    itemsNote: "ये सामान असली जूस बनाने में मदद करेगा।",
    liquidTitle: "जूस लिक्विड",
    liquidFree: "कंपनी 1 महीने के लिए जूस लिक्विड मुफ्त देगी।",
    liquidBuy: "उसके बाद आपको कंपनी से लिक्विड खरीदना होगा।",
    liquidPrice: "कीमत: ₹1000 प्रति 1 लीटर।",
    rulesTitle: "महत्वपूर्ण नियम",
    rules: [
      "कंपनी की अनुमति के बिना कोई नया आइटम नहीं जोड़ा जा सकता।",
      "फ्रेंचाइज़ी कंपनी के नियमों से चलेगी।",
    ],
    noteTitle: "महत्वपूर्ण सूचना",
    noteLeaveLabel: "अगर आप 1 साल से पहले फ्रेंचाइज़ी छोड़ना चाहते हैं:",
    noteLeavePoints: [
      "कंपनी का सारा सामान वापस करना होगा।",
      "फ्रेंचाइज़ी की रकम वापस नहीं होगी।",
    ],
    noteAfterLabel: "फ्रेंचाइज़ी छोड़ने के बाद:",
    noteAfterPoints: [
      "आप कंपनी का नाम या लोगो इस्तेमाल नहीं कर सकते।",
      "अगर इस्तेमाल किया तो कानूनी कार्रवाई हो सकती है।",
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

const Franchise3LakhPage = () => {
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState<Lang>((searchParams.get("lang") as Lang) || "hinglish");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative pt-28 pb-14 md:pt-32 md:pb-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-5">
            <Link to="/franchise" className="inline-flex items-center gap-2 font-body text-sm transition-colors hover:opacity-80 text-header-accent">
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
                      : "text-header-accent hover:bg-accent/10"
                  }`}
                >
                  {l === "hinglish" ? "English" : "हिंदी"}
                </button>
              ))}
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-header-light"
          >
            {t.title}
          </motion.h1>
          <p className="font-body text-base mt-2 text-header-muted">{t.subtitle}</p>
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

          {/* Important Note */}
          <motion.div variants={fadeUp} className="bg-destructive/5 rounded-2xl border border-destructive/20 p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-destructive" />
              </div>
              {t.noteTitle}
            </h2>
            <p className="font-body text-sm font-semibold text-foreground mb-3">{t.noteLeaveLabel}</p>
            <ul className="space-y-2 mb-5">
              {t.noteLeavePoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" /> {p}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm font-semibold text-foreground mb-3">{t.noteAfterLabel}</p>
            <ul className="space-y-2">
              {t.noteAfterPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center pt-4 pb-2">
            <a
              href="https://wa.me/919852779933?text=I%20am%20interested%20in%20the%203%20Lakh%20franchise%20plan"
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

export default Franchise3LakhPage;
