import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import RealChallenge from './components/sections/RealChallenge';
import CareerJourney from './components/sections/CareerJourney';
import Services from './components/sections/Services';
import StrategicApproach from './components/sections/StrategicApproach';
import Founder from './components/sections/Founder';
import HowItWorks from './components/sections/HowItWorks';
import WhoWeHelp from './components/sections/WhoWeHelp';
import VideoSection from './components/sections/VideoSection';
import Testimonials from './components/sections/Testimonials';
import StartHere from './components/sections/StartHere';
import FAQs from './components/sections/FAQs';
import Contact from './components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RealChallenge />
        <CareerJourney />
        <Services />
        <StrategicApproach />
        <Founder />
        <HowItWorks />
        {/* <WhoWeHelp /> */}
        {/* <VideoSection /> */}
        <Testimonials />
        <StartHere />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
