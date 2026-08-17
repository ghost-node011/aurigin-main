import { ThemeProvider } from "./lib/ThemeContext";
import { SmoothScrollProvider } from "./lib/SmoothScroll";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import Manifesto from "./components/Manifesto";
import Services from "./components/Services";
import Process from "./components/Process";
import Work from "./components/Work";
import WhyUs from "./components/WhyUs";
import Team from "./components/Team";
import Partners from "./components/Partners";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <div className="grain" />
        <Cursor />
        <Navbar />
        <main>
          <Hero />
          <MarqueeStrip />
          <Manifesto />
          <Services />
          <Process />
          <Work />
          <WhyUs />
          <Team />
          <Partners />
          <CTA />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
