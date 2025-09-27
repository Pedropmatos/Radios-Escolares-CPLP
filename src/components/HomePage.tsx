import React, { useState, useEffect } from 'react';
import { Search, Globe, ChevronUp, WifiOff } from 'lucide-react';
import { supabase, RadioStation } from '../lib/supabase';
// import RadioCard from './RadioCard';
// Update the import path below if RadioCard is in a different folder, e.g.:
// import RadioCard from '../someOtherFolder/RadioCard';
import RadioCard from './RadioCard'; // Make sure RadioCard.tsx exists in this folder
// Make sure RadioPlayer.tsx exists in the same folder, or update the path if needed
import RadioPlayer from './RadioPlayer';

const countries = [
  { id: 'all', name: 'Todos', icon: Globe },
  { id: 'Angola', name: 'Angola', flagUrl: 'https://flagcdn.com/w320/ao.png' },
  { id: 'Brasil', name: 'Brasil', flagUrl: 'https://flagcdn.com/w320/br.png' },
  { id: 'Cabo Verde', name: 'Cabo Verde', flagUrl: 'https://flagcdn.com/w320/cv.png' },
  { id: 'Guiné-Bissau', name: 'Guiné-Bissau', flagUrl: 'https://flagcdn.com/w320/gw.png' },
  { id: 'Moçambique', name: 'Moçambique', flagUrl: 'https://flagcdn.com/w320/mz.png' },
  { id: 'Portugal', name: 'Portugal', flagUrl: 'https://flagcdn.com/w320/pt.png' },
  { id: 'São Tomé e Príncipe', name: 'São Tomé e Príncipe', flagUrl: 'https://flagcdn.com/w320/st.png' },
  { id: 'Timor-Leste', name: 'Timor-Leste', flagUrl: 'https://flagcdn.com/w320/tl.png' },
];

const HomePage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [radioStations, setRadioStations] = useState<RadioStation[]>([]);
  const [filteredRadioStations, setFilteredRadioStations] = useState<RadioStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);

  useEffect(() => {
    const fetchRadios = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('radios').select('*');
      if (error) {
        setError('Não foi possível carregar as rádios.');
        console.error(error);
      } else {
        setRadioStations(data);
      }
      setLoading(false);
    };
    fetchRadios();
  }, []);

  useEffect(() => {
    let filtered = radioStations;

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(station => station.country === selectedCountry);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(station =>
        station.station_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        station.city.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredRadioStations(filtered);
  }, [radioStations, selectedCountry, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Countries Grid */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Selecionar País</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country.id)}
              className={`
                group p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg
                ${selectedCountry === country.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                {country.icon ? (
                  <country.icon className="w-8 h-8 text-blue-600" />
                ) : country.flagUrl ? (
                  <img
                    src={country.flagUrl}
                    alt={`Bandeira de ${country.name}`}
                    className="w-12 h-8 object-cover rounded-sm shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-8 bg-gray-200 rounded-sm flex items-center justify-center">
                    <span className="text-xs text-gray-500">Flag</span>
                  </div>
                )}
                <span className={`
                  text-sm font-medium text-center leading-tight
                  ${selectedCountry === country.id ? 'text-blue-700' : 'text-gray-700 group-hover:text-blue-600'}
                `}>
                  {country.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar por nome ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Radio Results Section */}
      <section>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <WifiOff className="h-16 w-16 mx-auto mb-4" />
            <p>{error}</p>
          </div>
        ) : filteredRadioStations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRadioStations.map(station => (
              <RadioCard key={station.id} station={station} onPlay={setCurrentStation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Globe className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma rádio encontrada
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? `Nenhum resultado para "${searchTerm}"`
                : 'Seja o primeiro a adicionar uma rádio escolar!'
              }
            </p>
          </div>
        )}
      </section>

      {currentStation && <RadioPlayer station={currentStation} onClose={() => setCurrentStation(null)} />}

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 z-10"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default HomePage;