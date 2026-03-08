import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Citrus, GlassWater, Store } from "lucide-react";
import JuicePourAnimation from "@/components/JuicePourAnimation";
import hotMilk from "@/assets/hot-milk.png";

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center pt-16">
        {/* Animated background particles */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 6 + i * 3,
              height: 6 + i * 3,
              background: `hsl(var(--pineapple-gold) / ${0.1 + i * 0.03})`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: "hsl(45 100% 95%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Fresh <span className="text-gradient-gold">Pineapple Juice</span> for a Healthy Life
            </motion.h1>

            <motion.p
              className="font-body text-lg mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: "hsl(45 40% 75%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Fresh fruit juices made daily at Shalimar Juice Shop. Experience the taste of real, natural pineapple goodness — since generations.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-7 py-3 rounded-full hover:brightness-105 hover:scale-105 transition-all shadow-pineapple"
              >
                View Menu <ArrowRight size={18} />
              </Link>
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 border-2 font-body font-semibold px-7 py-3 rounded-full transition-all"
                style={{ borderColor: "hsl(40 100% 50%)", color: "hsl(45 100% 85%)" }}
              >
                Get Franchise <Handshake size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Juice Pour Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center items-center -mt-8 md:-mt-12"
          >
            <JuicePourAnimation />
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
              { icon: Citrus, title: "100% Fresh Fruits", desc: "We use only fresh, handpicked fruits every single day." },
              { icon: GlassWater, title: "Made Fresh Daily", desc: "Every glass is prepared fresh when you order. No preservatives." },
              { icon: Store, title: "Franchise Available", desc: "Start your own Shalimar Juice shop. Affordable franchise plans." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-pineapple p-8 text-center hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-pineapple-gradient overflow-hidden">
      <section className="py-16 md:py-20 bg-pineapple-gradient overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 bg-primary/20 text-primary">
                ❄️ Winter Special
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-foreground leading-tight">
                Special for <span className="text-gradient-gold">Winter</span>
              </h2>
              <p className="font-display text-xl md:text-2xl font-semibold mb-2 text-foreground/80">
                Milk with Dry Fruits
              </p>
              <p className="font-body text-base md:text-lg text-muted-foreground mb-2">
                Warm kulhad milk topped with almonds, cashews, pistachios & saffron — the perfect winter warmer!
              </p>
              <p className="font-body text-sm text-muted-foreground/70 mb-6">
                Made fresh with real dry fruits. Served hot in a traditional kulhad.
              </p>
              <span className="inline-block bg-primary text-primary-foreground font-display text-2xl md:text-3xl font-bold px-8 py-3 rounded-full shadow-pineapple">
                Only ₹30
              </span>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                <img
                  src={hotMilk}
                  alt="Hot Energy Milk with Dry Fruits in Kulhad"
                  className="relative w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
