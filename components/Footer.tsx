import React, { useState } from 'react';

interface FooterProps {
  onAdminToggle: (pass: string) => boolean;
  isAdmin: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminToggle, isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleAction = () => {
    if (isAdmin) {
      if (confirm("Czy chcesz wylogować się z panelu?")) {
        onAdminToggle('danmar2025'); 
      }
    } else {
      setIsModalOpen(true);
      setError(false);
      setPassword('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdminToggle(password);
    if (success) {
      setIsModalOpen(false);
      setPassword('');
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-500 py-16 border-t border-slate-900 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-12">
          
          {/* SEKCJA LOGO W STOPCE */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Danmar Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="font-brand text-xl font-bold tracking-tight text-white uppercase">
                DANMAR SP. Z O.O <span className="text-blue-600"></span>
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-black">PRODUKCJA, NAPRAWA I KONSERWACJA MASZYN</p>
            <p className="text-sm leading-relaxed max-w-xs text-center lg:text-left text-slate-400">
              Indywidualne podejście i fachowy serwis w zakresie hydrauliki siłowej oraz precyzyjnej obróbki części.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Zakres usług</h4>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-slate-600 font-bold">
              <li className="hover:text-blue-500 transition-colors">• Naprawa i konserwacja maszyn</li>
              <li className="hover:text-blue-500 transition-colors">• Naprawa urządzeń elektrycznych</li>
              <li className="hover:text-blue-500 transition-colors">• Produkcja sprzętu hydraulicznego</li>
              <li className="hover:text-blue-500 transition-colors">• Wytwarzanie części nietypowych</li>
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex gap-8 text-sm font-bold tracking-tighter">
              <a href="#" className="hover:text-white transition-colors uppercase">Polityka prywatności</a>
              <a href="#" className="hover:text-white transition-colors uppercase">RODO</a>
            </div>
            <p className="text-xs text-slate-700 font-bold">
              NIP: 5543039948 | REGON: 542831827
            </p>
          </div>
        </div>

          <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium">
          &copy; {new Date().getFullYear()} DANMAR SP. Z O.O. – NIEZAWODNE WSPARCIE TWOICH MASZYN
        </p>
        </div>
          <button 
            onClick={handleAction}
            className={`transition-all p-3 rounded-xl ${isAdmin ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110' : 'text-slate-800 hover:text-blue-500 hover:bg-slate-900'}`}
            title="Panel Administratora"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* MODAL ADMINA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className={`relative bg-slate-900 border border-slate-800 p-8 rounded-[32px] w-full max-w-md shadow-2xl transition-all duration-300 transform animate-in zoom-in-95 ${error ? 'animate-bounce border-red-500' : ''}`}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-brand text-2xl font-bold text-white uppercase tracking-tight">Panel Sterowania</h3>
              <p className="text-slate-400 text-sm mt-2">Wprowadź hasło dostępu do systemu</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  autoFocus
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Hasło administratora"
                  className={`w-full bg-slate-950 border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-800'} text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-center tracking-[0.5em]`}
                />
                {error && <p className="text-red-500 text-[10px] text-center mt-2 font-black uppercase tracking-widest">Błędne hasło</p>}
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-bold text-sm hover:bg-slate-700 transition-all uppercase tracking-widest"
                >
                  Anuluj
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest"
                >
                  Zaloguj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
