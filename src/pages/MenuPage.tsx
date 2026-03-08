import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { drinks, categories, type DrinkCategory } from "@/data/menuData";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>("juices");

  const filteredDrinks = drinks.filter((d) => d.category === activeCategory);

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative py-16 md:py-20 bg-pineapple-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 bg-primary/15 text-pineapple-dark">
              <Sparkles size={13} /> Fresh & Natural
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Our <span className="text-gradient-gold">Menu</span>
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground mt-3 max-w-md mx-auto">
              Fresh juices, shakes & more — handcrafted daily with real fruits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-1 py-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative font-body text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-pineapple"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
                <span className={`ml-1.5 text-xs font-bold ${activeCategory === cat.key ? "opacity-90" : "opacity-50"}`}>
                  {cat.price}
                </span>
              </button>
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
            >
              {filteredDrinks.map((drink, i) => (
                <motion.div
                  key={drink.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group relative bg-card rounded-2xl border border-border p-5 md:p-6 text-center hover:shadow-pineapple hover:border-primary/30 transition-all duration-300"
                >
                  {drink.highlight && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-primary/15 text-pineapple-dark font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      <Star size={10} className="fill-current" /> Best
                    </span>
                  )}
                  <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-4">
                    <div className="absolute inset-0 bg-primary/5 rounded-full scale-90 group-hover:scale-100 transition-transform duration-300" />
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="relative w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-sm md:text-base font-bold text-foreground leading-snug">
                    {drink.name}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-1 mb-3 line-clamp-2 hidden md:block">
                    {drink.description}
                  </p>
                  <span className="inline-block bg-primary text-primary-foreground font-display text-sm font-bold px-5 py-1.5 rounded-full">
                    ₹{drink.price}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Popular Slider */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              All <span className="text-gradient-gold">Drinks</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-2">Our complete collection</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              className="flex gap-5 animate-slide-left"
              style={{ width: "max-content" }}
            >
              {[...drinks, ...drinks].map((drink, i) => (
                <div
                  key={`${drink.id}-${i}`}
                  className="flex-shrink-0 w-44 md:w-52 bg-card rounded-2xl border border-border p-4 text-center"
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
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
