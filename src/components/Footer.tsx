import { MapPin, Phone, User } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-pineapple py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🍍</span>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Shalimar Juice</h3>
              <p className="text-xs text-muted-foreground" dir="rtl">شالیمار جوس</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Fresh fruit juices made daily. Taste the real freshness of pineapple!
          </p>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-3 text-foreground">Shop Info</h4>
          <div className="space-y-2 text-sm text-muted-foreground font-body">
            <p className="flex items-center gap-2"><MapPin size={14} /> Jamil Colony, Amravati</p>
            <p className="flex items-center gap-2"><User size={14} /> Owner: Sameer Khan</p>
            <p className="flex items-center gap-2"><Phone size={14} /> WhatsApp: +91 99999 99999</p>
          </div>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-3 text-foreground">Location</h4>
          <iframe
            title="Shalimar Juice Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0!2d77.78!3d20.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU1JzQ4LjAiTiA3N8KwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            className="w-full h-32 rounded-lg border border-pineapple"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-pineapple text-center">
        <p className="text-xs text-muted-foreground font-body">
          © 2026 Shalimar Juice. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
