import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import sjsLogo from "@/assets/sjs-logo.jpeg";

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
          ? "shadow-lg shadow-black/20"
          : ""
      }`}
      style={{
        background: scrolled
          ? "hsl(30 15% 10% / 0.95)"
          : "hsl(30 15% 12% / 0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-24 px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative h-[72px] w-[92px] md:h-[78px] md:w-[108px] rounded-xl bg-cream p-1 ring-2 ring-primary/70 shadow-[0_0_28px_hsl(45_90%_55%/0.45)] group-hover:ring-primary transition-all"
          >
            <img
              src={sjsLogo}
              alt="Shalimar Juice Shop Logo"
              className="w-full h-full rounded-lg object-contain"
            />
          </motion.div>
          <div className="leading-none">
            <h1 className="font-display text-lg font-bold tracking-tight text-cream">
              Shalimar Juice
            </h1>
            <p className="block text-[11px] font-medium mt-1"
               dir="rtl"
               style={{
                 fontFamily: "'Noto Nastaliq Urdu', serif",
                 color: "hsl(45 80% 75%)"
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
