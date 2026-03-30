import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Research />
      <Projects />
      <Resume />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
