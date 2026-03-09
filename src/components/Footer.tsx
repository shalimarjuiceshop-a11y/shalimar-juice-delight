import { MapPin, Phone, UserRound, Instagram, Mail } from "lucide-react";
import sjsLogo from "@/assets/sjs-logo.jpeg";

const Footer = () => (
<footer className="bg-footer-dark py-14">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={sjsLogo} alt="SJS Logo" className="w-12 h-12 rounded-full object-cover border border-primary/30 shadow-md" />
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
          <p className="text-sm font-body leading-relaxed mb-4 text-footer-text">
            Fresh fruit juices made daily. Taste the real freshness of pineapple!
          </p>
          <a
            href="https://www.instagram.com/shalimarjuiceshop/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-body font-medium text-xs transition-colors bg-primary/10 text-[hsl(var(--footer-heading))]"
          >
            <Instagram size={14} strokeWidth={2} /> Follow on Instagram
          </a>
        </div>

        {/* Shop Info */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-[hsl(var(--footer-heading))]">Shop Info</h4>
          <div className="space-y-3 text-sm font-body text-[hsl(var(--footer-text))]">
            <p className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 shrink-0 text-primary" /> Perfect Complex, Jamil Colony, Front of Mohammadia Masjid, Walgaon Road, Amravati, Maharashtra – 444601</p>
            <p className="flex items-center gap-2.5"><UserRound size={14} className="shrink-0 text-primary" /> Owner: Sameer Ahmad</p>
            <p className="flex items-center gap-2.5"><Phone size={14} className="shrink-0 text-primary" /> +91 98527 79933</p>
            <p className="flex items-center gap-2.5"><Mail size={14} className="shrink-0 text-primary" /> shalimarjuiceshop@gmail.com</p>
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-[hsl(var(--footer-heading))]">Location</h4>
          <iframe
            title="Shalimar Juice Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0!2d77.78!3d20.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU1JzQ4LjAiTiA3N8KwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            className="w-full h-36 rounded-xl border border-border"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-10 pt-6 text-center border-t border-border/30">
        <p className="text-xs font-body text-muted-foreground">
          © 2026 Shalimar Juice. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
