import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { drinks, categories, type DrinkCategory } from "@/data/menuData";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>("juices");
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredDrinks = drinks.filter((d) => d.category === activeCategory);

  // All drinks for slider (doubled for infinite feel)
  const allDrinks = [...drinks, ...drinks];

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-10 bg-pineapple-gradient text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground"
        >
          Our <span className="text-gradient-gold">Menu</span>
        </motion.h1>
        <p className="font-body text-muted-foreground mt-2">Fresh juices, shakes & more — made daily!</p>
      </section>

      {/* Sliding Drink Menu */}
      <section className="py-10 overflow-hidden">
        <h2 className="font-display text-xl font-semibold text-center mb-6 text-foreground">Popular Drinks</h2>
        <div className="relative overflow-hidden">
          <motion.div
            ref={sliderRef}
            className="flex gap-6 animate-slide-left"
            style={{ width: "max-content" }}
          >
            {allDrinks.map((drink, i) => (
              <div
                key={`${drink.id}-${i}`}
                className={`flex-shrink-0 w-48 card-pineapple p-4 text-center hover:scale-105 transition-transform ${
                  drink.highlight ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-32 h-32 object-contain mx-auto mb-3"
                  loading="lazy"
                />
                <h3 className="font-display text-sm font-semibold text-foreground">{drink.name}</h3>
                <span className="inline-block mt-1 bg-primary text-primary-foreground font-body text-xs font-bold px-3 py-1 rounded-full">
                  ₹{drink.price}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="py-6">
        <div className="flex justify-center gap-4 flex-wrap px-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`font-body text-sm font-semibold px-6 py-2.5 rounded-full border transition-all ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary shadow-pineapple"
                  : "bg-card text-foreground border-pineapple hover:bg-pineapple-light"
              }`}
            >
              {cat.label} <span className="ml-1 opacity-70">{cat.price}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Catalog Cards */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrinks.map((drink, i) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card-pineapple p-6 flex flex-col items-center text-center hover:scale-[1.03] transition-transform ${
                  drink.highlight ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-40 h-40 object-contain mb-4"
                  loading="lazy"
                />
                <h3 className="font-display text-lg font-semibold text-foreground">{drink.name}</h3>
                <p className="font-body text-sm text-muted-foreground mt-1 mb-3">{drink.description}</p>
                <span className="bg-primary text-primary-foreground font-body text-sm font-bold px-5 py-1.5 rounded-full">
                  ₹{drink.price}
                </span>
                {drink.highlight && (
                  <span className="mt-2 font-body text-xs text-pineapple-dark font-medium">⭐ Bestseller</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
