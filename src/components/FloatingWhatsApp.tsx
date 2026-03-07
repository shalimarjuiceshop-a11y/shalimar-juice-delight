import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/919852779933"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-[hsl(0,0%,100%)] rounded-full p-4 shadow-lg transition-transform hover:scale-110 flex items-center gap-2"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} />
    <span className="hidden sm:inline font-body text-sm font-semibold pr-2">Chat on WhatsApp</span>
  </a>
);

export default FloatingWhatsApp;
