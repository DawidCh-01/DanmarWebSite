import React, { useState } from 'react';

/**
 * USTAWIENIA DANYCH KONTAKTOWYCH
 */
const CONTACT_INFO = {
  phone1: "+48 516 030 778",
  email: "danmarmarcinchechla@gmail.com",
  address: "ul. Krucza 2, 86-070 Nowy Dwór",
  country: "Polska",
  // Formspree ID: mzdqbqgz
  formEndpoint: "https://formspree.io/f/mzdqbqgz",
  mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.9113645367586!2d17.82864617711902!3d53.3273420755998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470390a38099391d%3A0xc609c99187910c85!2sKrucza%202%2C%2086-070%20Nowy%20Dw%C3%B3r!5e0!3m2!1spl!2spl!4v1716382181234!5m2!1spl!2spl`
};

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(CONTACT_INFO.formEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); // Czyści formularz po wysłaniu
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form error:", error);
      setStatus('error');
    }

    // Reset statusu po 10 sekundach (aby błąd lub sukces nie wisiał wiecznie)
    setTimeout(() => setStatus('idle'), 10000);
  };

  return (
    <section className="py-24 bg-slate-900 text-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-sm font-bold text-blue-500 tracking-[0.2em] uppercase mb-4">Skontaktuj się</h2>
            <p className="text-4xl font-brand font-bold mb-8 uppercase leading-tight">NIEZAWODNE WSPARCIE TWOICH MASZYN</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Zadzwoń do nas</h4>
                  <a href={`tel:${CONTACT_INFO.phone1.replace(/\s/g, '')}`} className="text-slate-400 font-medium hover:text-blue-400 transition-colors">
                    {CONTACT_INFO.phone1}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Napisz e-mail</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-400 font-medium hover:text-blue-400 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-800 pt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Nasza lokalizacja</h4>
                    <p className="text-slate-400">{CONTACT_INFO.address}</p>
                    <p className="text-slate-400">{CONTACT_INFO.country}</p>
                  </div>
                </div>
                
                <div className="mt-4 w-full h-48 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-800">
                  <iframe 
                    title="Mapa lokalizacji Danmar"
                    src={CONTACT_INFO.mapUrl}
                    className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 bg-white text-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl shadow-blue-500/5 relative overflow-hidden">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-12">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-brand font-bold mb-4">Wiadomość wysłana!</h3>
                <p className="text-slate-600 text-lg max-w-md">
                  Dziękujemy za kontakt. Nasz zespół przeanalizuje Twoje zgłoszenie i skontaktuje się z Tobą tak szybko, jak to możliwe.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-blue-600 font-bold hover:underline"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 animate-bounce text-center">
                    Błąd podczas wysyłania. Spróbuj ponownie za chwilę lub zadzwoń bezpośrednio.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Imię i Nazwisko</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="np. Jan Kowalski" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email / Telefon</label>
                    <input 
                      required
                      name="contact_info"
                      type="text" 
                      placeholder="Wpisz e-mail lub numer telefonu" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Rodzaj usługi / Model maszyny</label>
                  <div className="relative">
                    <select 
                      name="service_type"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Nie wybrano">Wybierz usługę...</option>
                      <option value="Zakuwanie węży">Zakuwanie węży</option>
                      <option value="Naprawa siłownika">Naprawa siłownika</option>
                      <option value="Naprawa agregatu hydraulicznego">Serwis agregatu</option>
                      <option value="Diagnostyka u klienta">Diagnostyka u klienta</option>
                      <option value="Druk 3D części">Druk 3D części</option>
                      <option value="Inne">Inne</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Wiadomość</label>
                  <textarea 
                    required
                    name="message"
                    rows={4} 
                    placeholder="Opisz problem lub zapytaj o dostępność części..." 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-5 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-xl uppercase tracking-widest flex items-center justify-center gap-3 ${
                    status === 'submitting' ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                  }`}
                >
                  {status === 'submitting' ? 'WYSYŁANIE...' : 'WYŚLIJ ZAPYTANIE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact
