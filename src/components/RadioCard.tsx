// src/components/RadioCard.tsx

import React from 'react';
import { PlayCircle, Globe } from 'lucide-react';
import { RadioStation } from '../lib/supabase';

interface RadioCardProps {
  station: RadioStation;
  onPlay: (station: RadioStation) => void;
}

const RadioCard: React.FC<RadioCardProps> = ({ station, onPlay }) => {
  const getCountryFlagUrl = (countryName: string) => {
    const countryMap: { [key: string]: string } = {
      'Angola': 'ao',
      'Brasil': 'br',
      'Cabo Verde': 'cv',
      'Guiné-Bissau': 'gw',
      'Moçambique': 'mz',
      'Portugal': 'pt',
      'São Tomé e Príncipe': 'st',
      'Timor-Leste': 'tl',
    };
    const countryCode = countryMap[countryName];
    return countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : '';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">{station.station_name}</h3>
          <img
            src={getCountryFlagUrl(station.country)}
            alt={`Bandeira de ${station.country}`}
            className="w-7 h-5 object-cover rounded-sm shadow"
          />
        </div>
        {station.slogan && <p className="text-gray-600 text-sm mb-4 italic">"{station.slogan}"</p>}
        <p className="text-gray-500 text-sm mb-1"><span className="font-medium">Cidade:</span> {station.city}</p>
        <p className="text-gray-500 text-sm"><span className="font-medium">País:</span> {station.country}</p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <a
          href={station.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <Globe className="w-4 h-4 mr-2" />
          Website
        </a>
        <button
          onClick={() => onPlay(station)}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          <PlayCircle className="w-5 h-5" />
          <span>Ouvir</span>
        </button>
      </div>
    </div>
  );
};

export default RadioCard; // A linha mais importante!