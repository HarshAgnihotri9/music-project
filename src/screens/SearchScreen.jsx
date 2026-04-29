import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SearchScreen() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [currentSong, setCurrentSong] = useState(null);

  const audioRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  // 🔥 FETCH SONGS FROM RAPID API
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
        ?.replace('{w}', '300')
        ?.replace('{h}', '300'),
      preview: item.attributes?.previews?.[0]?.url
    }));

    if (!formatted.length) {
      setError(true);
      return;
    }

    setSongs(formatted);
  })
  .catch(() => setError(true))
  .finally(() => setLoading(false));
  }, [searchQuery]);



  // 🔥 SEARCH SUBMIT
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      navigate(`/search?query=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  // 🔄 LOADING UI
  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-[3px] border-white/10 border-t-red-600 rounded-full animate-spin" />
      <p className="text-white/40 text-xs tracking-[3px] uppercase">Searching</p>
    </div>
  );

  // ❌ ERROR UI
  if (error) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5">
      <p className="text-5xl text-white">NO RESULTS</p>
      <Link to="/" className="px-6 py-3 bg-red-600 text-white rounded">
        ← HOME
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">

      {/* NAVBAR */}
      <nav className="sticky top-0 flex items-center justify-between px-10 py-5 border-b border-white/10 bg-[#080808]">
        <Link to="/" className="text-2xl tracking-widest">
          TUNE<span className="text-red-600">X</span>
        </Link>

        <form onSubmit={handleSearch} className="flex bg-[#111] rounded overflow-hidden">
          <input
            type="text"
            defaultValue={searchQuery}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 bg-transparent outline-none text-white"
          />
          <button className="bg-red-600 px-4">GO</button>
        </form>
      </nav>

      {/* HEADER */}
      <div className="px-10 py-6 border-b border-white/10">
        <h2 className="text-3xl">
          Results for <span className="text-red-600">"{searchQuery}"</span>
        </h2>
      </div>

      {/* SONG LIST */}
      <div className="flex flex-col divide-y divide-white/10">
        {songs.map((song, i) => (
          <div
            key={song.id}
            className="grid grid-cols-[40px_60px_1fr_auto] items-center gap-4 px-10 py-4 hover:bg-white/5"
          >
            <span className="text-white/30">{i + 1}</span>

            <img
              src={song.image}
              alt={song.title}
              className="w-14 h-14 rounded"
            />

            <div>
              <p>{song.title}</p>
              <p className="text-white/40 text-sm">{song.artist}</p>
            </div>

         <button
  onClick={() =>
   navigate(`/play/${song.id}`, { state: song })
  }
  className="bg-red-600 px-4 py-2 rounded"
>
  ▶ Play
</button>
          </div>
        ))}
      </div>

      {/* 🔥 BOTTOM PLAYER */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-white/10 px-6 py-4 flex items-center gap-4">
          <img src={currentSong.image} className="w-12 h-12 rounded" />
          <div>
            <p>{currentSong.title}</p>
            <p className="text-white/40 text-sm">{currentSong.artist}</p>
          </div>
        </div>
      )}
    </div>
  );
}