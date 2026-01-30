import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  MapPin, Calendar, Users, Sparkles, Plus, Clock, 
  Euro, Gavel, ChevronRight, Check, X, Star,
  Utensils, Camera, Music, ShoppingBag, Landmark
} from 'lucide-react'
import { useTripContext } from '../../context/TripContext'

const activityTypes = [
  { id: 'culture', icon: Landmark, label: 'Cultura', color: 'kinu-emerald' },
  { id: 'food', icon: Utensils, label: 'Gastronomia', color: 'kinu-gold' },
  { id: 'photo', icon: Camera, label: 'Fotografia', color: 'kinu-horizon' },
  { id: 'nightlife', icon: Music, label: 'Vida Noturna', color: 'purple-400' },
  { id: 'shopping', icon: ShoppingBag, label: 'Compras', color: 'pink-400' },
]

const sampleActivities = [
  { 
    id: 1, 
    name: 'Torre Eiffel - Skip the Line', 
    type: 'culture',
    duration: '2-3h', 
    price: 'R$ 180',
    rating: 4.8,
    image: '🗼',
    description: 'Vista panorâmica de Paris do topo da torre mais icônica do mundo.',
    auctionAvailable: true
  },
  { 
    id: 2, 
    name: 'Museu do Louvre', 
    type: 'culture',
    duration: '4-5h', 
    price: 'R$ 95',
    rating: 4.9,
    image: '🖼️',
    description: 'O maior museu de arte do mundo. Mona Lisa, Vênus de Milo e mais.',
    auctionAvailable: true
  },
  { 
    id: 3, 
    name: 'Cruzeiro no Rio Sena', 
    type: 'photo',
    duration: '1-2h', 
    price: 'R$ 120',
    rating: 4.7,
    image: '🚢',
    description: 'Veja Paris de um ângulo único, passando por pontes históricas.',
    auctionAvailable: true
  },
  { 
    id: 4, 
    name: 'Jantar em Montmartre', 
    type: 'food',
    duration: '2-3h', 
    price: 'R$ 250',
    rating: 4.6,
    image: '🍷',
    description: 'Experiência gastronômica no bairro boêmio mais charmoso de Paris.',
    auctionAvailable: true
  },
  { 
    id: 5, 
    name: 'Palácio de Versalhes', 
    type: 'culture',
    duration: '5-6h', 
    price: 'R$ 150',
    rating: 4.8,
    image: '🏰',
    description: 'O palácio mais luxuoso da Europa, com jardins espetaculares.',
    auctionAvailable: true
  },
]

