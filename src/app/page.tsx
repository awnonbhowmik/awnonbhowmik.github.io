import type { Metadata } from 'next';
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
import JsonLd from './components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Awnon Bhowmik',
  url: SITE_URL,
  image: `${SITE_URL}/image_modified_high_contrast.webp`,
  description:
    'Doctoral researcher and software engineer working across cybersecurity, privacy-preserving machine learning, applied cryptography, and mathematical modeling.',
  jobTitle: ['Doctoral Researcher', 'Computer Systems Analyst and Programmer', 'Software Engineer'],
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Colorado Technical University',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'United States Postal Service',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Colorado State University Global Campus' },
    { '@type': 'CollegeOrUniversity', name: 'CUNY York College' },
    { '@type': 'CollegeOrUniversity', name: 'CUNY Borough of Manhattan Community College' },
  ],
  knowsAbout: [
    'Cybersecurity',
    'Differential privacy',
    'Privacy-preserving machine learning',
    'Applied cryptography',
    'Software engineering',
    'Applied mathematics',
  ],
  sameAs: [
    'https://linkedin.com/in/awnon-bhowmik',
    'https://github.com/awnonbhowmik',
    'https://www.researchgate.net/profile/Awnon-Bhowmik',
    'https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en',
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={personStructuredData} />
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
