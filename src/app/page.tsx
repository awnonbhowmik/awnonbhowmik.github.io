import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Skills from './components/Skills';
import CurrentWork from './components/CurrentWork';
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
      <Publications />
      <Projects />
      <Resume />
      <Skills />
      <CurrentWork />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
