import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Clock, Leaf, ShoppingBag, Sparkles, MessageCircle } from "lucide-react";
import { drinks } from "@/data/menuData";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const drink = useMemo(() => drinks.find((d) => d.id === id), [id]);
  const [activeImg, setActiveImg] = useState(0);

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

  const waText = encodeURIComponent(
    `Hi Shalimar Juice Shop 👋\nI'd like to order:\n• ${drink.name} (₹${drink.price})\n\nPlease share the details.`
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header bar */}
      <section className="pt-24 pb-6 bg-page-header">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 font-body text-sm text-header-accent hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <nav className="font-body text-xs text-header-muted mt-3" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-header-accent">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/menu" className="hover:text-header-accent">Menu</Link>
            <span className="mx-1.5">/</span>
            <span className="text-header-light">{drink.name}</span>
          </nav>
        </div>
      </section>

      {/* Product detail */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
            >
              <div className="relative aspect-square rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/40 overflow-hidden shadow-pineapple">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={gallery[activeImg]}
                    alt={`${drink.name} – view ${activeImg + 1}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: smoothEase }}
                    className="absolute inset-0 w-full h-full object-contain p-8 md:p-12 drop-shadow-2xl"
                  />
                </AnimatePresence>
                {drink.highlight && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-primary text-primary-foreground font-body text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full shadow">
                    <Sparkles size={10} /> Bestseller
                  </span>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`relative w-20 h-20 rounded-2xl border-2 overflow-hidden bg-card transition-all ${
                        activeImg === i ? "border-primary shadow-pineapple" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <img src={g} alt="" className="w-full h-full object-contain p-2" />
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
              <span className="inline-flex items-center self-start gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
                <Leaf size={11} /> {drink.category === "juices" ? "Fresh Juice" : drink.category === "shakes" ? "Creamy Shake" : "Dry Fruit Special"}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight">
                {drink.name}
              </h1>
              <p className="font-body text-base text-muted-foreground mt-3 leading-relaxed">
                {drink.longDescription || drink.description}
              </p>

              <div className="flex items-end gap-4 mt-6">
                <div>
                  <p className="font-body text-[11px] uppercase tracking-widest text-muted-foreground">Price</p>
                  <p className="font-display text-4xl font-black text-primary leading-none mt-1">₹{drink.price}<span className="font-body text-sm font-semibold text-muted-foreground ml-1">/ glass</span></p>
                </div>
                {drink.prepTime && (
                  <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground pb-1.5">
                    <Clock size={13} className="text-primary" /> {drink.prepTime}
                  </div>
                )}
              </div>

              {drink.highlights && drink.highlights.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {drink.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2.5 border border-border/60">
                      <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                        <Check size={12} />
                      </span>
                      <span className="font-body text-sm text-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={() => navigate(`/order?drink=${drink.id}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-bold text-sm px-6 py-4 rounded-2xl shadow-pineapple"
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

              <p className="font-body text-xs text-muted-foreground mt-4">
                100% fresh, made-to-order at Perfect Complex, Jamil Colony, Amravati.
              </p>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="max-w-6xl mx-auto mt-16">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">
                You may also like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/product/${r.id}`}
                    className="group bg-card border border-border rounded-2xl p-4 text-center hover:border-primary/40 hover:shadow-pineapple transition-all"
                  >
                    <img src={r.image} alt={r.name} className="w-24 h-24 mx-auto object-contain drop-shadow group-hover:scale-105 transition-transform" loading="lazy" />
                    <h3 className="font-display text-sm font-bold text-foreground mt-3 line-clamp-1">{r.name}</h3>
                    <span className="inline-block mt-2 bg-primary text-primary-foreground font-display text-xs font-black px-3 py-1 rounded-full">₹{r.price}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
