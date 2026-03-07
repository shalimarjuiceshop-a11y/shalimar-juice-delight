import { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertTriangle, Building2, GraduationCap, Package } from "lucide-react";

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
  },
};

const plans = [
  { duration: "1 Year", price: "₹3 Lakh", durationHi: "1 साल", priceHi: "₹3 लाख" },
  { duration: "2 Years", price: "₹5 Lakh", durationHi: "2 साल", priceHi: "₹5 लाख" },
  { duration: "3 Years", price: "₹7 Lakh", durationHi: "3 साल", priceHi: "₹7 लाख", popular: true },
  { duration: "5 Years", price: "₹10 Lakh", durationHi: "5 साल", priceHi: "₹10 लाख" },
];

const FranchisePage = () => {
  const [lang, setLang] = useState<Lang>("hinglish");
  const t = content[lang];

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-10 bg-pineapple-gradient text-center">
        <div className="flex justify-center gap-2 mb-4">
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
              {l === "hinglish" ? "Hinglish" : "हिंदी"}
            </button>
          ))}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground"
        >
          🍍 {t.title}
        </motion.h1>
        <p className="font-body text-muted-foreground mt-2 max-w-xl mx-auto px-4">{t.subtitle}</p>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-center mb-8 text-foreground">{t.pricing}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card-pineapple p-6 text-center relative hover:scale-105 transition-transform ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-body font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <Building2 className="mx-auto mb-3 text-pineapple-dark" size={28} />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {lang === "hindi" ? plan.durationHi : plan.duration}
                </h3>
                <p className="font-display text-3xl font-bold text-gradient-gold mt-2">
                  {lang === "hindi" ? plan.priceHi : plan.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <Package size={20} className="text-pineapple-dark" /> {t.facilities}
            </h2>
            <ul className="space-y-3">
              {t.facilityItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <Check size={16} className="text-secondary mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 card-pineapple p-4">
              <p className="font-body text-sm text-foreground font-medium">✅ {t.firstMonth}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">{t.refill} <strong>₹1000</strong></p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <GraduationCap size={20} className="text-pineapple-dark" /> {t.training}
            </h2>
            <ul className="space-y-3">
              {t.trainingItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <Check size={16} className="text-secondary mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-xl font-bold mb-6 text-center text-foreground flex items-center justify-center gap-2">
            <AlertTriangle size={20} className="text-pineapple-dark" /> {t.rules}
          </h2>
          <div className="space-y-3">
            {[t.shopSize, t.agreement, t.nonRefundable, t.staffHiring, t.nameRule].map((rule, i) => (
              <div key={i} className="card-pineapple p-4 flex items-start gap-3">
                <span className="text-pineapple-dark font-bold font-body text-sm">{i + 1}.</span>
                <p className="font-body text-sm text-foreground">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FranchisePage;
