import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Send, User, Phone, MapPin, Package } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919852779933";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  city: z.string().trim().min(2, "City is required").max(100),
  package: z.string().trim().min(1, "Select a package"),
});

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const packages = [
  { value: "3-lakh", label: "₹3 Lakh Package" },
  { value: "5-lakh", label: "₹5 Lakh Package" },
  { value: "7-lakh", label: "₹7 Lakh Package" },
  { value: "10-lakh", label: "₹10 Lakh Package" },
];

const FranchiseInquiryForm = () => {
  const [form, setForm] = useState({ name: "", mobile: "", city: "", package: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const selectedPkg = packages.find((p) => p.value === form.package)?.label || form.package;
    const message = `🤝 *Franchise Inquiry*%0A%0A👤 *Name:* ${encodeURIComponent(form.name)}%0A📱 *Mobile:* ${encodeURIComponent(form.mobile)}%0A📍 *City:* ${encodeURIComponent(form.city)}%0A📦 *Package:* ${encodeURIComponent(selectedPkg)}%0A%0A_Sent from Shalimar Juice Website_`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    toast.success("Redirecting to WhatsApp!");
    setForm({ name: "", mobile: "", city: "", package: "" });
  };

  const inputClass = (field: string) =>
    `w-full bg-muted/50 border ${errors[field] ? "border-destructive" : "border-border"} rounded-xl px-4 py-3 pl-11 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200`;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="card-premium p-6 md:p-8 relative overflow-hidden"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
          <Handshake className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Franchise Inquiry</h3>
          <p className="font-body text-xs text-muted-foreground">Start your own Shalimar Juice shop</p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <motion.div variants={fadeUp} className="relative">
          <User size={16} className="absolute left-3.5 top-3.5 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass("name")}
            maxLength={100}
          />
          {errors.name && <p className="text-xs text-destructive mt-1 ml-1">{errors.name}</p>}
        </motion.div>

        {/* Mobile */}
        <motion.div variants={fadeUp} className="relative">
          <Phone size={16} className="absolute left-3.5 top-3.5 text-muted-foreground/50" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
            className={inputClass("mobile")}
          />
          {errors.mobile && <p className="text-xs text-destructive mt-1 ml-1">{errors.mobile}</p>}
        </motion.div>

        {/* City */}
        <motion.div variants={fadeUp} className="relative">
          <MapPin size={16} className="absolute left-3.5 top-3.5 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Your City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={inputClass("city")}
            maxLength={100}
          />
          {errors.city && <p className="text-xs text-destructive mt-1 ml-1">{errors.city}</p>}
        </motion.div>

        {/* Package */}
        <motion.div variants={fadeUp} className="relative">
          <Package size={16} className="absolute left-3.5 top-3.5 text-muted-foreground/50 z-10" />
          <select
            value={form.package}
            onChange={(e) => setForm({ ...form, package: e.target.value })}
            className={`${inputClass("package")} appearance-none cursor-pointer`}
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg.value} value={pkg.value}>{pkg.label}</option>
            ))}
          </select>
          {errors.package && <p className="text-xs text-destructive mt-1 ml-1">{errors.package}</p>}
        </motion.div>

        {/* Submit */}
        <motion.button
          variants={fadeUp}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-6 py-3.5 rounded-xl hover:brightness-105 transition-all duration-300 glow-gold btn-glow"
        >
          <Send size={16} />
          Send via WhatsApp
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FranchiseInquiryForm;
