import { ThemeProvider } from "./lib/ThemeContext";
import { SmoothScrollProvider } from "./lib/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import Manifesto from "./components/Manifesto";
import Services from "./components/Services";
import Process from "./components/Process";
import Work from "./components/Work";
import WhyUs from "./components/WhyUs";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <div className="grain" />
        <Navbar />
        <main>
          <Hero />
          <MarqueeStrip />
          <Manifesto />
          <Services />
          <Process />
          <Work />
          <WhyUs />
          <CTA />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
