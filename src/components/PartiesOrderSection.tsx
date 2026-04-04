import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PartyPopper, Users, Phone, Star, ArrowRight, Sparkles, GlassWater } from "lucide-react";
import partySetup from "@/assets/party-juice-setup.jpg";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: smoothEase } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: smoothEase } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: smoothEase } },
};

const features = [
  { icon: Users, title: "50 to 500+ Guests", desc: "Small party or big wedding — we serve any number of guests easily." },
  { icon: GlassWater, title: "Live Juice Counter", desc: "We set up a fresh juice counter at your place with many fruit options." },
  { icon: Star, title: "Best Quality", desc: "Same fresh and pure taste that Shalimar is famous for." },
  { icon: Sparkles, title: "Pick Your Flavors", desc: "Choose what you like — Pineapple, Mango, Mixed Fruit & more!" },
];

const PartiesOrderSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(30_15%_12%)] via-[hsl(38_50%_18%)] to-[hsl(30_15%_12%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating decorative elements */}
      <motion.div className="absolute top-20 left-10 w-20 h-20 rounded-full" style={{ background: "hsl(45 100% 51% / 0.08)" }} animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-20 right-16 w-32 h-32 rounded-full" style={{ background: "hsl(45 100% 51% / 0.05)" }} animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Two-column layout: Content + Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">
          {/* Left: Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 border border-primary/20" style={{ background: "hsl(45 100% 51% / 0.08)" }}>
              <PartyPopper size={14} className="text-primary" />
              <span className="text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "hsl(45 80% 70%)" }}>
                Party Orders
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1]"
              style={{ color: "hsl(45 100% 96%)" }}
            >
              Having a Party? <br />
              <span className="text-gradient-gold">We'll Handle the Juice!</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg max-w-xl leading-relaxed mb-8"
              style={{ color: "hsl(45 30% 70%)" }}
            >
              Wedding, birthday, office party or any event — we bring fresh juice counters to your place!
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <Link
                to="/party-order"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-8 py-3.5 rounded-full hover:brightness-105 hover:scale-[1.02] transition-all duration-300 glow-gold btn-glow"
              >
                <Phone size={16} />
                Order for Your Party
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/919852779933"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: "hsl(45 30% 40% / 0.4)", color: "hsl(45 100% 96%)" }}
              >
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex justify-center"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden group"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="absolute -inset-3 rounded-3xl blur-3xl" style={{ background: "hsl(45 100% 51% / 0.12)" }} />
              <img
                src={partySetup}
                alt="Shalimar Live Juice Counter Setup for Parties and Events"
                className="relative w-full max-w-lg rounded-2xl object-cover shadow-2xl"
                loading="lazy"
                width={1024}
                height={768}
              />
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, hsl(30 15% 10% / 0.6), transparent 40%)" }} />
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "hsl(45 100% 51% / 0.9)", color: "hsl(30 15% 10%)" }}>
                  <Star size={12} /> Our Party Setup
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group rounded-2xl p-6 text-center border transition-all duration-300"
              style={{ background: "hsl(30 15% 15% / 0.6)", borderColor: "hsl(45 30% 30% / 0.3)" }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(45 100% 51% / 0.06), transparent)" }}
              />
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(45 100% 51% / 0.1)" }}
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "hsl(45 100% 96%)" }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(45 20% 60%)" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartiesOrderSection;
