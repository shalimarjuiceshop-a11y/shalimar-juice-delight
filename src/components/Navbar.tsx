import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import sjsLogoAsset from "@/assets/shalimar-logo.png.asset.json";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/franchise", label: "Franchise" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] border-b border-white/5"
          : ""
      }`}
      style={{
        background: scrolled
          ? "hsl(30 12% 7% / 0.94)"
          : "hsl(30 12% 10% / 0.88)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-[2px] origin-left z-[60]"
        style={{
          scaleX: progressX,
          background:
            "linear-gradient(90deg, hsl(45 100% 60%) 0%, hsl(38 100% 55%) 50%, hsl(45 100% 65%) 100%)",
          boxShadow: "0 0 12px hsl(45 100% 55% / 0.6)",
        }}
      />
      <div className="container mx-auto flex items-center justify-between h-16 md:h-[4.5rem] px-3 md:px-4 gap-2">
        <Link to="/" className="flex items-center gap-2.5 md:gap-3 group min-w-0 flex-1">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-cream p-0.5 ring-2 ring-primary/60 shadow-[0_0_20px_hsl(45_90%_55%/0.35)] group-hover:ring-primary transition-all flex-shrink-0"
          >
            <img
              src={sjsLogoAsset.url}
              alt="Shalimar Juice Shop Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>
          <div className="leading-tight min-w-0 flex flex-col justify-center">
            <h1 className="font-display text-[15px] md:text-lg font-bold tracking-tight text-cream truncate">
              Shalimar Juice
            </h1>
            <p className="text-[11px] md:text-xs font-medium mt-0.5 whitespace-nowrap"
               dir="rtl"
               style={{
                 fontFamily: "'Noto Nastaliq Urdu', serif",
                 color: "hsl(45 80% 75%)",
                 lineHeight: 1.4,
               }}>
              شالیمار جوس
            </p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-cream"
                  : "text-header-muted hover:text-cream hover:bg-white/5"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/15 backdrop-blur-sm rounded-full -z-10 border border-primary/25"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-4 bg-primary text-primary-foreground font-body text-sm font-bold px-6 py-2.5 rounded-full hover:brightness-110 hover:scale-[1.03] transition-all duration-300 glow-gold-soft"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-cream p-2 rounded-xl hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden glass-dark border-t border-white/5"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block font-body text-sm font-medium px-4 py-3 rounded-xl transition-colors ${
                      location.pathname === link.to
                        ? "bg-primary/15 text-primary font-semibold"
                        : "text-cream/70 hover:bg-white/5 hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block mt-2 bg-primary text-primary-foreground font-body text-sm font-bold px-4 py-3 rounded-xl text-center glow-gold-soft"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
