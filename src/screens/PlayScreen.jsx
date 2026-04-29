import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function PlayScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const song = location.state;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  if (!song) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 text-white px-4 text-center">
      <p className="text-2xl sm:text-3xl">No song selected 😢</p>
      <Link to="/" className="px-6 py-3 bg-red-600 rounded text-sm sm:text-base">← HOME</Link>
    </div>
  );

  if (!song.preview) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5 text-white px-4 text-center">
      <p className="text-2xl sm:text-3xl">No preview available 😢</p>
      <button onClick={() => navigate(-1)} className="px-6 py-3 bg-red-600 rounded text-sm sm:text-base">← Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">

      {/* NAV */}
      <nav className="flex justify-between items-center px-5 sm:px-10 py-4 sm:py-5 border-b border-white/10">
        <Link to="/" className="text-xl sm:text-2xl tracking-widest">
          TUNE<span className="text-red-600">X</span>
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="text-sm sm:text-base text-white/70 hover:text-white transition-colors"
        >
          ← Back
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-2">

        {/* Album Art */}
        <div className="flex items-center justify-center p-6 sm:p-10 pt-8">
          <img
            src={song.image}
            alt={song.title}
            className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-lg shadow-2xl object-cover"
          />
        </div>

        {/* Player */}
        <div className="flex flex-col justify-center gap-5 sm:gap-6 px-5 sm:px-10 pb-10 md:pb-0">

          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">{song.title}</h1>
            <p className="text-white/50 mt-1 text-sm sm:text-base">{song.artist}</p>
          </div>

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
            className="w-full accent-red-600 cursor-pointer h-1"
          />

          {/* TIME */}
          <div className="flex justify-between text-xs sm:text-sm text-white/50 -mt-3">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 mt-2">
            <button
              onClick={backward}
              className="text-xl sm:text-2xl hover:scale-110 transition-transform active:scale-95"
              aria-label="Rewind 10s"
            >
              ⏪
            </button>

            <button
              onClick={togglePlay}
              className="bg-red-600 hover:bg-red-500 active:scale-95 transition-all px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium min-w-[110px]"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>

            <button
              onClick={forward}
              className="text-xl sm:text-2xl hover:scale-110 transition-transform active:scale-95"
              aria-label="Forward 10s"
            >
              ⏩
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}