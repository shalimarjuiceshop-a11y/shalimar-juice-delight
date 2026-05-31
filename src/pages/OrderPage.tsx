import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2, User, Phone, MapPin, AlertCircle, Send, Sparkles, GlassWater, Receipt, Check, ShieldCheck, Clock, Truck } from "lucide-react";
import { drinks, categories } from "@/data/menuData";
import { toast } from "sonner";
import OrderBikeAnimation from "@/components/OrderBikeAnimation";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
  exit: { opacity: 0, scale: 0.8, x: -30, transition: { duration: 0.25 } },
};

interface OrderItem {
  drinkId: string;
  drinkName: string;
  price: number;
  qty: number;
  image: string;
}

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedDrinkId = searchParams.get("drink");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<number>(() => {
    if (preselectedDrinkId) {
      const drink = drinks.find((d) => d.id === preselectedDrinkId);
      if (drink) return drink.price;
    }
    return 10;
  });
  const [selectedDrinkId, setSelectedDrinkId] = useState(preselectedDrinkId || "");
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    if (preselectedDrinkId) {
      const drink = drinks.find((d) => d.id === preselectedDrinkId);
      if (drink) return [{ drinkId: drink.id, drinkName: drink.name, price: drink.price, qty: 1, image: drink.image }];
    }
    return [];
  });

  // Filter drinks by selected price tier
  const filteredDrinks = useMemo(() => drinks.filter((d) => d.price === selectedPrice), [selectedPrice]);

  const totalPrice = useMemo(() => orderItems.reduce((sum, item) => sum + item.price * item.qty, 0), [orderItems]);
  const totalItems = useMemo(() => orderItems.reduce((sum, item) => sum + item.qty, 0), [orderItems]);

  const addDrink = () => {
    if (!selectedDrinkId) {
      toast.error("Please select a drink first!");
      return;
    }
    const drink = drinks.find((d) => d.id === selectedDrinkId);
    if (!drink) return;

    const existing = orderItems.find((i) => i.drinkId === selectedDrinkId);
    if (existing) {
      setOrderItems((prev) =>
        prev.map((i) => (i.drinkId === selectedDrinkId ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setOrderItems((prev) => [...prev, { drinkId: drink.id, drinkName: drink.name, price: selectedPrice, qty: 1, image: drink.image }]);
    }
    toast.success(`${drink.name} added!`);
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
      <section className="relative pt-28 pb-14 md:pt-32 md:pb-20 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        {/* Ambient gold orbs */}
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(45 100% 55% / 0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-20 -right-16 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(35 80% 45% / 0.14) 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-[1fr_auto] items-center gap-6 md:gap-10 max-w-5xl mx-auto">
            <motion.div variants={stagger} initial="hidden" animate="show" className="text-center md:text-left">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <Sparkles size={12} className="animate-pulse" /> Direct Order
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-5xl font-black tracking-tight">
                <span className="text-cream">Place Your </span>
                <span className="text-gradient-gold">Order</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="font-body text-sm md:text-base mt-3 text-header-muted max-w-md mx-auto md:mx-0">
                Fill your details, pick your drinks, and order via WhatsApp — quick, simple, fresh.
              </motion.p>

              {/* Trust chips */}
              <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  { Icon: ShieldCheck, label: "100% Fresh" },
                  { Icon: Clock, label: "30 min Prep" },
                  { Icon: Truck, label: "Fast Delivery" },
                ].map(({ Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-gradient-to-b from-cream/[0.08] to-cream/[0.03] border border-primary/25 backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-[hsl(38_95%_48%)] text-primary-foreground shadow-[0_4px_10px_-2px_hsl(45_100%_50%/0.5)] ring-1 ring-primary/40">
                      <Icon size={12} strokeWidth={2.4} />
                    </span>
                    <span className="font-display text-[12px] font-bold text-cream tracking-tight">{label}</span>
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Delivery scooter animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
              className="hidden md:block w-[320px] shrink-0"
            >
              <OrderBikeAnimation />
            </motion.div>
          </div>

          {/* Scooter on mobile */}
          <div className="md:hidden mt-6 max-w-[300px] mx-auto">
            <OrderBikeAnimation />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            {/* Left: Customer Details + Drink Picker (3 cols) */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-3 space-y-5">
              {/* Customer Details */}
              <motion.div variants={fadeUp} className="card-premium p-5 md:p-6">
                <h2 className="font-display text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  Customer Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Name *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Mobile *</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit number"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-body text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Address *</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-3 text-muted-foreground" />
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Full delivery address"
                        rows={2}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Drink Picker */}
              <motion.div variants={fadeUp} className="card-premium p-5 md:p-6">
                <h2 className="font-display text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GlassWater size={16} className="text-primary" />
                  </div>
                  Select Drinks
                </h2>

                {/* Price Tier Selector */}
                <div className="mb-4">
                  <label className="font-body text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Choose Price Tier</label>
                  <div className="flex gap-2">
                    {categories.map((cat) => (
                      <motion.button
                        key={cat.key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setSelectedPrice(parseInt(cat.price.replace("₹", ""))); setSelectedDrinkId(""); }}
                        className={`flex-1 py-3 rounded-xl font-display text-sm font-bold transition-all relative overflow-hidden ${
                          selectedPrice === parseInt(cat.price.replace("₹", ""))
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                            : "bg-muted/60 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="block text-lg">{cat.price}</span>
                        <span className="block text-[10px] font-body opacity-80">{cat.label}</span>
                        {selectedPrice === parseInt(cat.price.replace("₹", "")) && (
                          <motion.div
                            layoutId="priceHighlight"
                            className="absolute inset-0 bg-primary rounded-xl -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Filtered Drinks */}
                <div className="mb-4">
                  <label className="font-body text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Available {categories.find(c => parseInt(c.price.replace("₹","")) === selectedPrice)?.label} — ₹{selectedPrice} each
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <AnimatePresence mode="popLayout">
                      {filteredDrinks.map((drink) => (
                        <motion.button
                          key={drink.id}
                          layout
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedDrinkId(drink.id)}
                          className={`relative p-3 rounded-xl border-2 transition-all text-center ${
                            selectedDrinkId === drink.id
                              ? "border-primary bg-primary/5 shadow-md shadow-primary/20"
                              : "border-border bg-card hover:border-primary/30"
                          }`}
                        >
                          <img src={drink.image} alt={drink.name} className="w-12 h-12 mx-auto object-contain mb-1.5" />
                          <p className="font-body text-[11px] font-semibold text-foreground leading-tight">{drink.name}</p>
                          {selectedDrinkId === drink.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                            >
                              <span className="text-primary-foreground text-[10px]">✓</span>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.button
                  onClick={addDrink}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-bold py-3 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                  <Plus size={16} /> Add to Order
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: Order Summary (2 cols) */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-2">
              <div className="card-premium p-5 md:p-6 lg:sticky lg:top-20">
                <h2 className="font-display text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  🧾 Order Summary
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </h2>

                {orderItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <ShoppingBag size={40} className="mx-auto text-muted-foreground/30 mb-3" />
                    </motion.div>
                    <p className="font-body text-sm text-muted-foreground">No drinks added yet</p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">Select a drink and add it</p>
                  </motion.div>
                ) : (
                  <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                    <AnimatePresence mode="popLayout">
                      {orderItems.map((item, index) => (
                        <motion.div
                          key={`${item.drinkId}-${item.price}`}
                          variants={popIn}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          layout
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/30 border border-border/50"
                        >
                          <img src={item.image} alt={item.drinkName} className="w-10 h-10 object-contain rounded-lg flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-xs font-bold text-foreground truncate">{item.drinkName}</p>
                            <p className="font-body text-[10px] text-primary font-semibold">₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => updateQty(index, -1)} className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors">
                              <Minus size={10} />
                            </button>
                            <span className="font-display text-xs font-bold w-5 text-center text-foreground">{item.qty}</span>
                            <button onClick={() => updateQty(index, 1)} className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="font-display text-xs font-bold text-foreground w-10 text-right">₹{item.price * item.qty}</span>
                          <button onClick={() => removeItem(index)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                            <Trash2 size={12} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Total */}
                {orderItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-3 mt-3 border-t border-border/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm font-semibold text-muted-foreground">Total</span>
                      <motion.span
                        key={totalPrice}
                        initial={{ scale: 1.3, color: "hsl(var(--primary))" }}
                        animate={{ scale: 1 }}
                        className="font-display text-2xl font-black text-primary"
                      >
                        ₹{totalPrice}
                      </motion.span>
                    </div>
                    {totalPrice > 0 && totalPrice < 100 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20"
                      >
                        <AlertCircle size={14} className="text-destructive shrink-0" />
                        <p className="font-body text-xs text-destructive font-medium">
                          Minimum order ₹100 — add ₹{100 - totalPrice} more
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Place Order Button */}
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={orderItems.length === 0 || totalPrice < 100}
                  className="w-full mt-5 flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground font-body text-sm font-bold py-3.5 rounded-2xl hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send size={16} /> Place Order via WhatsApp
                </motion.button>
                <p className="font-body text-[10px] text-muted-foreground/50 text-center mt-2">
                  Order will be sent to our WhatsApp for confirmation
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
