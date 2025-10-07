import React from 'react';
import { X, Play, Pause, Volume2 } from 'lucide-react';
import { RadioStation } from '../lib/supabase';

interface RadioPlayerProps {
  station: RadioStation;
  onClose: () => void;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ station, onClose }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.8);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);
  
  React.useEffect(() => {
    // Auto-play when a new station is selected
    setIsPlaying(true);
  }, [station]);


  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={togglePlay} className="p-2 bg-blue-600 text-white rounded-full">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <div>
            <p className="font-bold text-gray-800">{station.station_name}</p>
            <p className="text-sm text-gray-500">{station.city}, {station.country}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <audio ref={audioRef} src={station.stream_url} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} autoPlay/>
      </div>
    </div>
  );
};

// Certifique-se de que esta linha existe no final do ficheiro
export default RadioPlayer;