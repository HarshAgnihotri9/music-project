import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const QUICK_SEARCHES = ['Hip-Hop', 'Pop', 'Rock', 'Electronic', 'Jazz'];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  const handleChip = (term) => {
    navigate(`/search?query=${encodeURIComponent(term)}`);
  };

  return (
    <div className="noise min-h-screen bg-[#080808] flex flex-col">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between
                       px-5 py-4
                       sm:px-10 sm:py-6
                       border-b border-white/[0.07]
                       sticky top-0 bg-[#080808]/90 backdrop-blur-xl z-50">
        <Link to="/" className="font-display text-2xl sm:text-3xl tracking-[5px] text-white">
          TUNE<span className="text-red-600">X</span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex gap-8 list-none">
          {['Charts', 'Artists', 'Genres'].map(item => (
            <li key={item}>
              <Link to={`/${item.toLowerCase()}`}
                    className="text-white/40 text-xs tracking-[3px] uppercase hover:text-white transition-colors">
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <button className="text-[0.7rem] tracking-[2px] uppercase border border-white/[0.07]
                           text-white/40 hover:border-red-600 hover:text-white
                           transition-all px-3 py-2 sm:px-4">
          Sign In
        </button>
      </nav>

      {/* ── Hero ── */}
      <div className="flex-1 flex flex-col items-center justify-center
                       px-5 sm:px-8 relative pb-24">

        {/* Red glow blob */}
        <div className="absolute w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full
                         bg-red-600/10 blur-[120px]
                         top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3
                         pointer-events-none" />

        <h1 className="font-display
                        text-[clamp(72px,18vw,160px)]
                        leading-none tracking-[clamp(3px,1vw,8px)]
                        text-center animate-fade-up">
          TUNE<span className="text-red-600">X</span>
        </h1>

        <p className="text-white/40 text-[clamp(0.55rem,2vw,0.75rem)]
                       tracking-[clamp(2px,1vw,4px)] uppercase
                       mt-3 mb-8 sm:mt-4 sm:mb-12
                       text-center animate-fade-up-1">
          Millions of songs · Free · Instant
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl flex
                      border border-white/[0.07] rounded overflow-hidden bg-[#111]
                      focus-within:border-red-600
                      focus-within:shadow-[0_0_30px_rgba(232,0,61,0.15)]
                      transition-all duration-200 animate-fade-up-2"
        >
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 min-w-0 bg-transparent border-none outline-none
                        px-4 py-4 sm:px-6 sm:py-[18px]
                        text-white text-sm sm:text-base
                        placeholder-white/30 font-sans"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 transition-colors
                        px-4 sm:px-7
                        text-white font-display
                        text-base sm:text-lg
                        tracking-[2px] sm:tracking-[3px]
                        shrink-0"
          >
            SEARCH
          </button>
        </form>

        {/* Quick-search chips */}
        <div className="flex flex-wrap gap-2 mt-5 justify-center animate-fade-up-2">
          {QUICK_SEARCHES.map(term => (
            <button
              key={term}
              onClick={() => handleChip(term)}
              className="text-[0.65rem] tracking-[2px] uppercase
                          text-white/40 border border-white/[0.07] rounded-sm
                          px-3 py-1.5 hover:text-white hover:border-white/20
                          transition-all font-sans"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-3 border-t border-white/[0.07]">
        {[
          { num: '80M+', label: 'Tracks' },
          { num: '10M+', label: 'Artists' },
          { num: '0$',   label: 'Cost' },
        ].map(({ num, label }, i) => (
          <div key={label}
               className={`py-3 sm:py-5 text-center
                            ${i < 2 ? 'border-r border-white/[0.07]' : ''}`}>
            <div className="font-display text-xl sm:text-3xl tracking-[2px] leading-none">
              {num.replace(/\d+/, n => n)
                  .split(/(\+|\$)/)
                  .map((part, j) =>
                    /[+$]/.test(part)
                      ? <span key={j} className="text-red-600">{part}</span>
                      : part
                  )}
            </div>
            <div className="text-white/40 text-[0.55rem] sm:text-[0.65rem]
                             tracking-[2px] uppercase mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}