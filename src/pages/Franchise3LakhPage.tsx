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

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Franchise3LakhPage = () => {
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
            🍍 {t.title}
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
              <p className="font-body text-sm text-foreground font-medium">✅ {t.trainingNote}</p>
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

          {/* Important Note */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="border-2 border-destructive/30 bg-destructive/5 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-destructive" /> {t.noteTitle}
            </h2>
            <p className="font-body text-sm font-semibold text-foreground mb-3">{t.noteLeaveLabel}</p>
            <ul className="space-y-2 mb-4">
              {t.noteLeavePoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <span className="text-destructive font-bold">•</span> {p}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm font-semibold text-foreground mb-3">{t.noteAfterLabel}</p>
            <ul className="space-y-2">
              {t.noteAfterPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <span className="text-destructive font-bold">•</span> {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="text-center py-6">
            <a
              href="https://wa.me/919852779933?text=I%20am%20interested%20in%20the%203%20Lakh%20franchise%20plan"
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

export default Franchise3LakhPage;
