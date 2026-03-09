import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, Flame } from "lucide-react";
import type { Drink } from "@/data/menuData";

interface CartItem extends Drink {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (drink: Drink) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (drink: Drink) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === drink.id);
      if (existing) return prev.map((i) => i.id === drink.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...drink, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };
  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const CartButton = () => {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-5 z-50 bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg glow-gold"
      >
        <ShoppingCart size={22} />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && <CartDrawer onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

const CartDrawer = ({ onClose }: { onClose: () => void }) => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const itemLines = items.map((i) => `• ${i.name} x${i.quantity} = ₹${i.price * i.quantity}`).join("\n");
    const message = `Hi! I'd like to order from Shalimar Juice Shop:\n\n${itemLines}\n\n*Total: ₹${totalPrice}*`;
    window.open(`https://wa.me/919852779933?text=${encodeURIComponent(message)}`, "_blank");
    clearCart();
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <ShoppingCart size={18} className="text-primary" /> Your Order
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={40} className="mx-auto text-muted-foreground/30 mb-3" />
              <p className="font-body text-sm text-muted-foreground">Cart is empty</p>
              <p className="font-body text-xs text-muted-foreground/60 mt-1">Add drinks from the menu</p>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="flex items-center gap-3 bg-muted/50 rounded-xl p-3"
                >
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-bold text-foreground truncate">{item.name}</h4>
                    <p className="font-body text-xs text-primary font-bold">₹{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-border transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="font-display text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-border transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {totalItems > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-muted-foreground">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
              <span className="font-display text-xl font-black text-primary">₹{totalPrice}</span>
            </div>
            <motion.button
              onClick={handleWhatsAppOrder}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-leaf text-white font-body font-bold text-sm py-3.5 rounded-xl hover:brightness-110 transition-all"
            >
              <Flame size={16} /> Order on WhatsApp
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartButton;
