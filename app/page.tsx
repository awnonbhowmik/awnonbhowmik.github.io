import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Research from '@/components/Research';
import Resume from '@/components/Resume';
import Achievements from '@/components/Achievements';
import Footer from '@/components/Footer';

export { Skills };
export { Contact };


export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Research />
      <Resume />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
