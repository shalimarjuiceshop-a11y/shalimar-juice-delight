import { MapPin, Phone, UserRound, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import sjsLogo from "@/assets/sjs-logo.jpeg";

const footerLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/franchise", label: "Franchise" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => (
  <footer className="bg-footer-dark py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-10 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-14 h-14 rounded-full bg-cream p-0.5 ring-2 ring-primary/60 shadow-[0_0_20px_hsl(45_90%_55%/0.35)]">
              <img src={sjsLogo} alt="SJS Logo" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-cream">
                Shalimar Juice
              </h3>
              <p className="text-sm font-medium mt-0.5 text-footer-heading"
                 dir="rtl"
                 style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                شالیمار جوس
              </p>
            </div>
          </div>
          <p className="text-sm font-body leading-relaxed mb-5 text-footer-text">
            Fresh fruit juices made daily with love. Taste the real freshness of pineapple at Shalimar Juice.
          </p>
          <a
            href="https://www.instagram.com/shalimarjuiceshop/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-body font-semibold text-xs transition-all bg-primary/10 text-footer-heading hover:bg-primary/20 hover:scale-[1.02]"
          >
            <Instagram size={14} strokeWidth={2} /> Follow on Instagram
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-5 text-footer-heading">Quick Links</h4>
          <div className="space-y-2.5">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1 font-body text-sm text-footer-text hover:text-cream transition-colors group"
              >
                {link.label}
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Shop Info */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-5 text-footer-heading">Shop Info</h4>
          <div className="space-y-3 text-sm font-body text-footer-text">
            <p className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 shrink-0 text-primary" /> Perfect Complex, Jamil Colony, Amravati, Maharashtra – 444601</p>
            <p className="flex items-center gap-2.5"><UserRound size={14} className="shrink-0 text-primary" /> Owner: Sameer Ahmad</p>
            <p className="flex items-center gap-2.5"><Phone size={14} className="shrink-0 text-primary" /> +91 98527 79933</p>
            <p className="flex items-center gap-2.5"><Mail size={14} className="shrink-0 text-primary" /> shalimarjuiceshop@gmail.com</p>
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-5 text-footer-heading">Location</h4>
          <iframe
            title="Shalimar Juice Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5!2d77.7676!3d20.9325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a5a45bffffff%3A0x1234567890abcdef!2sJamil%20Colony%2C%20Amravati%2C%20Maharashtra%20444601!5e0!3m2!1sen!2sin!4v1700000000000"
            className="w-full h-40 rounded-2xl border border-border/50"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-12 pt-8 text-center border-t border-white/5">
        <p className="text-xs font-body text-muted-foreground/50">
          © 2026 Shalimar Juice. All rights reserved. Made with 💛
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
