
import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { analyzeIndustrialPhoto } from '../services/geminiService';

interface GalleryProps {
  isAdmin?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ isAdmin = false }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);

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
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(base64.split(',')[1]);
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

      const placeholderItem: GalleryItem = {
        id: tempId,
        url: localUrl,
        title: 'Analizowanie...',
        category: 'Wgrywanie',
        isAnalyzing: true
      };

      setItems(prev => [placeholderItem, ...prev]);

      try {
        const smallBase64 = await compressImageForAI(file);
        const aiDescription = await analyzeIndustrialPhoto(smallBase64);
        
        setItems(prev => prev.map(item => 
          item.id === tempId 
            ? { ...item, title: aiDescription || 'Realizacja Danmar', category: 'Realizacja', isAnalyzing: false }
            : item
        ));
      } catch (error) {
        console.error("Błąd przetwarzania pliku:", error);
        setItems(prev => prev.map(item => 
          item.id === tempId 
            ? { ...item, title: 'Realizacja Danmar', category: 'Realizacja', isAnalyzing: false }
            : item
        ));
      }
    });
    
    event.target.value = '';
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Portfolio</h2>
            <p className="text-4xl md:text-5xl font-brand font-bold text-slate-900 uppercase">Ostatnie Realizacje</p>
            {isAdmin && (
              <p className="text-blue-600 mt-4 max-w-xl font-bold">
                Włączony tryb zarządzania. Dodawaj zdjęcia, a AI automatycznie wygeneruje opisy.
              </p>
            )}
          </div>
          
          {isAdmin && (
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:scale-105 active:scale-95">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>DODAJ ZDJĘCIA</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-slate-100 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500">
              <img 
                src={item.url} 
                alt={item.title}
                className={`w-full h-full object-cover transition-all duration-1000 ${item.isAnalyzing ? 'blur-[2px] scale-105 opacity-80' : 'group-hover:scale-110'}`}
              />
              
              {item.isAnalyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px]">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Skanowanie AI...</span>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8 transition-all duration-300 ${item.isAnalyzing ? 'opacity-40' : 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'}`}>
                <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{item.category}</span>
                <h4 className="text-white text-xl font-bold font-brand tracking-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-32 bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
             </div>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Portfolio w trakcie aktualizacji</p>
             {isAdmin && <p className="text-blue-500 text-xs mt-2 font-bold">Użyj przycisku powyżej, aby dodać realizacje</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
