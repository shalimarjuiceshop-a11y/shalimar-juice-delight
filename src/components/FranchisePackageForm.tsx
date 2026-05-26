import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, MapPin, Package, Send, Sparkles, CheckCircle2, X } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919852779933";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile"),
  city: z.string().trim().min(2, "Enter your city").max(100),
});

interface Props {
  packageLabel: string | null;
  onClose: () => void;
}

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FranchisePackageForm = ({ packageLabel, onClose }: Props) => {
  const [form, setForm] = useState({ name: "", mobile: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (packageLabel && wrapRef.current) {
      setTimeout(() => {
        wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [packageLabel]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const fe: Record<string, string> = {};
      r.error.errors.forEach((er) => { if (er.path[0]) fe[er.path[0] as string] = er.message; });
      setErrors(fe);
      return;
    }
    setErrors({});
    const msg =
      `🤝 *Franchise Inquiry*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(form.name)}%0A` +
      `📱 *Mobile:* ${encodeURIComponent(form.mobile)}%0A` +
      `📍 *City:* ${encodeURIComponent(form.city)}%0A` +
      `📦 *Package:* ${encodeURIComponent(packageLabel || "")}%0A%0A` +
      `_Sent from Shalimar Juice Website_`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    toast.success("Opening WhatsApp…");
    setForm({ name: "", mobile: "", city: "" });
    onClose();
  };

  const inputCls = (f: string) =>
    `peer w-full bg-background border ${errors[f] ? "border-destructive" : "border-border"} rounded-xl pl-11 pr-4 py-3.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all`;

  return (
    <div ref={wrapRef} className="max-w-2xl mx-auto mt-10">
      <AnimatePresence>
        {packageLabel && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="relative bg-card rounded-3xl border border-primary/30 shadow-2xl shadow-primary/10 overflow-hidden"
          >
            {/* Decorative gradient header */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition z-10"
            >
              <X size={16} />
            </button>

            <div className="relative p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase text-primary mb-1">
                    Franchise Inquiry
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-foreground leading-tight">
                    Let's start your <span className="text-gradient-gold">Shalimar Juice</span> shop
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-1.5">
                    Fill the form below — we'll connect on WhatsApp within minutes.
                  </p>
                </div>
              </div>

              {/* Selected package pill */}
              <motion.div
                key={packageLabel}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex items-center justify-between gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 rounded-2xl px-4 py-3 mb-5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Package size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Selected Package</p>
                    <p className="font-display text-sm font-extrabold text-foreground truncate">{packageLabel}</p>
                  </div>
                </div>
                <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
              </motion.div>

              {/* Form */}
              <form onSubmit={submit} className="space-y-3.5">
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-4 text-muted-foreground/60 peer-focus:text-primary" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls("name")}
                    maxLength={100}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1 ml-1">{errors.name}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-4 text-muted-foreground/60" />
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      className={inputCls("mobile")}
                    />
                    {errors.mobile && <p className="text-xs text-destructive mt-1 ml-1">{errors.mobile}</p>}
                  </div>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-4 text-muted-foreground/60" />
                    <input
                      type="text"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className={inputCls("city")}
                      maxLength={100}
                    />
                    {errors.city && <p className="text-xs text-destructive mt-1 ml-1">{errors.city}</p>}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-bold px-6 py-4 rounded-xl glow-gold btn-glow mt-2"
                >
                  <Send size={16} /> Send Inquiry on WhatsApp
                </motion.button>

                <p className="text-center font-body text-[11px] text-muted-foreground/70 pt-1">
                  🔒 Your details stay private. We only use them to call you back.
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FranchisePackageForm;
