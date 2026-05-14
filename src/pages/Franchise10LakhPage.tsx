import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertTriangle, Package, GraduationCap, Droplets, Shield, Clock, Headphones } from "lucide-react";

type Lang = "hinglish" | "hindi";

const content = {
  hinglish: {
    back: "Back to Franchise Plans",
    title: "5 Year Franchise – ₹10 Lakh",
    subtitle: "Complete details about the 5-year franchise package.",
    trainingTitle: "Training",
    trainingDesc: "Company will teach you to make these items:",
    trainingLabel: "Training includes:",
    trainingItems: [
      "5 Juice Flavors",
      "All Shakes (Pineapple, Apple, Mango, Guava, Banana & more)",
      "Lassi",
      "Falooda",
      "Badam Shake",
      "Milk with Dry Fruits",
      "Ice Cream Lassi",
    ],
    itemsTitle: "Items From Company",
    itemsDesc: "Company will give these items:",
    items: [
      "5 Juice Mixers",
      "1 Display Fridge",
      "1 Big Counter (2 × 5 feet)",
      "1 Small Counter (2 × 3 feet)",
      "1 Ice Box",
      "36 Glasses",
      "Falooda Glasses",
      "Kulhad (Clay Cups)",
      "1 Milk Blender",
      "1 Big Kandai (Ice Cream Machine)",
      "All small items needed for shop",
    ],
    itemsNote: "All items will be given for 5 years on agreement basis.",
    supportTitle: "Company Support",
    supportPoints: [
      "Company will teach you everything about running the shop.",
      "Full training and guidance provided.",
    ],
    liquidTitle: "Juice Liquid & Flavors",
    liquidFree: "Company will give all liquids and flavors free for the first time.",
    liquidBuy: "After that you must buy from company only.",
    liquidPrice: "Price: ₹1000 for 1 liter.",
    agreementTitle: "Agreement Details",
    agreementPoints: [
      "Agreement period: 5 years",
      "All items remain company property during agreement.",
      "After 5 years, you can renew the agreement.",
    ],
    rulesTitle: "Important Rules",
    rules: [
      "All products must be purchased from company only.",
      "Without company permission, no new item can be added to shop.",
      "All items like juice, lassi, falooda - company will make them.",
      "Company will give first-time flavors free.",
      "After that, you must pay company for all items.",
    ],
    noteTitle: "Important Note",
    noteLeaveLabel: "If you want to leave franchise before 5 years:",
    noteLeavePoints: [
      "All company items must be returned.",
      "Franchise money will not return.",
    ],
    noteAfterLabel: "Agreement terms:",
    noteAfterPoints: [
      "All things will be in agreement.",
      "Money paid to company will not be returned.",
      "You cannot use company name or logo after leaving.",
    ],
    cta: "Enquire Now on WhatsApp",
  },
  hindi: {
    back: "फ्रेंचाइज़ी योजनाओं पर वापस जाएं",
    title: "5 साल फ्रेंचाइज़ी – ₹10 लाख",
    subtitle: "5 साल के फ्रेंचाइज़ी पैकेज की पूरी जानकारी।",
    trainingTitle: "ट्रेनिंग",
    trainingDesc: "कंपनी आपको ये सब बनाना सिखाएगी:",
    trainingLabel: "ट्रेनिंग में शामिल:",
    trainingItems: [
      "5 जूस फ्लेवर",
      "सभी शेक्स (अनानास, सेब, आम, अमरूद, केला और भी बहुत कुछ)",
      "लस्सी",
      "फालूदा",
      "बादाम शेक",
      "ड्राई फ्रूट्स वाला दूध",
      "आइसक्रीम लस्सी",
    ],
    itemsTitle: "कंपनी से सामान",
    itemsDesc: "कंपनी ये सामान देगी:",
    items: [
      "5 जूस मिक्सर",
      "1 डिस्प्ले फ्रिज",
      "1 बड़ा काउंटर (2 × 5 फीट)",
      "1 छोटा काउंटर (2 × 3 फीट)",
      "1 आइस बॉक्स",
      "36 गिलास",
      "फालूदा गिलास",
      "कुल्हड़",
      "1 मिल्क ब्लेंडर",
      "1 बड़ी कंडाई (आइसक्रीम मशीन)",
      "शॉप के लिए सभी छोटी चीज़ें",
    ],
    itemsNote: "सभी सामान 5 साल के लिए एग्रीमेंट पर दिया जाएगा।",
    supportTitle: "कंपनी सपोर्ट",
    supportPoints: [
      "कंपनी आपको शॉप चलाने के बारे में सब कुछ सिखाएगी।",
      "पूरी ट्रेनिंग और गाइडेंस दी जाएगी।",
    ],
    liquidTitle: "जूस लिक्विड और फ्लेवर",
    liquidFree: "कंपनी पहली बार सभी लिक्विड और फ्लेवर मुफ्त देगी।",
    liquidBuy: "उसके बाद आपको कंपनी से ही खरीदना होगा।",
    liquidPrice: "कीमत: ₹1000 प्रति 1 लीटर।",
    agreementTitle: "एग्रीमेंट की जानकारी",
    agreementPoints: [
      "एग्रीमेंट अवधि: 5 साल",
      "एग्रीमेंट के दौरान सभी सामान कंपनी की प्रॉपर्टी रहेगी।",
      "5 साल के बाद एग्रीमेंट रिन्यू कर सकते हैं।",
    ],
    rulesTitle: "महत्वपूर्ण नियम",
    rules: [
      "सभी प्रोडक्ट्स कंपनी से ही खरीदने होंगे।",
      "कंपनी की इजाज़त के बिना शॉप में कोई नई चीज़ नहीं जोड़ सकते।",
      "जूस, लस्सी, फालूदा - सब कंपनी खुद बनाती है।",
      "कंपनी पहली बार फ्लेवर मुफ्त देगी।",
      "उसके बाद सभी चीज़ों के पैसे कंपनी को देने होंगे।",
    ],
    noteTitle: "महत्वपूर्ण सूचना",
    noteLeaveLabel: "अगर आप 5 साल से पहले फ्रेंचाइज़ी छोड़ना चाहते हैं:",
    noteLeavePoints: [
      "कंपनी का सारा सामान वापस करना होगा।",
      "फ्रेंचाइज़ी की रकम वापस नहीं होगी।",
    ],
    noteAfterLabel: "एग्रीमेंट की शर्तें:",
    noteAfterPoints: [
      "सारी चीज़ें एग्रीमेंट में होंगी।",
      "कंपनी को दिए पैसे वापस नहीं होंगे।",
      "छोड़ने के बाद कंपनी का नाम या लोगो इस्तेमाल नहीं कर सकते।",
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

const Franchise10LakhPage = () => {
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
            <ul className="grid grid-cols-2 gap-2.5 mb-4">
              {t.trainingItems.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-body text-sm text-foreground">
                  <Check size={15} className="text-secondary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
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
            <div className="bg-muted/60 rounded-xl p-4">
              <p className="font-body text-sm text-foreground font-medium">{t.itemsNote}</p>
            </div>
          </motion.div>

          {/* Company Support */}
          <motion.div variants={fadeUp} className="bg-secondary/5 rounded-2xl border border-secondary/30 p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Headphones size={18} className="text-secondary" />
              </div>
              {t.supportTitle}
            </h2>
            <ul className="space-y-2.5">
              {t.supportPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-2.5 font-body text-sm text-foreground">
                  <Check size={15} className="text-secondary flex-shrink-0" /> {point}
                </li>
              ))}
            </ul>
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

          {/* Agreement */}
          <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-7">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock size={18} className="text-primary" />
              </div>
              {t.agreementTitle}
            </h2>
            <ul className="space-y-2.5">
              {t.agreementPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-2.5 font-body text-sm text-foreground">
                  <Check size={15} className="text-secondary flex-shrink-0" /> {point}
                </li>
              ))}
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
              href="https://wa.me/919852779933?text=I%20am%20interested%20in%20the%2010%20Lakh%20franchise%20plan"
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

export default Franchise10LakhPage;
