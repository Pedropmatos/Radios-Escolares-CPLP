import React, { useState } from 'react';
import { Send, CheckCircle, RefreshCw } from 'lucide-react';

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
  captchaInput: string;
}

interface CaptchaData {
  question: string;
  answer: number;
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
    captchaInput: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<CaptchaData>({ question: '', answer: 0 });

  // Gerar novo captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        // Garantir que o resultado seja positivo
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller}`;
        break;
      case '*':
        // Usar números menores para multiplicação
        const smallNum1 = Math.floor(Math.random() * 5) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        answer = smallNum1 * smallNum2;
        question = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }
    
    setCaptcha({ question, answer });
  };

  // Gerar captcha inicial
  React.useEffect(() => {
    generateCaptcha();
  }, []);

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
    
    // Validar captcha
    const userAnswer = parseInt(formData.captchaInput);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      alert('Resposta do captcha incorreta. Tente novamente.');
      generateCaptcha(); // Gerar novo captcha
      setFormData(prev => ({ ...prev, captchaInput: '' }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Supabase integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
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
        captchaInput: '',
      });

      // Gerar novo captcha para próximo uso
      generateCaptcha();

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Obrigado!
          </h2>
          <p className="text-green-700 text-lg">
            Sua rádio será avaliada e você receberá um retorno em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Cadastrar Nova Rádio Escolar
          </h2>
          <p className="text-gray-600">
            Preencha as informações abaixo para adicionar sua rádio escolar à plataforma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email de contato */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email de contato *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="exemplo@escola.edu"
            />
          </div>

          {/* Nome da estação */}
          <div>
            <label htmlFor="stationName" className="block text-sm font-medium text-gray-700 mb-2">
              Nome da estação *
            </label>
            <input
              type="text"
              id="stationName"
              name="stationName"
              required
              value={formData.stationName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Rádio Escola ABC"
            />
          </div>

          {/* Slogan da estação */}
          <div>
            <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-2">
              Slogan da estação
            </label>
            <input
              type="text"
              id="slogan"
              name="slogan"
              value={formData.slogan}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="A voz da educação"
            />
          </div>

          {/* Tipo de transmissão */}
          <div>
            <label htmlFor="transmissionType" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de transmissão *
            </label>
            <select
              id="transmissionType"
              name="transmissionType"
              required
              value={formData.transmissionType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Selecione o tipo</option>
              {transmissionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Website da rádio */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website da rádio *
            </label>
            <input
              type="url"
              id="website"
              name="website"
              required
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://www.radioescola.com"
            />
          </div>

          {/* URL do stream */}
          <div>
            <label htmlFor="streamUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL do stream *
            </label>
            <input
              type="url"
              id="streamUrl"
              name="streamUrl"
              required
              value={formData.streamUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://stream.radioescola.com/live"
            />
          </div>

          {/* País */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              País *
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Selecione o país</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              Estado *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="São Paulo"
            />
          </div>

          {/* Cidade */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Cidade *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="São Paulo"
            />
          </div>

          {/* Mensagem adicional */}
          <div>
            <label htmlFor="additionalMessage" className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem adicional
            </label>
            <textarea
              id="additionalMessage"
              name="additionalMessage"
              rows={4}
              value={formData.additionalMessage}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
              placeholder="Informações adicionais sobre sua rádio escolar..."
            />
          </div>

          {/* Captcha */}
          <div>
            <label htmlFor="captchaInput" className="block text-sm font-medium text-gray-700 mb-2">
              Verificação de segurança *
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg border border-gray-300">
                <span className="text-lg font-mono font-bold text-gray-800">
                  {captcha.question} = ?
                </span>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Gerar novo captcha"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <input
                type="number"
                id="captchaInput"
                name="captchaInput"
                required
                value={formData.captchaInput}
                onChange={handleInputChange}
                className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center"
                placeholder="?"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Resolva a operação matemática acima para continuar
            </p>
          </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="receiveCopy"
                name="receiveCopy"
                checked={formData.receiveCopy}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="receiveCopy" className="ml-2 text-sm text-gray-700">
                Receber cópia do envio por e-mail
              </label>
            </div>

          {/* Checkbox */}

          {/* Botão de enviar */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
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