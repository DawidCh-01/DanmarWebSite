
import React from 'react';
import { AppSection } from '../types';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById(AppSection.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"; 

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-slate-950 py-12 md:py-0">
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE_URL} 
          alt="Hydraulika Siłowa Danmar" 
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full mb-6 md:mb-8 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-blue-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Eksperci Technologii Siłowej</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-brand font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
            MOC, KTÓREJ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">MOŻESZ ZAUFAĆ</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 mb-8 md:mb-12 max-w-2xl leading-relaxed font-light">
            Od precyzyjnej <span className="text-white font-semibold">diagnostyki układów</span>, przez ekspresowe <span className="text-white font-semibold">naprawy komponentów</span>, aż po zaawansowane <span className="text-white font-semibold">instalacje przemysłowe</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <button 
              onClick={scrollToContact}
              className="group relative px-8 py-4 md:px-10 md:py-5 bg-blue-600 overflow-hidden rounded-2xl font-bold text-base md:text-lg transition-all hover:bg-blue-700 shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3"
            >
              <span className="relative z-10 text-white">ZAMÓW SERWIS</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button 
              onClick={() => document.getElementById(AppSection.SERVICES)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 md:px-10 md:py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-base md:text-lg backdrop-blur-md transition-all flex items-center justify-center"
            >
              SPRAWDŹ OFERTĘ
            </button>
          </div>

          <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/10 pt-8 md:pt-10">
            <div>
              <p className="text-blue-500 font-brand font-bold text-2xl md:text-3xl">100%</p>
              <p className="text-slate-400 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 md:mt-2 font-bold">Gwarancja Jakości</p>
            </div>
            <div>
              <p className="text-blue-500 font-brand font-bold text-2xl md:text-3xl">Wiedza</p>
              <p className="text-slate-400 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 md:mt-2 font-bold">Projekty i naprawy</p>
            </div>
            <div>
              <p className="text-blue-500 font-brand font-bold text-2xl md:text-3xl">100%</p>
              <p className="text-slate-400 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 md:mt-2 font-bold">Szczelności</p>
            </div>
            <div>
              <p className="text-blue-500 font-brand font-bold text-2xl md:text-3xl">Mobilność</p>
              <p className="text-slate-400 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 md:mt-2 font-bold">Dojazd do Klienta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
