import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pineappleJuiceGlass from "@/assets/pineapple-juice-glass.png";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";
import { ArrowRight, Handshake } from "lucide-react";

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center pt-16">
        {/* Floating decorative slices */}
        <motion.img
          src={pineappleSlices}
          alt=""
          className="absolute top-20 right-0 w-48 md:w-72 opacity-20 pointer-events-none"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={pineappleSlices}
          alt=""
          className="absolute bottom-10 left-0 w-40 md:w-56 opacity-15 pointer-events-none rotate-45"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
              <span className="text-3xl">🍍</span>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">Shalimar Juice</h2>
                <p className="text-sm text-muted-foreground" dir="rtl">شالیمار جوس</p>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              Fresh <span className="text-gradient-gold">Pineapple Juice</span> for a Healthy Life
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Fresh fruit juices made daily at Shalimar Juice. Experience the taste of real, natural pineapple goodness.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-7 py-3 rounded-full hover:brightness-105 hover:scale-105 transition-all shadow-pineapple"
              >
                View Menu <ArrowRight size={18} />
              </Link>
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 border-2 border-pineapple text-foreground font-body font-semibold px-7 py-3 rounded-full hover:bg-pineapple-light transition-all"
              >
                Get Franchise <Handshake size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Right: Juice glass hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Pineapple fruit background */}
            <motion.img
              src={pineappleFruit}
              alt="Pineapple"
              className="absolute -left-4 md:-left-8 bottom-0 w-32 md:w-48 opacity-80"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main juice glass */}
            <motion.img
              src={pineappleJuiceGlass}
              alt="Fresh Pineapple Juice Glass"
              className="relative z-10 w-72 md:w-96 lg:w-[420px] drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Price badge */}
            <motion.div
              className="absolute bottom-8 right-4 md:right-12 bg-primary text-primary-foreground rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-pineapple z-20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-body text-xs font-medium">Starting</span>
              <span className="font-display text-xl font-bold">₹10</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
          >
            Why Choose <span className="text-gradient-gold">Shalimar Juice</span>?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🍍", title: "100% Fresh Fruits", desc: "We use only fresh, handpicked fruits every single day." },
              { icon: "🧊", title: "Made Fresh Daily", desc: "Every glass is prepared fresh when you order. No preservatives." },
              { icon: "🏪", title: "Franchise Available", desc: "Start your own Shalimar Juice shop. Affordable franchise plans." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-pineapple p-8 text-center hover:scale-[1.02] transition-transform"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Summer Drink */}
      <section className="py-16 bg-pineapple-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-4 block">☀️</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">Special Summer Drink</h2>
            <p className="font-body text-lg text-muted-foreground mb-4">Beat the heat with our refreshing summer special!</p>
            <span className="inline-block bg-primary text-primary-foreground font-display text-2xl font-bold px-8 py-3 rounded-full shadow-pineapple">
              Only ₹30
            </span>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