export default function TripPlanner() {
  const { id } = useParams()
  const { currentTrip, addToItinerary } = useTripContext()
  const [selectedDay, setSelectedDay] = useState(1)
  const [showAuction, setShowAuction] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [itinerary, setItinerary] = useState({
    1: [sampleActivities[0]],
    2: [sampleActivities[1], sampleActivities[2]],
    3: [sampleActivities[3]],
    4: [],
    5: [sampleActivities[4]],
    6: [],
    7: []
  })

  const days = Array.from({ length: 7 }, (_, i) => ({
    number: i + 1,
    date: new Date(2025, 2, 15 + i).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })
  }))

  const filteredActivities = activeFilter === 'all' 
    ? sampleActivities 
    : sampleActivities.filter(a => a.type === activeFilter)

  const addActivity = (activity) => {
    setItinerary(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), activity]
    }))
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🗼</span>
            <div>
              <h1 className="font-display text-3xl font-bold">Paris</h1>
              <p className="text-kinu-gray-400">França • 15-22 Março 2025</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-silk-outline flex items-center gap-2">
            <Users className="w-4 h-4" />
            2 viajantes
          </button>
          <button className="btn-silk flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Gerar Roteiro IA
          </button>
        </div>
      </div>

      {/* Jet Lag Alert */}
      <div className="glass-gold rounded-kinu-lg p-4 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-kinu-gold/20">
          <Clock className="w-6 h-6 text-kinu-gold" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-kinu-gold">Protocolo Anti Jet Lag Ativo</h3>
          <p className="text-sm text-kinu-gray-300">
            Os primeiros 2 dias têm atividades leves pela manhã. O Nexo bloqueou automaticamente 
            tours intensos antes das 11h para permitir adaptação ao fuso (+4h).
          </p>
        </div>
        <button className="text-kinu-gold hover:underline text-sm">
          Personalizar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Day Selector & Itinerary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Day Tabs */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {days.map(day => (
                <button
                  key={day.number}
                  onClick={() => setSelectedDay(day.number)}
                  className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all ${
                    selectedDay === day.number
                      ? 'bg-gradient-to-r from-kinu-emerald to-kinu-horizon text-white'
                      : 'bg-kinu-surface/50 hover:bg-kinu-surface text-kinu-gray-300'
                  }`}
                >
                  <p className="text-xs opacity-70">Dia {day.number}</p>
                  <p className="font-medium">{day.date}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Day Itinerary */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">
                Roteiro do Dia {selectedDay}
              </h2>
              <span className="text-sm text-kinu-gray-400">
                {itinerary[selectedDay]?.length || 0} atividades
              </span>
            </div>

            {itinerary[selectedDay]?.length > 0 ? (
              <div className="space-y-4">
                {itinerary[selectedDay].map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-kinu-lg bg-kinu-surface/30 border border-kinu-surface hover:border-kinu-emerald/30 transition-all"
                  >
                    <div className="text-4xl">{activity.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium mb-1">{activity.name}</h3>
                          <p className="text-sm text-kinu-gray-400 mb-2">{activity.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-kinu-gray-500">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {activity.duration}
                            </span>
                            <span className="text-kinu-emerald font-medium">{activity.price}</span>
                            <span className="text-kinu-gold">
                              <Star className="w-4 h-4 inline mr-1" />
                              {activity.rating}
                            </span>
                          </div>
                        </div>
                        {activity.auctionAvailable && (
                          <button 
                            onClick={() => setShowAuction(activity)}
                            className="px-3 py-2 rounded-lg bg-kinu-gold/20 text-kinu-gold text-sm font-medium hover:bg-kinu-gold/30 transition-colors flex items-center gap-2"
                          >
                            <Gavel className="w-4 h-4" />
                            Ativar Leilão
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-kinu-surface/50 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-kinu-gray-500" />
                </div>
                <p className="text-kinu-gray-400 mb-2">Nenhuma atividade planejada</p>
                <p className="text-sm text-kinu-gray-500">
                  Adicione atividades da lista ao lado ou deixe a IA sugerir.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Activity Library */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">Adicionar Atividade</h3>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-kinu-emerald text-white'
                    : 'bg-kinu-surface/50 text-kinu-gray-400 hover:text-white'
                }`}
              >
                Todas
              </button>
              {activityTypes.map(type => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveFilter(type.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1 ${
                      activeFilter === type.id
                        ? `bg-${type.color} text-white`
                        : 'bg-kinu-surface/50 text-kinu-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {type.label}
                  </button>
                )
              })}
            </div>

            {/* Activity List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredActivities.map(activity => (
                <div 
                  key={activity.id}
                  className="p-3 rounded-lg bg-kinu-surface/30 hover:bg-kinu-surface/50 transition-colors cursor-pointer group"
                  onClick={() => addActivity(activity)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{activity.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{activity.name}</p>
                      <p className="text-xs text-kinu-gray-500">{activity.duration} • {activity.price}</p>
                    </div>
                    <Plus className="w-5 h-5 text-kinu-gray-500 group-hover:text-kinu-emerald transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="glass-gold rounded-kinu-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-kinu-gold" />
              <h4 className="font-medium text-kinu-gold">Sugestão do Nexo</h4>
            </div>
            <p className="text-sm text-kinu-gray-300 mb-3">
              Considerando seu perfil "romântico" e a previsão de chuva no dia 17, 
              sugiro trocar o passeio ao ar livre por uma tarde no Musée d'Orsay.
            </p>
            <button className="w-full btn-gold text-sm py-2">
              Aplicar Sugestão
            </button>
          </div>
        </div>
      </div>

      {/* Reverse Auction Modal */}
      {showAuction && (
        <ReverseAuctionModal 
          activity={showAuction} 
          onClose={() => setShowAuction(null)} 
        />
      )}
    </div>
  )
}

