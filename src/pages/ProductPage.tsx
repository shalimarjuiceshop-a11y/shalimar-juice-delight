import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Clock,
  Leaf,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Star,
  ShieldCheck,
  Snowflake,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { drinks } from "@/data/menuData";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const drink = useMemo(() => drinks.find((d) => d.id === id), [id]);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [id]);

  if (!drink) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Product not found</h1>
          <p className="font-body text-sm text-muted-foreground mb-6">The drink you’re looking for doesn’t exist.</p>
          <Link to="/menu" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-5 py-2.5 rounded-full">
            <ArrowLeft size={16} /> Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  const gallery = drink.gallery && drink.gallery.length > 0 ? drink.gallery : [drink.image];
  const related = drinks.filter((d) => d.category === drink.category && d.id !== drink.id).slice(0, 4);

  const categoryLabel =
    drink.category === "juices" ? "Fresh Juice" : drink.category === "shakes" ? "Creamy Shake" : "Dry Fruit Special";

  const waText = encodeURIComponent(
    `Hi Shalimar Juice Shop 👋\nI'd like to order:\n• ${drink.name} (₹${drink.price})\n\nPlease share the details.`
  );

  const trustBadges = [
    { icon: Leaf, label: "100% Fresh Fruit" },
    { icon: Snowflake, label: "Served Chilled" },
    { icon: ShieldCheck, label: "Hygienic Prep" },
    { icon: Clock, label: drink.prepTime || "2–3 min" },
  ];

  return (
    <main className="min-h-screen bg-background pb-28 lg:pb-0">
      {/* Header bar */}
      <section className="pt-24 pb-5 bg-page-header border-b border-border/40">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 font-body text-sm text-header-accent hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <nav className="font-body text-xs text-header-muted mt-3 flex items-center flex-wrap gap-1" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-header-accent transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link to="/menu" className="hover:text-header-accent transition-colors">Menu</Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-header-light truncate max-w-[60vw]">{drink.name}</span>
          </nav>
        </div>
      </section>

      {/* Product detail */}
      <section className="py-8 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="lg:sticky lg:top-24 self-start"
            >
              <div className="relative aspect-square rounded-[28px] border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 overflow-hidden shadow-pineapple group">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={gallery[activeImg]}
                    alt={`${drink.name} – view ${activeImg + 1}`}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="absolute inset-0 w-full h-full object-contain p-8 md:p-12 drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </AnimatePresence>

                {drink.highlight && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-primary text-primary-foreground font-body text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full shadow-lg">
                    <Sparkles size={10} /> Bestseller
                  </span>
                )}
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border text-foreground font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full">
                  {categoryLabel}
                </span>
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto scrollbar-hide -mx-1 px-1">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`relative w-[68px] h-[68px] md:w-20 md:h-20 flex-shrink-0 rounded-2xl border-2 overflow-hidden bg-card transition-all duration-300 ${
                        activeImg === i
                          ? "border-primary shadow-pineapple scale-105"
                          : "border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={g} alt="" className="w-full h-full object-contain p-1.5" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: smoothEase }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                  <Leaf size={11} /> {categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-body font-semibold text-muted-foreground">
                  <Star size={12} className="fill-primary text-primary" />
                  <span className="text-foreground">4.9</span>
                  <span className="opacity-70">(500+ glasses daily)</span>
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.05]">
                {drink.name}
              </h1>
              <p className="font-body text-[15px] md:text-base text-muted-foreground mt-4 leading-relaxed">
                {drink.longDescription || drink.description}
              </p>

              {/* Price block */}
              <div className="mt-6 flex items-end gap-5 pb-6 border-b border-border/60">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Price</p>
                  <p className="font-display text-5xl font-black text-primary leading-none mt-1.5">
                    ₹{drink.price}
                    <span className="font-body text-sm font-semibold text-muted-foreground ml-1.5">/ glass</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground pb-2">
                  <Clock size={13} className="text-primary" /> Ready in {drink.prepTime || "2–3 min"}
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {trustBadges.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center text-center gap-1.5 bg-muted/40 border border-border/60 rounded-2xl px-2 py-3"
                  >
                    <Icon size={16} className="text-primary" />
                    <span className="font-body text-[11px] font-semibold text-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              {drink.highlights && drink.highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    What's inside
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {drink.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2.5 bg-card border border-border/60 rounded-xl px-3 py-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="font-body text-sm text-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA (desktop / inline) */}
              <div className="mt-8 hidden lg:flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={() => navigate(`/order?drink=${drink.id}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-bold text-sm px-6 py-4 rounded-2xl shadow-pineapple hover:brightness-110 transition-all"
                >
                  <ShoppingBag size={16} /> Order Now
                </motion.button>
                <motion.a
                  href={`https://wa.me/919852779933?text=${waText}`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground font-body font-bold text-sm px-6 py-4 rounded-2xl hover:brightness-110 transition-all"
                >
                  <MessageCircle size={16} /> Order on WhatsApp
                </motion.a>
              </div>

              {/* Location note */}
              <div className="mt-6 flex items-start gap-2 text-xs font-body text-muted-foreground">
                <MapPin size={13} className="text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Made-to-order at <span className="text-foreground font-semibold">Perfect Complex, Jamil Colony, Amravati</span>. Pickup or WhatsApp order.
                </span>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="max-w-6xl mx-auto mt-20">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1.5">More to taste</p>
                  <h2 className="font-display text-2xl md:text-3xl font-black text-foreground">You may also like</h2>
                </div>
                <Link to="/menu" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-primary hover:gap-2 transition-all">
                  View all <ChevronRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {related.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: smoothEase }}
                  >
                    <Link
                      to={`/product/${r.id}`}
                      className="group block bg-card border border-border/60 rounded-2xl p-4 text-center hover:border-primary/50 hover:shadow-pineapple hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative aspect-square mx-auto bg-gradient-to-br from-muted/40 to-transparent rounded-xl overflow-hidden">
                        <img
                          src={r.image}
                          alt={r.name}
                          className="absolute inset-0 w-full h-full object-contain p-3 drop-shadow group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-display text-sm font-bold text-foreground mt-3 line-clamp-1">{r.name}</h3>
                      <span className="inline-block mt-2 bg-primary text-primary-foreground font-display text-xs font-black px-3 py-1 rounded-full">₹{r.price}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: smoothEase, delay: 0.2 }}
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.3)]"
      >
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-shrink-0">
            <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground leading-none">Price</p>
            <p className="font-display text-2xl font-black text-primary leading-none mt-1">₹{drink.price}</p>
          </div>
          <button
            onClick={() => navigate(`/order?drink=${drink.id}`)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground font-body font-bold text-xs px-3 py-3 rounded-xl shadow-pineapple active:scale-95 transition-transform"
          >
            <ShoppingBag size={14} /> Order
          </button>
          <a
            href={`https://wa.me/919852779933?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-whatsapp text-whatsapp-foreground font-body font-bold text-xs px-3 py-3 rounded-xl active:scale-95 transition-transform"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </motion.div>
    </main>
  );
};

export default ProductPage;
