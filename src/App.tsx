import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import AnimatedRoutes from "./components/AnimatedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/franchise/3-lakh" element={<Franchise3LakhPage />} />
          <Route path="/franchise/5-lakh" element={<Franchise5LakhPage />} />
          <Route path="/franchise/7-lakh" element={<Franchise7LakhPage />} />
          <Route path="/franchise/10-lakh" element={<Franchise10LakhPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
