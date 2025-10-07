import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const countries = [
  'Angola', 'Brasil', 'Cabo Verde', 'Guiné-Bissau', 
  'Moçambique', 'Portugal', 'São Tomé e Príncipe', 'Timor-Leste'
];

const transmissionTypes = ['FM', 'AM', 'Internet', 'Outros'];

interface FormData {
  email: string;
  stationName: string;
  slogan: string;
  transmissionType: string;
  website: string;
  streamUrl: string;
  country: string;
  state: string;
  city: string;
  additionalMessage: string;
  receiveCopy: boolean;
}

const RadioRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    stationName: '',
    slogan: '',
    transmissionType: '',
    website: '',
    streamUrl: '',
    country: '',
    state: '',
    city: '',
    additionalMessage: '',
    receiveCopy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const radioData = {
        email: formData.email,
        station_name: formData.stationName,
        slogan: formData.slogan,
        transmission_type: formData.transmissionType,
        website: formData.website,
        stream_url: formData.streamUrl,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        additional_message: formData.additionalMessage,
        receive_copy: formData.receiveCopy,
      };

      const { error: supabaseError } = await supabase.from('radios').insert([radioData]);

      if (supabaseError) {
        throw supabaseError;
      }
      
      setShowSuccess(true);
      setFormData({
        email: '', stationName: '', slogan: '', transmissionType: '',
        website: '', streamUrl: '', country: '', state: '', city: '',
        additionalMessage: '', receiveCopy: false,
      });
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (err: any) {
      console.error('Erro ao enviar formulário para o Supabase:', err);
      setError(`Erro ao enviar: ${err.message || 'Por favor, verifique a consola.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Obrigado!</h2>
          <p className="text-green-700 text-lg">Sua rádio foi registada e será avaliada em breve.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastrar Nova Rádio Escolar</h2>
          <p className="text-gray-600">Preencha as informações abaixo para adicionar sua rádio escolar à plataforma.</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email de contato */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email de contato *</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="exemplo@escola.edu" autoComplete="email" />
          </div>

          {/* Nome da estação */}
          <div>
            <label htmlFor="stationName" className="block text-sm font-medium text-gray-700 mb-2">Nome da estação *</label>
            <input type="text" id="stationName" name="stationName" required value={formData.stationName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Rádio Escola ABC" autoComplete="organization" />
          </div>
          
          {/* Slogan */}
          <div>
            <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-2">Slogan da estação</label>
            <input type="text" id="slogan" name="slogan" value={formData.slogan} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="A voz da educação" autoComplete="off" />
          </div>

          {/* Tipo de transmissão */}
          <div>
            <label htmlFor="transmissionType" className="block text-sm font-medium text-gray-700 mb-2">Tipo de transmissão *</label>
            <select id="transmissionType" name="transmissionType" required value={formData.transmissionType} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" autoComplete="off">
              <option value="">Selecione o tipo</option>
              {transmissionTypes.map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
          </div>

          {/* Website da rádio */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Website da rádio *</label>
            <input type="url" id="website" name="website" required value={formData.website} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://www.radioescola.com" autoComplete="url" />
          </div>

          {/* URL do stream */}
          <div>
            <label htmlFor="streamUrl" className="block text-sm font-medium text-gray-700 mb-2">URL do stream *</label>
            <input type="url" id="streamUrl" name="streamUrl" required value={formData.streamUrl} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://stream.radioescola.com/live" autoComplete="off" />
          </div>

          {/* País */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">País *</label>
            <select id="country" name="country" required value={formData.country} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" autoComplete="country-name">
              <option value="">Selecione o país</option>
              {countries.map(country => (<option key={country} value={country}>{country}</option>))}
            </select>
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
            <input type="text" id="state" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="São Paulo" autoComplete="address-level1" />
          </div>

          {/* Cidade */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
            <input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="São Paulo" autoComplete="address-level2" />
          </div>

          {/* Mensagem adicional */}
          <div>
            <label htmlFor="additionalMessage" className="block text-sm font-medium text-gray-700 mb-2">Mensagem adicional</label>
            <textarea id="additionalMessage" name="additionalMessage" rows={4} value={formData.additionalMessage} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical" placeholder="Informações adicionais sobre sua rádio escolar..." autoComplete="off" />
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" id="receiveCopy" name="receiveCopy" checked={formData.receiveCopy} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="receiveCopy" className="ml-2 text-sm text-gray-700">Receber cópia do envio por e-mail</label>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Enviar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RadioRegistration;