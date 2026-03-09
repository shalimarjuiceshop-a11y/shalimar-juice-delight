import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, MessageCircle } from "lucide-react";
import { drinks, categories, type DrinkCategory } from "@/data/menuData";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: smoothEase } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: smoothEase } },
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>("juices");

  const filteredDrinks = drinks.filter((d) => d.category === activeCategory);

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative py-16 md:py-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-accent/30"
              style={{ color: "hsl(45 60% 70%)", background: "hsl(45 100% 50% / 0.08)" }}
            >
              <Sparkles size={13} /> Fresh & Natural
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "hsl(45 100% 96%)" }}>
              Our <span className="text-gradient-gold">Menu</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-3 max-w-md mx-auto" style={{ color: "hsl(45 30% 70%)" }}>
              Fresh juices, shakes & more — handcrafted daily with real fruits.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 glass-dark border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-1 py-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`relative font-body text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground glow-gold-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
                <span className={`ml-1.5 text-xs font-bold ${activeCategory === cat.key ? "opacity-90" : "opacity-50"}`}>
                  {cat.price}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
            >
              {filteredDrinks.map((drink) => (
                <motion.div
                  key={drink.id}
                  variants={scaleIn}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="group relative card-premium p-5 md:p-6 text-center transition-all duration-300 flex flex-col"
                >
                  {drink.highlight && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-primary/15 text-pineapple-dark font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      <Star size={10} className="fill-current" /> Best
                    </span>
                  )}
                  <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-4">
                    <div className="absolute inset-0 bg-primary/5 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500 ease-out" />
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="relative w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-sm md:text-base font-bold text-foreground leading-snug">
                    {drink.name}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-1 mb-3 line-clamp-2 hidden md:block">
                    {drink.description}
                  </p>
                  <div className="mt-auto flex flex-col items-center gap-2 pt-2">
                    <span className="inline-block bg-primary text-primary-foreground font-display text-sm font-bold px-5 py-1.5 rounded-full glow-gold-soft">
                      ₹{drink.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* All Drinks Slider */}
      <section className="py-12 md:py-16 bg-muted/40 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              All <span className="text-gradient-gold">Drinks</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-2">Our complete collection</p>
          </motion.div>
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              className="flex gap-5 animate-slide-left"
              style={{ width: "max-content" }}
            >
              {[...drinks, ...drinks].map((drink, i) => (
                <motion.div
                  key={`${drink.id}-${i}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-shrink-0 w-44 md:w-52 bg-card rounded-2xl border border-border p-4 text-center hover:shadow-pineapple transition-shadow duration-300"
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-28 h-28 md:w-32 md:h-32 object-contain mx-auto mb-3"
                    loading="lazy"
                  />
                  <h3 className="font-display text-sm font-bold text-foreground">{drink.name}</h3>
                  <span className="inline-block mt-2 bg-primary text-primary-foreground font-display text-xs font-bold px-4 py-1 rounded-full">
                    ₹{drink.price}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
