import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Portfolio from "@/components/landing/Portfolio";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import FloatingElements from "@/components/landing/FloatingElements";
import ExitPopup from "@/components/landing/ExitPopup";

export default function Index() {
  return (
    <>
      <a href="#services" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2">
        Перейти к содержимому
      </a>
      <Navbar />
      <Hero />
      <Problems />
      <Services />
      <About />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingElements />
      <ExitPopup />
    </>
  );
}
