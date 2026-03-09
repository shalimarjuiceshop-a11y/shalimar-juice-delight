import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => (
  <motion.a
    href="https://wa.me/919852779933"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground rounded-full px-5 py-3 flex items-center gap-2 shadow-[0_4px_20px_hsl(142_70%_49%/0.4)]"
    aria-label="Chat on WhatsApp"
    initial={{ opacity: 0, y: 40, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.08, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <MessageCircle size={22} />
    <span className="hidden sm:inline font-body text-sm font-semibold">WhatsApp</span>
  </motion.a>
);

export default FloatingWhatsApp;
