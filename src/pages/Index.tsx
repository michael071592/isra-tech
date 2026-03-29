import { lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Portfolio from "@/components/landing/Portfolio";
import PortfolioGallery from "@/components/landing/PortfolioGallery";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import FloatingElements from "@/components/landing/FloatingElements";
import ExitPopup from "@/components/landing/ExitPopup";
import PageLoader from "@/components/landing/PageLoader";
import SectionDivider from "@/components/landing/SectionDivider";

// Lazy-load heavy interactive components
const AIChatBot = lazy(() => import("@/components/landing/AIChatBot"));
const CursorEffect = lazy(() => import("@/components/landing/CursorEffect"));
const ActivityTicker = lazy(() => import("@/components/landing/ActivityTicker"));

export default function Index() {
  return (
    <>
      <PageLoader />
      <a href="#services" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2">
        Перейти к содержимому
      </a>
      <Navbar />
      <Hero />
      <SectionDivider variant={1} />
      <Problems />
      <Services />
      <SectionDivider variant={2} />
      <About />
      <Portfolio />
      <PortfolioGallery />
      <SectionDivider variant={3} />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <SectionDivider variant={1} />
      <FinalCTA />
      <Footer />
      <FloatingElements />
      <ExitPopup />
      {/* Lazy-loaded interactive components */}
      <Suspense fallback={null}>
        <AIChatBot />
        <CursorEffect />
        <ActivityTicker />
      </Suspense>
    </>
  );
}
