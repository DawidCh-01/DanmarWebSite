
import React, { useState, useEffect } from 'react';
import { AppSection } from '../types';

interface HeaderProps {
  activeSection: AppSection;
  isAdmin: boolean;
  onAdminToggle: (pass: string) => boolean;
}

const Header: React.FC<HeaderProps> = ({ activeSection, isAdmin, onAdminToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasOwnKey, setHasOwnKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasOwnKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleKeySelect = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setHasOwnKey(true);
    } else {
      alert("Funkcja zmiany klucza dostępna tylko w środowisku AI Studio.");
    }
  };

  const handleLogout = () => {
    // Wywołujemy toggle z poprawnym hasłem, aby przełączyć isAdmin na false
    onAdminToggle('danmar2025');
  };

  const navLinks = [
    { id: AppSection.HERO, label: 'Start' },
    { id: AppSection.SERVICES, label: 'Usługi' },
    { id: AppSection.ABOUT, label: 'O mnie' },
    { id: AppSection.GALLERY, label: 'Galeria' },
    { id: AppSection.CONTACT, label: 'Kontakt' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
 <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection(AppSection.HERO)}
        >
          {/* Twoje nowe logo graficzne */}
          <img 
            src="/logo.png" 
            alt="Danmar Logo" 
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          
          {/* Nazwa firmy Danmar i plakietka Admin */}
          <div className="flex items-center">
            <span className="font-brand text-2xl font-bold tracking-tight text-slate-800">
              Danmar
            </span>
            {isAdmin && (
              <span className="ml-2 px-2 py-0.5 bg-blue-600 text-[10px] text-white rounded font-black uppercase tracking-widest">
                Admin
              </span>
            )}
          </div>
        </div>
            {isAdmin && <span className="ml-2 px-2 py-0.5 bg-blue-600 text-[10px] text-white rounded font-black uppercase tracking-widest">Admin</span>}
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-semibold transition-colors uppercase tracking-wider ${
                activeSection === link.id ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          {isAdmin && (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-blue-200">
              <button 
                onClick={handleKeySelect}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  hasOwnKey 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200'
                }`}
                title="Klucz API"
              >
                {hasOwnKey ? 'AI ACTIVE' : 'USTAW AI'}
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 border border-red-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Wyjdź
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {isAdmin && (
            <button 
              onClick={handleLogout}
              className="p-2 bg-red-100 text-red-600 rounded-lg border border-red-200"
              title="Wyjdź z panelu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
          <button 
            className="p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 animate-in slide-in-from-top shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-left py-3 px-4 rounded-xl font-semibold transition-colors ${
                activeSection === link.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
