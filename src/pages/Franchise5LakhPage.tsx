import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertTriangle, Package, GraduationCap, Droplets, Shield, Wrench, RefreshCw } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Franchise5LakhPage = () => {
  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-10 bg-pineapple-gradient">
        <div className="container mx-auto px-4">
          <Link to="/franchise" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Franchise Plans
          </Link>
          <motion.h1 {...fadeUp} className="font-display text-3xl md:text-4xl font-bold text-foreground">
            🍍 2 Year Franchise – ₹5 Lakh
          </motion.h1>
          <p className="font-body text-muted-foreground mt-2">Complete details about the 2-year franchise package.</p>
        </div>
      </section>

      {/* Training */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <GraduationCap size={20} className="text-pineapple-dark" /> Juice Training
            </h2>
            <p className="font-body text-sm text-foreground mb-3">Company will teach juice making.</p>
            <p className="font-body text-sm font-semibold text-foreground mb-2">Training juices:</p>
            <ul className="space-y-2 mb-4">
              {["Pineapple", "Apple", "Mango", "Jamun"].map((item) => (
                <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
                  <Check size={16} className="text-secondary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="bg-pineapple-light/50 rounded-lg p-3">
              <p className="font-body text-sm text-foreground font-medium">✅ Company will give 4 juice liquids free first time.</p>
            </div>
          </motion.div>

          {/* Items */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Package size={20} className="text-pineapple-dark" /> Items From Company
            </h2>
            <p className="font-body text-sm text-foreground mb-3">Company will give these items:</p>
            <ul className="space-y-2 mb-4">
              {[
                "5 Mixers",
                "Steel counter (2 × 5 feet)",
                "1 Ice machine",
                "1 Ice box",
                "24 Glasses",
                "3 Water buckets",
                "1 Juice machine",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
                  <Check size={16} className="text-secondary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-muted-foreground italic">These items will help to make original juice.</p>
            <div className="bg-pineapple-light/50 rounded-lg p-3 mt-3">
              <p className="font-body text-sm text-foreground font-medium">📦 These items are given for 2 years.</p>
            </div>
          </motion.div>

          {/* Juice Liquid */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Droplets size={20} className="text-pineapple-dark" /> Juice Liquid
            </h2>
            <ul className="space-y-2">
              <li className="font-body text-sm text-foreground">✅ Company will give juice liquid free for 1 month.</li>
              <li className="font-body text-sm text-foreground">After that you must buy juice liquid from company.</li>
              <li className="font-body text-sm text-foreground font-semibold">Price: ₹1000 for 1 liter.</li>
            </ul>
          </motion.div>

          {/* Important Rules */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Shield size={20} className="text-pineapple-dark" /> Important Rules
            </h2>
            <ul className="space-y-2">
              {[
                "Franchise time is 2 years.",
                "Franchise money will not return.",
                "All work will follow company agreement.",
                "Without company permission, no new item can be added.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                  <AlertTriangle size={16} className="text-pineapple-dark mt-0.5 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* If Item Breaks */}
          <motion.div {...fadeUp} transition={{ delay: 0.35 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Wrench size={20} className="text-pineapple-dark" /> If Item Breaks
            </h2>
            <p className="font-body text-sm text-foreground">
              If any company item breaks, you must pay money to company.
            </p>
          </motion.div>

          {/* After 2 Years */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="card-pineapple p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <RefreshCw size={20} className="text-pineapple-dark" /> After 2 Years
            </h2>
            <p className="font-body text-sm text-foreground mb-3">After 2 years:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 font-body text-sm text-foreground">
                <span className="text-pineapple-dark font-bold">•</span> All company items must be returned to company.
              </li>
            </ul>
          </motion.div>

          {/* Important Note */}
          <motion.div {...fadeUp} transition={{ delay: 0.45 }} className="border-2 border-destructive/30 bg-destructive/5 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-destructive" /> Important Note
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 font-body text-sm text-foreground">
                <span className="text-destructive font-bold">•</span> If you want to keep company items, you must renew agreement.
              </li>
              <li className="flex items-start gap-2 font-body text-sm text-foreground">
                <span className="text-destructive font-bold">•</span> Only company juice method should be used.
              </li>
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
              Enquire Now on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Franchise5LakhPage;
