import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";
import JuicePourAnimation from "@/components/JuicePourAnimation";


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
            {/* Shop name in Hindi - matching the actual shop board */}
            <motion.p
              className="font-body text-sm md:text-base tracking-widest uppercase mb-3"
              style={{ color: "hsl(40 100% 65%)", fontFamily: "'Noto Nastaliq Urdu', serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              شالیمار جوس شاپ
            </motion.p>

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
            <span className="text-5xl mb-4 block">❄️</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">Special Winter Drink</h2>
            <p className="font-body text-lg text-muted-foreground mb-4">Warm up this winter with our special hot drink!</p>
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
