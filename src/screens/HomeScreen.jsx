import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="noise min-h-screen bg-[#080808] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/[0.07] sticky top-0 bg-[#080808]/90 backdrop-blur-xl z-50">
        <Link to="/" className="font-display text-3xl tracking-[5px] text-white">
          TUNE<span className="text-red-600">X</span>
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 relative">
        {/* Red glow blob */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 pointer-events-none" />

        <h1 className="font-display text-[clamp(80px,16vw,160px)] leading-none tracking-[6px] text-center animate-fade-up">
          TUNE<span className="text-red-600">X</span>
        </h1>

        <p className="text-white/40 text-xs tracking-[4px] uppercase mt-4 mb-12 animate-fade-up-1">
          Millions of songs · Free · Instant
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl flex border border-white/[0.07] rounded overflow-hidden bg-[#111] focus-within:border-red-600 focus-within:shadow-[0_0_30px_rgba(232,0,61,0.15)] transition-all duration-200 animate-fade-up-2"
        >
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none px-6 py-[18px] text-white text-base placeholder-white/30 font-sans"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 transition-colors px-7 text-white font-display text-lg tracking-[3px] shrink-0"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
  );
}