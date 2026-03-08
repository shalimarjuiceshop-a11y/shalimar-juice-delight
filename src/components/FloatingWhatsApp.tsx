import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/919852779933"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-5 py-3 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={22} />
    <span className="hidden sm:inline font-body text-sm font-semibold">WhatsApp</span>
  </a>
);

export default FloatingWhatsApp;
