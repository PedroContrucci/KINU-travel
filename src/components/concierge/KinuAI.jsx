import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, X, Send, Sparkles, 
  Minimize2, Maximize2, CloudRain, TrendingDown,
  MapPin, Calendar, Lightbulb
} from 'lucide-react'

const initialMessages = [
  {
    id: 1,
    type: 'ai',
    content: 'Olá! Sou o KINU, seu irmão experiente em viagens. 🌿 Estou aqui para ajudar com sua viagem para Paris. O que posso fazer por você hoje?',
    timestamp: new Date(),
  }
]

const aiResponses = {
  'clima': {
    content: '🌧️ Vi que vai chover no dia 17 em Paris. Sugiro trocar o passeio ao Jardim de Luxemburgo por uma tarde no Musée d\'Orsay. Quer que eu faça essa alteração no seu roteiro?',
    type: 'suggestion',
    action: 'Aplicar mudança'
  },
  'câmbio': {
    content: '💰 Boa observação! O Euro está 3.2% mais barato que a média. Considerando seu orçamento de R$ 15.000, sugiro converter 40% agora (R$ 6.000 = €1.107). Quer que eu simule a compra?',
    type: 'insight',
    action: 'Ver simulação'
  },
  'restaurante': {
    content: '🍽️ Para um jantar romântico em Montmartre, recomendo o "Le Consulat" (⭐ Michelin) ou "Pink Mamma" (favorito do Clã, 456 votos). Ambos precisam de reserva. Quer que eu mostre os horários disponíveis?',
    type: 'recommendation',
    action: 'Ver opções'
  },
  'jet lag': {
    content: '😴 Paris está +4h do seu fuso. Preparei um protocolo de adaptação:\n\n• Dia 1-2: Atividades leves pela manhã\n• Evite café após 14h\n• Jantar no horário local (19-20h)\n• Luz natural pela manhã\n\nJá bloqueei tours intensos antes das 11h nos primeiros dias.',
    type: 'protocol',
    action: null
  },
  'default': {
    content: 'Entendi! Deixa eu verificar isso para você. Com base no seu perfil e na sabedoria do Clã, posso sugerir algumas opções. O que acha de explorarmos juntos?',
    type: 'default',
    action: null
  }
}

export default function KinuAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Determine AI response based on keywords
    const lowerInput = input.toLowerCase()
    let responseKey = 'default'
    if (lowerInput.includes('clima') || lowerInput.includes('chuva') || lowerInput.includes('tempo')) {
      responseKey = 'clima'
    } else if (lowerInput.includes('câmbio') || lowerInput.includes('euro') || lowerInput.includes('dinheiro')) {
      responseKey = 'câmbio'
    } else if (lowerInput.includes('restaurante') || lowerInput.includes('jantar') || lowerInput.includes('comer')) {
      responseKey = 'restaurante'
    } else if (lowerInput.includes('jet lag') || lowerInput.includes('fuso') || lowerInput.includes('cansaço')) {
      responseKey = 'jet lag'
    }

    // Simulate typing delay
    setTimeout(() => {
      const response = aiResponses[responseKey]
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.content,
        responseType: response.type,
        action: response.action,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Quick suggestion buttons
  const quickSuggestions = [
    { icon: CloudRain, text: 'Previsão do tempo', query: 'Como está o clima em Paris?' },
    { icon: TrendingDown, text: 'Câmbio EUR', query: 'Como está o câmbio do euro?' },
    { icon: MapPin, text: 'Restaurantes', query: 'Sugira um restaurante romântico' },
    { icon: Calendar, text: 'Jet Lag', query: 'Como evitar jet lag?' },
  ]

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-kinu-gold to-yellow-500 text-kinu-night shadow-gold hover:scale-110 transition-transform animate-pulse-gold"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized 
          ? 'bottom-6 right-6 w-72' 
          : 'bottom-6 right-6 w-96 h-[600px] max-h-[80vh]'
      }`}
    >
      <div className="glass-card h-full flex flex-col overflow-hidden border border-kinu-gold/30 shadow-gold">
        {/* Header */}
        <div className="p-4 border-b border-kinu-surface flex items-center justify-between bg-gradient-to-r from-kinu-gold/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kinu-gold to-yellow-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-kinu-night" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-kinu-gold">KINU AI</h3>
              <p className="text-xs text-kinu-gray-400">Seu irmão experiente</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-kinu-surface/50 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-kinu-surface/50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-kinu-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-kinu-emerald/20 text-kinu-white'
                        : 'bg-kinu-gold/10 border border-kinu-gold/20'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-kinu-gold" />
                        <span className="text-xs text-kinu-gold font-medium">KINU AI</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    
                    {message.action && (
                      <button className="mt-3 w-full btn-gold text-sm py-2">
                        {message.action}
                      </button>
                    )}
                    
                    <p className="text-xs text-kinu-gray-500 mt-2">
                      {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-kinu-gold/10 border border-kinu-gold/20 rounded-kinu-lg p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-kinu-gold animate-pulse" />
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-kinu-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-kinu-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-kinu-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length < 3 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-kinu-gray-500 mb-2">Sugestões rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, idx) => {
                    const Icon = suggestion.icon
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setInput(suggestion.query)
                          setTimeout(sendMessage, 100)
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-kinu-surface/50 hover:bg-kinu-surface text-xs text-kinu-gray-300 transition-colors"
                      >
                        <Icon className="w-3 h-3" />
                        {suggestion.text}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-kinu-surface">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pergunte qualquer coisa..."
                  className="input-kinu flex-1"
                />
                <button 
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="p-3 rounded-kinu-lg bg-kinu-gold text-kinu-night hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4">
            <p className="text-sm text-kinu-gray-300">
              💬 Clique para expandir e conversar comigo!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
