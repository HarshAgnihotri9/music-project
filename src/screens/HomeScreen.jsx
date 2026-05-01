import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const QUICK_SEARCHES = ['Hip-Hop', 'Pop', 'Rock', 'Electronic', 'Jazz', 'R&B', 'Latin'];

const TRENDING = [
  { num: '01', title: 'Not Like Us', artist: 'Kendrick Lamar' },
  { num: '02', title: 'Espresso', artist: 'Sabrina Carpenter' },
  { num: '03', title: 'Lose Control', artist: 'Teddy Swims' },
  { num: '04', title: 'Too Sweet', artist: 'Hozier' },
  { num: '05', title: 'Beautiful Things', artist: 'Benson Boone' },
  { num: '06', title: 'I Had Some Help', artist: 'Post Malone' },
  { num: '07', title: 'Die With a Smile', artist: 'Bruno Mars & Lady Gaga' },
  { num: '08', title: 'Taste', artist: 'Sabrina Carpenter' },
];

function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-[14px]">
      {[
        { h: '5px', d: '0.7s' },
        { h: '9px', d: '0.9s' },
        { h: '6px', d: '0.6s' },
        { h: '11px', d: '1.1s' },
        { h: '7px', d: '0.8s' },
      ].map((bar, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm bg-red-600"
          style={{
            height: bar.h,
            animation: `tunex-bounce ${bar.d} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [npIndex, setNpIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setNpIndex(i => (i + 1) % TRENDING.length), 4000);
    return () => clearInterval(id);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  const handleChip = (term) => {
    setQuery(term);
  };

  const np = TRENDING[npIndex];

  return (
    <>
      {/* Global keyframes + font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .tunex-display { font-family: 'Bebas Neue', sans-serif; }
        .tunex-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes tunex-bounce {
          from { height: 3px; }
          to   { height: 12px; }
        }
        @keyframes tunex-pulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -65%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -62%) scale(1.06); }
        }
        @keyframes tunex-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes tunex-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tunex-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tunex-blob {
          position: fixed;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -65%);
          pointer-events: none;
          animation: tunex-pulse 6s ease-in-out infinite;
          z-index: 0;
        }
        .tunex-line-accent {
          position: fixed;
          left: 40px; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom, transparent, #dc2626 30%, #dc2626 70%, transparent);
          opacity: 0.18; pointer-events: none; z-index: 1;
        }
        .tunex-grain::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025; pointer-events: none; z-index: 9999;
        }

        .tunex-h1-shadow::after {
          content: 'TUNEX';
          position: absolute; inset: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          color: transparent;
          transform: translate(4px, 4px);
          letter-spacing: inherit;
          pointer-events: none;
        }

        .tunex-search-bar:focus-within {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 1px #dc2626, 0 0 40px rgba(220,38,38,0.12);
        }

        .tunex-marquee-track { animation: tunex-marquee 28s linear infinite; }
        .tunex-marquee-track:hover { animation-play-state: paused; }

        .tunex-stat::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: #dc2626;
          transform: scaleX(0); transition: transform 0.25s;
          transform-origin: center;
        }
        .tunex-stat:hover::after { transform: scaleX(1); }

        .tunex-chip::after {
          content: ''; position: absolute; inset: 0;
          background: #dc2626; opacity: 0; transition: opacity 0.18s;
        }
        .tunex-chip:hover::after { opacity: 0.08; }

        .tunex-fade-0 { animation: tunex-fadeUp 0.6s 0s    ease both; }
        .tunex-fade-1 { animation: tunex-fadeUp 0.6s 0.1s  ease both; }
        .tunex-fade-2 { animation: tunex-fadeUp 0.6s 0.15s ease both; }
        .tunex-fade-3 { animation: tunex-fadeUp 0.6s 0.2s  ease both; }
        .tunex-fade-4 { animation: tunex-fadeUp 0.6s 0.3s  ease both; }
        .tunex-fade-5 { animation: tunex-fadeUp 0.6s 0.4s  ease both; }
      `}</style>

      <div className="tunex-grain tunex-body min-h-screen bg-[#060606] text-white flex flex-col">
        <div className="tunex-blob" />
        <div className="tunex-line-accent hidden sm:block" />

        {/* ── Nav ── */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-12 sm:py-5 border-b border-white/[0.07] bg-[#060606]/85 backdrop-blur-xl">
          <Link to="/" className="tunex-display text-[28px] tracking-[6px] text-white no-underline">
            TUNE<span className="text-red-600">X</span>
          </Link>

          <ul className="hidden md:flex gap-9 list-none">
            {['Charts', 'Artists', 'Genres', 'New Releases'].map(item => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-white/35 text-[10px] tracking-[3px] uppercase hover:text-white transition-colors no-underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button className="text-[10px] tracking-[2px] uppercase border border-white/[0.07] text-white/40 hover:border-red-600 hover:text-white transition-all px-4 py-2">
              Sign In
            </button>
            <button className="hidden sm:block text-[10px] tracking-[2px] uppercase bg-red-600 hover:bg-red-500 border border-red-600 text-white transition-all px-4 py-2">
              Get Started
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-12 pt-16 pb-10 text-center">

          {/* Eyebrow */}
          <div className="tunex-fade-0 flex items-center gap-3 text-[10px] tracking-[5px] uppercase text-red-600 mb-6">
            <span className="w-8 h-px bg-red-600 opacity-50" />
            Discover · Stream · Explore
            <span className="w-8 h-px bg-red-600 opacity-50" />
          </div>

          {/* Wordmark */}
          <h1 className="tunex-display tunex-h1-shadow tunex-fade-1 relative text-[clamp(90px,16vw,180px)] leading-[0.9] tracking-[4px]">
            TUNE<span className="text-red-600">X</span>
          </h1>

          {/* Tagline */}
          <p className="tunex-fade-3 text-[11px] tracking-[4px] uppercase text-white/35 mt-5 mb-10">
            <span className="text-white/60">80 Million</span> songs &nbsp;·&nbsp; Instant playback &nbsp;·&nbsp;{' '}
            <span className="text-white/60">Free forever</span>
          </p>

          {/* Now Playing pill */}
          <div className="tunex-fade-2 inline-flex items-center gap-3 bg-[#161616] border border-white/[0.13] px-3 py-2 mb-10">
            <EqBars />
            <span className="text-[11px] text-white/40">Trending now —</span>
            <span className="text-[11px] text-white/75 font-medium transition-all duration-500">
              {np.artist} · {np.title}
            </span>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="tunex-fade-4 w-full max-w-[600px]">
            <div className="tunex-search-bar flex border border-white/[0.07] bg-[#0e0e0e] overflow-hidden transition-all duration-200">
              <div className="flex items-center px-4 text-white/35">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search songs, artists, albums…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm placeholder-white/25 py-[18px] font-light"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 transition-colors px-6 text-white tunex-display text-[15px] tracking-[3px] shrink-0 flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
                SEARCH
              </button>
            </div>
          </form>

          {/* Chips */}
          <div className="tunex-fade-5 flex flex-wrap gap-2 mt-5 justify-center">
            {QUICK_SEARCHES.map(term => (
              <button
                key={term}
                onClick={() => handleChip(term)}
                className="tunex-chip relative text-[10px] tracking-[2px] uppercase text-white/35 border border-white/[0.07] bg-transparent px-4 py-1.5 hover:text-white hover:border-red-600 transition-all overflow-hidden"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* ── Trending Marquee ── */}
        <div className="relative z-10 overflow-hidden border-t border-b border-white/[0.07]">
          <div className="tunex-marquee-track flex w-max">
            {[...TRENDING, ...TRENDING].map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-7 py-[14px] border-r border-white/[0.07] whitespace-nowrap hover:bg-[#0e0e0e] transition-colors cursor-default"
              >
                <span className="tunex-display text-[13px] text-red-600 w-[18px]">{t.num}</span>
                <span className="text-[12px] font-medium text-white/85">{t.title}</span>
                <span className="text-white/[0.13] text-[10px]">·</span>
                <span className="text-[11px] text-white/35">{t.artist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="relative z-10 grid grid-cols-3 border-t border-white/[0.07]">
          {[
            { num: '80', sym: 'M+', label: 'Tracks' },
            { num: '10', sym: 'M+', label: 'Artists' },
            { num: '0',  sym: '$',  label: 'Cost' },
          ].map(({ num, sym, label }) => (
            <div
              key={label}
              className="tunex-stat relative py-7 text-center border-r border-white/[0.07] last:border-r-0 hover:bg-[#0e0e0e] transition-colors overflow-hidden"
            >
              <div className="tunex-display flex items-baseline justify-center gap-0.5 text-[clamp(28px,4vw,42px)] tracking-[2px] leading-none">
                {num}
                <span className="text-red-600">{sym}</span>
              </div>
              <div className="text-[9px] tracking-[3px] uppercase text-white/35 mt-1.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}