import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, GlassWater, Cherry, Leaf, Crown, Flame, Zap } from "lucide-react";
import { drinks, categories, type DrinkCategory } from "@/data/menuData";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const springBounce = { type: "spring" as const, stiffness: 400, damping: 25 };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};

const categoryIcons: Record<DrinkCategory, React.ReactNode> = {
  shakes: <Cherry size={16} />,
  juices: <GlassWater size={16} />,
  dryfruit: <Leaf size={16} />,
};

const categoryColors: Record<DrinkCategory, { bg: string; border: string; glow: string; accent: string }> = {
  shakes: {
    bg: "from-[hsl(340_80%_55%)] to-[hsl(20_90%_55%)]",
    border: "border-[hsl(340_60%_60%/0.4)]",
    glow: "shadow-[0_0_20px_hsl(340_80%_55%/0.3)]",
    accent: "hsl(340 80% 55%)",
  },
  juices: {
    bg: "from-[hsl(35_100%_50%)] to-[hsl(45_100%_55%)]",
    border: "border-[hsl(40_100%_50%/0.4)]",
    glow: "shadow-[0_0_20px_hsl(40_100%_50%/0.3)]",
    accent: "hsl(40 100% 50%)",
  },
  dryfruit: {
    bg: "from-[hsl(160_60%_40%)] to-[hsl(140_50%_50%)]",
    border: "border-[hsl(150_50%_45%/0.4)]",
    glow: "shadow-[0_0_20px_hsl(150_50%_45%/0.3)]",
    accent: "hsl(150 50% 45%)",
  },
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>("juices");
  const filteredDrinks = drinks.filter((d) => d.category === activeCategory);
  const activeCatColor = categoryColors[activeCategory];

  const handleWhatsAppOrder = (drinkName: string, price: number) => {
    const message = `Hi! I would like to order *${drinkName}* (₹${price}) from Shalimar Juice Shop.`;
    window.open(`https://wa.me/919852779933?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="pt-16 min-h-screen" style={{ background: "linear-gradient(180deg, hsl(30 15% 8%) 0%, hsl(25 20% 12%) 30%, hsl(20 15% 10%) 100%)" }}>
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(45 100% 50% / 0.08) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(340 80% 50% / 0.06) 0%, transparent 60%)" }}
            animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, hsl(150 50% 45% / 0.05) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full" style={{ background: "linear-gradient(135deg, hsl(45 100% 50% / 0.15), hsl(35 80% 45% / 0.1))", border: "1px solid hsl(45 100% 50% / 0.3)", color: "hsl(45 100% 65%)" }}>
                <Sparkles size={12} className="animate-pulse" /> 100% Fresh & Natural
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-black tracking-tight">
              <span style={{ color: "hsl(45 20% 85%)" }}>Our </span>
              <span className="relative inline-block">
                <span style={{ background: "linear-gradient(135deg, hsl(45 100% 60%), hsl(35 90% 50%), hsl(25 100% 55%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Menu</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(45 100% 55%), hsl(25 100% 55%))" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: smoothEase }}
                />
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed" style={{ color: "hsl(40 30% 60%)" }}>
              Fresh juices, creamy shakes & premium dry fruit specials — 
              <span style={{ color: "hsl(45 100% 60%)" }} className="font-semibold"> handcrafted daily</span> with real fruits.
            </motion.p>

            {/* Category Quick View */}
            <motion.div variants={fadeUp} className="flex justify-center gap-3 md:gap-6 mt-10 flex-wrap">
              {categories.map((cat) => (
                <motion.div 
                  key={cat.key} 
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl backdrop-blur-sm`}
                  style={{ 
                    background: `linear-gradient(135deg, ${categoryColors[cat.key].accent}15, ${categoryColors[cat.key].accent}08)`,
                    border: `1px solid ${categoryColors[cat.key].accent}40`,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={springBounce}
                >
                  <span style={{ color: categoryColors[cat.key].accent }}>{categoryIcons[cat.key]}</span>
                  <span className="font-display text-sm font-bold" style={{ color: "hsl(45 20% 85%)" }}>{cat.label}</span>
                  <span className="font-display text-sm font-black px-2.5 py-0.5 rounded-lg" style={{ background: `${categoryColors[cat.key].accent}25`, color: categoryColors[cat.key].accent }}>{cat.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 backdrop-blur-xl border-b" style={{ background: "hsl(25 18% 11% / 0.9)", borderColor: "hsl(45 30% 30% / 0.2)" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-3 py-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springBounce}
                className={`relative font-body text-sm font-bold px-4 md:px-6 py-3 rounded-2xl transition-all duration-300 inline-flex items-center gap-2`}
                style={activeCategory === cat.key ? {
                  background: `linear-gradient(135deg, ${categoryColors[cat.key].accent}, ${categoryColors[cat.key].accent}cc)`,
                  color: "hsl(0 0% 100%)",
                  boxShadow: `0 0 20px ${categoryColors[cat.key].accent}40, 0 4px 12px ${categoryColors[cat.key].accent}30`,
                } : {
                  background: "hsl(30 15% 18%)",
                  color: "hsl(40 20% 55%)",
                }}
              >
                <span>{categoryIcons[cat.key]}</span>
                <span className="hidden md:inline">{cat.label}</span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full" style={activeCategory === cat.key ? {
                  background: "hsl(0 0% 100% / 0.2)",
                } : {
                  background: `${categoryColors[cat.key].accent}20`,
                  color: categoryColors[cat.key].accent,
                }}>
                  {cat.price}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          {/* Category Title */}
          <motion.div 
            key={`title-${activeCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Zap size={14} style={{ color: activeCatColor.accent }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: activeCatColor.accent }}>
                {categories.find(c => c.key === activeCategory)?.label} Menu
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black" style={{ color: "hsl(45 20% 88%)" }}>
              {categories.find(c => c.key === activeCategory)?.label}
              <span className="ml-2" style={{ background: `linear-gradient(135deg, ${activeCatColor.accent}, hsl(45 100% 60%))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Collection</span>
            </h2>
            <p className="font-body text-sm mt-3" style={{ color: "hsl(40 20% 50%)" }}>
              Starting at just <span className="font-bold" style={{ color: activeCatColor.accent }}>{categories.find(c => c.key === activeCategory)?.price}</span> per glass
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredDrinks.map((drink, index) => (
                <motion.div
                  key={drink.id}
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="group relative rounded-3xl overflow-hidden transition-all duration-500"
                  style={{ 
                    background: "linear-gradient(145deg, hsl(30 18% 16%), hsl(25 15% 13%))",
                    border: "1px solid hsl(40 20% 22%)",
                  }}
                >
                  {/* Card Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" style={{ boxShadow: `0 8px 40px ${activeCatColor.accent}20, 0 0 60px ${activeCatColor.accent}10, inset 0 1px 0 hsl(45 40% 40% / 0.1)` }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0" style={{ background: `linear-gradient(145deg, ${activeCatColor.accent}08, transparent 60%, ${activeCatColor.accent}05)` }} />
                  </div>

                  {/* Bestseller Badge */}
                  {drink.highlight && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 font-body text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${activeCatColor.accent}, ${activeCatColor.accent}cc)`, color: "white", boxShadow: `0 4px 12px ${activeCatColor.accent}40` }}
                    >
                      <Crown size={10} className="fill-current" /> Bestseller
                    </motion.span>
                  )}

                  {/* Image */}
                  <div className="relative pt-6 pb-2 px-4">
                    <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto">
                      <motion.div 
                        className="absolute inset-0 rounded-full scale-75 group-hover:scale-110 transition-transform duration-700"
                        style={{ background: `radial-gradient(circle, ${activeCatColor.accent}15, transparent 70%)` }}
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.img
                        src={drink.image}
                        alt={drink.name}
                        className="relative w-full h-full object-contain drop-shadow-2xl"
                        loading="lazy"
                        whileHover={{ scale: 1.15, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-2 text-center relative z-10">
                    <h3 className="font-display text-base md:text-lg font-bold leading-tight" style={{ color: "hsl(45 20% 88%)" }}>
                      {drink.name}
                    </h3>
                    <p className="font-body text-[11px] md:text-xs mt-1.5 line-clamp-2 min-h-[2.5em]" style={{ color: "hsl(40 15% 45%)" }}>
                      {drink.description}
                    </p>

                    {/* Price & Order */}
                    <div className="mt-4 flex flex-col gap-2.5">
                      <motion.span 
                        className="inline-flex items-center justify-center gap-1 font-display text-lg md:text-xl font-black px-5 py-2.5 rounded-2xl mx-auto"
                        style={{ 
                          background: `linear-gradient(135deg, ${activeCatColor.accent}, ${activeCatColor.accent}cc)`,
                          color: "white",
                          boxShadow: `0 4px 20px ${activeCatColor.accent}30`,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        ₹{drink.price}
                        <span className="font-body text-[10px] font-semibold opacity-70 ml-0.5">/ glass</span>
                      </motion.span>

                      <motion.button
                        onClick={() => handleWhatsAppOrder(drink.name, drink.price)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-1.5 font-body text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                        style={{ background: "linear-gradient(135deg, hsl(142 70% 40%), hsl(142 60% 35%))", color: "white", boxShadow: "0 4px 12px hsl(142 70% 40% / 0.3)" }}
                      >
                        <Flame size={12} /> Order Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* All Drinks Showcase */}
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(25 15% 10% / 0.5), hsl(30 20% 14%), hsl(25 15% 10% / 0.5))" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4" style={{ background: "hsl(45 100% 50% / 0.1)", color: "hsl(45 100% 60%)", border: "1px solid hsl(45 100% 50% / 0.2)" }}>
              <Star size={10} className="fill-current" /> Complete Collection
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight" style={{ color: "hsl(45 20% 88%)" }}>
              All <span style={{ background: "linear-gradient(135deg, hsl(45 100% 60%), hsl(25 100% 55%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Drinks</span>
            </h2>
            <p className="font-body text-sm mt-3 max-w-md mx-auto" style={{ color: "hsl(40 15% 45%)" }}>
              From refreshing juices to creamy shakes — explore our entire range
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(28 18% 13%), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(28 18% 13%), transparent)" }} />
            
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex gap-5 animate-slide-left"
                style={{ width: "max-content" }}
              >
                {[...drinks, ...drinks, ...drinks].map((drink, i) => (
                  <motion.div
                    key={`${drink.id}-${i}`}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex-shrink-0 w-40 md:w-48 rounded-2xl p-4 text-center transition-all duration-300"
                    style={{ 
                      background: "linear-gradient(145deg, hsl(30 18% 17%), hsl(25 15% 14%))",
                      border: "1px solid hsl(40 20% 22%)",
                    }}
                  >
                    <div className="relative">
                      <img
                        src={drink.image}
                        alt={drink.name}
                        className="w-24 h-24 md:w-28 md:h-28 object-contain mx-auto mb-3 drop-shadow-lg"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-display text-sm font-bold line-clamp-1" style={{ color: "hsl(45 20% 85%)" }}>{drink.name}</h3>
                    <span className="inline-flex items-center gap-1 mt-2 font-display text-sm font-black px-4 py-1.5 rounded-full" style={{ background: "linear-gradient(135deg, hsl(45 100% 50%), hsl(35 90% 45%))", color: "white", boxShadow: "0 4px 12px hsl(45 100% 50% / 0.25)" }}>
                      ₹{drink.price}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(25 20% 12%), hsl(30 25% 15%), hsl(25 20% 12%))" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full" style={{ background: "radial-gradient(ellipse, hsl(45 100% 50% / 0.08), transparent 70%)" }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: "hsl(45 20% 88%)" }}>
              Ready to <span style={{ background: "linear-gradient(135deg, hsl(45 100% 60%), hsl(25 100% 55%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Order?</span>
            </h3>
            <p className="font-body text-sm mb-8" style={{ color: "hsl(40 20% 50%)" }}>
              Order directly on WhatsApp for quick delivery
            </p>
            <motion.a
              href="https://wa.me/919852779933"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 font-body font-bold text-base px-8 py-4 rounded-2xl transition-all"
              style={{ background: "linear-gradient(135deg, hsl(142 70% 40%), hsl(142 60% 35%))", color: "white", boxShadow: "0 8px 30px hsl(142 70% 40% / 0.3)" }}
            >
              <Flame size={18} /> Order on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
