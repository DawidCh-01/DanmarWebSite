import { galleryImages as initialData } from '../data/galleryData';
import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { analyzeIndustrialPhoto } from '../services/geminiService';

interface GalleryProps {
  isAdmin?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ isAdmin = false }) => {
  const [items, setItems] = useState<GalleryItem[]>(() => 
    initialData.map(img => ({
      id: img.id.toString(),
      url: img.url,
      title: img.title,
      category: 'Realizacja',
      isAnalyzing: false
    }))
  );

  // Stan dla powiększonego zdjęcia
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Obsługa klawisza Escape do zamykania podglądu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % items.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + items.length) % items.length);
    }
  };

  const compressImageForAI = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7).split(',')[1]);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    fileArray.forEach(async (file) => {
      const tempId = Math.random().toString(36).substr(2, 9);
      const localUrl = URL.createObjectURL(file);
      const placeholderItem: GalleryItem = { id: tempId, url: localUrl, title: 'Analizowanie...', category: 'Wgrywanie', isAnalyzing: true };
      setItems(prev => [placeholderItem, ...prev]);
      try {
        const smallBase64 = await compressImageForAI(file);
        const aiDescription = await analyzeIndustrialPhoto(smallBase64);
        setItems(prev => prev.map(item => item.id === tempId ? { ...item, title: aiDescription || 'Realizacja Danmar', category: 'Realizacja', isAnalyzing: false } : item ));
      } catch (error) {
        setItems(prev => prev.map(item => item.id === tempId ? { ...item, isAnalyzing: false } : item ));
      }
    });
    event.target.value = '';
  };

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Portfolio</h2>
            <p className="text-4xl md:text-5xl font-brand font-bold text-slate-900 uppercase">Ostatnie Realizacje</p>
          </div>
          
          {isAdmin && (
            <div className="relative group">
              <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-xl hover:bg-blue-700">
                <span>DODAJ DO PODGLĄDU</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => !item.isAnalyzing && setSelectedImageIndex(index)}
              className={`group relative overflow-hidden rounded-3xl aspect-[4/3] bg-slate-100 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer`}
            >
              <img 
                src={item.url} 
                alt={item.title}
                className={`w-full h-full object-cover transition-all duration-1000 ${item.isAnalyzing ? 'blur-[2px] opacity-80' : 'group-hover:scale-110'}`}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h4 className="text-white text-sm font-bold uppercase tracking-widest">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

{/* --- LIGHTBOX (PODGLĄD PEŁNOEKRANOWY) --- */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Przycisk zamknij */}
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Strzałka w lewo */}
            <button onClick={handlePrev} className="absolute left-8 text-white/30 hover:text-white transition-all hidden md:block z-[110]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* KONTENER ZDJĘCIA - TUTAJ ZMNIEJSZYŁEM ROZMIAR */}
            <div className="relative max-w-3xl max-h-[70vh] px-4 animate-in zoom-in-95 duration-300">
              <img 
                src={items[selectedImageIndex].url} 
                className="w-full h-full object-contain rounded-2xl shadow-2xl border-4 border-white/10" 
                alt="Powiększenie" 
              />
              <div className="absolute -bottom-14 left-0 right-0 text-center text-white">
                <p className="text-sm font-bold uppercase tracking-[0.2em]">{items[selectedImageIndex].title}</p>
                <p className="text-[10px] text-white/40 mt-1">{selectedImageIndex + 1} / {items.length}</p>
              </div>
            </div>

            {/* Strzałka w prawo */}
            <button onClick={handleNext} className="absolute right-8 text-white/30 hover:text-white transition-all hidden md:block z-[110]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            
            {/* Kliknięcie w tło zamyka */}
            <div className="absolute inset-0" onClick={() => setSelectedImageIndex(null)}></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
