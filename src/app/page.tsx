import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Research from './components/Research';
import Resume from './components/Resume';
import Achievements from './components/Achievements';
import Footer from './components/Footer';

export default function Home() {
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