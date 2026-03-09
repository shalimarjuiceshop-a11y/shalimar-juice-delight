import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Crown } from "lucide-react";
import type { Drink } from "@/data/menuData";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ingredients = ["Fresh Fruit", "Ice"];

interface DrinkDetailModalProps {
  drink: Drink | null;
  onClose: () => void;
  onOrder: (name: string, price: number) => void;
}

const DrinkDetailModal = ({ drink, onClose, onOrder }: DrinkDetailModalProps) => {

  return (
    <AnimatePresence>
      {drink && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "hsl(30 15% 8% / 0.85)", backdropFilter: "blur(12px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-card rounded-3xl border border-border overflow-hidden shadow-2xl"
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X size={18} className="text-foreground" />
            </button>

            {/* Image Section */}
            <div className="relative bg-gradient-to-b from-primary/10 to-transparent pt-10 pb-6 px-6">
              {drink.highlight && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 bg-primary text-primary-foreground font-body text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full shadow-lg">
                  <Crown size={10} className="fill-current" /> Bestseller
                </span>
              )}
              
              <motion.div
                className="relative w-48 h-48 md:w-56 md:h-56 mx-auto"
                initial={{ scale: 0.8, rotateY: -20 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                style={{ perspective: 600 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/10 scale-90"
                  animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.img
                  src={drink.image}
                  alt={drink.name}
                  className="relative w-full h-full object-contain drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              <div className="text-center mb-5">
                <h2 className="font-display text-2xl md:text-3xl font-black text-foreground">
                  {drink.name}
                </h2>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {drink.description}
                </p>
              </div>

              {/* Ingredients */}
              {details && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-5"
                >
                  <h4 className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {details.ingredients.map((ing, i) => (
                      <motion.span
                        key={ing}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                        className="px-3 py-1.5 rounded-full bg-muted text-foreground font-body text-xs font-semibold"
                      >
                        {ing}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Nutrition */}
              {details && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-3 gap-3 mb-6"
                >
                  {details.nutrition.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="bg-muted/60 rounded-xl p-3 text-center"
                    >
                      <span className="text-primary mb-1 block">{item.icon}</span>
                      <span className="font-display text-sm font-black text-foreground block">{item.value}</span>
                      <span className="font-body text-[10px] text-muted-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Price & Actions */}
              <div className="flex items-center gap-3">
                <motion.span
                  className="bg-primary text-primary-foreground font-display text-2xl font-black px-6 py-3 rounded-2xl glow-gold-soft"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ₹{drink.price}
                </motion.span>
                <motion.button
                  onClick={() => onOrder(drink.name, drink.price)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-leaf text-white font-body text-sm font-bold py-3.5 rounded-2xl hover:brightness-110 transition-all"
                >
                  <Flame size={16} /> Order on WhatsApp
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DrinkDetailModal;
