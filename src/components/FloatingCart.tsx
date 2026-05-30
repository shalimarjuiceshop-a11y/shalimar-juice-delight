import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Store, Home, Plus, Minus, Trash2, Send, User, Phone, MapPin, X, ShoppingBag, AlertCircle, GlassWater } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { z } from "zod";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919852779933";

const homeSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  address: z.string().trim().min(5, "Enter full delivery address").max(300),
});

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FloatingCart = () => {
  const ctx = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [homeForm, setHomeForm] = useState({ name: "", mobile: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCheckout, setShowCheckout] = useState(false);

  if (!ctx) return null;
  const { mode, setMode, cart, totalQty, totalPrice, updateQty, removeItem, clearCart, getPrice } = ctx;

  const canCheckout = mode === "shop" ? totalQty >= 1 : mode === "home" ? totalQty >= 5 : false;

  const handleCheckout = () => {
    if (!canCheckout) {
      if (mode === "home") toast.error("Minimum 5 glasses required for home delivery!");
      return;
    }
    if (mode === "home") setShowCheckout(true);
    else sendWhatsApp();
  };

  const sendWhatsApp = () => {
    if (mode === "home") {
      const result = homeSchema.safeParse(homeForm);
      if (!result.success) {
        const fe: Record<string, string> = {};
        result.error.errors.forEach((e) => { if (e.path[0]) fe[e.path[0] as string] = e.message; });
        setErrors(fe);
        return;
      }
      setErrors({});
    }

    const orderItems = cart.map((c) => {
      const p = getPrice(c.drink);
      return `• ${c.drink.name} × ${c.qty} = ₹${c.qty * p}`;
    }).join("%0A");

    let msg = `🛒 *New Order - ${mode === "home" ? "Home Delivery 🏠" : "Shop Pickup 🏪"}*%0A%0A`;
    msg += `📦 *Items:*%0A${orderItems}%0A%0A`;
    msg += `💰 *Total: ₹${totalPrice}* (${totalQty} glasses)`;

    if (mode === "home") {
      msg += `%0A%0A👤 *Name:* ${encodeURIComponent(homeForm.name)}`;
      msg += `%0A📱 *Mobile:* ${encodeURIComponent(homeForm.mobile)}`;
      msg += `%0A📍 *Address:* ${encodeURIComponent(homeForm.address)}`;
      msg += `%0A%0A💡 *Rate:* ${totalQty >= 20 ? "₹10/glass (20+ bulk)" : "₹50/glass"}`;
    }
    msg += `%0A%0A_Sent from Shalimar Juice Website_`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    toast.success("Redirecting to WhatsApp!");
    clearCart();
    setHomeForm({ name: "", mobile: "", address: "" });
    setShowCheckout(false);
    setIsOpen(false);
  };

  const inputCls = (f: string) =>
    `w-full bg-muted/50 border ${errors[f] ? "border-destructive" : "border-border"} rounded-xl px-4 py-2.5 pl-9 text-xs font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40`;

  // Mode selection
  if (!mode) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg flex items-center justify-center glow-gold"
        >
          <ShoppingCart size={22} />
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="absolute bottom-[72px] right-0 w-80 bg-card rounded-2xl border border-border shadow-2xl p-6"
            >
              <h3 className="font-display text-lg font-bold text-foreground text-center mb-1 inline-flex items-center justify-center gap-2 w-full"><GlassWater size={18} className="text-primary" /> Order Juice</h3>
              <p className="font-body text-xs text-muted-foreground text-center mb-5">Where are you ordering from?</p>
              <div className="space-y-3">
                <motion.button
                  onClick={() => { setMode("shop"); setIsOpen(false); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Store size={22} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-sm font-bold text-foreground">Dukaan Par Hu</p>
                    <p className="font-body text-[11px] text-muted-foreground">Min 1 glass • Regular menu prices</p>
                  </div>
                </motion.button>
                <motion.button
                  onClick={() => { setMode("home"); setIsOpen(false); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Home size={22} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-sm font-bold text-foreground">Ghar Se Order</p>
                    <p className="font-body text-[11px] text-muted-foreground">Min 5 glasses @ ₹50 • 20+ glasses @ ₹10</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: smoothEase }}
            className="w-[340px] max-h-[80vh] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <ShoppingCart size={16} className="text-primary" />
                <h3 className="font-display text-sm font-bold text-foreground">Your Cart</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-body font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {mode === "shop" ? <><Store size={10} /> Shop</> : <><Home size={10} /> Home</>}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { clearCart(); setIsOpen(false); }} className="text-[10px] font-body text-muted-foreground hover:text-foreground underline">Change</button>
                <button onClick={() => setIsOpen(false)}><X size={16} className="text-muted-foreground hover:text-foreground" /></button>
              </div>
            </div>

            {mode === "home" && (
              <div className="px-4 py-2 bg-primary/5 border-b border-border">
                <p className="font-body text-[11px] text-primary font-semibold">🏠 Min 5 glasses @ ₹50 • 20+ glasses @ ₹10/glass</p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag size={32} className="text-muted-foreground/30 mx-auto mb-2" />
                  <p className="font-body text-sm text-muted-foreground">Cart is empty</p>
                  <p className="font-body text-[11px] text-muted-foreground/60 mt-1">Go to Menu and add drinks!</p>
                </div>
              ) : cart.map((item) => {
                const price = getPrice(item.drink);
                return (
                  <motion.div key={item.drink.id} layout className="flex items-center gap-3 bg-muted/30 rounded-xl p-2.5">
                    <img src={item.drink.image} alt={item.drink.name} className="w-10 h-10 object-contain" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-xs font-bold text-foreground truncate">{item.drink.name}</p>
                      <p className="font-body text-[11px] text-primary font-semibold">₹{price} × {item.qty} = ₹{price * item.qty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.drink.id, -1)} className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10"><Minus size={10} /></button>
                      <span className="font-display text-xs font-bold w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.drink.id, 1)} className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10"><Plus size={10} /></button>
                      <button onClick={() => removeItem(item.drink.id)} className="w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive ml-0.5"><Trash2 size={10} /></button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            {cart.length > 0 && !showCheckout && (
              <div className="p-4 border-t border-border bg-muted/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-xs text-muted-foreground">{totalQty} glasses</span>
                  <span className="font-display text-lg font-black text-gradient-gold">₹{totalPrice}</span>
                </div>
                {mode === "home" && totalQty < 5 && (
                  <p className="font-body text-[11px] text-destructive mb-2">⚠️ Add {5 - totalQty} more glass(es) for home delivery</p>
                )}
                <motion.button
                  onClick={handleCheckout}
                  disabled={!canCheckout}
                  whileHover={canCheckout ? { scale: 1.02 } : {}}
                  whileTap={canCheckout ? { scale: 0.98 } : {}}
                  className={`w-full flex items-center justify-center gap-2 font-body text-sm font-bold px-6 py-3 rounded-xl transition-all ${canCheckout ? "bg-primary text-primary-foreground glow-gold" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                >
                  <Send size={14} />
                  {mode === "shop" ? "Order via WhatsApp" : "Enter Details"}
                </motion.button>
              </div>
            )}

            {/* Home Form */}
            {showCheckout && mode === "home" && (
              <div className="p-4 border-t border-border bg-muted/20 space-y-2.5">
                <h4 className="font-display text-sm font-bold text-foreground">Delivery Details</h4>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-2.5 text-muted-foreground/50" />
                  <input type="text" placeholder="Your Name" value={homeForm.name} onChange={(e) => setHomeForm({ ...homeForm, name: e.target.value })} className={inputCls("name")} maxLength={100} />
                  {errors.name && <p className="text-[10px] text-destructive mt-0.5">{errors.name}</p>}
                </div>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-2.5 text-muted-foreground/50" />
                  <input type="tel" placeholder="Mobile Number" value={homeForm.mobile} onChange={(e) => setHomeForm({ ...homeForm, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} className={inputCls("mobile")} />
                  {errors.mobile && <p className="text-[10px] text-destructive mt-0.5">{errors.mobile}</p>}
                </div>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-2.5 text-muted-foreground/50" />
                  <textarea placeholder="Full Delivery Address" value={homeForm.address} onChange={(e) => setHomeForm({ ...homeForm, address: e.target.value })} rows={2} className={`${inputCls("address")} resize-none`} maxLength={300} />
                  {errors.address && <p className="text-[10px] text-destructive mt-0.5">{errors.address}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowCheckout(false)} className="flex-1 font-body text-xs font-semibold py-2.5 rounded-xl border border-border hover:bg-muted transition-colors">Back</button>
                  <motion.button onClick={sendWhatsApp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground font-body text-xs font-bold py-2.5 rounded-xl glow-gold">
                    <Send size={12} /> Send Order
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg flex items-center justify-center glow-gold"
      >
        <ShoppingCart size={22} />
        {totalQty > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground font-display text-xs font-black flex items-center justify-center">
            {totalQty}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingCart;
