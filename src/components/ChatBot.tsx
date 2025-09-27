import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente das Rádios Escolares CPLP. Posso ajudar você com informações sobre rádios escolares, curiosidades e muito mais! Como posso ajudar?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Respostas sobre rádios escolares
    if (message.includes('radio') || message.includes('rádio')) {
      if (message.includes('como') && (message.includes('criar') || message.includes('fazer'))) {
        return 'Para criar uma rádio escolar, você precisa: 1) Equipamentos básicos (microfone, mesa de som, computador), 2) Software de transmissão, 3) Autorização da escola, 4) Conteúdo educativo planejado. Posso ajudar com mais detalhes sobre algum desses pontos!';
      }
      if (message.includes('beneficio') || message.includes('vantagem')) {
        return 'As rádios escolares trazem muitos benefícios: desenvolvem habilidades de comunicação, estimulam a criatividade, promovem integração da comunidade escolar, melhoram a autoestima dos estudantes e criam um ambiente de aprendizado mais dinâmico!';
      }
      if (message.includes('equipamento')) {
        return 'Equipamentos básicos para uma rádio escolar: microfone de qualidade, mesa de som simples, computador, fones de ouvido, software gratuito como Audacity, e uma boa conexão de internet para transmissão online.';
      }
      return 'As rádios escolares são uma excelente ferramenta educativa! Elas ajudam no desenvolvimento da comunicação, criatividade e integração da comunidade escolar. Que aspecto específico te interessa mais?';
    }

    // Curiosidades sobre países da CPLP
    if (message.includes('curiosidade') || message.includes('curioso')) {
      const curiosidades = [
        'Você sabia que a CPLP (Comunidade dos Países de Língua Portuguesa) foi criada em 1996 e reúne mais de 280 milhões de falantes do português?',
        'Curiosidade: O português é a 5ª língua mais falada no mundo e está presente em 4 continentes!',
        'Sabia que Cabo Verde tem uma das taxas de alfabetização mais altas da África Ocidental?',
        'Timor-Leste é o país mais jovem da CPLP, tendo conquistado sua independência em 2002.',
        'O Brasil é o maior país da CPLP em território e população, com mais de 215 milhões de habitantes.',
        'Angola é o segundo maior país africano de língua portuguesa e tem uma rica tradição em rádio comunitária.'
      ];
      return curiosidades[Math.floor(Math.random() * curiosidades.length)];
    }

    // Informações sobre países específicos
    if (message.includes('brasil')) {
      return 'O Brasil tem uma longa tradição em rádio educativa! A primeira rádio educativa brasileira foi a Rádio Sociedade do Rio de Janeiro, criada em 1923. Hoje, o país tem milhares de rádios escolares e comunitárias.';
    }
    if (message.includes('portugal')) {
      return 'Portugal foi pioneiro na radiodifusão educativa na Europa. A RDP (Rádio Difusão Portuguesa) tem programas educativos desde os anos 1930, e hoje muitas escolas portuguesas têm suas próprias rádios.';
    }
    if (message.includes('angola')) {
      return 'Angola tem investido muito em rádios comunitárias e escolares como forma de promover a educação e preservar as línguas locais, além do português.';
    }
    if (message.includes('moçambique')) {
      return 'Moçambique usa rádios escolares como ferramenta importante para combater o analfabetismo e promover a educação em áreas rurais.';
    }

    // Ajuda e navegação
    if (message.includes('ajuda') || message.includes('help')) {
      return 'Posso ajudar você com: informações sobre rádios escolares, curiosidades dos países da CPLP, dicas para criar uma rádio escolar, benefícios da radiodifusão educativa, e muito mais! O que gostaria de saber?';
    }

    if (message.includes('cadastrar') || message.includes('adicionar')) {
      return 'Para cadastrar sua rádio escolar, clique no menu lateral (☰) e selecione "Cadastrar Rádio". Preencha todas as informações obrigatórias e sua rádio será avaliada pela nossa equipe!';
    }

    // Saudações
    if (message.includes('oi') || message.includes('olá') || message.includes('hello')) {
      return 'Olá! Que bom ter você aqui! Sou especialista em rádios escolares da CPLP. Como posso ajudar você hoje?';
    }

    if (message.includes('obrigad') || message.includes('valeu')) {
      return 'Por nada! Fico feliz em ajudar. Se tiver mais dúvidas sobre rádios escolares ou curiosidades da CPLP, estarei aqui! 😊';
    }

    // Resposta padrão
    return 'Interessante pergunta! Sou especializado em rádios escolares e países da CPLP. Posso falar sobre como criar uma rádio escolar, benefícios da radiodifusão educativa, curiosidades dos países lusófonos, ou ajudar com o cadastro de rádios. O que mais te interessa?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay de digitação do bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 segundos de delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">Assistente CPLP</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 z-40 ${
          isOpen ? 'rotate-180' : ''
        }`}
        aria-label="Abrir chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
};

export default ChatBot;