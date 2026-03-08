import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Citrus, GlassWater, Store, Snowflake } from "lucide-react";
import JuicePourAnimation from "@/components/JuicePourAnimation";
import hotMilk from "@/assets/hot-milk.png";

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center pt-16">
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--pineapple-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.span
              className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6 border border-accent/30"
              style={{ color: "hsl(45 60% 70%)", background: "hsl(45 100% 50% / 0.08)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Since Generations
            </motion.span>

            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6"
              style={{ color: "hsl(45 100% 96%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Fresh <span className="text-gradient-gold">Pineapple Juice</span>
              <br />
              for a Healthy Life
            </motion.h1>

            <motion.p
              className="font-body text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ color: "hsl(45 30% 70%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Fresh fruit juices made daily at Shalimar Juice Shop. Experience the taste of real, natural pineapple goodness.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-7 py-3.5 rounded-full hover:brightness-105 hover:scale-[1.02] transition-all shadow-pineapple"
              >
                View Menu <ArrowRight size={16} />
              </Link>
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 border font-body text-sm font-semibold px-7 py-3.5 rounded-full transition-all hover:bg-accent/10"
                style={{ borderColor: "hsl(40 60% 40%)", color: "hsl(45 80% 80%)" }}
              >
                Get Franchise <Handshake size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Juice Pour Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <JuicePourAnimation />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
              Why Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Why Choose <span className="text-gradient-gold">Shalimar Juice</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Citrus, title: "100% Fresh Fruits", desc: "We use only fresh, handpicked fruits every single day. No artificial flavors." },
              { icon: GlassWater, title: "Made Fresh Daily", desc: "Every glass is prepared fresh when you order. Zero preservatives added." },
              { icon: Store, title: "Franchise Available", desc: "Start your own Shalimar Juice shop with our affordable franchise plans." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-pineapple hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-base font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Winter Drink */}
      <section className="py-16 md:py-24 bg-muted/40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 bg-primary/10 text-pineapple-dark">
                <Snowflake size={13} /> Winter Special
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-foreground leading-[1.1]">
                Special for <span className="text-gradient-gold">Winter</span>
              </h2>
              <p className="font-display text-lg md:text-xl font-semibold mb-2 text-foreground/80">
                Milk with Dry Fruits
              </p>
              <p className="font-body text-sm md:text-base text-muted-foreground mb-2 leading-relaxed">
                Warm kulhad milk topped with almonds, cashews, pistachios & saffron — the perfect winter warmer.
              </p>
              <p className="font-body text-xs text-muted-foreground/60 mb-6">
                Made fresh with real dry fruits. Served hot in a traditional kulhad.
              </p>
              <span className="inline-block bg-primary text-primary-foreground font-display text-xl md:text-2xl font-bold px-8 py-3 rounded-full shadow-pineapple">
                Only ₹30
              </span>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-3xl" />
                <img
                  src={hotMilk}
                  alt="Hot Energy Milk with Dry Fruits in Kulhad"
                  className="relative w-60 md:w-72 lg:w-80 rounded-2xl shadow-xl object-cover"
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
