
import React, { useState, useRef } from 'react';

interface AboutImage {
  url: string;
  description: string;
}

interface AboutProps {
  isAdmin?: boolean;
}

type TabType = 'mission' | 'process';

const About: React.FC<AboutProps> = ({ isAdmin = false }) => {
  const [activeTab, setActiveTab] = useState<TabType>('mission');
  const [images, setImages] = useState<AboutImage[]>([
    { 
      url: "https://images.unsplash.com/photo-1534229317157-f8369656f709?q=80&w=1974&auto=format&fit=crop", 
      description: "Mój warsztat – miejsce, gdzie precyzja spotyka się z doświadczeniem." 
    },
    { 
      url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop", 
      description: "Każdy komponent traktuję z najwyższą uwagą." 
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMultipleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: AboutImage[] = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        description: "Nowe ujęcie z realizacji"
      }));
      setImages(prev => [...prev, ...newImages]);
      setCurrentIndex(images.length);
    }
  };

  const updateDescription = (index: number, newDesc: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, description: newDesc } : img));
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const profileItems = [
    { title: "Naprawa maszyn", icon: "⚙️" },
    { title: "Serwis elektryki", icon: "⚡" },
    { title: "Hydraulika siłowa", icon: "💧" },
    { title: "Części nietypowe", icon: "🛠️" }
  ];

  return (
    <section className="py-24 overflow-hidden bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
            
            <div className="relative group overflow-hidden rounded-[40px] shadow-2xl border-8 border-white aspect-[4/5] bg-slate-900">
              <div className="relative w-full h-full">
                {images.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img src={img.url} alt={`Realizacja ${idx}`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent p-12 pt-24">
                      {isAdmin ? (
                        <input 
                          type="text"
                          value={img.description}
                          onChange={(e) => updateDescription(idx, e.target.value)}
                          placeholder="Edytuj opis zdjęcia..."
                          className="w-full bg-blue-900/40 text-white font-bold text-lg border-b border-blue-400 outline-none pb-1 transition-all"
                        />
                      ) : (
                        <p className="text-white font-bold text-lg">{img.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {images.length > 1 && (
                <div className="absolute inset-y-0 w-full flex items-center justify-between px-4 pointer-events-none">
                  <button onClick={prevImage} className="pointer-events-auto w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={nextImage} className="pointer-events-auto w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}

              {isAdmin && (
                <>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute top-6 right-6 z-30 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-bold text-[10px] cursor-pointer shadow-lg hover:bg-blue-700 transition-colors uppercase tracking-widest"
                  >
                    Dodaj ujęcie
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleMultipleUpload} className="hidden" accept="image/*" multiple />
                </>
              )}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Co nas wyróżnia</h2>
            <p className="text-4xl md:text-5xl font-brand font-bold text-slate-900 mb-8 leading-tight">
              WIEDZA I <span className="text-blue-600">PRECYZJA</span>
            </p>

            <div className="flex gap-8 mb-8 border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('mission')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'mission' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                O mnie
                {activeTab === 'mission' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('process')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'process' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Standard pracy
                {activeTab === 'process' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>}
              </button>
            </div>

            <div className="min-h-[160px]">
              {activeTab === 'mission' ? (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    To miejsce powstało z wieloletniej pasji do mechaniki oraz chęci dostarczania usług na najwyższym poziomie. Specjalizujemy się w hydraulice siłowej, łącząc praktyczne doświadczenie z indywidualnym podejściem do każdego zlecenia.
                    Stawiamy na rzetelną diagnozę, solidne wykonanie oraz trwałe rozwiązania, które sprawdzają się w codziennej pracy naszych klientów. Dla nas najważniejsza jest jakość, terminowość i zaufanie, które budujemy poprzez uczciwą współpracę i fachowe doradztwo.
                   </p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <p className="text-lg text-slate-600 leading-relaxed mb-4 font-bold text-slate-900">
                    Transparentność i solidność na każdym etapie:
                  </p>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-black">01.</span> Diagnostyka – rzetelna ocena stanu technicznego przed przystąpieniem do prac.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-black">02.</span> Dobór części – stosuję tylko sprawdzone komponenty wysokiej klasy.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-black">03.</span> Testy obciążeniowe – każda naprawa kończy się sprawdzeniem szczelności i sprawności.
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 mb-12">
              {profileItems.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter leading-tight block">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-blue-600 rounded-[32px] text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-2xl font-brand font-bold mb-2">Potrzebujesz fachowej pomocy?</h4>
                  <p className="text-blue-100 text-sm">Zadzwoń bezpośrednio do mnie – ustalimy termin serwisu.</p>
                </div>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg uppercase tracking-widest whitespace-nowrap"
                >
                  KONTAKT
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
