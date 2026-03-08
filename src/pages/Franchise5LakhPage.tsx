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

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Franchise5LakhPage = () => {
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState<Lang>((searchParams.get("lang") as Lang) || "hinglish");
  const t = content[lang];

  return (
    <main className="pt-20 min-h-screen bg-background">
      <section className="py-10 bg-pineapple-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/franchise" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> {t.back}
            </Link>
            <div className="flex gap-2">
              {(["hinglish", "hindi"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-xs font-semibold px-4 py-1.5 rounded-full border transition-all ${
                    lang === l
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-pineapple hover:bg-pineapple-light"
                  }`}
                >
                  {l === "hinglish" ? "English" : "हिंदी"}
                </button>
              ))}
            </div>
          </div>
          <motion.h1 {...fadeUp} className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {t.title}
          </motion.h1>
          <p className="font-body text-muted-foreground mt-2">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Training */}
          <motion.div {...fadeUp} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <GraduationCap size={20} className="text-pineapple-dark" /> {t.trainingTitle}
            </h2>
            <p className="font-body text-sm text-foreground mb-3">{t.trainingDesc}</p>
            <p className="font-body text-sm font-semibold text-foreground mb-2">{t.trainingLabel}</p>
            <ul className="space-y-2 mb-4">
              {t.trainingJuices.map((item) => (
                <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
                  <Check size={16} className="text-secondary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="bg-pineapple-light/50 rounded-lg p-3">
              <p className="font-body text-sm text-foreground font-medium flex items-center gap-2"><Check size={16} className="text-secondary flex-shrink-0" /> {t.trainingNote}</p>
            </div>
          </motion.div>

          {/* Items */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Package size={20} className="text-pineapple-dark" /> {t.itemsTitle}
            </h2>
            <p className="font-body text-sm text-foreground mb-3">{t.itemsDesc}</p>
            <ul className="space-y-2 mb-4">
              {t.items.map((item) => (
                <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
                  <Check size={16} className="text-secondary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-muted-foreground italic">{t.itemsNote}</p>
            <div className="bg-pineapple-light/50 rounded-lg p-3 mt-3">
              <p className="font-body text-sm text-foreground font-medium">📦 {t.itemsDuration}</p>
            </div>
          </motion.div>

          {/* Liquid */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Droplets size={20} className="text-pineapple-dark" /> {t.liquidTitle}
            </h2>
            <ul className="space-y-2">
              <li className="font-body text-sm text-foreground">✅ {t.liquidFree}</li>
              <li className="font-body text-sm text-foreground">{t.liquidBuy}</li>
              <li className="font-body text-sm text-foreground font-semibold">{t.liquidPrice}</li>
            </ul>
          </motion.div>

          {/* Rules */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Shield size={20} className="text-pineapple-dark" /> {t.rulesTitle}
            </h2>
            <ul className="space-y-2">
              {t.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <AlertTriangle size={16} className="text-pineapple-dark mt-0.5 flex-shrink-0" /> {rule}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Break */}
          <motion.div {...fadeUp} transition={{ delay: 0.35 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Wrench size={20} className="text-pineapple-dark" /> {t.breakTitle}
            </h2>
            <p className="font-body text-sm text-foreground">{t.breakDesc}</p>
          </motion.div>

          {/* After 2 Years */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <RefreshCw size={20} className="text-pineapple-dark" /> {t.afterTitle}
            </h2>
            <p className="font-body text-sm text-foreground mb-3">{t.afterLabel}</p>
            <ul className="space-y-2">
              {t.afterPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <span className="text-pineapple-dark font-bold">•</span> {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Important Note */}
          <motion.div {...fadeUp} transition={{ delay: 0.45 }} className="border-2 border-destructive/30 bg-destructive/5 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-destructive" /> {t.noteTitle}
            </h2>
            <ul className="space-y-2">
              {t.notePoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <span className="text-destructive font-bold">•</span> {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="text-center py-6">
            <a
              href="https://wa.me/919852779933?text=I%20am%20interested%20in%20the%205%20Lakh%20franchise%20plan"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-primary text-primary-foreground font-body text-sm font-semibold px-8 py-3 rounded-full hover:brightness-105 transition"
            >
              {t.cta}
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Franchise5LakhPage;
