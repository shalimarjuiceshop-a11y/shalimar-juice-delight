import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, CupSoda, Citrus, Nut, Crown, Flame } from "lucide-react";
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
  shakes: <CupSoda size={16} />,
  juices: <Citrus size={16} />,
  dryfruit: <Nut size={16} />,
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>("juices");
  const filteredDrinks = drinks.filter((d) => d.category === activeCategory);

  const handleWhatsAppOrder = (drinkName: string, price: number) => {
    const message = `Hi! I would like to order *${drinkName}* (₹${price}) from Shalimar Juice Shop.`;
    window.open(`https://wa.me/919852779933?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="pt-16 min-h-screen bg-background">
      {/* Hero Header - Premium Dark */}
      <section className="relative py-20 md:py-24 bg-page-header overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <motion.div 
            className="absolute top-10 left-10 w-32 h-32 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(45 100% 50% / 0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 right-20 w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(35 80% 45% / 0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Sparkles size={12} className="animate-pulse" /> 100% Fresh & Natural
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-black tracking-tight">
              <span className="text-cream">Our </span>
              <span className="relative inline-block">
                <span className="text-gradient-gold">Menu</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: smoothEase }}
                />
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-4 max-w-lg mx-auto leading-relaxed" style={{ color: "hsl(45 40% 75%)" }}>
              Fresh juices, creamy shakes & premium dry fruit specials — 
              <span className="text-primary font-semibold"> handcrafted daily</span> with real fruits.
            </motion.p>

            {/* Category Quick View */}
            <motion.div variants={fadeUp} className="flex justify-center gap-4 md:gap-8 mt-8 flex-wrap">
              {categories.map((cat) => (
                <div key={cat.key} className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                  <span className="text-primary">{categoryIcons[cat.key]}</span>
                  <span className="font-display text-sm font-bold text-cream">{cat.label}</span>
                  <span className="font-display text-sm font-black text-primary">{cat.price}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs - Premium Glass */}
      <section className="sticky top-16 z-30 glass border-b border-border/40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-3 py-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springBounce}
                className={`relative font-body text-sm font-bold px-4 md:px-6 py-3 rounded-2xl transition-all duration-300 inline-flex items-center gap-2 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground glow-gold"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className={activeCategory === cat.key ? "text-primary-foreground" : "text-primary"}>
                  {categoryIcons[cat.key]}
                </span>
                <span className="hidden md:inline">{cat.label}</span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                  activeCategory === cat.key 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-primary/15 text-primary"
                }`}>
                  {cat.price}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid - Premium Cards */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          {/* Category Title */}
          <motion.div 
            key={`title-${activeCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-black text-foreground">
              {categories.find(c => c.key === activeCategory)?.label}
              <span className="text-gradient-gold ml-2">Collection</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Starting at just <span className="text-primary font-bold">{categories.find(c => c.key === activeCategory)?.price}</span> per glass
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
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="group relative bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-pineapple"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                  </div>

                  {/* Badge */}
                  {drink.highlight && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-primary text-primary-foreground font-body text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full shadow-lg"
                    >
                      <Crown size={10} className="fill-current" /> Bestseller
                    </motion.span>
                  )}

                  {/* Image Container */}
                  <div className="relative pt-8 pb-4 px-4">
                    <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 mx-auto">
                      {/* Glow behind image */}
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-primary/10 scale-75 group-hover:scale-110 transition-transform duration-700"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.img
                        src={drink.image}
                        alt={drink.name}
                        className="relative w-full h-full object-contain drop-shadow-xl"
                        loading="lazy"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-2 text-center">
                    <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-tight">
                      {drink.name}
                    </h3>
                    <p className="font-body text-[11px] md:text-xs text-muted-foreground mt-1.5 line-clamp-2 min-h-[2.5em]">
                      {drink.description}
                    </p>

                    {/* Price & Order */}
                    <div className="mt-4 flex flex-col gap-2">
                      <motion.span 
                        className="inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground font-display text-lg md:text-xl font-black px-5 py-2 rounded-2xl glow-gold-soft mx-auto"
                        whileHover={{ scale: 1.05 }}
                      >
                        ₹{drink.price}
                        <span className="font-body text-[10px] font-semibold opacity-70 ml-0.5">/ glass</span>
                      </motion.span>

                      <motion.button
                        onClick={() => handleWhatsAppOrder(drink.name, drink.price)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-1.5 bg-leaf text-white font-body text-xs font-bold px-4 py-2 rounded-xl hover:brightness-110 transition-all"
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

      {/* All Drinks Showcase - Premium Slider */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
              <Star size={10} className="fill-current" /> Complete Collection
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-foreground">
              All <span className="text-gradient-gold">Drinks</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              From refreshing juices to creamy shakes — explore our entire range
            </p>
          </motion.div>

          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/80 to-transparent z-10 pointer-events-none" />
            
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
                    className="flex-shrink-0 w-40 md:w-48 bg-card rounded-2xl border border-border p-4 text-center hover:border-primary/30 hover:shadow-pineapple transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={drink.image}
                        alt={drink.name}
                        className="w-24 h-24 md:w-28 md:h-28 object-contain mx-auto mb-3 drop-shadow-md"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground line-clamp-1">{drink.name}</h3>
                    <span className="inline-flex items-center gap-1 mt-2 bg-primary text-primary-foreground font-display text-sm font-black px-4 py-1.5 rounded-full">
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
      <section className="py-16 bg-page-header relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl md:text-3xl font-black text-cream mb-3">
              Ready to <span className="text-gradient-gold">Order?</span>
            </h3>
            <p className="font-body text-sm mb-6" style={{ color: "hsl(45 30% 65%)" }}>
              Order directly on WhatsApp for quick delivery
            </p>
            <motion.a
              href="https://wa.me/919852779933"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-leaf text-white font-body font-bold text-base px-8 py-4 rounded-2xl hover:brightness-110 transition-all shadow-lg"
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
