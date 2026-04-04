import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "@/pages/Index";
import MenuPage from "@/pages/MenuPage";
import OrderPage from "@/pages/OrderPage";
import FranchisePage from "@/pages/FranchisePage";
import Franchise3LakhPage from "@/pages/Franchise3LakhPage";
import Franchise5LakhPage from "@/pages/Franchise5LakhPage";
import Franchise7LakhPage from "@/pages/Franchise7LakhPage";
import Franchise10LakhPage from "@/pages/Franchise10LakhPage";
import GalleryPage from "@/pages/GalleryPage";
import ContactPage from "@/pages/ContactPage";
import PartyOrderPage from "@/pages/PartyOrderPage";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><MenuPage /></PageTransition>} />
        <Route path="/order" element={<PageTransition><OrderPage /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/franchise" element={<PageTransition><FranchisePage /></PageTransition>} />
        <Route path="/franchise/3-lakh" element={<PageTransition><Franchise3LakhPage /></PageTransition>} />
        <Route path="/franchise/5-lakh" element={<PageTransition><Franchise5LakhPage /></PageTransition>} />
        <Route path="/franchise/7-lakh" element={<PageTransition><Franchise7LakhPage /></PageTransition>} />
        <Route path="/franchise/10-lakh" element={<PageTransition><Franchise10LakhPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
