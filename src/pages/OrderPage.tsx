import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2, User, Phone, MapPin, AlertCircle, Send, Sparkles } from "lucide-react";
import { drinks } from "@/data/menuData";
import { toast } from "sonner";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

interface OrderItem {
  drinkId: string;
  drinkName: string;
  price: number;
  qty: number;
  image: string;
}

const priceOptions = [10, 30, 50];

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedDrinkId = searchParams.get("drink");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    if (preselectedDrinkId) {
      const drink = drinks.find((d) => d.id === preselectedDrinkId);
      if (drink) {
        return [{ drinkId: drink.id, drinkName: drink.name, price: drink.price, qty: 1, image: drink.image }];
      }
    }
    return [];
  });

  // Add drink form state
  const [selectedDrinkId, setSelectedDrinkId] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<number>(10);

  const totalPrice = useMemo(() => orderItems.reduce((sum, item) => sum + item.price * item.qty, 0), [orderItems]);

  const addDrink = () => {
    if (!selectedDrinkId) {
      toast.error("Please select a drink first!");
      return;
    }
    const drink = drinks.find((d) => d.id === selectedDrinkId);
    if (!drink) return;

    const existing = orderItems.find((i) => i.drinkId === selectedDrinkId && i.price === selectedPrice);
    if (existing) {
      setOrderItems((prev) =>
        prev.map((i) => (i.drinkId === selectedDrinkId && i.price === selectedPrice ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setOrderItems((prev) => [...prev, { drinkId: drink.id, drinkName: drink.name, price: selectedPrice, qty: 1, image: drink.image }]);
    }
    toast.success(`${drink.name} (₹${selectedPrice}) added!`);
    setSelectedDrinkId("");
  };

  const updateQty = (index: number, delta: number) => {
    setOrderItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], qty: Math.max(1, updated[index].qty + delta) };
      return updated;
    });
  };

  const removeItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!mobile.trim() || mobile.length < 10) { toast.error("Please enter a valid mobile number"); return; }
    if (!address.trim()) { toast.error("Please enter your address"); return; }
    if (orderItems.length === 0) { toast.error("Please add at least one drink"); return; }
    if (totalPrice < 100) { toast.error("Minimum order should be ₹100"); return; }

    const itemsList = orderItems
      .map((item) => `• ${item.drinkName} (₹${item.price}) × ${item.qty} = ₹${item.price * item.qty}`)
      .join("\n");

    const message = `🍍 *New Order — Shalimar Juice Shop*\n\n👤 *Name:* ${name.trim()}\n📱 *Mobile:* ${mobile.trim()}\n📍 *Address:* ${address.trim()}\n\n🥤 *Order Details:*\n${itemsList}\n\n💰 *Total: ₹${totalPrice}*`;

    window.open(`https://wa.me/919852779933?text=${encodeURIComponent(message)}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <main className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Sparkles size={12} className="animate-pulse" /> Direct Order
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-5xl font-black tracking-tight">
              <span className="text-cream">Place Your </span>
              <span className="text-gradient-gold">Order</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-sm md:text-base mt-3 text-header-muted max-w-md mx-auto">
              Fill your details, pick your drinks, and order via WhatsApp — it's that simple! 🍍
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Customer Details + Drink Picker */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
              {/* Customer Details */}
              <motion.div variants={fadeUp} className="card-premium p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <User size={18} className="text-primary" /> Customer Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Mobile Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Delivery Address *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-3 text-muted-foreground" />
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Full delivery address"
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Drink Picker */}
              <motion.div variants={fadeUp} className="card-premium p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-primary" /> Add Drinks
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Select Drink</label>
                    <select
                      value={selectedDrinkId}
                      onChange={(e) => setSelectedDrinkId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    >
                      <option value="">— Choose a drink —</option>
                      {drinks.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Price</label>
                    <div className="flex gap-2">
                      {priceOptions.map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPrice(p)}
                          className={`flex-1 py-2.5 rounded-xl font-display text-sm font-bold transition-all ${
                            selectedPrice === p
                              ? "bg-primary text-primary-foreground glow-gold-soft"
                              : "bg-muted/60 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          ₹{p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={addDrink}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-bold py-3 rounded-xl hover:brightness-110 transition-all"
                  >
                    <Plus size={16} /> Add to Order
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Order Summary */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-6">
              <div className="card-premium p-6 sticky top-20">
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  🧾 Order Summary
                </h2>

                {orderItems.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBag size={40} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="font-body text-sm text-muted-foreground">No drinks added yet</p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">Select a drink and click "Add to Order"</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {orderItems.map((item, index) => (
                        <motion.div
                          key={`${item.drinkId}-${item.price}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
                        >
                          <img src={item.image} alt={item.drinkName} className="w-12 h-12 object-contain rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm font-bold text-foreground truncate">{item.drinkName}</p>
                            <p className="font-body text-xs text-primary font-semibold">₹{item.price} / glass</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateQty(index, -1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="font-display text-sm font-bold w-6 text-center text-foreground">{item.qty}</span>
                            <button onClick={() => updateQty(index, 1)} className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold text-foreground w-14 text-right">₹{item.price * item.qty}</span>
                          <button onClick={() => removeItem(index)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Total */}
                    <div className="pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm font-semibold text-muted-foreground">Total</span>
                        <span className="font-display text-2xl font-black text-primary">₹{totalPrice}</span>
                      </div>
                      {totalPrice > 0 && totalPrice < 100 && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20"
                        >
                          <AlertCircle size={14} className="text-destructive shrink-0" />
                          <p className="font-body text-xs text-destructive font-medium">
                            Minimum order ₹100 — add ₹{100 - totalPrice} more
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Place Order Button */}
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={orderItems.length === 0 || totalPrice < 100}
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground font-body text-base font-bold py-4 rounded-2xl hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send size={18} /> Place Order via WhatsApp
                </motion.button>
                <p className="font-body text-[10px] text-muted-foreground/50 text-center mt-2">
                  Your order will be sent to our WhatsApp for confirmation
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderPage;