// Reverse Auction Modal Component
function ReverseAuctionModal({ activity, onClose }) {
  const [auctionStarted, setAuctionStarted] = useState(false)
  const [offers, setOffers] = useState([])
  const [selectedOffer, setSelectedOffer] = useState(null)

  const startAuction = () => {
    setAuctionStarted(true)
    // Simulate offers coming in
    const mockOffers = [
      { id: 1, provider: 'GetYourGuide', price: 'R$ 162', discount: '10%', rating: 4.7, time: 2 },
      { id: 2, provider: 'Viator', price: 'R$ 155', discount: '14%', rating: 4.5, time: 4 },
      { id: 3, provider: 'Paris Tours Pro', price: 'R$ 149', discount: '17%', rating: 4.8, time: 6 },
    ]
    
    mockOffers.forEach((offer, index) => {
      setTimeout(() => {
        setOffers(prev => [...prev, offer])
      }, offer.time * 1000)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-kinu-gold/20">
              <Gavel className="w-6 h-6 text-kinu-gold" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Leilão Reverso</h2>
              <p className="text-sm text-kinu-gray-400">Fornecedores competem pelo seu roteiro</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-kinu-surface/50 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-kinu-lg bg-kinu-surface/30 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activity.image}</span>
            <div>
              <h3 className="font-medium">{activity.name}</h3>
              <p className="text-sm text-kinu-gray-400">Preço base: {activity.price}</p>
            </div>
          </div>
        </div>

        {!auctionStarted ? (
          <div className="text-center py-6">
            <p className="text-kinu-gray-300 mb-6">
              Ao ativar o leilão, fornecedores locais verificados enviarão 
              ofertas privadas competindo pelo melhor preço.
            </p>
            <button onClick={startAuction} className="btn-gold">
              Iniciar Leilão
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Ofertas Recebidas</h4>
              {offers.length < 3 && (
                <div className="flex items-center gap-2 text-sm text-kinu-gold">
                  <div className="w-2 h-2 rounded-full bg-kinu-gold animate-pulse"></div>
                  Buscando ofertas...
                </div>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {offers.map((offer, index) => (
                <div 
                  key={offer.id}
                  onClick={() => setSelectedOffer(offer.id)}
                  className={`p-4 rounded-kinu-lg border-2 transition-all cursor-pointer animate-fade-in ${
                    selectedOffer === offer.id
                      ? 'border-kinu-emerald bg-kinu-emerald/10'
                      : 'border-kinu-surface hover:border-kinu-emerald/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{offer.provider}</h5>
                        <span className="px-2 py-0.5 rounded-full bg-kinu-emerald/20 text-kinu-emerald text-xs">
                          -{offer.discount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-kinu-gold" />
                        <span className="text-sm text-kinu-gray-400">{offer.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-kinu-emerald">{offer.price}</p>
                      {selectedOffer === offer.id && (
                        <Check className="w-5 h-5 text-kinu-emerald ml-auto" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {offers.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-kinu-gold/20 flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Gavel className="w-6 h-6 text-kinu-gold" />
                  </div>
                  <p className="text-kinu-gray-400">Aguardando ofertas...</p>
                </div>
              )}
            </div>

            {selectedOffer && (
              <button 
                onClick={onClose}
                className="w-full btn-silk"
              >
                Aceitar Oferta
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
