import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function PlayScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Data comes directly from SearchScreen via navigate state — no API call needed
  const song = location.state;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🔥 AUTO PLAY WHEN COMPONENT MOUNTS
  useEffect(() => {
    if (song?.preview && audioRef.current) {
      const timer = setTimeout(() => {
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.warn('Autoplay blocked:', err);
            setIsPlaying(false);
          });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [song]);

  // 🎮 CONTROLS
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const forward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const backward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const seek = (e) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // ⏱ FORMAT TIME
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // ❌ No song data (user opened URL directly without coming from search)
  if (!song) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 text-white">
      <p className="text-3xl">No song selected 😢</p>
      <Link to="/" className="px-6 py-3 bg-red-600 rounded">← HOME</Link>
    </div>
  );

  // ❌ Song exists but has no preview URL
  if (!song.preview) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 text-white">
      <p className="text-3xl">No preview available 😢</p>
      <button onClick={() => navigate(-1)} className="px-6 py-3 bg-red-600 rounded">← Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">

      {/* NAV */}
      <nav className="flex justify-between px-10 py-5 border-b border-white/10">
        <Link to="/" className="text-2xl tracking-widest">
          TUNE<span className="text-red-600">X</span>
        </Link>
        <button onClick={() => navigate(-1)}>← Back</button>
      </nav>

      <div className="flex-1 grid md:grid-cols-2">

        {/* LEFT — Album Art */}
        <div className="flex items-center justify-center p-10">
          <img
            src={song.image}
            alt={song.title}
            className="w-72 h-72 rounded-lg shadow-lg"
          />
        </div>

        {/* RIGHT — Player */}
        <div className="flex flex-col justify-center gap-6 px-10">

          <div>
            <h1 className="text-4xl">{song.title}</h1>
            <p className="text-white/50">{song.artist}</p>
          </div>

          {/* AUDIO */}
          <audio
            ref={audioRef}
            src={song.preview}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onEnded={() => setIsPlaying(false)}
            onError={(e) => console.error('Audio error:', e.target.error)}
          />

          {/* SEEK BAR */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            step="0.1"
            onChange={seek}
            className="w-full accent-red-600"
          />

          {/* TIME */}
          <div className="flex justify-between text-sm text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={backward} className="text-2xl">⏪</button>

            <button
              onClick={togglePlay}
              className="bg-red-600 px-6 py-3 rounded text-lg"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>

            <button onClick={forward} className="text-2xl">⏩</button>
          </div>

        </div>
      </div>
    </div>
  );
}