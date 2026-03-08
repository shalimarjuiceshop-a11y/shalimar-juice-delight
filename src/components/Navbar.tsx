import { useState } from "react";
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
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <motion.img
            src={sjsLogo}
            alt="Shalimar Juice Shop Logo"
            className="w-12 h-12 rounded-full object-cover border-2 shadow-lg glow-gold-soft"
            style={{ borderColor: "hsl(45 100% 51%)" }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="leading-none">
            <h1 className="font-display text-xl font-black tracking-tight text-gradient-gold drop-shadow-lg text-glow-gold">
              Shalimar Juice
            </h1>
            <p className="block text-sm font-bold mt-0.5" 
               dir="rtl" 
               style={{ 
                 fontFamily: "'Noto Nastaliq Urdu', serif", 
                 color: "hsl(45 90% 70%)",
                 textShadow: "0 2px 4px hsl(30 10% 15% / 0.5)"
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
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-muted rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-3 bg-primary text-primary-foreground font-body text-sm font-semibold px-5 py-2 rounded-full hover:brightness-105 transition-all btn-glow glow-gold-soft"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block font-body text-sm font-medium px-4 py-2.5 rounded-lg transition-colors ${
                      location.pathname === link.to
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block mt-1 bg-primary text-primary-foreground font-body text-sm font-semibold px-4 py-2.5 rounded-lg text-center"
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
