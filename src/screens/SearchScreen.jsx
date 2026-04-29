import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SearchScreen() {
  const [songs, setSongs]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);
  const [inputVal, setInputVal]   = useState('');
  const [currentSong, setCurrentSong] = useState(null);

  const audioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    setError(false);

    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v1/search/multi',
      params: { query: searchQuery, search_type: 'SONGS' },
      headers: {
        'X-RapidAPI-Key': '64013b1d5cmshf4b0cfa04058dbbp1f0443jsnf870c27d0f0b',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(res => {
        const results = res.data?.data || [];
        const formatted = results.map(item => ({
          id: item.id,
          title: item.attributes?.name,
          artist: item.attributes?.artistName,
          image: item.attributes?.artwork?.url
            ?.replace('{w}', '300')?.replace('{h}', '300'),
          preview: item.attributes?.previews?.[0]?.url
        }));
        if (!formatted.length) { setError(true); return; }
        setSongs(formatted);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim())
      navigate(`/search?query=${encodeURIComponent(inputVal.trim())}`);
  };

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-[3px] border-white/10 border-t-red-600 rounded-full animate-spin" />
      <p className="text-white/40 text-xs tracking-[3px] uppercase">Searching</p>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 px-5 text-center">
      <p className="font-display text-4xl sm:text-5xl text-white">NO RESULTS</p>
      <p className="text-white/40 text-sm">Nothing found for "{searchQuery}"</p>
      <Link to="/" className="mt-2 px-6 py-3 bg-red-600 hover:bg-red-500 transition-colors text-white text-sm tracking-widest uppercase">
        ← Home
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50
                       flex items-center justify-between gap-3
                       flex-wrap sm:flex-nowrap
                       px-5 py-3.5 sm:px-10 sm:py-5
                       border-b border-white/[0.08]
                       bg-[#080808]/95 backdrop-blur-xl">

        <Link to="/" className="font-display text-2xl tracking-[5px] text-white shrink-0">
          TUNE<span className="text-red-600">X</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex flex-1 min-w-0
                      bg-[#111] border border-white/[0.08] rounded overflow-hidden
                      focus-within:border-red-600
                      focus-within:shadow-[0_0_20px_rgba(232,0,61,0.12)]
                      transition-all duration-200"
        >
          <input
            type="text"
            defaultValue={searchQuery}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Search songs, artists..."
            className="flex-1 min-w-0 bg-transparent outline-none
                        px-3 py-2 sm:px-4 sm:py-2.5
                        text-white text-sm placeholder-white/30 font-sans"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 transition-colors
                        font-display text-base tracking-[2px]
                        px-4 sm:px-5 shrink-0"
          >
            GO
          </button>
        </form>
      </nav>

      {/* ── Results header ── */}
      <div className="px-5 sm:px-10 py-4 sm:py-5 border-b border-white/[0.08]">
        <h2 className="font-display text-[clamp(1.25rem,4vw,1.875rem)] tracking-[2px] leading-tight">
          Results for <span className="text-red-600">"{searchQuery}"</span>
        </h2>
        <p className="text-white/40 text-[0.65rem] tracking-[2px] uppercase mt-1">
          {songs.length} tracks found
        </p>
      </div>

      {/* ── Song list ── */}
      <div className="flex flex-col divide-y divide-white/[0.08] pb-24">
        {songs.map((song, i) => (
          <div
            key={song.id}
            className="
              grid items-center gap-3
              px-5 py-3
              sm:px-10 sm:py-4
              hover:bg-white/[0.04] transition-colors

              /* mobile: art | info | btn */
              grid-cols-[48px_1fr_auto]

              /* ≥480px: num | art | info | btn */
              min-[480px]:grid-cols-[32px_48px_1fr_auto]

              /* ≥640px: wider num + art */
              sm:grid-cols-[40px_56px_1fr_auto]
              sm:gap-4
            "
          >
            {/* Index — hidden below 480px */}
            <span className="hidden min-[480px]:block text-white/30 text-sm text-right">
              {i + 1}
            </span>

            <img
              src={song.image}
              alt={song.title}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover bg-white/10"
            />

            <div className="min-w-0">
              <p className="text-[clamp(0.8rem,2.5vw,0.9375rem)] font-medium
                             truncate">
                {song.title}
              </p>
              <p className="text-white/40 text-[clamp(0.7rem,2vw,0.8rem)] mt-0.5 truncate">
                {song.artist}
              </p>
            </div>

            <button
              onClick={() => navigate(`/play/${song.id}`, { state: song })}
              className="flex items-center gap-1.5
                          bg-red-600 hover:bg-red-500 transition-colors
                          text-white text-[0.7rem] sm:text-[0.75rem]
                          tracking-[1px] uppercase
                          px-3 py-2 sm:px-4 sm:py-2.5
                          rounded-sm shrink-0"
            >
              ▶ <span className="hidden min-[480px]:inline">Play</span>
            </button>
          </div>
        ))}
      </div>

      {/* ── Bottom player ── */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0
                          bg-[#0f0f0f]/97 backdrop-blur-xl
                          border-t border-white/[0.08]
                          flex items-center gap-3 sm:gap-5
                          px-5 py-3.5 sm:px-10 sm:py-4">
          <img
            src={currentSong.image}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded object-cover shrink-0"
            alt={currentSong.title}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-medium truncate">{currentSong.title}</p>
            <p className="text-white/40 text-xs sm:text-sm mt-0.5 truncate">{currentSong.artist}</p>
          </div>
          <span className="hidden sm:block font-display text-xs tracking-[3px] text-red-600 shrink-0">
            NOW PLAYING
          </span>
        </div>
      )}
    </div>
  );
}