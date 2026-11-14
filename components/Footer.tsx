```tsx
import React, { useState } from 'react';

interface FooterProps {
  onAdminToggle: (pass: string) => boolean;
  isAdmin: boolean;
}

const PHONE = '+48 516 030 778';
const PHONE_LINK = '+48516030778';
const EMAIL = 'danmarmarcinchechla@gmail.com';
const ADDRESS = 'Krucza 2, 86-070 Nowy Dwór';

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

// Wstaw tutaj rzeczywiste adresy podstron, jeśli już istnieją.
const PRIVACY_URL = '/polityka-prywatnosci';
const RODO_URL = '/rodo';

const workingHours = [
  { day: 'Poniedziałek', hours: '07:00–17:00' },
  { day: 'Wtorek', hours: '07:00–17:00' },
  { day: 'Środa', hours: '07:00–17:00' },
  { day: 'Czwartek', hours: '07:00–17:00' },
  { day: 'Piątek', hours: '07:00–17:00' },
  { day: 'Sobota', hours: '07:00–17:00' },
  { day: 'Niedziela', hours: 'Nieczynne' },
];

const services = [
  'Naprawa i regeneracja siłowników hydraulicznych',
  'Produkcja siłowników hydraulicznych',
  'Zakuwanie przewodów hydraulicznych',
  'Naprawa i serwis hydrauliki siłowej',
  'Produkcja sprzętu hydraulicznego',
];

const Footer: React.FC<FooterProps> = ({ onAdminToggle, isAdmin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleAction = () => {
    if (isAdmin) {
      if (window.confirm('Czy na pewno chcesz się wylogować?')) {
        onAdminToggle('danmar2026');
      }
      return;
    }

    setPassword('');
    setLoginError(false);
    setShowLogin(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onAdminToggle(password)) {
      setShowLogin(false);
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* O FIRMIE */}
          <div>
            <a href="/" className="mb-5 inline-flex items-center">
              <img
                src="/logo.png"
                alt="DANMAR – hydraulika siłowa"
                className="h-16 w-auto object-contain"
              />
            </a>

            <h3 className="mb-3 text-lg font-bold tracking-wide text-white">
              DANMAR SP. Z O.O.
            </h3>

            <p className="text-sm leading-7 text-slate-400">
              Specjalizujemy się w hydraulice siłowej. Oferujemy naprawę,
              regenerację i produkcję siłowników hydraulicznych, a także
              profesjonalny serwis urządzeń hydraulicznych.
            </p>
          </div>

          {/* USŁUGI */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-white">
              Nasze usługi
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {services.map((service, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-500">›</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTAKT */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-white">
              Kontakt
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Telefon
                </span>
                <a
                  href={`tel:${PHONE_LINK}`}
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  {PHONE}
                </a>
              </li>

              <li>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  E-mail
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="break-all text-slate-300 transition hover:text-blue-400"
                >
                  {EMAIL}
                </a>
              </li>

              <li>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Adres
                </span>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition hover:text-blue-400"
                >
                  {ADDRESS}
                  <span className="ml-1 text-blue-400">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* GODZINY PRACY */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-white">
              Godziny pracy
            </h3>

            <ul className="space-y-3 text-sm">
              {workingHours.map((item) => (
                <li
                  key={item.day}
                  className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2"
                >
                  <span className="text-slate-400">{item.day}</span>
                  <span
                    className={
                      item.hours === 'Nieczynne'
                        ? 'text-slate-500'
                        : 'font-medium text-slate-200'
                    }
                  >
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DANE FIRMY */}
        <div className="mt-12 border-t border-slate-800 pt-7">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
            Dane firmy
          </h3>

          <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <span>DANMAR SP. Z O.O.</span>
            <span>NIP: 5543039948</span>
            <span>REGON: 542831827</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={PRIVACY_URL}
              className="text-slate-400 transition hover:text-blue-400"
            >
              Polityka prywatności
            </a>

            <a
              href={RODO_URL}
              className="text-slate-400 transition hover:text-blue-400"
            >
              Informacja RODO
            </a>
          </div>
        </div>

        {/* DOLNA BELKA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} DANMAR SP. Z O.O. Wszelkie prawa
            zastrzeżone.
          </p>

          <button
            type="button"
            onClick={handleAction}
            className="rounded px-2 py-1 transition hover:text-blue-400"
            aria-label={isAdmin ? 'Wyloguj administratora' : 'Panel administratora'}
          >
            {isAdmin ? 'Panel administratora · Wyloguj' : 'Panel administratora'}
          </button>
        </div>
      </div>

      {/* MODAL LOGOWANIA */}
      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-2 text-xl font-bold text-white">
              Panel administratora
            </h3>

            <p className="mb-6 text-sm text-slate-400">
              Wprowadź hasło, aby uzyskać dostęp.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Hasło administratora"
                autoFocus
                className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />

              {loginError && (
                <p className="mb-3 text-sm text-red-400">
                  Nieprawidłowe hasło. Spróbuj ponownie.
                </p>
              )}

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Anuluj
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
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
```
