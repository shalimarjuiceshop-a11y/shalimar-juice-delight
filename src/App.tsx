import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import FranchisePage from "./pages/FranchisePage";
import Franchise3LakhPage from "./pages/Franchise3LakhPage";
import Franchise5LakhPage from "./pages/Franchise5LakhPage";
import Franchise7LakhPage from "./pages/Franchise7LakhPage";
import Franchise10LakhPage from "./pages/Franchise10LakhPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

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
