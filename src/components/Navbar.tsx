import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/franchise", label: "Franchise" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-pineapple">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍍</span>
          <div className="leading-tight">
            <span className="font-display text-xl font-bold text-foreground">Shalimar Juice</span>
            <span className="block text-xs text-muted-foreground font-body" dir="rtl">شالیمار جوس</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium transition-colors hover:text-pineapple-dark ${
                location.pathname === link.to ? "text-pineapple-dark" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-primary-foreground font-body text-sm font-semibold px-5 py-2 rounded-full hover:brightness-105 transition"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-pineapple"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="font-body text-base font-medium text-foreground hover:text-pineapple-dark transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
