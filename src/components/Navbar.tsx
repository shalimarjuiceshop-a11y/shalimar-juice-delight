import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import sjsLogo from "@/assets/sjs-logo.jpeg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/franchise", label: "Franchise" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={sjsLogo} alt="Shalimar Juice Shop Logo" className="w-10 h-10 rounded-full object-cover border-2 border-border shadow-sm" />
          <div className="leading-tight">
            <span className="font-display text-base font-bold tracking-tight text-foreground">Shalimar Juice</span>
            <span className="block text-[10px] text-muted-foreground/70" dir="rtl" style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '1.5' }}>شالیمار جوس</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-all ${
                location.pathname === link.to
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/919852779933"
            target="_blank"
            rel="noreferrer"
            className="ml-3 bg-primary text-primary-foreground font-body text-sm font-semibold px-5 py-2 rounded-full hover:brightness-105 transition-all"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`font-body text-sm font-medium px-4 py-2.5 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/919852779933"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 bg-primary text-primary-foreground font-body text-sm font-semibold px-4 py-2.5 rounded-lg text-center"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
