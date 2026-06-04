import React, { useState, useEffect } from 'react';
import { generateServiceDescription } from '../services/geminiService';

// WAŻNE: Nazwy tutaj muszą być IDENTYCZNE jak w tablicy 'services' na dole
const FALLBACKS: Record<string, string> = {
  "Naprawa siłowników": "Kompleksowa regeneracja siłowników hydraulicznych: wymiana uszczelnień, szlifowanie tłoczysk i testy szczelności pod ciśnieniem.",
  "Produkcja agregatów hydraulicznych": "Tworzymy autorskie systemy hydrauliczne skrojone pod Twoje wymagania oraz przywracamy pełną sprawność i wydajność jednostkom używanym.",
  "Zakuwanie węży": "Profesjonalne zakuwanie przewodów hydraulicznych od ręki. Szeroki wybór końcówek i węży o wysokiej wytrzymałości.",
  "Diagnostyka maszyn": "Precyzyjne pomiary ciśnień i przepływów. Wykrywamy usterki zanim doprowadzą do poważnych awarii i przestojów.",
  "Druk 3D": "Szybkie prototypowanie i wytwarzanie nietypowych osłon, uszczelnień oraz części z polimerów technicznych.",
  "Sprzedaż komponentów": "Bogaty asortyment: pompy, rozdzielacze, zawory oraz elementy złączne dostępne bezpośrednio z naszego magazynu."
};

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon }) => {
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-9 8h10a1 1 0 001-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v13a1 1 0 001 1zm3-15v-2m4 2v-2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19v3" />
        </svg>
      )
    },
    {
      title: "Produkcja agregatów hydraulicznych",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          <circle cx="12" cy="15" r="2" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "Zakuwanie węży",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          <circle cx="6" cy="6" r="3" strokeWidth="2" />
          <circle cx="18" cy="18" r="3" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "Diagnostyka maszyn",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12L15 9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v1m0 8v1m-4-5h1m8 0h1" />
        </svg>
      )
    },
    {
      title: "Druk 3D",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
      )
    },
    {
      title: "Sprzedaż komponentów",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          <circle cx="12" cy="12" r="2" strokeWidth="2" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="services">
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
