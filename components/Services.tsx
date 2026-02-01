
import React, { useState, useEffect } from 'react';
import { generateServiceDescription } from '../services/geminiService';

const FALLBACKS: Record<string, string> = {
  "Naprawa siłowników": "Profesjonalna regeneracja i naprawa siłowników hydraulicznych wszystkich typów, przywracająca pełną sprawność.",
  "Zakuwanie węży": "Szybkie i precyzyjne zakuwanie węży wysokociśnieniowych z użyciem atestowanych końcówek i tulei.",
  "Serwis pomp": "Diagnostyka i naprawa pomp hydraulicznych tłoczkowych, zębatych oraz łopatkowych renomowanych producentów.",
  "Diagnostyka maszyn": "Kompleksowe sprawdzanie ciśnień i przepływów w układach hydraulicznych bezpośrednio u klienta.",
  "Druk 3D": "Wytwarzanie prototypów, uszczelnień oraz nietypowych części z wytrzymałych polimerów technicznych.",
  "Sprzedaż komponentów": "Szeroki asortyment części: od rozdzielaczy i zaworów, po elementy złączne i uszczelnienia."
};

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon }) => {
  // Start with fallback text so the user sees content immediately
  const [description, setDescription] = useState<string>(FALLBACKS[title] || "Profesjonalne usługi hydrauliki siłowej.");

  useEffect(() => {
    const fetchDesc = async () => {
      const desc = await generateServiceDescription(title);
      if (desc) {
        setDescription(desc);
      }
    };
    fetchDesc();
  }, [title]);

  return (
    <div className="group p-8 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed min-h-[80px]">
        {description}
      </p>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: "Naprawa siłowników",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Zakuwanie węży",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Serwis pomp",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "Diagnostyka maszyn",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Druk 3D",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: "Sprzedaż komponentów",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Nasza Specjalizacja</h2>
          <p className="text-4xl md:text-5xl font-brand font-bold text-slate-900">KOMPLEKSOWE USŁUGI</p>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              icon={service.icon} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
