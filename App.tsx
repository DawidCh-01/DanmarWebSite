
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AppSection } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HERO);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(AppSection);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset uwzględniający wysokość headera (80px)
          if (rect.top >= -100 && rect.top <= 150) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAdmin = (pass: string) => {
    if (pass === 'danmar2025') {
      setIsAdmin(!isAdmin);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} isAdmin={isAdmin} onAdminToggle={toggleAdmin} />
      
      {/* pt-20 zapobiega chowaniu się góry pierwszej sekcji pod fixed headerem */}
      <main className="flex-grow pt-20">
        <div id={AppSection.HERO} className="scroll-mt-20">
          <Hero />
        </div>
        
        <div id={AppSection.SERVICES} className="scroll-mt-20">
          <Services />
        </div>

        <div id={AppSection.ABOUT} className="bg-white scroll-mt-20">
          <About isAdmin={isAdmin} />
        </div>

        <div id={AppSection.GALLERY} className="scroll-mt-20">
          <Gallery isAdmin={isAdmin} />
        </div>

        <div id={AppSection.CONTACT} className="scroll-mt-20">
          <Contact />
        </div>
      </main>

      <Footer onAdminToggle={toggleAdmin} isAdmin={isAdmin} />
    </div>
  );
};

export default App;
