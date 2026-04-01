import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Store, Home, Plus, Minus, Trash2, Send, User, Phone, MapPin, X, ShoppingBag } from "lucide-react";
import { drinks, type Drink } from "@/data/menuData";
import { z } from "zod";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919852779933";

type OrderMode = null | "shop" | "home";

interface CartItem {
  drink: Drink;
  qty: number;
}

const homeSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  address: z.string().trim().min(5, "Enter full delivery address").max(300),
});

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CartOrderSystem = () => {
  const [mode, setMode] = useState<OrderMode>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [homeForm, setHomeForm] = useState({ name: "", mobile: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCheckout, setShowCheckout] = useState(false);

  const totalQty = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((s, c) => s + c.qty * c.drink.price, 0), [cart]);

  // Home delivery pricing: min 5 glasses at ₹50 each, or 20+ glasses at ₹10 each
  const homeMinGlasses = 5;
  const homeMinPrice50 = 50;
  const homeBulkGlasses = 20;
  const homeBulkPrice = 10;

  const getHomePrice = (drink: Drink, qty: number) => {
    if (qty >= homeBulkGlasses) return homeBulkPrice;
    return homeMinPrice50;
  };

  const homeTotalPrice = useMemo(() => {
    if (mode !== "home") return totalPrice;
    return cart.reduce((s, c) => s + c.qty * getHomePrice(c.drink, totalQty), 0);
  }, [cart, mode, totalQty]);

  const addToCart = (drink: Drink) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.drink.id === drink.id);
      if (existing) {
        return prev.map((c) => c.drink.id === drink.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { drink, qty: 1 }];
    });
    toast.success(`${drink.name} added to cart!`);
  };

  const updateQty = (drinkId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => c.drink.id === drinkId ? { ...c, qty: Math.max(0, c.qty + delta) } : c)
        .filter((c) => c.qty > 0)
    );
  };

  const removeItem = (drinkId: string) => {
    setCart((prev) => prev.filter((c) => c.drink.id !== drinkId));
  };

  const canCheckout = () => {
    if (mode === "shop") return totalQty >= 1;
    if (mode === "home") return totalQty >= homeMinGlasses;
    return false;
  };

  const handleCheckout = () => {
    if (!canCheckout()) {
      if (mode === "home") toast.error(`Minimum ${homeMinGlasses} glasses required for home delivery!`);
      return;
    }
    if (mode === "home") {
      setShowCheckout(true);
    } else {
      sendWhatsApp();
    }
  };

  const sendWhatsApp = () => {
    if (mode === "home") {
      const result = homeSchema.safeParse(homeForm);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
    }

    const pricePerGlass = mode === "home" ? (totalQty >= homeBulkGlasses ? `₹${homeBulkPrice}` : `₹${homeMinPrice50}`) : "Menu Price";
    const orderItems = cart.map((c) => {
      const price = mode === "home" ? getHomePrice(c.drink, totalQty) : c.drink.price;
      return `• ${c.drink.name} × ${c.qty} = ₹${c.qty * price}`;
    }).join("%0A");

    const finalTotal = mode === "home" ? homeTotalPrice : totalPrice;

    let message = `🛒 *New Order - ${mode === "home" ? "Home Delivery" : "Shop Pickup"}*%0A%0A`;
    message += `📦 *Items:*%0A${orderItems}%0A%0A`;
    message += `💰 *Total: ₹${finalTotal}* (${totalQty} glasses)%0A`;

    if (mode === "home") {
      message += `%0A👤 *Name:* ${encodeURIComponent(homeForm.name)}`;
      message += `%0A📱 *Mobile:* ${encodeURIComponent(homeForm.mobile)}`;
      message += `%0A📍 *Address:* ${encodeURIComponent(homeForm.address)}`;
      message += `%0A%0A💡 *Pricing:* ${totalQty >= homeBulkGlasses ? `₹${homeBulkPrice}/glass (20+ bulk)` : `₹${homeMinPrice50}/glass`}`;
    }

    message += `%0A%0A_Sent from Shalimar Juice Website_`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    toast.success("Redirecting to WhatsApp!");
    setCart([]);
    setHomeForm({ name: "", mobile: "", address: "" });
    setShowCheckout(false);
    setIsCartOpen(false);
  };

  // Mode Selection Screen
  if (!mode) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsCartOpen(!isCartOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg flex items-center justify-center glow-gold"
        >
          <ShoppingCart size={22} />
        </motion.button>

        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="absolute bottom-18 right-0 w-80 bg-card rounded-2xl border border-border shadow-2xl p-6 overflow-hidden"
            >
              <h3 className="font-display text-lg font-bold text-foreground text-center mb-2">Order Juice</h3>
              <p className="font-body text-xs text-muted-foreground text-center mb-5">Where are you ordering from?</p>

              <div className="space-y-3">
                <motion.button
                  onClick={() => { setMode("shop"); setIsCartOpen(false); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Store size={22} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-sm font-bold text-foreground">At the Shop</p>
                    <p className="font-body text-[11px] text-muted-foreground">Min 1 glass • Regular prices</p>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => { setMode("home"); setIsCartOpen(false); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Home size={22} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-sm font-bold text-foreground">Home Delivery</p>
                    <p className="font-body text-[11px] text-muted-foreground">Min 5 glasses @ ₹50 • 20+ @ ₹10</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Cart Active - Show floating cart button with count
  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="w-[340px] max-h-[80vh] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Cart Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} className="text-primary" />
                  <h3 className="font-display text-base font-bold text-foreground">Your Cart</h3>
                  <span className="text-[10px] font-body font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {mode === "shop" ? "Shop" : "Home Delivery"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setMode(null); setCart([]); setIsCartOpen(false); }} className="text-[10px] font-body text-muted-foreground hover:text-foreground underline">
                    Change
                  </button>
                  <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Pricing Info for Home */}
              {mode === "home" && (
                <div className="px-4 py-2.5 bg-primary/5 border-b border-border">
                  <p className="font-body text-[11px] text-primary font-semibold">
                    🏠 Min 5 glasses @ ₹50/glass • 20+ glasses @ ₹10/glass
                  </p>
                </div>
              )}

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag size={36} className="text-muted-foreground/30 mx-auto mb-3" />
                    <p className="font-body text-sm text-muted-foreground">Cart is empty</p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">Add drinks from the menu</p>
                  </div>
                ) : (
                  cart.map((item) => {
                    const price = mode === "home" ? getHomePrice(item.drink, totalQty) : item.drink.price;
                    return (
                      <motion.div
                        key={item.drink.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3 bg-muted/30 rounded-xl p-3"
                      >
                        <img src={item.drink.image} alt={item.drink.name} className="w-10 h-10 object-contain" />
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-xs font-bold text-foreground truncate">{item.drink.name}</p>
                          <p className="font-body text-[11px] text-primary font-semibold">₹{price} × {item.qty} = ₹{price * item.qty}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => updateQty(item.drink.id, -1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="font-display text-sm font-bold w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.drink.id, 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                            <Plus size={12} />
                          </button>
                          <button onClick={() => removeItem(item.drink.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors ml-1">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Checkout Section */}
              {cart.length > 0 && !showCheckout && (
                <div className="p-4 border-t border-border bg-muted/20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-body text-sm text-muted-foreground">{totalQty} glasses</span>
                    <span className="font-display text-xl font-black text-gradient-gold">₹{mode === "home" ? homeTotalPrice : totalPrice}</span>
                  </div>
                  {mode === "home" && totalQty < homeMinGlasses && (
                    <p className="font-body text-[11px] text-destructive mb-2">
                      ⚠️ Add {homeMinGlasses - totalQty} more glass(es) for home delivery (min {homeMinGlasses})
                    </p>
                  )}
                  <motion.button
                    onClick={handleCheckout}
                    disabled={!canCheckout()}
                    whileHover={canCheckout() ? { scale: 1.02 } : {}}
                    whileTap={canCheckout() ? { scale: 0.98 } : {}}
                    className={`w-full flex items-center justify-center gap-2 font-body text-sm font-bold px-6 py-3 rounded-xl transition-all ${
                      canCheckout()
                        ? "bg-primary text-primary-foreground glow-gold hover:brightness-105"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <Send size={14} />
                    {mode === "shop" ? "Order via WhatsApp" : "Continue to Details"}
                  </motion.button>
                </div>
              )}

              {/* Home Delivery Form */}
              {showCheckout && mode === "home" && (
                <div className="p-4 border-t border-border bg-muted/20 space-y-3">
                  <h4 className="font-display text-sm font-bold text-foreground">Delivery Details</h4>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-3 text-muted-foreground/50" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={homeForm.name}
                      onChange={(e) => setHomeForm({ ...homeForm, name: e.target.value })}
                      className={`w-full bg-muted/50 border ${errors.name ? "border-destructive" : "border-border"} rounded-xl px-4 py-2.5 pl-9 text-xs font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40`}
                    />
                    {errors.name && <p className="text-[10px] text-destructive mt-0.5">{errors.name}</p>}
                  </div>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-3 text-muted-foreground/50" />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={homeForm.mobile}
                      onChange={(e) => setHomeForm({ ...homeForm, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      className={`w-full bg-muted/50 border ${errors.mobile ? "border-destructive" : "border-border"} rounded-xl px-4 py-2.5 pl-9 text-xs font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40`}
                    />
                    {errors.mobile && <p className="text-[10px] text-destructive mt-0.5">{errors.mobile}</p>}
                  </div>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-3 text-muted-foreground/50" />
                    <textarea
                      placeholder="Full Delivery Address"
                      value={homeForm.address}
                      onChange={(e) => setHomeForm({ ...homeForm, address: e.target.value })}
                      rows={2}
                      className={`w-full bg-muted/50 border ${errors.address ? "border-destructive" : "border-border"} rounded-xl px-4 py-2.5 pl-9 text-xs font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none`}
                    />
                    {errors.address && <p className="text-[10px] text-destructive mt-0.5">{errors.address}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowCheckout(false)} className="flex-1 font-body text-xs font-semibold px-4 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors">
                      Back
                    </button>
                    <motion.button
                      onClick={sendWhatsApp}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground font-body text-xs font-bold px-4 py-2.5 rounded-xl glow-gold hover:brightness-105"
                    >
                      <Send size={12} /> Send Order
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsCartOpen(!isCartOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg flex items-center justify-center glow-gold"
        >
          <ShoppingCart size={22} />
          {totalQty > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground font-display text-xs font-black flex items-center justify-center"
            >
              {totalQty}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Add to Cart Buttons on Menu Page - Injected via context */}
      <AddToCartContext.Provider value={{ addToCart, cart, mode }}>
        {/* This is accessed via the exported context */}
      </AddToCartContext.Provider>
    </>
  );
};

// Context for menu page to access cart
import { createContext, useContext } from "react";

interface CartContextType {
  addToCart: (drink: Drink) => void;
  cart: CartItem[];
  mode: OrderMode;
}

export const AddToCartContext = createContext<CartContextType | null>(null);
export const useCart = () => useContext(AddToCartContext);

export default CartOrderSystem;
