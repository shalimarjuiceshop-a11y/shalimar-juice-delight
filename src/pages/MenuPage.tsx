import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, Sparkles, CupSoda, Citrus, Nut, Crown, ShoppingBag } from "lucide-react";
import { drinks, categories, type DrinkCategory } from "@/data/menuData";
import FlavorQuiz from "@/components/FlavorQuiz";
import TiltCard from "@/components/TiltCard";
import MenuTasteAnimation from "@/components/MenuTasteAnimation";
import MenuBookAnimation from "@/components/MenuBookAnimation";
import OrderBikeAnimation from "@/components/OrderBikeAnimation";

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
  const navigate = useNavigate();

  const filteredDrinks = drinks.filter((d) => d.category === activeCategory);

  const handleOrderNow = (drinkId: string) => {
    navigate(`/order?drink=${drinkId}`);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 bg-page-header overflow-hidden">
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <Sparkles size={12} className="animate-pulse" /> 100% Fresh & Natural
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-black tracking-tight flex items-center justify-center gap-3 md:gap-5 flex-wrap">
                <span className="inline-flex items-baseline">
                  <span className="text-cream">Our&nbsp;</span>
                  <span className="relative inline-block">
                    <span className="text-gradient-gold">Menu</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-primary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6, ease: smoothEase }}
                    />
                  </span>
                </span>
                <MenuBookAnimation />
              </motion.h1>

              <motion.p variants={fadeUp} className="font-body text-base md:text-lg mt-4 max-w-lg mx-auto leading-relaxed text-header-muted">
                Fresh juices, creamy shakes & premium dry fruit specials —
                <span className="text-primary font-semibold"> handcrafted daily</span> with real fruits.
              </motion.p>

              <motion.div variants={fadeUp} className="flex justify-center gap-2.5 md:gap-4 mt-8 flex-wrap">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.key}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="group relative flex items-center gap-2.5 pl-1.5 pr-3.5 md:pr-4 py-1.5 rounded-full bg-gradient-to-b from-cream/[0.08] to-cream/[0.03] border border-primary/25 backdrop-blur-sm shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-primary/50 hover:shadow-[0_10px_30px_-10px_hsl(45_100%_50%/0.35),inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300"
                  >
                    <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(38_95%_48%)] text-primary-foreground shadow-[0_4px_10px_-2px_hsl(45_100%_50%/0.5),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-primary/40">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/25" />
                      <span className="relative">{categoryIcons[cat.key]}</span>
                    </span>
                    <span className="font-display text-[13px] md:text-sm font-bold text-cream tracking-tight">{cat.label}</span>
                    <span className="font-display text-[13px] md:text-sm font-black text-primary tabular-nums">{cat.price}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 glass border-b border-border/40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-3 py-3.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springBounce}
                  aria-pressed={isActive}
                  className={`relative font-body text-sm font-bold pl-1.5 pr-3 md:pr-4 py-1.5 rounded-full inline-flex items-center gap-2 transition-all duration-300 border ${
                    isActive
                      ? "bg-gradient-to-b from-primary to-[hsl(38_95%_48%)] text-primary-foreground border-primary/60 shadow-[0_10px_28px_-8px_hsl(45_100%_50%/0.55),inset_0_1px_0_rgba(255,255,255,0.4)]"
                      : "bg-card/80 text-foreground border-border/60 hover:border-primary/40 shadow-[0_4px_12px_-6px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.2)]"
                  }`}
                >
                  <span className={`relative inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full ring-1 ${
                    isActive
                      ? "bg-primary-foreground/15 text-primary-foreground ring-primary-foreground/30"
                      : "bg-primary/10 text-primary ring-primary/25"
                  }`}>
                    {categoryIcons[cat.key]}
                  </span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className={`font-display text-[12px] md:text-[13px] font-black tabular-nums px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/12 text-primary"
                  }`}>
                    {cat.price}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fun Cartoon Animation */}
      <section className="pt-10 md:pt-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="max-w-4xl mx-auto"
          >
            <MenuTasteAnimation />
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8"
            >
              {filteredDrinks.map((drink, index) => (
                <TiltCard key={drink.id} className="group h-full">
                  <motion.div
                    variants={scaleIn}
                    className="relative h-full flex flex-col bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-pineapple"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                    </div>

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

                    <div className="relative pt-8 pb-4 px-4">
                      <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 mx-auto">
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
                          whileHover={{
                            rotateY: 360,
                            scale: 1.1,
                            transition: { rotateY: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 0.3 } }
                          }}
                          style={{ transformStyle: "preserve-3d" }}
                        />
                      </div>
                    </div>

                    <div className="p-4 pt-3 text-center flex-1 flex flex-col">
                      <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-tight line-clamp-2 min-h-[2.6em] flex items-center justify-center">
                        {drink.name}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-muted-foreground mt-2 line-clamp-2 min-h-[2.5em]">
                        {drink.description}
                      </p>


                      <div className="mt-auto pt-4 flex flex-col gap-2">
                        <motion.span
                          className="inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground font-display text-lg md:text-xl font-black px-5 py-2 rounded-2xl glow-gold-soft mx-auto"
                          whileHover={{ scale: 1.05 }}
                        >
                          ₹{drink.price}
                          <span className="font-body text-[10px] font-semibold opacity-70 ml-0.5">/ glass</span>
                        </motion.span>

                        <motion.button
                          onClick={(e) => { e.stopPropagation(); handleOrderNow(drink.id); }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center justify-center gap-1.5 bg-whatsapp text-whatsapp-foreground font-body text-xs font-bold px-4 py-2 rounded-xl hover:brightness-110 transition-all"
                        >
                          <ShoppingBag size={12} /> Order Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* All Drinks Showcase */}
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
                    className="flex-shrink-0 w-40 md:w-48 bg-card rounded-2xl border border-border p-4 text-center hover:border-primary/30 hover:shadow-pineapple transition-all duration-300 cursor-pointer"
                    onClick={() => handleOrderNow(drink.id)}
                  >
                    <div className="relative">
                      <img src={drink.image} alt={drink.name} className="w-24 h-24 md:w-28 md:h-28 object-contain mx-auto mb-3 drop-shadow-md" loading="lazy" />
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

      <FlavorQuiz />

      {/* CTA Section */}
      <section className="py-16 bg-page-header relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <OrderBikeAnimation />
            <h3 className="font-display text-2xl md:text-3xl font-black text-cream mb-3">
              Ready to <span className="text-gradient-gold">Order?</span>
            </h3>
            <p className="font-body text-sm mb-6 text-header-accent">
              Order directly on WhatsApp for quick delivery
            </p>
            <motion.a
              href="https://wa.me/919852779933"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground font-body font-bold text-base px-8 py-4 rounded-2xl hover:brightness-110 transition-all shadow-lg"
            >
              <ShoppingBag size={18} /> Order on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
