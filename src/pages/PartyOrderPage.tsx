import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, Send, User, Phone, MapPin, Users, Building2, Sparkles, GlassWater, Music, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919852779933";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: smoothEase } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 22 } },
};

const guestOptions = [
  { value: "500-1000", label: "500 – 1,000", icon: "👥" },
  { value: "1000-2000", label: "1,000 – 2,000", icon: "👨‍👩‍👧‍👦" },
  { value: "2000-3000", label: "2,000 – 3,000", icon: "🏟️" },
  { value: "3000-5000", label: "3,000 – 5,000", icon: "🎪" },
  { value: "5000-7000", label: "5,000 – 7,000", icon: "🏛️" },
  { value: "7000-10000", label: "7,000 – 10,000", icon: "🌆" },
];

const eventTypes = [
  { value: "wedding", label: "Wedding", emoji: "💒" },
  { value: "birthday", label: "Birthday", emoji: "🎂" },
  { value: "corporate", label: "Corporate Event", emoji: "🏢" },
  { value: "festival", label: "Festival / Mela", emoji: "🎊" },
  { value: "other", label: "Other", emoji: "🎉" },
];

const PartyOrderPage = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    partyHall: "",
    guests: "",
    eventType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) errs.mobile = "Enter valid 10-digit mobile";
    if (!form.address.trim() || form.address.trim().length < 3) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.guests) errs.guests = "Select number of guests";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = () => {
    const message = `🎉 *Party Order — Shalimar Juice Shop*\n\n👤 *Name:* ${form.name.trim()}\n📱 *Mobile:* ${form.mobile.trim()}\n📍 *Address:* ${form.address.trim()}${form.partyHall ? `\n🏛️ *Party Hall:* ${form.partyHall.trim()}` : ""}\n👥 *Guests:* ${form.guests}\n🎊 *Event:* ${form.eventType || "Not specified"}\n\n_Sent from Shalimar Juice Website_`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    toast.success("Redirecting to WhatsApp!");
  };

  const inputClass = (field: string) =>
    `w-full bg-background border ${errors[field] ? "border-destructive ring-2 ring-destructive/20" : "border-border"} rounded-2xl px-4 py-3.5 pl-12 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-300`;

  return (
    <main className="pt-16 min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-page-header overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(45 100% 70%) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-[6%] text-5xl opacity-15 select-none"
        >🎉</motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-[8%] text-4xl opacity-10 select-none"
        >🍍</motion.div>
        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-[20%] text-3xl opacity-10 select-none"
        >🥤</motion.div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary">
                <PartyPopper size={12} /> Party Orders
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-cream">Book Juice for </span>
              <span className="text-gradient-gold">Your Party</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-sm md:text-base mt-4 text-header-muted max-w-lg mx-auto leading-relaxed">
              From weddings to corporate events — we bring fresh juice counters to your venue for 500 to 10,000+ guests!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { num: 1, label: "Your Details", icon: User },
              { num: 2, label: "Event Info", icon: PartyPopper },
              { num: 3, label: "Confirm", icon: Send },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-3">
                <motion.div
                  animate={step >= s.num ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-bold transition-all duration-300 ${
                    step === s.num
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : step > s.num
                      ? "bg-secondary/20 text-secondary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <s.icon size={14} />
                  <span className="hidden sm:inline">{s.label}</span>
                </motion.div>
                {i < 2 && (
                  <div className={`w-8 md:w-12 h-0.5 rounded-full transition-colors duration-300 ${step > s.num ? "bg-secondary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <motion.div
            className="card-premium p-6 md:p-10 relative overflow-hidden"
            layout
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <div className="w-full h-full rounded-bl-[80px] bg-primary" />
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">Your Details</h2>
                      <p className="font-body text-xs text-muted-foreground">Tell us about yourself</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-4 text-muted-foreground/60" />
                      <input type="text" placeholder="Full Name *" value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputClass("name")} maxLength={100} />
                      {errors.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive mt-1.5 ml-1 font-medium">{errors.name}</motion.p>}
                    </div>

                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-4 text-muted-foreground/60" />
                      <input type="tel" placeholder="Mobile Number *" value={form.mobile} onChange={(e) => updateField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} className={inputClass("mobile")} />
                      {errors.mobile && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive mt-1.5 ml-1 font-medium">{errors.mobile}</motion.p>}
                    </div>

                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-4 text-muted-foreground/60" />
                      <textarea placeholder="Your Address *" value={form.address} onChange={(e) => updateField("address", e.target.value)} className={`${inputClass("address")} resize-none`} rows={2} maxLength={300} />
                      {errors.address && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive mt-1.5 ml-1 font-medium">{errors.address}</motion.p>}
                    </div>

                    <div className="relative">
                      <Building2 size={16} className="absolute left-4 top-4 text-muted-foreground/60" />
                      <input type="text" placeholder="Party Hall / Venue Name (optional)" value={form.partyHall} onChange={(e) => updateField("partyHall", e.target.value)} className={inputClass("partyHall")} maxLength={150} />
                    </div>
                  </div>

                  <motion.button
                    onClick={goNext}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-bold py-4 rounded-2xl hover:brightness-105 transition-all glow-gold btn-glow"
                  >
                    Continue <ChevronDown size={16} className="-rotate-90" />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Event Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <PartyPopper className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">Event Details</h2>
                      <p className="font-body text-xs text-muted-foreground">Tell us about your party</p>
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="mb-6">
                    <label className="font-body text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block flex items-center gap-2">
                      <Users size={14} /> How many guests? *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {guestOptions.map((opt) => (
                        <motion.button
                          key={opt.value}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => updateField("guests", opt.value)}
                          className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                            form.guests === opt.value
                              ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                              : "border-border bg-card hover:border-primary/30"
                          }`}
                        >
                          <span className="text-2xl block mb-1">{opt.icon}</span>
                          <span className="font-display text-xs font-bold text-foreground">{opt.label}</span>
                          {form.guests === opt.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                            >
                              <span className="text-primary-foreground text-[10px]">✓</span>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    {errors.guests && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive mt-2 ml-1 font-medium">{errors.guests}</motion.p>}
                  </div>

                  {/* Event Type */}
                  <div className="mb-6">
                    <label className="font-body text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block flex items-center gap-2">
                      <Music size={14} /> Event Type (optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {eventTypes.map((evt) => (
                        <motion.button
                          key={evt.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateField("eventType", form.eventType === evt.value ? "" : evt.value)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 text-xs font-body font-bold transition-all duration-300 ${
                            form.eventType === evt.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          <span>{evt.emoji}</span> {evt.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <motion.button
                      onClick={goBack}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 border border-border font-body text-sm font-semibold py-4 rounded-2xl hover:bg-muted/50 transition-all text-foreground"
                    >
                      <ChevronDown size={16} className="rotate-90" /> Back
                    </motion.button>
                    <motion.button
                      onClick={goNext}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-[2] flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-bold py-4 rounded-2xl hover:brightness-105 transition-all glow-gold btn-glow"
                    >
                      Review Order <ChevronDown size={16} className="-rotate-90" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">Review & Confirm</h2>
                      <p className="font-body text-xs text-muted-foreground">Make sure everything looks good</p>
                    </div>
                  </div>

                  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
                    {[
                      { icon: User, label: "Name", value: form.name },
                      { icon: Phone, label: "Mobile", value: form.mobile },
                      { icon: MapPin, label: "Address", value: form.address },
                      ...(form.partyHall ? [{ icon: Building2, label: "Party Hall", value: form.partyHall }] : []),
                      { icon: Users, label: "Guests", value: form.guests },
                      ...(form.eventType ? [{ icon: Music as any, label: "Event", value: eventTypes.find(e => e.value === form.eventType)?.label || form.eventType }] : []),
                    ].map((item, i) => (
                      <motion.div key={i} variants={scaleIn} className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon size={15} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                          <p className="font-body text-sm font-semibold text-foreground truncate">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="flex gap-3 mt-8">
                    <motion.button
                      onClick={goBack}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 border border-border font-body text-sm font-semibold py-4 rounded-2xl hover:bg-muted/50 transition-all text-foreground"
                    >
                      <ChevronDown size={16} className="rotate-90" /> Edit
                    </motion.button>
                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-[2] flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground font-body text-sm font-bold py-4 rounded-2xl hover:brightness-110 transition-all shadow-lg"
                    >
                      <Send size={16} /> Send via WhatsApp
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 mt-8"
          >
            {[
              { icon: GlassWater, text: "Live Juice Counter" },
              { icon: Users, text: "500 to 10,000 Guests" },
              { icon: Sparkles, text: "Premium Quality" },
            ].map((item, i) => (
              <motion.div key={i} variants={scaleIn} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border text-center">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon size={16} className="text-primary" />
                </div>
                <span className="font-body text-[10px] font-bold text-muted-foreground">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PartyOrderPage;
