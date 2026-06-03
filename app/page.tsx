import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import LogoCarousel from "@/components/landing/LogoCarousel";
import Navbar from "@/components/landing/NavBar";
import Pricing from "@/components/landing/Pricing";
import Features from "@/components/landing/Features";


export default function Home() {
  return (
    <div>
      <main>
        <Navbar/>
        <Hero/>
        <LogoCarousel/>
        <Features/>
        <Pricing/>
        <Footer/>
      </main>
    </div>
  );
}
