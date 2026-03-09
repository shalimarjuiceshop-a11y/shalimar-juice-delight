import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import PineappleMascot from "./components/PineappleMascot";
import AnimatedRoutes from "./components/AnimatedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <FloatingWhatsApp />
        <PineappleMascot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
