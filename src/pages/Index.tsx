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

export default function Index() {
  return (
    <>
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
    </>
  );
}
