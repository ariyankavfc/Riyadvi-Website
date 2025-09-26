import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import LeadMagnet from "../components/LeadMagnet";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import StickyChat from "../components/StickyChat";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <LeadMagnet />   
      <Portfolio />
      <Testimonials />
      <StickyChat />  
    </>
  );
}
