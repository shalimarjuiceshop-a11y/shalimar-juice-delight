import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, Download, Share2 } from "lucide-react";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const MENU_URL = "https://shalimars-pineapple-paradise.lovable.app/menu";

const QRCodeMenu = () => {
  const qrRef = useRef<SVGSVGElement>(null);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Shalimar Juice Shop Menu",
        text: "Hamara full menu dekhein 🍍",
        url: MENU_URL,
      });
    } else {
      navigator.clipboard.writeText(MENU_URL);
      alert("Menu link copied!");
    }
  };

  const handleDownload = () => {
    const svg = qrRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shalimar-juice-menu-qr.svg";
    a.click();
  };

  return (
    <section className="py-16 md:py-24 bg-muted/40 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
              Instant Access
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Scan & See <span className="text-gradient-gold">Our Menu</span>
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-sm mx-auto">
              Shop pe aao aur QR scan karo — poora menu second mein dekhein!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* QR Card */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center"
            >
              <motion.div
                className="card-premium p-8 md:p-10 flex flex-col items-center gap-6 w-full max-w-xs"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                {/* Decorative ring */}
                <div className="relative p-3 rounded-2xl border-2 border-primary/30 bg-white shadow-lg">
                  <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-md" />
                  <QRCodeSVG
                    ref={qrRef}
                    value={MENU_URL}
                    size={180}
                    fgColor="hsl(30, 10%, 15%)"
                    bgColor="#ffffff"
                    level="H"
                    imageSettings={{
                      src: "/favicon.png",
                      x: undefined,
                      y: undefined,
                      height: 32,
                      width: 32,
                      excavate: true,
                    }}
                    className="relative rounded-lg"
                  />
                </div>

                <div className="text-center">
                  <p className="font-display text-sm font-bold text-foreground">Shalimar Juice Menu</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5 break-all">{MENU_URL}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground font-body text-xs font-semibold px-4 py-2.5 rounded-full hover:brightness-105 transition-all glow-gold-soft"
                  >
                    <Download size={13} /> Download
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border font-body text-xs font-semibold px-4 py-2.5 rounded-full text-foreground hover:bg-muted/50 transition-all"
                  >
                    <Share2 size={13} /> Share
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Steps */}
            <motion.div variants={stagger} className="space-y-5">
              {[
                { step: "1", title: "Phone Camera Open Karo", desc: "Apne Android ya iPhone ka camera open karo." },
                { step: "2", title: "QR Code Pe Point Karo", desc: "Camera ko QR code ki taraf point karo — auto detect hoga." },
                { step: "3", title: "Tap & Menu Dekhein", desc: "Link pe tap karo aur poora menu instant open!" },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display text-sm font-extrabold flex items-center justify-center shrink-0 glow-gold-soft">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="card-premium p-4 flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">Works on all phones</p>
                  <p className="font-body text-xs text-muted-foreground">Android, iPhone — no app needed</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QRCodeMenu;
